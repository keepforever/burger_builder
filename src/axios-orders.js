import axios from 'axios';

// instances are helpful to partition external api/database calls
// for their specific purpouse.  Later we will create another instance
// aka baseURL to use for send authentication requests.

const instance = axios.create({
    baseURL: 'https://react-my-burger-963.firebaseio.com/'
});

export default instance
