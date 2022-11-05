const yup = require('yup');

const register = async (req, res, next) => {
    try {
        let schema = yup.object().shape({
            password: yup.string().required('Password must be required !'),
            gmail: yup.string().email('Gmail must be valid !'),
        });

        await schema.validate(req.body, { abortEarly: false });
        next();
        
    } catch (error) {
        // Handle validate of yup
        if (error instanceof yup.ValidationError) {
            const errorMsgs = error.errors;
            const errorNames = [...error.inner.map((err) => err.path)];
            const errorLogs = {};
            errorNames.forEach((errName, index) => {
                errorLogs[errName] = errorMsgs[index];
            });
            return res.status(200).json({
                errCode: -1,
                message: errorLogs,
            });
        }

        // Handle another error not belong to validate
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !',
        });
    }
};

const login = async (req, res, next) => {
    try {
        let schema = yup.object().shape({
            password: yup.string().required('Password must be required !'),
            gmail: yup.string().email('Gmail must be valid !'),
        });

        await schema.validate(req.body, { abortEarly: false });
        next();
        
    } catch (error) {
        // Handle validate of yup
        if (error instanceof yup.ValidationError) {
            const errorMsgs = error.errors;
            const errorNames = [...error.inner.map((err) => err.path)];
            const errorLogs = {};
            errorNames.forEach((errName, index) => {
                errorLogs[errName] = errorMsgs[index];
            });
            return res.status(200).json({
                errCode: -1,
                message: errorLogs,
            });
        }

        // Handle another error not belong to validate
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !',
        });
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        let schema = yup.object().shape({
            gmail: yup.string().email('Gmail must be valid !').required('Gmail must be required !'),
        });

        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        // Handle validate of yup
        if (error instanceof yup.ValidationError) {
            const errorMsgs = error.errors;
            const errorNames = [...error.inner.map((err) => err.path)];
            const errorLogs = {};
            errorNames.forEach((errName, index) => {
                errorLogs[errName] = errorMsgs[index];
            });
            return res.status(200).json({
                errCode: -1,
                message: errorLogs,
            });
        }

        // Handle another error not belong to validate
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !',
        });
    }
}

const resetPassword = async (req, res, next) => {
    try {
        let schema = yup.object().shape({
            id: yup.string('Id must be a string !').required('Id user must be required !'),
            password: yup.string('Password must be a string !').required('Password must be required !'),
            userToken: yup.string('userToken must be a string !')
        });

        await schema.validate(req.body, { abortEarly: false });
        
        next();
    } catch (error) {
        // Handle validate of yup
        if (error instanceof yup.ValidationError) {
            const errorMsgs = error.errors;
            const errorNames = [...error.inner.map((err) => err.path)];
            const errorLogs = {};
            errorNames.forEach((errName, index) => {
                errorLogs[errName] = errorMsgs[index];
            });
            return res.status(200).json({
                errCode: -1,
                message: errorLogs,
            });
        }

        // Handle another error not belong to validate
        return res.status(500).json({
            errCode: -1,
            message: error?.message || 'Something wrong with server !',
        });
    }
}

module.exports = { register, login, forgotPassword, resetPassword };
