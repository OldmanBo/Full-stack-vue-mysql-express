# Full-stack-vue-mysql-express
## Install guide
1. Download/clone the repo.
2. Install the dependencies both in the server and in the client folder(Run the command "npm install" separately in those 2 folders).
3. Run your mysql server and run the 'create-db-mysql_blogs.sql' script to create the database called 'mysql_blogs' with 4 blogs and 3 users  
    The user info was randomly generated and if there are any similarites with the real world, they are accidental :D  
    Passwords for the 3 created users are hashed and their decoded values are 1234. So if you want to login with the created users use the email and password(1234)  
4. In the server folder, create .env file and write the following env variables:  
    DB = *Name of the created database (if you didn't change the sql script it should be "mysqsl_blogs")  
    DB_HOST = *Name of the database host (if you are running the db locally, it should be "localhost")  
    DB_USER = *Name of the database user  
    DB_PASSWORD = *Your database password  
    JWT_SECRET = *A string used as a json-web-token secret(In simple words, password for the jwt)  
5. Open the first terminal window, navigate in the client folder and run 'npm run serve' to start your client side. By default vue usually starts the server on port 8080. If by any chance the client side is on some other port, open the server.js file and edit the cors middleware(change the port from 8080 to the one you are running the client side on).
6. Open the second terminal window, navigate in the server folder and run 'npm start' to start the nodemon server on port 3000.
Now everything should be working fine and the client and the server should not be having any problems communicating.  

## New Design
#### Animated Dynamic Background - blobs position and size changes with every pge reload
<img src='/showcase_gif_files/animation.gif' width= 1000px>  

#### New design images
<img src='/showcase_gif_files/home_page.png' width= 1000px>  
<img src='/showcase_gif_files/blog.png' width= 1000px>  
<img src='/showcase_gif_files/login.png' width= 1000px>  
<img src='/showcase_gif_files/userpage.png' width= 1000px>  

## Simple Design for Features showcase(simple design used to keep gif files smaller)
#### mysql paginaiton
<img src='/showcase_gif_files/Example1.gif' width= 1000px>  

#### mysql blogs search
<img src='/showcase_gif_files/Example2.gif' width= 1000px>  

#### mysql users search
<img src='/showcase_gif_files/Example6.gif' width= 1000px>  

#### user registration and backend form validation
<img src='/showcase_gif_files/Example3.gif' width= 1000px>  

#### user login
<img src='/showcase_gif_files/Example4.gif' width= 1000px>  

#### user edit
<img src='/showcase_gif_files/Example5.gif' width= 1000px>  


## Info about the Full-stack-vue-mysql-express  
This is my first full stack project, client side is made with vue js, while server side is made with nodejs/express and the database is Mysql. Of course there are a couple of npm packages:  
    - express: web framework for nodejs  
    - axios: used in the front-end to communicate with the server api.  
    - bcryptjs: used in the server api to encript user passwords.  
    - cookie-parser and jsonwebtoken: used in the back-end to create json web tokens and insert them into cookies to manage login sessions.  
    - cors: used to allow local communication between the local vue server(client) and the local express server/api(server).  
    - dotenv: used for enviroment variables.  
    - morgan: used for server console logs.  
    - multer: used to handle file upload(jpg,jpeg,png images) during the user creation(registartion).  
    - mysql2: MySQL client for Node.js.  
      
Furthemore, the website has 4 routes/pages: home, user, blog and search. You can create/register new users, login/logout the existing users and read blogs. Logged in users can write new blogs, and edit both their blogs and their user info. Lastly there is a search page where you can search both blogs and users with implemented mqsql pagination. With the help of vue and the server api, the website is dynamic.
