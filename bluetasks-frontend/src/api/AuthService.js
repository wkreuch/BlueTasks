import axios from 'axios';
import { AUTH_ENDPOINT, JWT_TOKEN_NAME } from '../constants';

class AuthService {
    login(username, password, onLogin ) {
        axios.post(`${AUTH_ENDPOINT}/login`, {username: username, password: password})
             .then(response => {
                const jwtToken = response.headers['authorization'].replace("Bearer ", "");
                sessionStorage.setItem(JWT_TOKEN_NAME, jwtToken);
                onLogin(true);
             })
             .catch(error => {
                console.log(error);
                onLogin(false);
             });
    }

    getJWTToken() {
        return sessionStorage.getItem(JWT_TOKEN_NAME);
    }

    isAuthenticated() {
        return this.getJWTToken() != null;
    }

}

export default new AuthService();
