const Sequelize = require('sequelize');
// replace database user * password to match your setup
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