import axios from 'axios';

export class ProductService {
    async getProducts() {
        try {
            const res = await axios.get('http://localhost:8000/products/')
            return res;
        } catch (error) {
            console.error('Error getting products:', error);
            return null;
        }
    } 

    async updateProduct(data) {
        try {
        const res = await axios.put(`http://localhost:8000/products/`, data);
        return res;
        } catch (error) {
            console.error('Error updating product:', error);
            return null;
        }
    }

    async createProduct (data) {
        try {
        const res = await axios.post('http://localhost:8000/products/', data);
        return res;
        } catch (error) {
            console.error('Error creating product:', error);
            return null;
        }
    }
}