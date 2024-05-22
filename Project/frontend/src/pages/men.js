import React from 'react';


const Men = () => {
  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.filter}>
          <h2 style={styles.heading}>Filter</h2>
          
          <div style={styles.section}>
            <h3 style={styles.subHeading}>Brands</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <input type="checkbox" id="uniqlo" style={styles.checkbox} />
                <label htmlFor="uniqlo">Uniqlo</label>
              </li>
              <li style={styles.listItem}>
                <input type="checkbox" id="pullbear" style={styles.checkbox} />
                <label htmlFor="pullbear">Pull & Bear</label>
              </li>
              <li style={styles.listItem}>
                <input type="checkbox" id="hm" style={styles.checkbox} />
                <label htmlFor="hm">H&M</label>
              </li>
            </ul>
          </div>
          
          <div style={styles.section}>
            <h3 style={styles.subHeading}>Type</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <input type="checkbox" id="shirts" style={styles.checkbox} />
                <label htmlFor="shirts">Shirts</label>
              </li>
              <li style={styles.listItem}>
                <input type="checkbox" id="pants" style={styles.checkbox} />
                <label htmlFor="pants">Pants</label>
              </li>
              <li style={styles.listItem}>
                <input type="checkbox" id="shorts" style={styles.checkbox} />
                <label htmlFor="shorts">Shorts</label>
              </li>
              <li style={styles.listItem}>
                <input type="checkbox" id="shoes" style={styles.checkbox} />
                <label htmlFor="shoes">Shoes</label>
              </li>
              <li style={styles.listItem}>
                <input type="checkbox" id="accessories" style={styles.checkbox} />
                <label htmlFor="accessories">Accessories</label>
              </li>
            </ul>
          </div>
          
          <div style={styles.section}>
            <h3 style={styles.subHeading}>Price</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <input type="checkbox" id="price1" style={styles.checkbox} />
                <label htmlFor="price1">$1-50</label>
              </li>
              <li style={styles.listItem}>
                <input type="checkbox" id="price2" style={styles.checkbox} />
                <label htmlFor="price2">$50-100</label>
              </li>
            </ul>
          </div>
          
          <div style={styles.section}>
            <h3 style={styles.subHeading}>Seller Location</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <input type="checkbox" id="selangor" style={styles.checkbox} />
                <label htmlFor="selangor">Selangor</label>
              </li>
              <li style={styles.listItem}>
                <input type="checkbox" id="sabah" style={styles.checkbox} />
                <label htmlFor="sabah">Sabah</label>
              </li>
              <li style={styles.listItem}>
                <input type="checkbox" id="kualalumpur" style={styles.checkbox} />
                <label htmlFor="kualalumpur">Kuala Lumpur</label>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <main style={styles.content}>
        <h1>Men</h1>
        <p>This is the page for men's products.</p>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#ffffff',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    margin: '20px',
  },
  filter: {
    marginTop: '0',
  },
  heading: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  subHeading: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    marginBottom: '10px',
  },
  checkbox: {
    marginRight: '10px',
  },
  section: {
    marginBottom: '20px',
  },
  content: {
    flexGrow: '1',
    padding: '20px',
  },
};

export default Men;