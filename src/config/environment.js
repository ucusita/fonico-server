require("dotenv").config({
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
});

const config = {
  development: {
    mongoURL: process.env.DATABASE_URL,
    port: process.env.PORT
  },
  production: {
    mongoURL: process.env.DATABASE_URL,
    port: process.env.PORT
  }

};

module.exports = config[process.env.NODE_ENV];
