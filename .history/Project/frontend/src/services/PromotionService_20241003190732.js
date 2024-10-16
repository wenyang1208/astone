import axios from 'axios';

export class PromotionService {

    async getPromotions() {
        try {
            const res = await axios.get(`https://astone-backend-app.onrender.com/promotions/`);
            return res;
        } catch (error) {
            console.error('Error getting product:', error);
            return null;
        }
    }


    async createPromotion (data) {
    try {
        // Default data structure
        const promotionData = {
            product: data.product_id,
            discount_percentage: data.discountPercentage,
            start_date: data.startDate,
            end_date: data.endDate,
            is_active: true
        
        };
        console.log('Final data being sent:', promotionData);
        const res = await axios.post('https://astone-backend-app.onrender.com/promotions/', promotionData);
        return res;
        } catch (error) {
            console.error('Error creating product:', error);
            return null;
        }
    }

    async endPromotion (id) {
        try {
            const res = await axios.delete(`https://astone-backend-app.onrender.com/promotions/${id}/delete/`);
            console.log(id);
            return res;
        } catch (error) {
            console.error('Error ending promotion:', error);
            return null;
        }
    }


}