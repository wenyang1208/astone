import axios from 'axios';

export class OrderService {
    async addToCart(productId, size, color, email) {
        try {
            const formData = new FormData();
            formData.append('size', size);
            formData.append('color', color);
            formData.append('email', email);

            const res = await axios.post(`http://localhost:8000/add_to_cart/${productId}/`, formData);
            return res;
        } catch (error) {
            console.error(`Error adding product ${productId} to cart:`, error);
            return null;
        }
    }

    async placeOrder(address, email) {
        try {
            const formData = new FormData();
            formData.append('address', address);
            formData.append('email', email);
            const res = await axios.post('http://localhost:8000/place_order/', formData);
            return res;
        } catch (error) {
            console.error('Error placing order:', error);
            return null;
        }
    }

    async updateCartItem(productId, size, color, quantity, email) {
        try {
            const formData = new FormData();
            formData.append('size', size);
            formData.append('color', color);
            formData.append('quantity', quantity);
            formData.append('email', email);

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

    async updateOrderDetails(orderItemId, data) {
        try {
            const res = await axios.patch(`http://localhost:8000/order/${orderItemId}/edit`,data);
            console.log(res.data);
            return res;
        } catch (error) {
            console.error(`Error getting order ${orderItemId}:`, error);
            return null;
        }
    }
}
