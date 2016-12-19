var Main = function() {

  /**
   * Открытие главной страницы
   */
  this.open = function () {
    driver.get('http://localhost/litecart/en/');
  };

  /**
   * Переход на страницу товара
   * @param {string} product Название товара
   */
  this.chooseProduct = function (product) {
    driver.findElement(By.id('box-most-popular')).findElement(By.xpath('.//a[@title="' + product + '"]')).click();
  };

  /**
   * Открытие корзины
   */
  this.openCart = function () {
    driver.findElement(By.css('#cart .link')).click();
  };

};

module.exports = Main;