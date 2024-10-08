# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

UI library used is [Material UI](https://mui.com/material-ui/)

## API requests
First, ensure [http://localhost:8000](http://localhost:8000) is running, refer to [backend](./Project/astone) for information on setup and running.\


## How to start React app
[Cloning and starting the app](https://www.geeksforgeeks.org/how-to-download-a-react-project-from-github-and-run-in-my-pc/)\

You can make requests to implemented django REST APIs by using implemented API urls with axios.\

Some examples of api requests are in the /src/services directory\

An example on how to use data received from API request is in the file /src/pages/product/productView.js\

[Another example](https://medium.com/@devsumitg/how-to-connect-reactjs-django-framework-c5ba268cb8be)\

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Setup
1. **Prerequisites**: Ensure you have Node.js installed on your machine. If not, download and install [Node.js](https://nodejs.org/en/download/).

2. **Install and Run**: Clone the repository to your local machine and navigate to the project directory. Run the following commands to install dependencies and start the React app:
```bash
cd Project/frontend
npm install [--force]
npm start
```
- Add `--force` flag if you encounter any dependency issues.

3. **Accessing Application**: The React app will be running on http://localhost:3000/ and can be accessed via your web browser.

## Testing

We use React Testing Library and Jest for testing components and features. To run tests, use:

`npm test`

This launches the test runner in interactive watch mode, allowing you to run, re-run, and view test results. Write meaningful tests for components to verify functionality and user interactions.

For more details, refer to the React Testing Library Documentation and unit testing tutorial:

- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro)

- [Unit Testing Tutorial](https://www.youtube.com/watch?v=OVNjsIto9xM)
