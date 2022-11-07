import axios from './axios';
import { useMutation } from 'react-query';
import { URL_SEND_ACCESS_TOKEN_GOOGLE } from '../utils/variables/url.variable';
import { useDispatch } from 'react-redux'
import { setIsLogin } from '../app/auth.slice';

const useSendAccessTokenGoogle = (config) => {

    const dispatch = useDispatch()

    const handleSendToken = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios({
                    method: 'post',
                    url: URL_SEND_ACCESS_TOKEN_GOOGLE,
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

    const onSuccess = (data) => {
        localStorage.setItem('isLogin', true)
        dispatch(setIsLogin(true))
    }

    const objectQuery = useMutation(handleSendToken, { onSuccess, ...config });
    return objectQuery
};

export default useSendAccessTokenGoogle;
