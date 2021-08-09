# Full-stack-vue-mysql-express

1. Download/clone the repo.
2. Install the dependencies both in the server and in the client folder(Run the command "npm install" separately in those 2 folders).
3. Run your mysql server and run the 'create-db-mysql_blogs.sql' script to create the database called 'mysql_blogs' with 4 blogs and 3 users.
4. In the server folder, create .env file and write the following env variables  
    DB = *Name of the created database (if you didn't change the sql script it should be "mysqsl_blogs")  
    DB_HOST = *Name of the database host (if you are running the db locally, it should be "localhost")  
    DB_USER = *Name of the database user  
    DB_PASSWORD = *Your database password  
    JWT_SECRET = *A string used as a json-web-token secret(In simple words, password for your jwt)  
5. Open the first terminal window, navigate in the client folder and run 'npm run serve' to start your client side. By default vue usually starts the server on port 8080.
6. Open the second terminal window, navigate in the server folder and run 'npm start' to start the nodemon server on port 3000.
Now everything should be working fine and the client and the server should not be having any problem communicating.
