import axios from 'axios';

const instance = axios.create({
    baseURL : "https://rudaina-77e9c.firebaseio.com/"
});

export default instance;