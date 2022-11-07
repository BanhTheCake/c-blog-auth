import axios from './axios';
import { useQuery } from 'react-query';
import { URL_AUTH_LOGOUT } from '../utils/variables/url.variable';
import { setIsLogin } from '../app/auth.slice';
import { useDispatch } from 'react-redux'

const useLogout = (config) => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios({
                    method: 'get',
                    url: URL_AUTH_LOGOUT,
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

    const onSuccess = () => {
        localStorage.setItem('isLogin', false);
        dispatch(setIsLogin(false));
    };

    const onError = (err) => {
        console.log('logout', err);
    };

    const objectQuery = useQuery(['log out'], handleLogout, {
        enabled: false,
        onSuccess,
        onError,
        ...config,
    });
    return objectQuery;
};

export default useLogout;
