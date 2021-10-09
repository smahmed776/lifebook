import axios from 'axios';

export default axios.create({
    baseURL: "https://mern-lifebook-github.herokuapp.com/api/v1/auth/",
    withCredentials: true,
    credentials: "include"
})
