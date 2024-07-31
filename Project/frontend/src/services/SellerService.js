import axios from 'axios';

export class SellerService{

    async registerSeller(data){
        try{
            const res = await axios.post('http://localhost:8000/seller/register/',data);
            return res;
        }catch(error){
            console.error('Error registering seller:', error);
            return null;
        }
    }

    async loginSeller(data){
        try{
            const res = await axios.post('http://localhost:8000/sellers/login/',data);
            return res;
        }catch(error){
            console.error('Error logging in seller:', error);
            return null;
        }
    }

    async getSellerById(id){
        try{
            const res = await axios.get(`http://localhost:8000/sellers/${id}`);
            return res;
        }catch(error){
            console.error('Error getting seller:', error);
            return null;
        }
    }
}