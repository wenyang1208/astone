import axios from 'axios';

export class UserService {
    async register(email, first_name, last_name, gender, phone_number, address, password) {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('gender', gender);
            formData.append('phone_number', phone_number);
            formData.append('address', address);
            formData.append('password', password);

            const res = await axios.post('http://localhost:8000/register/', formData);
            return res;
        } catch (error) {
            console.error('Error registering user:', error);
            return null;
        }
    }

    async login(email, password) {
        try {
            const formData = new FormData();
            formData.append('email', email);
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