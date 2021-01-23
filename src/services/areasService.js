//holds URL to api 
const BASE_URL = 'http://localhost:3001/api';


//export function for making AJAX requests
export function fetchAreas() {
    //const url = userName ? BASE_URL + '/areas?username=' + userName : BASE_URL + '/pla'
    return fetch(BASE_URL + '/areas').then(res => res.json()); 

}

export function addAreas(markers) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(markers)
    };
    return fetch(BASE_URL + '/areas', options).then(res => res.json());
  
}