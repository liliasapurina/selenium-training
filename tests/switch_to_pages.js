var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    test = require('selenium-webdriver/testing'),
    common = require('../utils/common');

test.describe('Проверка переходов по ссылкам', function () {
  var driver,
      user = {
        name : 'admin',
        password : 'admin'
      };

  var thereIsWindowOtherThan = function (oldWindows) {
    return driver.getAllWindowHandles().then(function (newWindows) {
      var pri = driver.wait(function () {
        return oldWindows.length < newWindows.length;
      }, 1000);

      if (pri) {
        return common.diffArrays(oldWindows, newWindows);
      }
    });
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

  test.it('Открытие страницы со странами', function () {
    driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
  });

  test.it('Открытие страницы для добавления новой страны', function () {
    driver.findElement(By.css('#content .button')).click();
  });

  test.it('Последовательный переход на внешние страницы', function () {
    var mainWindow = driver.getWindowHandle();

    driver.findElements(By.css('.fa-external-link')).then(function (links) {
      links.forEach(function (link) {
        driver.getAllWindowHandles().then(function (oldWindows) {
          link.click();
          return thereIsWindowOtherThan(oldWindows);
        }).then(function (newWindow) {
          driver.switchTo().window(newWindow);
          driver.close();
          driver.switchTo().window(mainWindow);
        });
      });
    });

  });

  test.after(function () {
    driver.quit();
  });

});