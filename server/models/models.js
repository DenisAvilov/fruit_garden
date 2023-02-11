const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING, unique: true},
  tel: {type: DataTypes.INTEGER, unique: false},
  role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define('basket',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  // user_id: {type: DataTypes.STRING, unique: true}  
})

const BasketProduct = sequelize.define('basket_product',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  // user_id: {type: DataTypes.STRING, unique: true}  
})
const Product = sequelize.define('product',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING,  unique: true, allowNull: true},
  price: {type: DataTypes.STRING, allowNull: true},
  rating: {type: DataTypes.INTEGER, defaultValue: 0},
  img: {type: DataTypes.STRING, allowNull: false}  
})

const ProductType = sequelize.define('product_type',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: true}  
})
const Brand = sequelize.define('brand',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: true}  
})
const Rating = sequelize.define('rating',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rate: {type: DataTypes.INTEGER, allowNull: false}  
})
const ProductInfo = sequelize.define('product_info',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},  
  description: {type: DataTypes.STRING, allowNull: false}  
})
// Инициализирующяя таблица для связей многие для многих 
const TypeBrand = sequelize.define('type_brand',{
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   name: {type: DataTypes.STRING, unique: true, allowNull: true} 
})

User.hasOne(Basket); // У одного пользователя может бить одна корзина
Basket.belongsTo(User); // Сообщаем что корзина принадлежит пользователю


User.hasMany(Rating);
Rating.belongsTo(User);
 
Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

ProductType.hasMany(Product);
Product.belongsTo(ProductType);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

Product.hasMany(ProductInfo,{as:'info'});// указіваем как будит називаться поле характеристик. принимаем через строку запроса query
ProductInfo.belongsTo(Product);

ProductType.belongsToMany(Brand,{through: TypeBrand})
Brand.belongsToMany(ProductType, {through: TypeBrand})

module.exports = {
  User,
  Basket,
  BasketProduct,
  Product,
  ProductType,
  Brand, 
  TypeBrand, 
  Rating,
  ProductInfo
} 

// unique: true // уникальность
// allowNull: true // не может быть пустым