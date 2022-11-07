import axios from './axios';
import { useMutation } from 'react-query';
import { URL_AUTH_LOGIN } from '../utils/variables/url.variable';
import { useDispatch } from 'react-redux'
import { setIsLogin } from '../app/auth.slice';

const useLogin = (config) => {

    const dispatch = useDispatch()

    const handleLogin = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios({
                    method: 'post',
                    url: URL_AUTH_LOGIN,
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

    const onSuccess = () => {
        localStorage.setItem('isLogin', true)
        dispatch(setIsLogin(true))
    }

    const objectQuery = useMutation(handleLogin, { onSuccess, ...config });
    return objectQuery
};

export default useLogin;
