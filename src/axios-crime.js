import axios from 'axios';

const instance = axios.create({
    baseURL: `https://data.milwaukee.gov/api/3/action/datastore_search?resource_id=87843297-a6fa-46d4-ba5d-cb342fb2d3bb`
});

export default instance;