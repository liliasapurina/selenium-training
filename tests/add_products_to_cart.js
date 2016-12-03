var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    test = require('selenium-webdriver/testing'),
    until = require('selenium-webdriver/lib/until');

test.describe('Добавление товаров в корзину', function () {
  var driver;

  var addProductsToCart = function (products) {
    var i = 0;

    products.forEach(function (product) {
      i++;
      // Выберем очередную уточку
      driver.findElement(By.id('box-most-popular')).findElement(By.xpath('.//a[@title="' + product + '"]')).click();
      driver.findElement(By.name('add_cart_product')).click();
      // Ожидаем пока увеличится счетчик товара
      driver.wait(until.elementTextIs(driver.findElement(By.css('#cart .quantity')), String(i)));
      driver.findElement(By.css('#logotype-wrapper a')).click();
    });
  };

  var deleteProductFromCart = function (count) {
    // Удаление очередной уточки
    driver.findElement(By.name('remove_cart_item')).click();

    driver.wait(function () {
      return driver.findElements(By.css('.dataTable tr td.item')).then(function (rows) {
        return rows.length === count;
      });
    }, 1000);
  };

  test.before(function () {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Открытие главной страницы', function () {
    driver.get('http://localhost/litecart/en/');
  });

  test.it('Добавление трех товаров в корзину', function () {
    addProductsToCart(['Purple Duck', 'Blue Duck', 'Green Duck']);
  });

  test.it('Открытие корзины', function () {
    driver.findElement(By.css('#cart .link')).click();
  });

  test.it('Удаление уток из корзины', function () {
    deleteProductFromCart(2);
    deleteProductFromCart(1);
    deleteProductFromCart(0);
  });

  test.after(function () {
    driver.quit();
  });

});