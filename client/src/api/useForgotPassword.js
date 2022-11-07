import axios from './axios';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux'
import { URL_FORGOT_PASSWORD } from '../utils/variables/url.variable';

const useForgotPassword = (config) => {

    const dispatch = useDispatch()

    const handleForgotPassword = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios({
                    method: 'post',
                    url: URL_FORGOT_PASSWORD,
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

    const objectQuery = useMutation(handleForgotPassword, { ...config });
    return objectQuery
};

export default useForgotPassword;
