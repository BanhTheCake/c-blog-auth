import axios from './axios';
import { useMutation } from 'react-query';
import { URL_RESET_PASSWORD } from '../utils/variables/url.variable';
import { useDispatch } from 'react-redux'
import { setIsLogin } from '../app/auth.slice';

const useResetForgotPass = (config) => {

    const dispatch = useDispatch()

    const handleReset = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios({
                    method: 'post',
                    url: URL_RESET_PASSWORD,
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

    const objectQuery = useMutation(handleReset, { ...config });
    return objectQuery
};

export default useResetForgotPass;
