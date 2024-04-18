# Astone Database Management System

## Description
Astone's Database Management System is PostgreSQL.  
The current database schema is a basic representation of the e-commerce platform's data model.  

## Setup
A short guide on how to set up the database on your local machine.
These instructions are basic guidelines for setting up the database.

### Install PostgreSQL on your local machine
1. Download the installer from the [official website](https://www.postgresql.org/download/).
2. Follow the installation instructions and install all components.
3. Set and remember the password you set for the `postgres` user.
4. Set the port to `5432`.

### Create a new database
1. Open the `pgAdmin` tool.
2. Connect to a server using the password you set.
3. Right-click on `Databases` and select `Create > Database...`.
4. Name the database `astone` and set the owner to `postgres`.
5. Click `Save`.

### Import the database schema
1. Open the `pgAdmin` tool.
2. Right-click on the `astone` database and select `Query Tool`.
3. Open the `astone.sql` file in the `database` folder or copy the contents of the file.
4. Click the `Execute` button to run the script.

## Documentation / Resources
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [pgAdmin Documentation](https://www.pgadmin.org/docs/)
- [SQL Tutorial](https://www.w3schools.com/sql/)
- [PostgreSQL Tutorial](https://www.w3schools.com/postgresql/)
