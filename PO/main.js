var Main = function() {

  /**
   * �������� ������� ��������
   */
  this.open = function () {
    driver.get('http://localhost/litecart/en/');
  };

  /**
   * ������� �� �������� ������
   * @param {string} product �������� ������
   */
  this.chooseProduct = function (product) {
    driver.findElement(By.id('box-most-popular')).findElement(By.xpath('.//a[@title="' + product + '"]')).click();
  };

  /**
   * �������� �������
   */
  this.openCart = function () {
    driver.findElement(By.css('#cart .link')).click();
  };

};

module.exports = Main;