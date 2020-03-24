/**
 * Environment variables.
 * 
 * Most of them are loaded form .env file found in the 
 * root directory.
 * 
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  /**
   * Listening port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * Mongodb connection string
   */
  databaseURI: process.env.MONGODB_URI,

  /**
   * Secret string used in authentication
   */

  secret: process.env.SECRET,
}
