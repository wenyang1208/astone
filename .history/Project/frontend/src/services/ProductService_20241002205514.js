import axios from 'axios';
import api from '../api';
import { getInitColorSchemeScript } from '@mui/material';

export class ProductService {

    async getAuthProducts() {
        try {
            const res = await api.get('http://localhost:8000/auth_products/')
            return res;
        } catch (error) {
            console.error('Error getting products:', error);
            return null;
        }
    } 

    async getProducts() {
        try {
            const res = await axios.get('http://localhost:8000/products/')
            return res;
        } catch (error) {
            console.error('Error getting products:', error);
            return null;
        }
    } 

    async getProductById(id) {
        try {
            const res = await axios.get(`http://localhost:8000/products/${id}/`);
            return res;
        } catch (error) {
            console.error(`Error getting product ${id}:`, error);
            return null;
        }
    }

    async editProduct(id, productData) {
        return axios.put(`http://localhost:8000/products/${id}/edit`, productData);
    }

    async createProduct (data) {
        try {
            const { name, description, categories, colors, sizes, currency, price, stock, rating, brand, gender, images } = data;
    
            const categoryNames = categories.map(category => category.name);
    
            // Create FormData object
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('category', categoryNames);
            formData.append('colors', JSON.stringify(colors));
            formData.append('sizes', sizes);
            formData.append('currency', currency);
            formData.append('price', price);
            formData.append('stock', stock);
            formData.append('rating', rating);
            formData.append('brand', brand);
            formData.append('gender', gender);

            
            console.log(images)
            // Append images to FormData
            images.forEach((image, index) => {
                formData.append('images', image);
            });
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }

            const res = await api.post('http://localhost:8000/auth_products/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return res;
        }
catch (error) {
                console.error('Error creating product:', error);
                return null;
            }
        }
    

    async deleteProduct(productId) {
        try {
            const res = await axios.delete(`http://localhost:8000/products/${productId}/`);
            
            return res;
        } catch (error) {
            console.error('Error deleting product:', error);
            return null;
        }
    }

}