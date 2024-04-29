# Astone back-end

## Functionality
- **API Endpoints**: Defines RESTful endpoints to interact with the backend, including CRUD operations for managing resources such as users, products, orders, etc.

- **Data Storage**: Utilizes relational database PostgreSQL to persist data and models defined in Django's ORM.

- **Business Logic**: Implements business logic and application-specific rules to process requests, perform validations, and generate responses.

## Docker
The setup process is eased by using Docker to containerize dependencies and ease deployment by creating a consistent environment
Please ensure the Docker desktop app is installed and running with administrator permissions
Download link: https://www.docker.com/products/docker-desktop/

## Setup
1. Navigate to project directory:
Command below is an example, path will differ based on your directory setup, 
cd C:\Users\jaste\FIT3170-repo\fit3170_ecommerce\Project\astone

2. Build Docker image with the following commands:
docker-compose build
docker-compose up

3. Access the API endpoints with `http://localhost:8000/`
This link will need to be combined with a suffix based from urls.py to form an API endpoint 
For example, http://localhost:8000/products/ is the API endpoint to get all products
Simply navigating to http://localhost:8000/admin/ will direct user to django admin page where user can sign in to view 

Django admin credentials:
username: admin
password: 1234

4. Please ensure the http://localhost:8000/ server is always running during development or API requests from the frontend will not have a response

## How to create entities a.k.a. models
1. Create a new file in astoneapp.models for each new models (inherited models can be in the same file) e.g. products.py

2. Create a model class based on the example in products.py with the appropriate functions you might, need more info here: https://docs.djangoproject.com/en/5.0/topics/db/models/

3. Once your models are created, you need to add a corresponding table in postgres, this can be done by rebuilding the docker image with the following command
docker-compose up

4. (Optional) Verify database is added by checking the django admin page (http://localhost:8000/admin/) and the postgres desktop application

## How to add rows to entities a.k.a. models
Rows can be added through multiple ways e.g. using API endpoints, using the django admin page or adding them through postgres
The rows in each entity within the database will be unique to each person's local environment, therefore when adding rows there must be a script to add these rows when the docker image is composed for a consistent development environment
Best practice is to create a yaml with sample rows for each newly created entity to ease development for other team members

1. In directory astone.db.yaml create a new yaml file with a name that corresponds to the entity

2. Populate the yaml file with rows in a format similiar to the products.yaml file ensure rows are valid to the contraints and attributes in your defined entity 

3. Navigate to the start.sh script in the main astone directory and add a command to load data from your yaml file

4. Rebuild the docker image

5. (Optional) check if rows are added using the django admin page, postgres desktop app or corresponding API requests

## How to implement API endpoints
The implementation can be broken down into three main components which are the url, view function and serializer 
Some documentation that might be useful:
https://docs.djangoproject.com/en/5.0/topics/http/views/
https://testdriven.io/blog/drf-serializers/

1. Create a file in the directory astone.astone.astoneapp.views
View functions in a file are grouped by their related model e.g. product_view.py for view functions related to the products entity

2. Define a view function with the api_view decorator that corresponds to the HTTP request method the most commonly used are 'GET', 'PUT' and 'POST'
Documentation on HTTP request methods: https://www.w3schools.com/tags/ref_httpmethods.asp

Ensure potential errors are handled with the appropriate Response status code 

Documentation on status codes:https://www.django-rest-framework.org/api-guide/status-codes/

Try to create reusable functions within the respective model class for better extensibility

3. Define a serializer class to serialize response data from the view function in the directory astone.astone.astoneapp.serializers 
Serializer can be reused for view functions with a similiar response
Use this serializer in the view function to return data 

4. Define a URL endpoint mapped to your view function in the urls.py file in the astone.astone directory
This will define how the endpoint will be accessed
Some documentation on urls: https://docs.djangoproject.com/en/5.0/ref/urls/

5. (Optional)Rebuild the docker image to ensure everything is updated

6. (Optional)Test your endpoints, using tools like the Postman desktop app 

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)