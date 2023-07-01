const sequelize = require('../db')
const {DataTypes, INTEGER} = require('sequelize')

const User = sequelize.define('user',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING, unique: true},
  tel: {type: DataTypes.INTEGER, unique: true},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
  isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
  activationLink: {type: DataTypes.STRING},
})

const Token = sequelize.define('token',{
  refreshToken: {type: DataTypes.STRING(1000), require: true}
})

const Basket = sequelize.define('basket',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   
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

const Category = sequelize.define('category',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: true}  
})
const Brand = sequelize.define('brand',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: true}  
})
const Rating = sequelize.define('rating',{
  // id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rate: {type: DataTypes.INTEGER, allowNull: false}  
})
// свойства товара, у одного товара может быть много свойств
const ProductProp = sequelize.define('product_prop',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},  
  value: {type: DataTypes.STRING, allowNull: false}  
})
// Инициализирующяя таблица для связей многие для многих 
const TypeBrand = sequelize.define('type_brand',{
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   name: {type: DataTypes.STRING, unique: true, allowNull: true} 
})

User.hasOne(Basket); // У одного пользователя может бить одна корзина
Basket.belongsTo(User); // Сообщаем что корзина принадлежит пользователю

User.hasOne(Token);
Token.belongsTo(User);

Basket.hasMany(BasketProduct); //У одной карзины много Продуктов-в-карзине
BasketProduct.belongsTo(Basket); // Продукт в карзине пренадлежит корзине

Product.hasMany(BasketProduct); // Продукт может принадлежать многим Продуктом
BasketProduct.belongsTo(Product); // 

// связь категории с товарами: в категории может быть несколько товаров, но
// каждый товар может принадлежать только одной категории
Category.hasMany(Product, {onDelete: 'RESTRICT'});
Product.belongsTo(Category);
// связь бренда с товарами: у бренда может быть много товаров, но каждый товар
// может принадлежать только одному бренду
Brand.hasMany(Product);
Product.belongsTo(Brand);
//-----
// связь many-to-many товаров и пользователей через промежуточную таблицу rating;
// за один товар могут проголосовать несколько зарегистрированных пользователей,
// один пользователь может проголосовать за несколько товаров
Product.belongsToMany(User, {through: Rating, onDelete: 'CASCADE'})
User.belongsToMany(Product, {through: Rating, onDelete: 'CASCADE'})
// super many-to-many https://sequelize.org/master/manual/advanced-many-to-many.html
// это обеспечит возможность любых include при запросах findAll, findOne, findByPk
//-----
//Продукт Имеет связь один ко многим
Product.hasMany(ProductProp, {as:'value'})
ProductProp.belongsTo(Product)

User.hasMany(Rating);
Rating.belongsTo(User); 

Product.hasMany(Rating);
Rating.belongsTo(Product);

// связь товара с его свойствами: у товара может быть несколько свойств, но
// каждое свойство связано только с одним товаром
// Product.hasMany(ProductProp,{as:'props', onDelete: 'CASCADE'});// указіваем как будит називаться поле характеристик. принимаем через строку запроса query
// ProductProp.belongsTo(Product);

Category.belongsToMany(Brand,{through: TypeBrand})
Brand.belongsToMany(Category, {through: TypeBrand})

module.exports = {
  User,
  Token,
  Basket,
  BasketProduct,
  Product,
  Category,
  Brand, 
  TypeBrand, 
  Rating,
  ProductProp
} 

// unique: true // уникальность
// allowNull: true // не может быть пустым