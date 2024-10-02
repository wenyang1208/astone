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

            const res = await axios.post('https://astone-backend-app.onrender.com/register/', formData);
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

    async get_user_details(email) {
        try {
            const res = await axios.get(`http://localhost:8000/user/${email}/`);
            return res;
        } catch (error) {
            console.error(`Error getting user details for user ${email}:`, error);
            return null;
        }
    }

    async updateUser(email, userDetails) {
        try {
            const res = await axios.put(`http://localhost:8000/userupdate/${email}/`, userDetails);
            return res;
        } catch (error) {
            console.error(`Error updating user details for user ${email}:`, error.response?.data || error.message);
            return null;
        }
    }

    async requestPasswordReset(data)
    {
        try {
            const res = await axios.post('http://localhost:8000/forgot-password/', data);
            return res;
        } catch (error) {
            console.log(data);
            console.error('Error in requesting seller link:', error.response?.data || error.message);
            return null;
        }
    }

    async changePassword(user_id, data)
    {
        try {
            console.log(data);
            const res = await axios.put(`http://localhost:8000/change-password/${user_id}/`, data);
            return res;
        } catch (error) {
            console.log(data);
            console.error('Error in requesting seller link:', error.response?.data || error.message);
            return null;
        }
    }
}