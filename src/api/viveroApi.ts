import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { apiUrl } = getEnvVariables()

const viveroApi = axios.create({
    baseURL: apiUrl
});

// Todo: configurar interceptores
viveroApi.interceptors.request.use( (config: any) => { 
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})


export default viveroApi;