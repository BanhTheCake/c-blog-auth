const yup = require('yup');

const updateInfo = async (req, res, next) => {
    try {
        let schema = yup.object().shape({
            username: yup.string('Password must be a string !'),
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

module.exports = { updateInfo }