require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DATABASE_URL, NODE_ENV
} = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: NODE_ENV === 'PROD' ? true : false
  },
  pool: {
    acquire: 30000,
    idle: 10000,
    min: 0,
    max: 10
  },
  logging: false
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Read all files from models folder and add them to modelDefiners array
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Product, Category, CategoryProduct, ProductPhoto } = sequelize.models;

// Associations
// Product <--> Category
Product.belongsToMany(Category, { through: CategoryProduct });
Category.belongsToMany(Product, { through: CategoryProduct });

// Product <--> Photo
Product.hasMany(ProductPhoto);
ProductPhoto.belongsTo(Product);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
