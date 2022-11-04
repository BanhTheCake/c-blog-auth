const Users = require('../models/users.model');
const bcrypt = require('bcrypt');
const {
    createAccessToken,
    decodeAccessToken,
    createRefreshToken,
    decodeRefreshToken,
} = require('../utils/createToken');
const email = require('../services/email.service');
const env = require('../utils/environment');

const saltRounds = 10;

const handleRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        const { password } = data;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                return reject(err);
            }
            try {
                const currentUser = await Users.findOne({ gmail: data.gmail });
                if (currentUser) {
                    return resolve({
                        errCode: 1,
                        message: 'Gmail is exist !',
                    });
                }

                const encodeData = { ...data, password: hash };

                const activatedInTime = '5m';
                const accessToken = createAccessToken(
                    encodeData,
                    activatedInTime
                );

                const url = `${env.CLIENT_URL}/auth/activate/${accessToken}`;

                await email.sendRegister({
                    to: data.gmail,
                    title: 'Click link below to activated your account !',
                    url,
                });

                return resolve({
                    errCode: 0,
                    message: 'Ok',
                    data: accessToken,
                });
            } catch (error) {
                reject(error);
            }
        });
    });
};

const handleActivate = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const dataDecode = decodeAccessToken(token);
            const { password, gmail } = dataDecode;

            if (!password || !gmail) {
                return resolve({
                    errCode: 1,
                    message: 'Jwt is not valid',
                });
            }

            const dataInsert = { password, gmail };
            dataInsert.username = gmail.split('@')[0];
            const doc = (await Users.create({ ...dataInsert })).toObject();

            delete doc.password;

            resolve({
                errCode: 0,
                message: 'Ok',
                data: doc
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleLogin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentUser = await Users.findOne({ gmail: data.gmail });
            if (!currentUser) {
                return resolve({
                    errCode: 1,
                    message: 'Gmail is not exist in out system !',
                });
            }
            bcrypt.compare(
                data.password,
                currentUser.password,
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    if (!result) {
                        return resolve({
                            errCode: 2,
                            message: 'Gmail or password is wrong !',
                        });
                    }
                    const refreshToken = createRefreshToken(
                        { id: currentUser._id },
                        env.REFRESH_TOKEN_EX
                    );
                    resolve({
                        errCode: 0,
                        data: refreshToken,
                    });
                }
            );
        } catch (error) {
            reject(error);
        }
    });
};

const handleNewToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        try {
            const dataDecode = decodeRefreshToken(refreshToken);
            const newRefreshToken = createRefreshToken(
                { id: dataDecode.id },
                env.REFRESH_TOKEN_EX
            );
            const accessToken = createAccessToken(
                { id: dataDecode.id },
                env.ACCESS_TOKEN_EX
            );

            resolve({
                errCode: 0,
                data: [newRefreshToken, accessToken],
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleRegister,
    handleActivate,
    handleLogin,
    handleNewToken,
};
