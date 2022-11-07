import axios from './axios';
import { useMutation } from 'react-query';
import { URL_AUTH_REGISTER } from '../utils/variables/url.variable';

const useRegister = (config) => {
    const handleRegister = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios({
                    method: 'post',
                    url: URL_AUTH_REGISTER,
                    data: data
                })
                const resData = res.data
                if (resData.errCode !== 0) {
                    return reject(resData)
                }
                resolve(resData);
            } catch (error) {
                reject(error?.response?.data);
            }
        });
    };
    const objectQuery = useMutation(handleRegister, { ...config });
    return objectQuery
};

export default useRegister;
