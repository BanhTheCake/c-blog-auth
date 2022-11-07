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
        next(error)
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
        next(error)
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
        next(error)
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
        next(error)
    }
}

module.exports = { register, login, forgotPassword, resetPassword };
