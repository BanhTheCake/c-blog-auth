import axios, { axiosClient } from './axios';
import { useMutation, useQuery } from 'react-query';
import { URL_GET_INFO, URL_TEST } from '../utils/variables/url.variable';
import { useDispatch } from 'react-redux'
import { setIsLogin } from '../app/auth.slice';
import useAxiosPrivate from './useAxiosPrivate';

const useTest = (config) => {

    // const axiosPrivate = useAxiosPrivate()

    const handleTest = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axiosClient({
                    method: 'get',
                    url: URL_TEST,
                })
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    };

    // const objectQuery = useQuery(['test'], handleTest, {
    //     refetchOnWindowFocus: false,
    //     refetchOnReconnect: false,
    //     refetchOnMount: false,
    //     staleTime: 0,
    //     cacheTime: 0,
    //     retry: 0,
    //     ...config
    // });
    return handleTest
};

export default useTest;
