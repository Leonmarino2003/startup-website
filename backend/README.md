# Readme file of the entire backend.

## Welcome to the backend, where we drink copious amounts of coffee and bang our heads against the wall. This readme will explain the folders and some of the purpose of the files.

<br> </br>

# Models

### This folder is used for the schemas and models used in our database. You can view the files / models in terms of "templates", basically, we tell the databse how we want a specific document to look like. (In MongoDB, each "item" or object is called document.)

<br> </br>

# Test

### We wanted to have done automated tests with help of mocha (hence why its installed in our package.json), but never had the time unfortunately, however, having automated tests is heavily recommended and if you have the time please do start working on it. Automated testing saves ALOT of time and headaches if done correctly, speaking of testing. I recommend using some type of api testing software, wheter it be the rest exstension in VsCode or something like insomnia or postman. (I use postman and heavily recommend it). This way you can test the backend and routes without having to rely on the frontend, which is super convenient

<br> </br>

# Routes

### Here be routes. Not too much to say really.

<br> </br>

# Utility

### Here we have all kinds of utility files, we have our email service together with our email templates here. To write the email templates we use something called .pug, thanks to this we can actually write our emails like HTML and even style them with css!

### Utils.js, the thought here is that the "flow" should go server.js -> routes.js -> utils.js -> database.js

### in other words, utils.js is where we manipulate data and have alot of checks that looks at what type of response we get from the database but we never directly send anything to the database here. We only pass and manipulate data, as well as changes responses to the frontend depening on the results we get back from the database. An example would be the route for finding a user in the database. The flow would be the following:

### User object from frontend -> routes sends user object to utils.js -> utils.js calls a function from database.js that searches database for user and returns the result -> utils.js checks the results and sends it back to routes.js -> routes.js sends an appropriate response depending on the results.

<br> </br>

# Database.js

### Here we directly interact with the database and have all our CRUD functions. So it is here we actually create bids, users, feedback etc.
