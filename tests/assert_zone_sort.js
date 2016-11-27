var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    test = require('selenium-webdriver/testing'),
    chai = require('chai'),
    assert = chai.assert,
    common = require('../utils/common');

test.describe('Проверка сортировки зон', function () {
  var driver;

  test.before(function () {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Открытие главной страницы', function () {
    driver.get('http://localhost/litecart/admin/');
  });

  test.it('Заполнение полей логина и пароля', function () {
    driver.findElement(By.name('username')).sendKeys('admin');
    driver.findElement(By.name('password')).sendKeys('admin');
  });

  test.it('Нажатие кнопки входа', function () {
    driver.findElement(By.name('login')).click();
  });

  test.it('Открытие страницы со странами', function () {
    driver.get('http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones');
  });

  test.it('Проверка зон', function () {
    // Массив объектов, содержащих названия стран
    driver.findElement(By.name('geo_zones_form')).findElements(By.css('.row')).then(function (items) {
      // Цикл по странам
      common.forStartToEnd({start : 0, end : items.length - 1}, function (args1) {
        var i = args1.start;
       // Цикл по всем выбранным зонам
        driver.findElement(By.name('geo_zones_form')).findElements(By.css('.row')).then(function (arr) {
          arr[i].findElement(By.css('td:nth-child(3) a')).click();

          driver.findElements(By.css('.dataTable tr td:nth-child(3) [selected="selected"]')).then(function (zones) {
            common.forStartToEnd({start : 1, end : zones.length - 1, arr : zones}, function (args2) {
              args2.arr[args2.start].getText().then(function (text1) {
                  args2.arr[args2.start - 1].getText().then(function (text2) {
                    assert.isAtLeast(text2, text1, 'Зоны ' + text1 + ' и ' + text2 + ' расположены не по алфавиту');
                  });
              });
            });
          });
          // Возврат на страницу со странами
          driver.findElement(By.name('cancel')).click();
        });
      });
    });
  });

  test.after(function () {
    driver.quit();
  });

});