import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useRefreshToken from './useRefreshToken';
import { axiosPrivate } from './axios';

const useAxiosPrivate = () => {
    const { refetch: refreshToken } = useRefreshToken({
        enabled: false,
    });
    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (res) => res,
            async function (err) {
                const config = err?.config;
                if (err?.response?.data?.message === 'jwt expired' && !config?.sent) 
                {
                    config.sent = true;
                    const { data: resData } = await refreshToken();
                    const newAccessToken = resData.data.accessToken;
                    /*  Must has this line err.config.headers = { ...err.config.headers } 
                        (https://stackoverflow.com/questions/74166648/setrequestheader-fails-to-execute-with-source-code-as-a-header-value-axios-an/74308583#74308583)
                        => if not it's will not send request (get) after refreshToken
                    */
                    config.headers = { ...config.headers };

                    // Set New Access Token for headers
                    config.headers[
                        'Authorization'
                    ] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(config);
                }
                return Promise.reject(err);
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [refreshToken, accessToken]);

    return axiosPrivate;
};

export default useAxiosPrivate;
