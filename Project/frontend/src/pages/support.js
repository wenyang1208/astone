import React from 'react';

const supportCategories = [
  { id: 1, title: "Account Issues", description: "Help with logging in, resetting passwords, and managing your account." },
  { id: 2, title: "Order Help", description: "Track your orders, return items, or cancel orders." },
  { id: 3, title: "Payment Problems", description: "Issues with payments, refunds, or applying discount codes." },
];


const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" required />

      <label>Email:</label>
      <input type="email" name="email" required />

      <label>Message:</label>
      <textarea name="message" rows="5" required />

      <button type="submit">Submit</button>
    </form>
  );
};



const Support = () => {
  return (
    <div>
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
    </div>
  );
};

export default Support;

