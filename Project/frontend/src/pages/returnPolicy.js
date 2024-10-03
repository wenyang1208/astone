import React from 'react';
import MyAppBar2 from '../components/appBar2'; // Importing MyAppBar2
import Footer from '../components/footer2'; // Importing footer2  
 
const styles = 
{
    header:
    {
        top: '50px', 
        position: 'relative', 
        padding: '20px',
        fontSize: '15px'
    },

    paragraph:
    {
        marginTop: '20px',
        marginBottom: '20px',
    },

    fonts:
    {
        fontSize: '10px',
        fontColor: '#C0C0C0',
    },

    pad:
    {
        top: '5px',
        padding: '20px',
        bottom: '5px',
    }

}

const ReturnPolicy = () => {

    return (
        <div style = {styles.header}>
             <MyAppBar2/>
             <h1>Astone Return Policy</h1>
             <p>
                1. Online Purchase: return within 30 days of receiving the product(s) ordered from the Astone online. <br/>
                
                <div style = {styles.pad}>
                Example: If you received the product(s) on 1st May, please return the product(s) by shipping it to our warehouse by 30th May. <br/>
                </div>
           
                <div style = {styles.paragraph}>
                2. Only product(s) purchased in Malaysia can be exchanged or refunded (in the currency of Ringgit Malaysia), provided the product(s) is returned in original condition with original product packaging, tags and labels.<br/>
                </div>
                
                <div style = {styles.paragraph}>
                3. The amount refunded will be based on the net amount i.e. paid price for the product(s) as indicated on the receipt. <br/>
                </div>

                <div style = {styles.paragraph}>
                4. Delivery charges paid in the original order are non-refundable. <br/>
                </div>

                <div style = {styles.paragraph}>
                5. Astone Malaysia reserves the right to reject requests for returns where (i) such requests are deemed habitual in our sole and absolute discretion; and/or (ii) there is suspicion of purchase for the purposes of resale.<br/>
                </div>

                <div style = {styles.paragraph}>
                6. Astone Malaysia reserves the right for final decision and to amend this policy at any time without prior notice. 
                </div>
             </p>

             <Footer/>
        </div>

    )

}

export default ReturnPolicy;