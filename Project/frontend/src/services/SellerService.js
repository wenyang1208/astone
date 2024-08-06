import axios from 'axios';

export class SellerService {
  async registerSeller(data) {
    try {
      const res = await axios.post('http://localhost:8000/sellers/', data);
      return res.data;
    } catch (error) {
      console.error('Error registering seller:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error.message;
    }
  }

  async loginSeller(data) {
    try {
      const res = await axios.post('http://localhost:8000/sellers/login/', data);
      return res.data;
    } catch (error) {
      console.error('Error logging in seller:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error.message;
    }
  }

  async getSellerById(id) {
    try {
      const res = await axios.get(`http://localhost:8000/sellers/${id}`);
      return res.data;
    } catch (error) {
      console.error('Error getting seller:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error.message;
    }
  }

  async updateSellerProfile(id, data) {
    try {
      const res = await axios.put(`http://localhost:8000/sellers/${id}`, data);
      return res.data;
    } catch (error) {
      console.error('Error updating seller:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error.message;
    }
  }

  async deleteSellerAccount(id) {
    try {
      const res = await axios.delete(`http://localhost:8000/sellers/${id}`);
      return res.data;
    } catch (error) {
      console.error('Error deleting seller account:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error.message;
    }
  }
}
 