# LightBnB

#### LightBnB is a simple multy-page Airbnb clone that uses a server-side JavaScript to display the information from querie to web pages via SQL queries.

## Final Product

![Home Page](https://github.com/Vhkan/LightBnB/blob/main/LightBnB_WebApp-master/documents/home_screen.png)
![Sign Up Page](https://github.com/Vhkan/LightBnB/blob/main/LightBnB_WebApp-master/documents/sign_up_page.png)
![User Page](https://github.com/Vhkan/LightBnB/blob/main/LightBnB_WebApp-master/documents/user_page.png)

## Getting Started

- Clone the repository to your local computer using git clone https://github.com/Vhkan/LightBnB
- Install all dependencies (using the npm install command).

- Populate your Database by runnig the following commands in psql: 
- \i migrations/01_schema.sql
- \i seeds/01_seeds.sql
- \i seeds/02_seeds.sql

- CD over to LightBnB_WebApp in your Terminal and run "npm run local" command to start using the app.
- The message "listening on port 3000 😎" in Terminal will be displayed if the app is run successfully.
- Navigate to: http://localhost:3000 in your web browser to use the app.

## Project Structure

```
.
├── db
│   ├── json
│   └── database.js
├── public
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── libraries
│   │   ├── index.js
│   │   ├── network.js
│   │   └── views_manager.js
│   ├── styles
│   │   ├── main.css
│   │   └── main.css.map
│   └── index.html
├── routes
│   ├── apiRoutes.js
│   └── userRoutes.js
├── styles  
│   ├── _forms.scss
│   ├── _header.scss
│   ├── _property-listings.scss
│   └── main.scss
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

* `db` contains all the database interaction code.
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.
* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `routes` contains the router files which are responsible for any HTTP requests to `/users/something` or `/api/something`. 
* `styles` contains all of the sass files. 
* `server.js` is the entry point to the application. This connects the routes to the database.


###### This project was made as part of the LHL educational program.