/**
 * Файл со вспомогательными методами
 */

module.exports = {

  generateEmail : function () {
    var text = '',
        charSet = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for( var i = 0; i < 10; i++ )
      text += charSet.charAt(Math.floor(Math.random() * charSet.length));

    return text + '@po4ta.ru';
  }

};