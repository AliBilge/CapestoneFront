import axios, { AxiosResponse } from 'axios';
import { ManageableItem } from '../models/ManageableItem';

axios.defaults.baseURL = "https://localhost:44396/api" // Inject your localhost address.

const responseBody = (response: AxiosResponse) => response.data;

const ManageableApis = {
    getList: (): Promise<ManageableItem[]> =>
    axios.get('/manageable').then(responseBody),
    post: (manageableItem: ManageableItem) => axios.post(`/manageable`, manageableItem),
    patch: (id: string) => axios.patch(`/manageable/${id}`).then(responseBody),
    put: (manageableItem: ManageableItem) => axios.put(`/manageable/${manageableItem.id}`, manageableItem),
    delete: (id: string) => axios.delete(`/manageable/${id}`).then(responseBody)
}

export default {
    ManageableApis
}