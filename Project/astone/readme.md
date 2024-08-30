# Astone Back-end

## Overview

The Astone back-end provides RESTful API endpoints for interacting with the backend system, including CRUD operations for managing resources such as users, products, and orders. It utilizes a PostgreSQL database to persist data and implements business logic to process requests and generate responses.

## Creating Entities (Models)

1. **Define Models**: Create a new file in `astoneapp.models` for each new model. Define model classes based on your requirements, ensuring to include necessary functions. [Django Models Documentation](https://docs.djangoproject.com/en/5.0/topics/db/models/)

2. **Database Migration**: After defining models, add corresponding tables to the PostgreSQL database by rebuilding the Docker image:
docker-compose up


3. **Verification**: Verify that the database tables are created by checking the Django admin page or using [PostgreSQL desktop application](https://www.postgresql.org/download/).

## Adding Rows to Entities (Models)

1. **Create YAML Files**: In the `astone.db.yaml` directory, create YAML files corresponding to each entity.

2. **Populate YAML Files**: Populate YAML files with sample rows, ensuring they adhere to the constraints and attributes of the defined entities.

3. **Load Data**: Update the `start.sh` script in the main `astone` directory to include commands for loading data from YAML files.

4. **Rebuild Docker Image**: Rebuild the Docker image to apply changes.

5. **Verification**: Check if rows are added using the Django admin page, PostgreSQL desktop app, or corresponding API requests.

## Implementing API Endpoints

1. **Define Views**: Create view functions in `astoneapp.views` grouped by related models. Define view functions using the [`@api_view`](https://www.django-rest-framework.org/api-guide/views/) decorator and handle potential errors with appropriate response status codes.

2. **Serialize Data**: Define serializer classes in `astoneapp.serializers` to serialize response data from view functions.

3. **Map URLs**: Define URL endpoints in `urls.py` in the `astone` directory to map to the corresponding view functions.

4. **Testing**: Test endpoints using tools like [Postman desktop app](https://www.postman.com/downloads/).

## Setup

To ease setup and deployment, Docker is used to containerize dependencies and provide a consistent environment.

1. **Prerequisites**: Ensure Docker Desktop is installed and running with administrator permissions. [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

2. **Building and Running**: Navigate to the project directory and run the following commands one by one:  

```bash
cd Project/astone
docker-compose build
docker-compose up
```

3. **Error Resolution:** If getting an error regarding `./start.sh`, it is caused by a file formatiing error.
There are two ways to resolve this:

- Use [Notepad++](https://notepad-plus-plus.org/downloads/) to convert the file format to Unix format. To do this, open the file in NotePad++, click on Edit -> EOL Conversion -> Unix/OSX format, then save the file.

- Alternatively, run the following commands in a bash terminal:
```bash
cd Project/astone; dos2unix ./start.sh
```

4. **Accessing API Endpoints**: API endpoints can be accessed at `http://localhost:8000/`. Combine this base URL with the appropriate suffix based on the URLs defined in `urls.py` to access specific endpoints.

- Note: that simply navigating to `http://localhost:8000/` in your web browser will lead to a 404 page.


5. **Admin Interface**: Access the Django admin page at http://localhost:8000/admin/ to manage entities. Use the following credentials:
```bash
Username: admin
Password: 1234
```

## Completely Resetting the Backend

If you need to completely reset the backend, including the database and all data, follow these steps:

1. **Stop Docker Containers**: Stop the running Docker containers via the Docker app.

2. **Remove Related Docker Resources**: Remove all related Docker resources, including containers, images, and volumes, using the following commands. 

3. **Rebuild Docker Image**: Rebuild the Docker image to apply changes. Refer to the [Setup](#setup) section for detailed instructions.

## Testing

We will focus on Django Backend Testing and API testing for backend:

1. **Django Backend Testing**

- Run the following command to execute all tests in the project:
```bash
python manage.py test
```

- Unit Tests: Test models, views, and serializers using TestCase.

- Integration Tests: Use APITestCase to test end-to-end scenarios.

For more details, refer to the Django Documentation and Django REST Framework Testing Documentation:

- [Django Documentation](https://docs.djangoproject.com/en/5.1/topics/testing/overview/)

- [Django REST Framework Testing Documentation](https://www.django-rest-framework.org/api-guide/testing/)

2. **API Testing**

- Use Postman to automate and validate API endpoint responses, 

- For more details on implementing API endpoints, refer to the "Testing" section in[Implementing API Endpoints](#implementing-api-endpoints).
