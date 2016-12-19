var Cart = function() {

  /**
   * Удаление очередного товара из корзины
   */
  this.deleteProductFromCart = function () {
    // Удаление очередной уточки
    driver.findElement(By.name('remove_cart_item')).click();
  };

  /**
   * Проверка
   * Товар был действительно удалён
   */
  this.assertThatProductWaDeleted = function () {
    driver.findElements(By.css('.dataTable tr td.item')).then(function (oldRows) {
      var oldCount = oldRows.length;
      driver.wait(function () {
        return driver.findElements(By.css('.dataTable tr td.item')).then(function (rows) {
          return rows.length === oldRows.length - 1;
        });
      }, 1000);
    });
  };

  /**
   * Удаление всех товаров из корзины
   * @param {number} count Количество товаров
   */
  this.deleteAllProducts = function (count) {
    for(var i = 0; i < count; i++){
      this.deleteProductFromCart();
      this.assertThatProductWaDeleted();
    }
  };

};

module.exports = Cart;