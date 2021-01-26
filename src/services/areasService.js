
const BASE_URL = 'http://localhost:3001/api';



export function fetchAreas() {
    return fetch(BASE_URL + '/areas').then(res => res.json()); 

}

export function fetchPlayerAreas(username) {
    const url = username ? BASE_URL + '/areas/playerAreas?username=' + username : BASE_URL + '/areas/playerAreas'
    return fetch(url).then(res => res.json()); 

}

export function fetchScores(username) {
    const url = username ? BASE_URL + '/areas/scores?username=' + username : BASE_URL + '/areas/scores'
    return fetch(url).then(res => res.json()); 

}

export function addAreas(playersMarkers, username) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(playersMarkers)
    };
    return fetch(BASE_URL + '/areas?username=' + username, options).then(res => res.json());
   
}


