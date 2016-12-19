var until = require('selenium-webdriver/lib/until');

var Product = function() {

  /**
   * Добавление выбранного товара в корзину
   */
  this.addProductToCart = function () {
    driver.findElement(By.css('#cart .quantity')).getText().then(function(oldCount){
      driver.findElement(By.name('add_cart_product')).click();
      // Ожидаем пока увеличится счетчик товара
      driver.wait(until.elementTextIs(driver.findElement(By.css('#cart .quantity')), String(Number(oldCount) + 1)));
    });
  };

  /**
   * Возврат на главную страницу
   */
  this.returnToMainPage = function () {
    driver.findElement(By.css('#logotype-wrapper a')).click();
  };

};

module.exports = Product;