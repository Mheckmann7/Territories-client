import { setToken } from './tokenService';
const BASE_URL = 'http://localhost:3001/api/users'; 

function signup(user) {
    return fetch(BASE_URL + '/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (response.ok) return response.json();
        throw new Error('Email already taken');
    }).then(data => setToken(data.token));
}

function login(credentials) {

}

function logout() {

}

function getUser() {

}

export {
    signup,
    login,
    logout,
    getUser 
};