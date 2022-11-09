const authServices = require('../services/auth.service');

const register = async (req, res, next) => {
    try {
        const resData = await authServices.handleRegister(req.body);
        return res.status(200).json(resData);
    } catch (error) {
        next(error)
    }
};

const activateAccount = async (req, res, next) => {
    try {
        const resData = await authServices.handleActivate(req.params.token);
        return res.status(200).json(resData);
    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
    try {
        const resData = await authServices.handleLogin(req.body);
        if (resData.errCode !== 0) {
            return res.status(200).json(resData);
        }

        const refreshToken = resData.data;
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 15, // 15 minutes
            httpOnly: true,
            sameSite: 'None',
            secure: true
        });
        return res.status(200).json({
            errCode: 0,
            message: 'Ok',
        });
    } catch (error) {
        next(error)
    }
};

const getRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        return res.status(200).json(refreshToken);
    } catch (error) {
        next(error)
    }
};

const getNewToken = async (req, res, next) => {
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
            sameSite: 'None',
            secure: true
        });
        return res.status(200).json({
            errCode: 0,
            message: 'Ok',
            data: {
                accessToken: newAccessToken,
            },
        });
    } catch (error) {
        next(error)
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const resData = await authServices.handleForgotPassword(req.body.gmail);
        return res.status(200).json(resData);
    } catch (error) {
        next(error)
    }
};

const verifyForgotToken = async (req, res, next) => {
    try {
        const resData = await authServices.verifyForgotToken(req.params.token);
        return res.status(200).json(resData);
    } catch (error) {
        next(error)
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { id, password } = req.body;
        const resData = await authServices.handleResetPassword({
            id,
            password,
        });
        return res.status(200).json(resData);
    } catch (error) {
        next(error)
    }
};

const logout = (req, res, next) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'None',
            secure: true
        });
        return res.status(200).json({ errCode: 0, message: 'Ok' });
    } catch (error) {
        next(error)
    }
};

const accessTokenGoogle = async (req, res, next) => {
    try {
        const resData = await authServices.accessTokenGoogle(req.body.access_token)
        if (resData.errCode !== 0) {
            return res.status(200).json(resData);
        }

        const refreshToken = resData.data;
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 15, // 15 minutes
            httpOnly: true,
            sameSite: 'None',
            secure: true
        });
        return res.status(200).json({
            errCode: 0,
            message: 'Ok',
        });
    } catch (error) {
        next(error)
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
    resetPassword,
    logout,
    accessTokenGoogle
};
