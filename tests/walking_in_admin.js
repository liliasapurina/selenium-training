var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    test = require('selenium-webdriver/testing'),
    common = require('../utils/common');

test.describe('Проход по всем разделам админки', function () {
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

  test.it('Прокликивание всех пунктов меню', function () {

    driver.findElement(By.id('box-apps-menu')).findElements(By.tagName('li'))
        .then(function (elements) {
          var menuLength = elements.length;

          common.forStartToEnd({start: 1, end: menuLength}, function (args1) {
            // Выюор пункта мею
            var menu = driver.findElement(By.id('box-apps-menu')).findElement(By.xpath('./li[' + args1.start + ']'));
            menu.getText().then(function(text){
              console.info('Нажат пункт: ' + text);
            });
            menu.click();
            driver.findElement(By.id('box-apps-menu')).findElements(By.xpath('./li[' + args1.start + ']//li'))
                .then(function (elements) {
                  var subMenuLength = elements.length;

                  common.forStartToEnd({start: 1, end: subMenuLength}, function (args2) {
                    // Выбор подпункта меню
                    var subMenu = driver.findElement(By.id('box-apps-menu')).findElement(By.xpath('./li[' + args1.start + ']//li[' + args2.start + ']'));
                    subMenu.getText().then(function(text){
                      console.info('Нажат подпункт: ' + text);
                    });
                    subMenu.click();
                  });

                  driver.findElements(By.css('[id=content] h1')).then(function(head){
                      if(head.length === 0){
                        console.error('У страницы нет заголовка!');
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