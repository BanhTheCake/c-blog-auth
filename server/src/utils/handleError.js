const yup = require('yup');

const handleError = (error, req, res, next) => {
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

    // Handle Error in Schema
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

    // Handle error JWT
    if (error?.message === 'invalid signature') {
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

    console.log(error);

    // Handle another error
    return res.status(500).json({
        errCode: -1,
        message: error?.message || 'Something wrong with server !',
    });
}

module.exports = handleError