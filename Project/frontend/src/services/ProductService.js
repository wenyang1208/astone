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

    // async updateProduct(data) {
    //     try {
    //     const res = await axios.put('http://localhost:8000/products/list/',data);
    //     return res;
    //     } catch (error) {
    //         console.error('Error updating product:', error);
    //         return null;
    //     }
    // }

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

    async createProduct(data) {
        try {
            const { name, description, categories, color, sizes, currency, price, stock, rating, images } = data;
    
            const categoryNames = categories.map(category => category.name);
    
            // Create FormData object
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('category', categoryNames);
            formData.append('colors', color);
            formData.append('sizes', sizes);
            formData.append('currency', currency);
            formData.append('price', price);
            formData.append('stock', stock);
            formData.append('rating', rating);
            
            console.log(images)
            // Append images to FormData
            images.forEach((image, index) => {
                formData.append('images', image);
            });
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
    
            const res = await axios.post('http://localhost:8000/products/create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
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