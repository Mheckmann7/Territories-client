//holds URL to api 
const BASE_URL = 'http://localhost:3001/api';



export function fetchAreas(username) { //(username)
    //const url = username ? BASE_URL + '/areas?username=' + username : BASE_URL + '/areas'
    return fetch(BASE_URL + '/areas').then(res => res.json()); 

}

export function fetchPlayerAreas(username) {
    const url = username ? BASE_URL + '/areas/playerAreas?username=' + username : BASE_URL + '/areas/playerAreas'
    return fetch(url).then(res => res.json()); 

}

export function addAreas(markers , username) { //(, username)
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(markers)
    };
    return fetch(BASE_URL + '/areas?username=' + username, options).then(res => res.json());
    //return fetch(BASE_URL + '/areas', options).then(res => res.json()); 
}