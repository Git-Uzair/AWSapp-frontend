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
class Ec2Service {

    getInstances(name, region) {
        let params = new URLSearchParams([['client_name', name], ['region', region]])
        return api.get('/ec2', { params }).then(response => {
            if (response.status === 200) {
                return response.data;
            }
            else {
                
                return []
            }
        })
    }

    stopInstance(client_name, region, instance_id) {

        return api.post('/ec2', { client_name, instance_id, action: 'stop', region }).then(response => {
            if (response.status === 200) {
                return response
            }
        })

    }

    startInstance(client_name, region, instance_id) {

        return api.post('/ec2', { client_name, instance_id, action: 'start', region }).then(response => {
            if (response.status === 200) {
                return response
            }
        })

    }

    restartInstance(client_name, region, instance_id) {

        return api.post('/ec2', { client_name, instance_id, action: 'restart', region }).then(response => {
            if (response.status === 200) {
                return response
            }
        })

    }


}

export default new Ec2Service();