const sequelize = require('../db')
const {DataTypes, INTEGER} = require('sequelize')

const User = sequelize.define('user',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},  
  role: {type: DataTypes.STRING, defaultValue: "USER"},
  isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
  activationLink: {type: DataTypes.STRING},
})
 

const UserFio = sequelize.define('user_fio',{
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   name: {type: DataTypes.STRING,  allowNull: true}, 
   lastName: {type: DataTypes.STRING, allowNull: true},  
   img: {type: DataTypes.STRING, allowNull: false}, 
   userId: { type: DataTypes.INTEGER, allowNull: false }  
})


const Contact = sequelize.define('contact', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.INTEGER, unique: true, allowNull: true},              
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
    userId: { type: DataTypes.INTEGER, allowNull: false }
  })

  const Social = sequelize.define('social', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fb: {type: DataTypes.STRING, unique: true, allowNull: true},           
    instagram: {type: DataTypes.STRING, unique: true, allowNull: true},
    telegram: {type: DataTypes.STRING, unique: true, allowNull: true},
    userId: { type: DataTypes.INTEGER, allowNull: false }
})  


// Карзина начало

const Basket = sequelize.define('basket',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   
})

const BasketProduct = sequelize.define('basket_product',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},  
})

// Карзина конец
// Товар начало

const Product = sequelize.define('product',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING,  unique: true, allowNull: true},
  price: {type: DataTypes.STRING, allowNull: false},
  rating: {type: DataTypes.INTEGER, defaultValue: 0},
  img: {type: DataTypes.STRING, allowNull: false}  
})
// свойства товара, у одного товара может быть много свойств
const ProductInfo = sequelize.define('product_info',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},  
  value: {type: DataTypes.STRING, allowNull: false}  
})


//Створюємо категорію товара
const Category = sequelize.define('category',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: true}  
})
//Створюємо підкатегорію товара
const Subcategory = sequelize.define('subcategory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: true }
});



const Brand = sequelize.define('brand',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: true}  
})

const Smack = sequelize.define('smack', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

// Рейтинг начало
  const Rating = sequelize.define('rating',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rate: {type: DataTypes.INTEGER, allowNull: false}  
})
// Рейтинг конец

//Токен 
const Token = sequelize.define('token',{
  refreshToken: {type: DataTypes.STRING(1000), require: true}
})


// Инициализирующяя таблица для связей многие для многих 
// Внешние ключи SECvialys добавит сам 
// const TypeBrand = sequelize.define('type_brand',{
//    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//   //  name: {type: DataTypes.STRING, unique: true, allowNull: true} 
// })





////////////////////////////////////////////////////


// Описание моделей  юзер
User.hasOne(Contact); // У одного пользователя может бить Contact
Contact.belongsTo(User); // Сообщаем что Contact принадлежит пользователю

User.hasOne(Social);  // У одного пользователя могут бить Social
Social.belongsTo(User);  // Сообщаем что Social принадлежат 1 пользователю

User.hasOne(UserFio); // У одного пользователя может бить ФИО
UserFio.belongsTo(User); // Сообщаем что ФИО принадлежит пользователю

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
Category.hasMany(Product);
Product.belongsTo(Category);


// Отношение "многие ко многим" (один продукт может быть у множества брендов)
const ProductBrand = sequelize.define('product_brand', {}); // Вспомогательная таблица


Brand.belongsToMany(Product, { through: ProductBrand, foreignKey: 'brandId' });
Product.belongsToMany(Brand, { through: ProductBrand, foreignKey: 'productId' });


const ProductSmack = sequelize.define('product_smack', {}); // Вспомогательная таблица


Product.belongsToMany(Smack, { through: ProductSmack, foreignKey: 'productId' });
Smack.belongsToMany(Product, { through: ProductSmack, foreignKey: 'smackId' });



User.hasMany(Rating);
Rating.belongsTo(User); 
// связь many-to-many товаров и пользователей через промежуточную таблицу rating;
// за один товар могут проголосовать несколько зарегистрированных пользователей,
// один пользователь может проголосовать за несколько товаров
Product.belongsToMany(User, {through: Rating, onDelete: 'CASCADE'})
User.belongsToMany(Product, {through: Rating, onDelete: 'CASCADE'})
// super many-to-many https://sequelize.org/master/manual/advanced-many-to-many.html
// это обеспечит возможность любых include при запросах findAll, findOne, findByPk
//-----


// Встановлюємо зв'язок між категорією і підкатегорією (один-до-багатьох)
Category.hasMany(Subcategory);
Subcategory.belongsTo(Category);

module.exports = {
  User,
  Token,
  Basket,
  BasketProduct,
  ProductSmack,
  ProductBrand,
  Product,
  Category,
  Subcategory,
  Brand,  
  Rating,
  ProductInfo,
  Smack,
  UserFio,
  Contact,
  Social  
} 

// unique: true // уникальность
// allowNull: true // не может быть пустым