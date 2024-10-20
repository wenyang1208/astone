# Astone - FIT3170 Full-Year Project

Astoné is an e-commerce platform ready to offer a diverse range of clothing aligned with the latest fashion trends, aiming to be a trusted destination for quality and style. Built with ReactJS, Python Django, and PostgreSQL.

## Frontend
Frontend uses React.js with Material-UI for the user interface.  
Refer to [frontend](./Project/frontend) for more information.  

## Backend
Backend uses Django connected to a PostgreSQL database.  
Refer to [backend](./Project/astone) for more information.

## Testing
Run frontend and backend tests automatically with Gitlab CI on code pushes.

Refer to [frontend](./Project/frontend) for more information.

Refer to [backend](./Project/astone) for more information.

## Software and Deployment
Deployment uses Github, Vercel, and Render with free packages. This is done by connecting Vercel and Render to the Github repository "astone" to host the website.

### Frontend
Tools: Github, Vercel

Domains: <a href="https://astone-frontend.vercel.app/">https://astone-frontend.vercel.app/

### Backend & Database
Tools: Github, Render

Domains: <a href="https://astone-backend-app.onrender.com/">https://astone-backend-app.onrender.com/

Admin: <a href="https://astone-backend-app.onrender.com/admin/">https://astone-backend-app.onrender.com/admin/

Admin username: admin

Admin password: 1234

### Github Repo Link:

<a href="https://github.com/wenyang1208/astone">https://github.com/wenyang1208/astone

## Pull Requests

### Creating Pull Requests

1. **Write small PRs**  
Aim to create small, focused pull requests that fulfill a single purpose.

2. **Review your own PR**  
Before requesting a review, ensure that your code is clean, well-documented, and follows the project's coding standards.

3. **Test your own PR**  
Build and test your own pull requests before submitting it. This allows you to catch errors or typos before reviewers see them.

4. **Provide context**  
Explain the purpose of your PR and provide any necessary context to help reviewers understand your changes within the title and description. 

### Managing Pull Requests

1. **Define code owners**  
After a handover, assign code owners to each part of the codebase or the whole codebase. This ensures that the right people are notified when a PR is created and can handle the review process.

2. **Use protected branches**  
Protect the main branch to prevent direct commits and ensure that all changes are made through pull requests. This allows for code reviews and ensures that the main branch is always stable.

## Open License 
Astone is licensed under the [GNU General Public License v3.0](./LICENSE).  

## Installation

1. **Clone Repository**: Clone the repository to your local machine using the following command via any method of your choice.

2. **Setup Frontend**: Navigate to the `Project/frontend` directory and follow the setup instructions in the [README.md](./Project/frontend) file to set up the frontend.

3. **Setup Backend**: Navigate to the `Project/astone` directory and follow the setup instructions in the [README.md](./Project/astone) file to set up the backend.

4. **Use Application**: Once frontend and backend are set up, they will be running on http://localhost:3000/ and http://localhost:8000/admin respectively and are ready for use. (Typical use only requires frontend access)

## Tutorial of using Astone

Refer [tutorial](./Project/) for more information.

## Members
| Name | Role | Email |
| --- | --- | --- |
| Koe Rui En | Agile Release Train (ART) | rkoe0003@student.monash.edu |
| Mohamed Shaahid Mohamed Altaf | Agile Release Train (ART) | mmoh0162@student.monash.edu |
| Tay Ming Hui | Agile Release Train (ART) | mtay0031@student.monash.edu |
| Aaron Leong Weng Hon | Product Manager (PM) | aleo0022@student.monash.edu |
| Chong Jet Shen | Product Manager (PM) | jcho0161@student.monash.edu |
| Maliha Tariq | Product Manager (PM) | mtar0012@student.monash.edu |
| Taha Waheed Fareed Fareed | Product Manager (PM) | tfar0012@student.monash.edu |
| Chua Wen Yang | System Architect (SA) | wchu0033@student.monash.edu |
| Jastej Singh Gill | System Architect (SA) | jsav0005@student.monash.edu |
| Lim Woo Shen | System Architect (SA) | wlim0061@student.monash.edu |

## Summary to New Developers
Welcome to the Astone e-commerce platform! This project is built with ReactJS for the frontend, Django for the backend, and PostgreSQL for database management. As a new developer, you’ll primarily work with these technologies, so familiarity with them will help you navigate the codebase efficiently.

### Key Information:


**Frontend:**
<br> 
React with Material-UI for components. Check out the frontend folder for the project structure and setup instructions.
<br>

**Backend:**
<br> 
Django framework connected to PostgreSQL. Refer to the backend folder for more details on setting up and working with the backend.
<br>

**Deployment:**
<br> 
We use Vercel for the frontend and Render for the backend. The project is set up for automated deployments using GitHub, so make sure your code passes all tests before merging to the main branch.
<br>

### Getting Started:

**Clone the Repository:**
<br>
Start by cloning the repository to your local machine.
<br>
<br>
**Follow the Setup:** 
<br>
Make sure to follow the setup instructions in the frontend and backend README files to get your local development environment up and running.
<br>
<br>
**Coding Standards:** 
<br>
Stick to small, focused PRs, test your code thoroughly, and document it well. This will make the review process smoother and ensure the main branch stays stable.
<br>
<br>
**Team Communication:** 
<br>
If you're assigned to a specific feature or area, reach out to the relevant code owner for assistance. Collaboration is key, and our process includes regular feedback and reviews.
