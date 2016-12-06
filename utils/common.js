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
  forStartToEnd : function (args, todo) {
    if (args.start <= args.end) {
      todo(args);

      args.start++;
      this.forStartToEnd(args, todo);
    }
  },

  /*
   Поиск добавленного в массив элемента
   */
  diffArrays : function (A, B) {
    var elem;

    B.forEach(function (item) {
      if (A.indexOf(item) === -1) {
        elem = item;
      }
    });
    return elem;
  }

};