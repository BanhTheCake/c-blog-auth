import axios from './axios';
import { useQuery } from 'react-query';
import { URL_FORGOT_PASSWORD } from '../utils/variables/url.variable';

const useVerifyForgotPass = (token, config) => {
    const handleVerify = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios({
                    method: 'get',
                    url: `${URL_FORGOT_PASSWORD}/${token}`,
                });
                const resData = res.data;
                if (resData.errCode !== 0) {
                    return reject(resData);
                }
                resolve(resData);
            } catch (error) {
                reject(error?.response?.data);
            }
        });
    };
    const objectQuery = useQuery(['Verify Forgot Token', token], handleVerify, {
        enabled: !!token,
        refetchOnWindowFocus: false,
        retry: 0,
        ...config,
    });
    return objectQuery;
};

export default useVerifyForgotPass;
