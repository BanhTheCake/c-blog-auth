const authServices = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const resData = await authServices.handleRegister(req.body);
        return res.status(200).json(resData);
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !',
        });
    }
};

const activateAccount = async (req, res) => {
    try {
        const resData = await authServices.handleActivate(req.params.token);
        return res.status(200).json(resData);
    } catch (error) {
        if (error.name === 'ValidationError') {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(200).json({
                errCode: -1,
                message: errors,
            });
        }
        if (error?.message === 'invalid signature' || error?.message === 'jwt expired') {
            return res.status(401).json({
                errCode: -2,
                message: 'You are not authenticated !',
            });
        }
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !',
        });
    }
};

const login = async (req, res) => {
    try {
        const resData = await authServices.handleLogin(req.body);
        if (resData.errCode !== 0) {
            return res.status(200).json(resData);
        }

        const refreshToken = resData.data;
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 15, // 15 minutes
            httpOnly: true,
        });
        return res.status(200).json({
            errCode: 0,
            message: 'Ok',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !',
        });
    }
};

const getRefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        return res.status(200).json(refreshToken);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !',
        });
    }
};

const getNewToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                errCode: -2,
                message: 'You are not authenticated !',
            });
        }
        const resData = await authServices.handleNewToken(refreshToken);
        const [newRefreshToken, newAccessToken] = resData.data;
        res.cookie('refreshToken', newRefreshToken, {
            maxAge: 1000 * 60 * 15, // 15 minutes
            httpOnly: true,
        });
        return res.status(200).json({
            errCode: 0,
            message: 'Ok',
            data: {
                accessToken: newAccessToken
            },
        });
    } catch (error) {
        if (error?.message === 'invalid signature' || error?.message === 'jwt expired') {
            return res.status(401).json({
                errCode: -2,
                message: 'You are not authenticated !',
            });
        }
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !',
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const resData = await authServices.handleForgotPassword(req.body.gmail);
        return res.status(200).json(resData);
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !',
        });
    }
};

const verifyForgotToken = async (req, res) => {
    try {
        const resData = await authServices.verifyForgotToken(req.params.token);
        return res.status(200).json(resData);
    } catch (error) {
        if (
            error?.message === 'invalid signature'
        ) {
            return res.status(401).json({
                errCode: -2,
                message: 'You are not authenticated !',
            });
        }

        if (error?.message === 'jwt expired') {
            return res.status(401).json({
                errCode: -3,
                message: 'jwt expired',
            });
        }
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !',
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { id, password } = req.body
        const resData = await authServices.handleResetPassword({ id, password })
        return res.status(200).json(resData)
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !',
        });
    }
}

module.exports = {
    register,
    activateAccount,
    login,
    getRefreshToken,
    getNewToken,
    forgotPassword,
    verifyForgotToken,
    resetPassword
};
