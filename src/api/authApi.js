import axios from "axios";

const API = axios.create({
    baseURL: 'https://job-port-backend.onrender.com/api/auth',
})

export const registerUser=(data)=>{

    return API.post('/register', data)

}

export const loginUser=(data)=>{
    return API.post('/login', data)
}

export const Forgotpassword=(data)=>{
    return API.post('/forgot-password', data)
}
