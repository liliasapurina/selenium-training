var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Вход в панель администрирования приложения litecart', function() {
  var driver;

  test.before(function() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Открытие главной страницы', function() {
    driver.get('http://localhost/litecart/admin/');
  });

  test.it('Заполнение полей логина и пароля', function() {
    driver.findElement(webdriver.By.name('username')).sendKeys('admin');
    driver.findElement(webdriver.By.name('password')).sendKeys('admin');
  });

  test.it('Нажатие кнопки входа', function() {
    driver.findElement(webdriver.By.name('login')).click();
  });

  test.after(function() {
    driver.quit();
  });
});


