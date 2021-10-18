import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000'
let token = ''
if(localStorage.getItem('user'))
{
    token = JSON.parse(localStorage.getItem('user')).token
}
const api = axios.create({
    baseURL: BASE_URL,
    headers: {'Authorization': 'Bearer '+token}
    
})
class ClientService {
    getAllClients() {
        return api.get('/clients').then((response) => {
            return response.data.clients
        })
    }

    updateClient(client) {
        return api.put('/client/' + client._id, client).then((response) => {
            if (response.status === 201) {
                return [response, client]
            }
            else {
                return null
            }
        })
    }

    getClient(id) {
        return api.get('/client/' + id).then((response) => {
            if (response.status === 200) {
                return response.data
            }
            else {
                return null
            }
        })
    }
    AddClient(client) {
        return api.post('/client',client).then((response) => {
            if (response.status === 201) {
                
                return response.data
            }
            else {
                return null
            }
        })
    }

    DeleteClient(client) {
        return api.put('/client/' + client._id, client).then((response) => {
            if (response.status === 201) {
                return [response, client]
            }
            else {
                return null
            }
        })
    }
}

export default new ClientService();