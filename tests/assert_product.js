var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    test = require('selenium-webdriver/testing'),
    chai = require('chai'),
    assert = chai.assert;

test.describe('Проверка страниц с товаром', function () {
  var driver;

  test.before(function () {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Открытие главной страницы', function () {
    driver.get('http://localhost/litecart/en/');
  });

  test.it('Проверка страниц с товаром', function () {
    driver.findElement(By.css('#box-campaigns .product')).then(function (duck) {
      var oldPrice = duck.findElement(By.css('.regular-price')),
          newPrice = duck.findElement(By.css('.campaign-price')),
      // Сохранение текстовых значений
          nameAndPrice = Promise.all([duck.findElement(By.css('.name')).getText(), oldPrice.getText(), newPrice.getText()]),
          oldPriceStyle = Promise.all([oldPrice.getCssValue('color'), oldPrice.getCssValue('font-size'), oldPrice.getCssValue('text-decoration')]),
          newPriseStyle = Promise.all([newPrice.getCssValue('color'), newPrice.getCssValue('font-size'), newPrice.getCssValue('font-weight')]);

      // Проверка стилей
      oldPriceStyle.then(function (oldPrice) {
        assert.equal(oldPrice[0], 'rgba(119, 119, 119, 1)', 'Старая цена не серая');
        assert.equal(oldPrice[2], 'line-through', 'Старая цена не зачеркнута');
        newPriseStyle.then(function (newPrice) {
          assert.equal(newPrice[0], 'rgba(204, 0, 0, 1)', 'Новая цена не красная');
          assert.equal(newPrice[2], 'bold', 'Новая цена не выделена жирным');
          assert.isAtLeast(newPrice[1], oldPrice[1], 'Новая цена больше старой цены');
        });
      });

      duck.click();
      driver.findElement(By.id('box-product')).then(function (product) {
        var productNameAndPrice = Promise.all([product.findElement(By.css('h1')).getText(), product.findElement(By.css('.regular-price')).getText(), product.findElement(By.css('.campaign-price')).getText()]);
        productNameAndPrice.then(function (newInfo) {
          nameAndPrice.then(function (info) {
            assert.equal(info[0], newInfo[0], 'Имена не равны');
            assert.equal(info[1], newInfo[1], 'Старые цены не равны');
            assert.equal(info[2], newInfo[2], 'Новые цены не равны');
          });
        });
      });
    });

  });

  test.after(function () {
    driver.quit();
  });

});