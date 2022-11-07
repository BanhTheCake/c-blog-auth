import axios from './axios';
import { useQuery } from 'react-query';
import { URL_ACTIVATED } from '../utils/variables/url.variable';

const useActivateAccount = (token, config) => {
    const handleActivated = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios({
                    method: 'get',
                    url: `${URL_ACTIVATED}/${token}`,
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
    const objectQuery = useQuery(
        ['Activated Account', token],
        handleActivated,
        { refetchOnWindowFocus: false, retry: 0, ...config }
    );
    return objectQuery;
};

export default useActivateAccount;
