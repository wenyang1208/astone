import axios from 'axios';
import api from '../api';

export class ProductService {

    async getProducts() {
        try {
            const res = await api.get('http://localhost:8000/products/')
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
        const name = data.name
        const description = data.description
        const categories = data.categories
        const color = data.color
        const sizes = data.sizes
        const currency = data.currency
        const price = data.price
        const stock = data.stock
        const rating = data.rating

        const categoryNames = categories.map(category => category.name).join(', ');
        // Default data structure
        const productData = {
            name: name,
            description: description,
            category: categoryNames,
            colors: color,
            sizes: sizes,
            currency: currency,
            price: price,
            stock: stock,
            rating: rating
        };

        console.log('Final data being sent:', productData);
        const res = await api.post('http://localhost:8000/products/', productData);
        return res;
        } catch (error) {
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