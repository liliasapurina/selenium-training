/**
 * Файл со вспомогательными методами
 */

module.exports = {

  /*
   Генерация уникального email
   */
  generateEmail : function () {
    var text = '',
        charSet = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 10; i++)
      text += charSet.charAt(Math.floor(Math.random() * charSet.length));

    return text + '@po4ta.ru';
  },

  /*
   Имитация цикла for для асинхронных действий
   */
  forStartToEnd : function (start, end, todo) {
    if (start <= end) {
      todo(start);
      this.forStartToEnd(start + 1, end, todo);
    }
  }

};