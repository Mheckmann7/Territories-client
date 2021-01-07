function setToken(token) {
    if (token) {
        localStorage.setItem('token', token)
    } else {
        removeToken();
    }
}

function removeToken() {
    localStorage.removeItem('token');
}

function getUserFromToken() {

}

function getToken() {

}

export {
    setToken,
    removeToken,
    getUserFromToken,
    getToken,
}