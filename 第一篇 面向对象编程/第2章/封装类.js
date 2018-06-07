//私有属性与私有方法，特权方法，对象共有属性和对象共有方法，构造器
var Book = function (id, name, price) {
  //私有属性,通过类名访问
  var num = 1;
  //私有方法,通过类名访问
  function checkId() {};

  //特权方法：有权访问共有属性共有方法和类的私有属性和私有方法
  this.getName = function () {};
  this.getPrice = function () {};
  this.setName = function () {};
  this.setPrice = function () {};

  //对象共有属性
  this.id = id;
  //对象共有方法
  this.copy = function () {};

  //构造器：创建对象时调用的特权方法
  this.setName(name);
  this.setPrice(price);

}

//类静态公有属性（对象不能访问）,通过类名访问
Book.isChinese = true;
//类静态公有方法（对象不能访问）,通过类名访问
Book.resetTime = function () {
  console.log('new Time');
};
Book.prototype = {
  //公有属性
  isJSBook: false,
  //公有方法
  display: function () {}
}



//将类的静态变量通过闭包实现
var Book = (function () {
  //静态私有变量
  var bookNum = 0;
  //静态私有方法
  function checkBook(name) {};

  //返回构造函数
  return function (newID, newName, newPrice) {
    //私有变量
    var name, price;
    //私有方法
    function checkId(id) {};

    //特权方法
    this.getName = function () {};
    this.getPrice = function () {};
    this.setName = function () {};
    this.setPrice = function () {};

    //共有属性和方法
    this.id = newID;
    this.copy = function () {};

    bookNum++;
    if (bookNum > 100) {
      throw new Error('我们仅出版100本书');
    }

    //构造器：创建对象时调用的特权方法
    this.setName(name);
    this.setPrice(price);
  };
})();

Book.prototype = {
  //静态公有属性
  isJSBook: false,
  //静态公有方法
  display: function () {}
}



//利用闭包实现
var Book = (function () {
  //静态私有变量
  var bookNum = 0;
  //静态私有方法
  function checkBook(name) {};

  //创建类
  function _book(newID, newName, newPrice) {
    //私有变量
    var name, price;
    //私有方法
    function checkId(id) {};

    //特权方法
    this.getName = function () {};
    this.getPrice = function () {};
    this.setName = function () {};
    this.setPrice = function () {};

    //共有属性和方法
    this.id = newID;
    this.copy = function () {};

    bookNum++;
    if (bookNum > 100) {
      throw new Error('我们仅出版100本书');
    }

    //构造器：创建对象时调用的特权方法
    this.setName(name);
    this.setPrice(price);
  }
  //构建原型
  _book.prototype = {
    //静态公有属性
    isJSBook: false,
    //静态公有方法
    display: function () {}
  }
  //返回类
  return _book;
})();



//创建对象的安全模式（JS高程：作用域安全的构造函数）
var Book = function (title, time, type) {
  //判断执行过程中的this是否是当前这个对象（如果是说明使用new创建的)
  if (this instanceof Book) {
    this.title = title;
    this.time = time;
    this.type = type;
  } else { //否则重新创建这个对象
    return new Book(title, time, type);
  }
};