import axios from "axios"
import { useQuery } from "react-query"
import { queryKeys } from "../../../config/QueryKeys"
import { Urls } from "../../../config/Urls"

const fetchPhoto = () => {
    return axios.get(`${Urls.PHOTOS}`);
}

export const usePhoto = () => {
    return useQuery([queryKeys.photos],()=>fetchPhoto());

}