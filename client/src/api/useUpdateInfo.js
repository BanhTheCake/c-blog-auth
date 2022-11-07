import axios from './axios';
import { useMutation } from 'react-query';
import { URL_UPDATE_INFO } from '../utils/variables/url.variable';
import useAxiosPrivate from './useAxiosPrivate';

const useUpdateInfo = (config) => {

    const axiosPrivate = useAxiosPrivate()

    const handleUpdate = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axiosPrivate({
                    method: 'put',
                    url: URL_UPDATE_INFO,
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
    const objectQuery = useMutation(handleUpdate, { ...config });
    return objectQuery
};

export default useUpdateInfo;
