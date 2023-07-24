import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const KEY = '38369214-2131a54870ec208cdae419196';

async function getData(userRequest, page) {
    
    const response = await axios.get(`${baseURL}?key=${KEY}&q=${userRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`);
    const data = await response.data;
    return data;
}

export { getData };