import axios from 'axios';


const BACKEND_URL = 'https://hybridapp-7d91a-default-rtdb.europe-west1.firebasedatabase.app';

export async function storeDetails(detailsData) {
    const response = await axios.post(
        BACKEND_URL + '/details.json'
        , detailsData
    );
    const id = response.data.name;
    console.log(response.data);
    return id;
}



export async function fetchDetails() {

    const response = await axios.get(BACKEND_URL + '/details.json');

    const details = [];

    for (const key in response.data) {
        const detailsObj = {
            id: key,
            detail: response.data[key].detail,
            description: response.data[key].description,
            date: new Date(response.data[key].date),

        };
        details.push(detailsObj);
    }
    return details;
}

export function updateDetails(id, detailData) {
    return axios.put(BACKEND_URL + `/details/${id}.json`, detailData);
}

export async function deleteDetails(id) {
    return axios.delete(BACKEND_URL + `/details/${id}.json`,);
}

