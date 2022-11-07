import axios from './axios';
import { useQuery } from 'react-query';
import { URL_AUTH_RF_TOKEN } from '../utils/variables/url.variable';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken } from '../app/auth.slice';
import useLogout from './useLogout';

const useRefreshToken = (config, type = 'refresh') => {
    const isLogin = useSelector((state) => state.auth.isLogin);
    const dispatch = useDispatch();

    const { refetch: handleLogout } = useLogout();

    const handleRefresh = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios({
                    method: 'get',
                    url: URL_AUTH_RF_TOKEN,
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

    let finalConfig = {};
    let queryKey = [];

    if (type === 'check') {
        finalConfig = {
            enabled: isLogin,
            onSuccess: (resData) => {
                dispatch(setAccessToken(resData.data.accessToken));
            },
            onError: (err) => {
                handleLogout();
            },
            refetchOnWindowFocus: false,
            retry: 0,
            staleTime: 0,
            cacheTime: 0,
            ...config,
        };
        queryKey = ['Check valid user', isLogin];
    }

    if (type === 'refresh') {
        finalConfig = {
            onSuccess: (resData) => {
                dispatch(setAccessToken(resData.data.accessToken))
            },
            onError: (err) => {
                handleLogout();
            },
            refetchOnWindowFocus: false,
            retry: 0,
            staleTime: 0,
            cacheTime: 0,
            ...config,
        };
        queryKey = ['Get Refresh Token'];
    }

    const objectQuery = useQuery(queryKey, handleRefresh, finalConfig);

    return { ...objectQuery, isLogin };
};

export default useRefreshToken;