var test = require('selenium-webdriver/testing'),
    common = require('../utils/common'),
    Main = require('../PO/main'),
    Product = require('../PO/product'),
    Cart = require('../PO/cart'),
    main,
    product,
    cart;

test.describe('Добавление товаров в корзину', function () {

  test.before(function () {
    common.init('chrome');
    main = new Main();
    product = new Product();
    cart = new Cart();
  });

  test.it('Открытие главной страницы', function () {
    main.open();
  });

  test.it('Добавление первого товара в корзину', function () {
    main.chooseProduct('Purple Duck');
    product.addProductToCart();
    product.returnToMainPage();
  });

  test.it('Добавление второго товара в корзину', function () {
    main.chooseProduct('Blue Duck');
    product.addProductToCart();
    product.returnToMainPage();
  });

  test.it('Добавление третьего товара в корзину', function () {
    main.chooseProduct('Green Duck');
    product.addProductToCart();
    product.returnToMainPage();
  });

  test.it('Открытие корзины', function () {
    main.openCart();
  });

  test.it('Удаление всех товаров из корзины', function () {
    cart.deleteAllProducts(3);
  });

  test.after(function () {
    common.end();
  });

});