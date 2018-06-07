/**
 * 原型链式继承
 * 存在的问题：
 *  1.父类中若存在引用类型的共有属性，就会在子类中被所有实例共享
 *  2.在创建子类时，无法向父类传参
 */
//声明父类
function SuperClass() {
  this.superValue = true;
}
//为父类添加共有方法
SuperClass.prototype.getSuperValue = function () {
  return this.superValue;
}
//声明子类
function SubClass() {
  this.subValue = false;
}

//继承父类
SubClass.prototype = new SuperClass();

//为子类添加共有方法
SubClass.prototype.getSubValue = function () {
  return this.subValue;
}

//测试用例
var instance = new SubClass();
console.log(instance.getSubValue()); //false
console.log(instance.getSuperValue()); //true
console.log(instance instanceof SuperClass) //true
console.log(instance instanceof SubClass) //true
console.log(instance instanceof Object) //true
//instanceof的判断依据是通过查找原型链
console.log(SubClass instanceof SuperClass) //false
console.log(SubClass.prototype instanceof SuperClass) //true




/**
 * 构造函数式继承
 * 存在的问题：
 *  1.父类原型中定义的方法不能被字类共用
 */
function SuperClass(id) {
  //引用类型共有属性
  this.books = ['js', 'html', 'css'];
  //值类型共有属性
  this.id = id;
}
//为父类添加共有方法
SuperClass.prototype.showBooks = function () {
  console.log(this.books);
}
//声明子类
function SubClass(id) {
  //继承父类
  SuperClass.call(this, id);
}

//测试用例
var instance1 = new SubClass(10);
var instance2 = new SubClass(11);

instance1.books.push('设计模式');
console.log(instance1.books); //["js", "html", "css", "设计模式"]
console.log(instance1.id) //10
console.log(instance2.books) //["js", "html", "css"]
console.log(instance2.id); //11
instance1.showBooks(); //Uncaught TypeError: instance1.showBooks is not a function




/**
 * 组合继承（吸收了原型链式继承与构造函数式继承的继承的优点）
 * 缺点：
 *  1.调用了两次父类
 */
function SuperClass(name) {
  this.name = name;
  this.books = ['js', 'html', 'css'];
}
SuperClass.prototype.getName = function () {
  console.log(this.name);
}

function SubClass(name, time) {
  SuperClass.call(this, name); //第二次调用SuperClass()
  this.time = time;
}
SubClass.prototype = new SuperClass(); //第一次调用SuperClass()
SubClass.prototype.getTime = function () {
  console.log(this.time);
}

//测试用例
var instance1 = new SubClass('js book', 2014);
var instance2 = new SubClass('css book', 2013);

instance1.books.push('设计模式');
console.log(instance1);
console.log(instance1.books); //["js", "html", "css", "设计模式"]
instance1.getName(); //js book
instance1.getTime(); //2014

console.log(instance2.books); //["js", "html", "css"]
instance2.getName(); //css book
instance2.getTime(); //2013




/**
 * 原型式继承（老道发明）
 * 缺点：同原型链式继承
 * 
 * ES5添加了Object.create()方法，规范了原型式继承
 */
function inheritObject(o) {
  //声明一个过渡对象
  function F() {};
  // 过度对象的原型继承传入的父对象o
  F.prototype = o;
  // 返回过渡对象的一个实例
  return new F();
}

//测试用例
var book = {
  name: "js book",
  alikeBook: ["css book", "html book"]
};
var newBook = inheritObject(book);
newBook.name = "ajax book";
newBook.alikeBook.push("xml book");

var otherBook = inheritObject(book);
otherBook.name = "flash book";
otherBook.alikeBook.push("as book");

console.log(newBook.name); //ajax book
console.log(newBook.alikeBook); //["css book", "html book", "xml book", "as book"]
console.log(otherBook.name); //flash book
console.log(otherBook.alikeBook); //["css book", "html book", "xml book", "as book"]
console.log(book.name); //js book
console.log(book.alikeBook); //["css book", "html book", "xml book", "as book"]




/**
 * 寄生式继承(由原型式继承演变而来)
 */
var book = {
  name: "js book",
  alikeBook: ["css book", "html book"]
};

function createBook(obj) {
  // 通过原型式继承创建新对象
  var o = inheritObject(obj);
  // 增强对象
  o.getName = function () {
    console.log(name);
  };
  // 返回增强后的对象
  return o;
}




/**
 * 寄生组合式继承（终极继承方案）， 处理的不是对象，而是类的原型
 */
function inheritPrototype(subClass, superClass) {
  // 复制一份父类的原型副本
  var p = inheritObject(superClass.prototype);
  // 修正因重写子类原型导致子类的constructor属性被修改
  p.constructor = subClass;
  // 设置子类的原型
  subClass.prototype = p;
}

//测试用例
function SuperClass(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
SuperClass.prototype.getName = function () {
  console.log(this.name);
}

function SubClass(name, time) {
  SuperClass.call(this, name);
  this.time = time;
}
// 寄生式继承父类的原型
inheritPrototype(SubClass, SuperClass);
SubClass.prototype.getTime = function () {
  console.log(this.time);
}

var instance1 = new SubClass('js book', 2014);
var instance2 = new SubClass('css book', 2013);

instance1.colors.push("black");
console.log(instance1.colors); //["red", "blue", "green", "black"]
console.log(instance2.colors); //["red", "blue", "green"]
instance2.getName(); //css book
instance2.getTime(); //2013




/**
 * 多继承
 */