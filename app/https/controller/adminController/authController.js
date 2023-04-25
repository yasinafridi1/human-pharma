const UserModel = require("../../../models/UserModel");
const bcrypt = require('bcrypt');
const JwtService = require("../../../../services/JWTservices");
const RefreshModel = require("../../../models/RefreshModel");

function authController() {
    return {
        login: async (req, res) => {

            const { phone, password } = req.body;
            if (!phone || !password) {
                return res.status(422).json({ message: 'Phone or password is required' });
            }

            const user = await UserModel.findOne({ phone });
            if (!user) {
                return res.status(422).json({ message: 'Email or password incorrect' });
            }

            // check user password using bcrypt
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(422).json({ message: 'Email or password incorrect' });
            }
            const { accessToken, refreshToken } = JwtService.generateToken({ _id: user._id, role: user.role });

            const deleteRefreshToken = await RefreshModel.findByIdAndDelete(user._id);
            const { result } = await JwtService.storeRefreshToken(refreshToken, user._id);
            if (!result) {
                return res.status(500).json({ message: 'Internal server error.Cannot store refresh token' });
            }

            // store  access token and refresh token in cookies
            res.cookie('refreshtoken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24,// 1 day 
                httpOnly: true
            })

            res.cookie('accesstoken', accessToken, {
                maxAge: 1000 * 60 * 60, // 1 hour
                httpOnly: true
            })

            return res.json({ auth: true });

        },
        register: async (req, res) => {
            try {
                const password = 'hspskhan@$'
                const hashedPassword = await bcrypt.hash(password, 10);
                const newAdmin = new UserModel({
                    phone: '03048888888',
                    password: hashedPassword
                })

                const result = await newAdmin.save();
                if (!result) {
                    return res.status(500).json({ message: 'Something went wrong while registering admin' })
                }

                return res.json({ message: 'all ok' })
            } catch (error) {
                return res.status(500).json({ message: 'Internal server error' })
            }
        },
        autoLogin: async (req, res) => {
            const { refreshtoken: refreshTokenFromCookies } = req.cookies;
            if (!refreshTokenFromCookies) {
                return res.status(401).json({ message: 'Token not found' });
            }
            let userData;
            try {
                userData = await JwtService.verifyRefreshToken(refreshTokenFromCookies);
            } catch (error) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            try {
                const token = await JwtService.findRefreshToken(userData._id, refreshTokenFromCookies);
                if (!token) {
                    return res.status(401).json({ message: 'Invalid Token' });
                }
            } catch (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            const userExist = await UserModel.findById(userData._id);
            if (!userExist) {
                return res.status(404).json({ message: 'Invalid user' });
            }

            const { accessToken, refreshToken } = JwtService.generateToken({ _id: userData._id, role: userData.role });
            try {
                const result = await JwtService.updateRefreshToken(userData._id, refreshToken);
            } catch (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            // store  access token and refresh token in cookies
            res.cookie('refreshtoken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 2, //2 hour
                httpOnly: true
            })

            res.cookie('accesstoken', accessToken, {
                maxAge: 1000 * 60 * 60, // 1 hour
                httpOnly: true
            })
            return res.json({ auth: true });
        }
    }
}

module.exports = authController;