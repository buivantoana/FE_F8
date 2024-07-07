const Dotenv = require("dotenv-webpack");

module.exports = {
  // Your existing webpack config
  plugins: [new Dotenv()],
  // Other webpack config settings
};
