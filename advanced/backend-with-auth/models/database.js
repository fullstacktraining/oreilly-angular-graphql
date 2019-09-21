const Sequelize = require('sequelize');

const sequelize = new Sequelize('graphql', 'root', 'marina', {
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  logging: false,
  insecureAuth: true
});

module.exports = {
  sequelize
};