import React from 'react';
import MyAppBar2 from '../components/appBar2'; // Importing MyAppBar2
import Footer from '../components/footer2'; // Importing footer2  

const supportCategories = [
  { id: 1, title: "Account Issues", description: "Help with logging in, resetting passwords, and managing your account." },
  { id: 2, title: "Order Help", description: "Track your orders, return items, or cancel orders." },
  { id: 3, title: "Payment Problems", description: "Issues with payments, refunds, or applying discount codes." },
];

const styles = {
  header: {
    top: '50px',
    position: 'relative',
    padding: '20px',
    fontSize: '15px',
  },
  paragraph: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  fonts: {
    fontSize: '10px',
    color: '#C0C0C0', // Corrected property
  },
  pad: {
    top: '5px',
    padding: '20px',
    bottom: '5px',
  },
  formContainer: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  formField: {
    display: 'block',
    marginBottom: '10px',
  },
  submitButton: {
    marginTop: '10px',
    padding: '10px 20px',
  },
};

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <label style={styles.formField}>Name:</label>
        <input type="text" name="name" required style={styles.formField} />

        <label style={styles.formField}>Email:</label>
        <input type="email" name="email" required style={styles.formField} />

        <label style={styles.formField}>Message:</label>
        <textarea name="message" rows="5" required style={styles.formField} />

        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

const SupportContact = () => (
  <div>
    <h2 style={styles.header}>Need Immediate Help?</h2>
    <p style={styles.paragraph}>
      Contact us at our support hotline: <strong>800-123-4567</strong>
    </p>
    <p style={styles.paragraph}>
      Or click on the live chat button to speak to an agent now.
    </p>
  </div>
);

const ContactInfo = () => (
  <div>
    <h2 style={styles.header}>Contact Us</h2>
    <p style={styles.paragraph}>Email: support@astone.com</p>
    <p style={styles.paragraph}>Phone: 800-123-4567</p>
    <p style={styles.paragraph}>Support hours: Monday-Friday, 9 AM - 6 PM</p>
  </div>
);

const Support = () => {
  return (
    <div style={styles.header}>
      <MyAppBar2 /> {/* Include the header component */}
      <h1>Support</h1>
      <p>This is the support page where you can find answers or contact us for further help.</p>

      <h2>Support Categories</h2>
      <ul>
        {supportCategories.map((category) => (
          <li key={category.id}>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </li>
        ))}
      </ul>

      <h2>Submit a Request</h2>
      <ContactForm />

      <SupportContact />
      <ContactInfo />

      <Footer /> {/* Include the footer component */}
    </div>
  );
};

export default Support;
