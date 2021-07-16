import React from 'react';

class AuthService {

    login(name, email,imageUrl) {
        const data={
            name,
            email,
            imageUrl
        }
        localStorage.setItem('currentUser', JSON.stringify(data));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));;
    }
}

export default new AuthService();