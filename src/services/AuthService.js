import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000'
const api = axios.create({
    baseURL: BASE_URL
   
})
class AuthService {
    login(data) {
        return api.post('/login', data).then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data))
                localStorage.setItem("client", JSON.stringify({ name: "uzair-gosaas", region: "us-west-1", _id: '5f5a95f066614cb985836eea' }))
            }
            return response;
        })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    logOut() {
        localStorage.clear()
    }
}

export default new AuthService();