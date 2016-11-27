var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    test = require('selenium-webdriver/testing'),
    chai = require('chai'),
    assert = chai.assert,
    common = require('../utils/common');

test.describe('Проверка сортировки стран и зон', function () {
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
    driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
  });

  test.it('Проверка стран и зон, если они есть', function () {
    // Массив объектов, содержащих названия стран
    driver.findElement(By.name('countries_form')).findElements(By.css('.row')).then(function (items) {
      // Цикл по странам
      common.forStartToEnd({start : 1, end : items.length - 1}, function (args1) {
        var i = args1.start;
        // Цикл по всем странам (после обновления страницы снова находим)
        driver.findElement(By.name('countries_form')).findElements(By.css('.row')).then(function (arr) {
          var country = arr[i];

          country.findElement(By.css('td:nth-child(6)')).getText().then(function (zone) {
            // Если количество зон ненулевое
            if (zone !== '0') {
              country.findElement(By.css('td:nth-child(5) a')).click();
              driver.findElements(By.css('.dataTable tr td:nth-child(3)')).then(function (zones) {
                common.forStartToEnd({start : 1, end : zones.length - 2, arr : zones}, function (args2) {
                  var j = args2.start;
                  // Снова находим после обновления
                  driver.findElements(By.css('.dataTable tr td:nth-child(3)')).then(function (stZones) {
                    stZones[j].getText().then(function (text1) {
                      stZones[j - 1].getText().then(function (text2) {
                        assert.isAtLeast(text1, text2, 'Зоны ' + text1 + ' и ' + text2 + ' расположены не по алфавиту');
                      });
                    });
                  });
                })
              });
              // Возврат на страницу со странами
              driver.findElement(By.name('cancel')).click();
            } else {
              country.findElement(By.css('td:nth-child(5)')).getText().then(function (text1) {
                country.findElement(By.css('td:nth-child(5)')).getText().then(function (text2) {
                  assert.isAtLeast(text2, text1, 'Страны ' + text1 + ' и ' + text2 + ' расположены не по алфавиту');
                });
              });
            }
          });
        });
      });
    });
  });

  test.after(function () {
    driver.quit();
  });

});