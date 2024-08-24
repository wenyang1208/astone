import axios from 'axios';

export class UserService {
    async register(username, email, password) {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);

            const res = await axios.post('http://localhost:8000/register/', formData);
            return res;
        } catch (error) {
            console.error('Error registering user:', error);
            return null;
        }
    }

    async login(username, password) {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const res = await axios.post('http://localhost:8000/login/', formData);
            return res;
        } catch (error) {
            console.error('Error logging in user:', error);
            return null;
        }
    }

    async getUserDetails(userId) {
        try {
            const res = await axios.get(`http://localhost:8000/user/${userId}/`);
            return res;
        } catch (error) {
            console.error(`Error getting user details for user ${userId}:`, error);
            return null;
        }
    }
}