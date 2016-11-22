var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    common = require('../utils/common');

test.describe('Регистрация в приложении litecart', function() {
  var driver,
      user = {
        firstname: 'Лилия',
        lastname: 'Сапурина',
        address: 'Почтамская ул.3',
        poscode: '190068',
        city: 'Санкт-Петербург',
        email: common.generateEmail(),
        phone: '+7-911-258-13-96',
        password: '1111'
      };

  test.before(function() {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Открытие главной страницы', function() {
    driver.get('http://localhost/litecart/en/');
  });

  test.it('Переход на форму регистрации', function() {
    driver.findElement(By.xpath("//a[contains(text(),'New customers click here')]")).click();
  });

  test.it('Регистрация пользователя', function() {
    driver.findElement(webdriver.By.name('firstname')).sendKeys(user.firstname);
    driver.findElement(webdriver.By.name('lastname')).sendKeys(user.lastname);
    driver.findElement(webdriver.By.name('address1')).sendKeys(user.address);
    driver.findElement(webdriver.By.name('postcode')).sendKeys(user.poscode);
    driver.findElement(webdriver.By.name('city')).sendKeys(user.city);
    driver.findElement(webdriver.By.name('email')).sendKeys(user.email);
    driver.findElement(webdriver.By.name('phone')).sendKeys(user.phone);
    driver.findElement(webdriver.By.name('password')).sendKeys(user.password);
    driver.findElement(webdriver.By.name('confirmed_password')).sendKeys(user.password);
    driver.findElement(webdriver.By.name('create_account')).click();
  });

  test.it('Выход из учетной записи', function() {
    driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();
  });

  test.it('Вход под созданной учетной записью', function() {
    driver.findElement(webdriver.By.name('email')).sendKeys(user.email);
    driver.findElement(webdriver.By.name('password')).sendKeys(user.password);
    driver.findElement(webdriver.By.name('login')).click();
  });

  test.it('Выход из учетной записи', function() {
    driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();
  });

  test.after(function() {
    driver.quit();
  });
  
});