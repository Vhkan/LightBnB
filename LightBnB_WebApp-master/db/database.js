const { options } = require("pg/lib/defaults");
const properties = require("./json/properties.json");
const users = require("./json/users.json");

//Setting up the pg to set up the connection with lighbnb DB
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

// the following assumes that you named your connection variable `pool`
//pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)});
pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => { (response) });

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

// const getUserWithEmail = function(email) {
//   let resolvedUser = null;
//   for (const userId in users) {
//     const user = users[userId];
//     if (user && user.email.toLowerCase() === email.toLowerCase()) {
//       resolvedUser = user;
//     }
//   }
//   return Promise.resolve(resolvedUser);
// };

//Refactoring getUserWithEmail
//Accepts an email address and will return a promise.
// The promise should resolve with a user object with the given email address,
// or null if that user does not exist
const getUserWithEmail = async (email) => {

  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (err) {
    console.log("Email error is:", err);
    throw err;
  }
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

// const getUserWithId = function(id) {
//   return Promise.resolve(users[id]);
// };

//Refactored getUserWithId
const getUserWithId = async (id) => {
  try {
    const query = 'SELECT * FROM users WHERE id = $1'
    const result = await pool.query(query, [id]);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (err) {
    console.log("Id error is:", err);
    throw err;
  }
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
// const addUser = function(user) {
//   const userId = Object.keys(users).length + 1;
//   user.id = userId;
//   users[userId] = user;
//   return Promise.resolve(user);
// };

//Refactored addUser function
// Accepts a user object that will have a name, email, and password property
// This function should insert the new user into the database
// It will return a promise that resolves with the new user object. 
// This object should contain the user's id after it's been added to the database.
const addUser = async (user) => {
  try {
    const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;'
    const result = await pool.query(query, [user.name, user.email, user.password]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (err) {
    console.log("User error is:", err);
  }
};


/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

// const getAllReservations = function(guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// };

//Refactored getAllReservations
const getAllReservations = async (guest_id, limit) => {
  try {
    const query = 'SELECT reservations.*, properties.* \
      FROM reservations \
      JOIN properties ON reservations.property_id = properties.id \
      JOIN property_reviews ON properties.id = property_reviews.property_id \
      WHERE reservations.guest_id = $1 \
      GROUP BY reservations.id, properties.id \
      ORDER BY reservations.start_date \
      LIMIT $2';

    const result = await pool.query(query, [guest_id, limit]);

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    }
  } catch (err) {
    console.log("Guest_id error is:", err);
    throw err;
  }
};




/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

// //Refactoring the function to use lightbnb DB
// const getAllProperties = function(options, limit = 10) {
//   return pool.query(
//     `SELECT * 
//      FROM properties
//      LIMIT $1`,
//     [limit])
//     .then((result) => {
//       // console.log(result.rows);
//       return result.rows;
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

//Refactored getAllProperties
const getAllProperties = async (options, limit = 10) => {
  try {
    const queryParams = [];

    let query = "SELECT properties.*, AVG(property_reviews.rating) AS average_rating " +
      "FROM properties " +
      "JOIN property_reviews ON property_reviews.property_id = properties.id ";

    if (options.city) {
      queryParams.push(`%${options.city}%`);
      query += "WHERE city LIKE $" + queryParams.length + " ";
    }

    if (options.owner_id && !options.city) {
      queryParams.push(options.owner_id);
      query += "WHERE owner_id = $" + queryParams.length;
    } else if (options.owner_id && options.city) {
      queryParams.push(options.owner_id);
      query += "AND owner_id = $" + queryParams.length;
    }

    if (
      options.minimum_price_per_night &&
      options.maximum_price_per_night &&
      !options.city &&
      !options.owner_id
    ) {
      queryParams.push(options.minimum_price_per_night);
      query += "WHERE (cost_per_night/100) > $" + queryParams.length;
      queryParams.push(options.maximum_price_per_night);
      query += "AND (cost_per_night/100) < $" + queryParams.length;
    } else if (
      options.minimum_price_per_night &&
      options.maximum_price_per_night &&
      (options.city || options.owner_id)
    ) {
      queryParams.push(options.minimum_price_per_night);
      query += "AND (cost_per_night/100) > $" + queryParams.length;
      queryParams.push(options.maximum_price_per_night);
      query += "AND (cost_per_night/100) < $" + queryParams.length;
    }

    if (options.minimum_rating) {
      queryParams.push(options.minimum_rating);
      query += "HAVING AVG(property_reviews.rating) < $" + queryParams.length;
    }

    queryParams.push(limit);
    query += "GROUP BY properties.id " +
      "ORDER BY cost_per_night " +
      "LIMIT $" + queryParams.length;

    // console.log(query, queryParams);
    const result = await pool.query(query, queryParams);

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    }
  } catch (err) {
    console.log("Guest_id error is:", err);
    throw err;
  }
};


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
