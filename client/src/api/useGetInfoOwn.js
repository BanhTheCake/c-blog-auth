import { useQuery } from 'react-query';
import { URL_GET_INFO } from '../utils/variables/url.variable';
import { useDispatch } from 'react-redux'
import useAxiosPrivate from './useAxiosPrivate';

const useGetInfoOwn = (config) => {

    const axiosPrivate = useAxiosPrivate()

    const handleGetInfo = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axiosPrivate({
                    method: 'get',
                    url: URL_GET_INFO,
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

    const objectQuery = useQuery(['Get Info Owner'], handleGetInfo, {
        ...config
    });
    return objectQuery
};

export default useGetInfoOwn;
