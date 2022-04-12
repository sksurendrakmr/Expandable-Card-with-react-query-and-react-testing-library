import axios from 'axios';
import { useQuery } from 'react-query';
import { queryKeys } from '../../../config/QueryKeys';
import { Urls } from '../../../config/Urls';

const fetchUsers = () => {
    return axios.get(Urls.USERS)
}


export const useUser = () => {
    return useQuery(queryKeys.users,fetchUsers);

}