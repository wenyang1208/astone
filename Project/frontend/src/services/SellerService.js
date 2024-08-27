import axios from 'axios';

export class SellerService {
    async registerSeller(data) {
        try {
            const res = await axios.post('http://localhost:8000/seller/register/', data);
            return res;
        } catch (error) {
            console.error('Error registering seller:', error);
            return null;
        }
    }

    async loginSeller(data) {
        try {
            const res = await axios.post('http://localhost:8000/seller/token/', data);
            return res;
        } catch (error) {
            console.log(data);
            console.error('Error logging in seller:', error.response?.data || error.message);
            return null;
        }
    }

    async getSellerById(id) {
        try {
            const res = await axios.get(`http://localhost:8000/seller/${id}/`);
            return res;
        } catch (error) {
            console.error('Error getting seller:', error);
            return null;
        }
    }

    async editSeller(id, sellerData) {
        try {
            console.log('Sending PUT request to:', `http://localhost:8000/seller/${id}/`);
            console.log('Data:', sellerData);
            const res = await axios.put(`http://localhost:8000/seller/${id}/`, sellerData);
            return res;
        } catch (error) {
            console.error('Error editing seller:', error.response?.data || error.message);
            if (error.response && error.response.data && error.response.data.shop_name) {
                // Return specific error message for shop_name conflict
                return { error: 'shop_name_conflict', message: error.response.data.shop_name };
            }
            throw error;
        }
    }
}