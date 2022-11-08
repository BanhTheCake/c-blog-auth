import { axiosClient } from './axios';
import { useQuery } from 'react-query';
import { URL_TEST } from '../utils/variables/url.variable';

const useTest = (config) => {

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

    const objectQuery = useQuery(['test'], handleTest, {
        staleTime: 0,
        cacheTime: 0,
        ...config
    });
    return objectQuery
};

export default useTest;
