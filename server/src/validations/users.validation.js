const yup = require('yup');

const updateInfo = async (req, res, next) => {
    try {
        let schema = yup.object().shape({
            username: yup.string('Username must be a string !'),
            gmail: yup.string('Gmail must be a string !').email('Gmail must be valid !'),
            Password: yup.string('Password must be a string !'),
        });

        await schema.validate(req.body, { abortEarly: false });
        
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = { updateInfo }