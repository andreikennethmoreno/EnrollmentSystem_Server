EnrollmentSystem_Server
Overview
The EnrollmentSystem_Server is a Node.js-based server that handles the back-end functionality of an enrollment system. It connects to a PostgreSQL database for data storage and management, making it easy for administrators to manage student enrollments, courses, and more.

Getting Started
Prerequisites
Before you can run the project, ensure you have the following installed on your system:

Git - To clone the repository.
PGAdmin - A PostgreSQL database management tool. Download it from here.
Postman - An API client used for testing and interacting with the API. Download it from here.
Node.js - Make sure Node.js and npm (Node package manager) are installed. You can download Node.js from here.
Installation
Follow these steps to set up the project on your local machine:

Clone the repository:

bash
Copy code
git clone https://github.com/your-username/EnrollmentSystem_Server.git
Navigate into the project directory:

bash
Copy code
cd EnrollmentSystem_Server
Install dependencies: In the project directory, run the following command to install the required npm packages:

bash
Copy code
npm install
Set up PostgreSQL:

Open PGAdmin and create a new PostgreSQL database.
Configure the database connection details in the project’s .env file (e.g., database name, user, password).
Configure environment variables:

Create a .env file in the root of the project (if not already present) and add the necessary environment variables, such as your database credentials:
makefile
Copy code
DB_HOST=localhost
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
Run the server: After setting up the database and environment variables, start the server:

bash
Copy code
npm start
Test the API using Postman: Open Postman and use the endpoints defined in the API documentation to interact with the server.

API Documentation
The API documentation for EnrollmentSystem_Server is available at:

Swagger UI (After starting the server, you can access the Swagger UI for documentation)
Additional Information
Database schema: The project uses PostgreSQL to store data. The schema includes tables for students, courses, enrollments, and more.
Testing: Use Postman to send requests to the API and test the functionality.
Contributing
Feel free to fork this repository, make improvements, and create pull requests. Ensure that all code follows the project's coding style and conventions.

License
This project is licensed under the MIT License - see the LICENSE file for details.
