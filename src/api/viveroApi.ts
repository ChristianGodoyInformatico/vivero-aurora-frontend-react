import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { apiUrl } = getEnvVariables()

console.log('que obtengo de API_VIVERO_URL', apiUrl);

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