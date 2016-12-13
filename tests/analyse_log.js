var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    test = require('selenium-webdriver/testing'),
    common = require('../utils/common'),
    chai = require('chai'),
    assert = chai.assert;

test.describe('Проверка логов браузера', function () {
  var driver,
      user = {
        name : 'admin',
        password : 'admin'
      };

  test.before(function () {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Открытие главной страницы', function () {
    driver.get('http://localhost/litecart/admin/');
  });

  test.it('Вход в учетную запись', function () {
    driver.findElement(By.name('username')).sendKeys(user.name);
    driver.findElement(By.name('password')).sendKeys(user.password);
    driver.findElement(By.name('login')).click();
  });

  test.it('Открытие страницы с товарами', function () {
    driver.get('http://localhost/litecart/admin/?app=catalog&doc=catalog&category_id=1');
  });

  test.it('Проход по всем продуктам', function () {
    driver.findElements(By.css('.dataTable tr')).then(function (items) {
      common.forStartToEnd({start : 5, end : items.length - 1}, function (args) {
        driver.findElement(By.css('.dataTable tr:nth-child(' + args.start + ') td a')).click();
        driver.findElement(By.name('cancel')).click();
      });
    });
  });

  test.it('Проверка, что полученный лог браузера не содержит ошибок', function () {
    driver.manage().logs().get('browser').then(function (logsEntries) {
      assert.equal(logsEntries.length, 0, 'В логе браузера существуют сообщения об ошибках');
    });
  });

  test.after(function () {
    driver.quit();
  });

});