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

  test.it('Открытие каталога', function () {
    driver.get('http://localhost/litecart/admin/?app=catalog&doc=catalog');
  });

  test.it('Нажатие кнопки "Add new product"', function () {
    driver.findElement(By.id('content')).findElement(By.xpath('.//a[@class="button"][2]')).click();
  });

  test.it('Заполнение вкладки General', function () {
    driver.findElement(By.name('name[en]')).sendKeys('My Duck');
    driver.findElement(By.name('code')).sendKeys(123456);
    driver.findElement(By.xpath('.//input[@data-name="Rubber Ducks"]')).click();
    driver.findElement(By.xpath('.//input[@data-name="Subcategory"]')).click();
    driver.findElement(By.xpath('.//input[@value="1-2"]')).click();
    var quantity = driver.findElement(By.name('quantity'));
    quantity.clear();
    quantity.sendKeys(1);
    driver.findElement(By.name('new_images[]')).sendKeys('C:/Users/Lilia.Sapurina/Documents/GitHub/selenium-training/images/duck.jpg');
    driver.findElement(By.name('date_valid_from')).sendKeys('30.01.2016');
    driver.findElement(By.name('date_valid_to')).sendKeys('13.06.2018');
  });

  test.it('Переход на вкладку "Information"', function () {
    driver.findElement(By.xpath('.//div[@class="tabs"]/ul/li[2]')).click();
  });

  test.it('Заполнение вкладки Information', function () {
    var manufacturer = driver.findElement(By.name('manufacturer_id'));
    manufacturer.click();
    manufacturer.findElement(By.xpath('.//option[@value="1"]')).click();
    manufacturer.click();
    driver.findElement(By.name('keywords')).sendKeys('duck,product');
    driver.findElement(By.name('short_description[en]')).sendKeys('The best duck in this shop!');
    var description = driver.findElement(By.css('.trumbowyg-editor'));
    description.click();
    description.sendKeys('The best duck in this shop!\nLalalalala\nHahaha');
    driver.findElement(By.name('head_title[en]')).sendKeys('Lilia\'s duck');
    driver.findElement(By.name('meta_description[en]')).sendKeys('Pretty duck');
  });

  test.it('Переход на вкладку "Prices"', function () {
    driver.findElement(By.xpath('.//div[@class="tabs"]/ul/li[4]')).click();
  });

  test.it('Заполнение вкладки Prices', function () {
    var purchase_price = driver.findElement(By.name('purchase_price'));
    purchase_price.clear();
    purchase_price.sendKeys(1);
    driver.findElement(By.name('purchase_price_currency_code')).click();
    driver.findElement(By.xpath('.//option[@value="USD"]')).click();
    driver.findElement(By.name('purchase_price_currency_code')).click();
    driver.findElement(By.xpath('.//option[@value="USD"]')).click();
    driver.findElement(By.name('tax_class_id')).click();
    driver.findElement(By.xpath('.//option[@value="USD"]')).click();
    driver.findElement(By.name('prices[USD]')).sendKeys('1.50');
    driver.findElement(By.name('prices[EUR]')).sendKeys('1.35');
  });

  test.it('Сохранение товара', function () {
    driver.findElement(By.name('save')).click();
  });

  test.after(function () {
    driver.quit();
  });

});