var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    test = require('selenium-webdriver/testing'),
    common = require('../utils/common');

test.describe('Проверка наличия стикеров у товаров', function () {
  var driver,
      user = {
        firstname : 'Лилия',
        lastname : 'Сапурина',
        address : 'Почтамская ул.3',
        poscode : '190068',
        city : 'Санкт-Петербург',
        email : common.generateEmail(),
        phone : '+7-911-258-13-96',
        password : '1111'
      };

  test.before(function () {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
  });

  test.it('Открытие главной страницы', function () {
    driver.get('http://localhost/litecart/en/');
  });

  test.it('Переход на форму регистрации', function () {
    driver.findElement(By.xpath("//a[contains(text(),'New customers click here')]")).click();
  });

  test.it('Регистрация пользователя', function () {
    driver.findElement(By.name('firstname')).sendKeys(user.firstname);
    driver.findElement(By.name('lastname')).sendKeys(user.lastname);
    driver.findElement(By.name('address1')).sendKeys(user.address);
    driver.findElement(By.name('postcode')).sendKeys(user.poscode);
    driver.findElement(By.name('city')).sendKeys(user.city);
    driver.findElement(By.name('email')).sendKeys(user.email);
    driver.findElement(By.name('phone')).sendKeys(user.phone);
    driver.findElement(By.name('password')).sendKeys(user.password);
    driver.findElement(By.name('confirmed_password')).sendKeys(user.password);
    driver.findElement(By.name('create_account')).click();
  });

  test.it('Проверка наличия стикеров', function () {
    var boxes = driver.findElements(By.css('.middle > .content .box')),
        content = driver.findElement(By.css('.middle > .content'));

    // Идем по всем боксам
    boxes.then(function (boxes) {
      var boxesCount = boxes.length;

      common.forStartToEnd({start: 1, end: boxesCount}, function (args1) {
        var box = content.findElement(By.xpath('//*[contains(@class,"box")][' + args1.start + ']'));

        box.findElements(By.css('.product'))
            .then(function (ducks) {
              var ducksLength = ducks.length;

              common.forStartToEnd({start: 1, end: ducksLength}, function (args2) {
                var duck = box.findElement(By.css('.product:nth-child(' + args2.start + ')'));

                duck.findElement(By.css('.name')).getText().then(function (text) {
                  duck.findElements(By.css('.sticker')).then(function (stickers) {
                    var stickersLength = stickers.length;
                    if (stickersLength === 0 || stickersLength > 1) {
                      console.error('У уточки ' + text + ' неверное количество стикеров: ' + stickersLength);
                    }
                  });
                });
              });

            });
      });
    });
  });

  test.after(function () {
    driver.quit();
  });

});