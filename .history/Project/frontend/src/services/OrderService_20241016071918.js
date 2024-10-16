import axios from 'axios';

export class OrderService {
    async addToCart(productId, size, color) {
        try {
            const formData = new FormData();
            formData.append('size', size);
            formData.append('color', color);

            const res = await axios.post(`http://localhost:8000/add_to_cart/${productId}/`, formData);
            return res;
        } catch (error) {
            console.error(`Error adding product ${productId} to cart:`, error);
            return null;
        }
    }

    async placeOrder(address) {
        try {
            const formData = new FormData();
            formData.append('address', address);
            const res = await axios.post('http://localhost:8000/place_order/', formData);
            return res;
        } catch (error) {
            console.error('Error placing order:', error);
            return null;
        }
    }

    async updateCartItem(productId, size, color, quantity) {
        try {
            const formData = new FormData();
            formData.append('size', size);
            formData.append('color', color);
            formData.append('quantity', quantity);

            const res = await axios.post(`http://localhost:8000/update_cart/${productId}/`, formData);
            return res;
        } catch (error) {
            console.error(`Error updating cart item ${productId}:`, error);
            return null;
        }
    }

    async getCart() {
        try {
            const res = await axios.get('http://localhost:8000/cart/');
            return res;
        } catch (error) {
            console.error('Error getting cart:', error);
            return null;
        }
    }

    async getOrderDetails(orderId) {
        try {
            const res = await axios.get(`http://localhost:8000/order/${orderId}/`);
            return res;
        } catch (error) {
            console.error(`Error getting order ${orderId}:`, error);
            return null;
        }
    }

    async updateOrderDetails(orderId, data) {
        try {
            const res = await axios.put(`http://localhost:8000/order/${orderId}/edit`);
            return res;
        } catch (error) {
            console.error(`Error getting order ${orderId}:`, error);
            return null;
        }
    }
}
