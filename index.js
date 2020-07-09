// Телефонная книга
// В качестве ключа будем использовать имя контакта
// Значением будет список телефонов контакта
var phoneBook = {};

/**
 * @param {String} name
 * @param {String}  phones
 * @returns {} выход из функции
 */

// Функция добавляет контак
function addContact(name, phones) {

    //Разделим строку phones на массив строк
    var arrayPhone = phones.split(',');
    //Массив содержит номера телефонов
    var numbersPhone;

    //Проверяем содержит ли объект phoneBook свойство с именем name

    if (phoneBook.hasOwnProperty(name)) {
        // По условию гарантируется уникальность добавляемых телефонов
        // Возвращаем новый массив, состоящий из массива arrayPhone и
        // соединённого со значениями из свойства с именем name
        numbersPhone = phoneBook[name].concat(arrayPhone);

        // Добавляем свойству с именем name объекта phoneBook значения
        phoneBook[name] = numbersPhone;

    } else {
        phoneBook[name] = arrayPhone;
    }
    return;
};

/**
 * @param {String} PhoneRemove
 * @returns {Boolean} - результат true/false
 */
// Функция удаляет номер из телефонной книги
function removePhoneContact(PhoneRemove) {
    var namePhoneRemove = PhoneRemove;

    //Переберем каждый ключ объекта по очереди
    for (let key in phoneBook) {

        //Проверим содержит ли значения свойства объекта элемент PhoneRemove( возвращая в зависимости от этого true или false)
        if (phoneBook[key].includes(PhoneRemove)) {

            // Если значений в свойстве объекта больше чем 1 элемент
            // Методом indexOf() возвращает первый индекс, по которому данный элемент может быть найден в свойстве объекта
            // Методом splice() изменим содержимое в свойстве объекта (1й параметр вернувщийся идекс, 2й параметр колличество удаления элементов)
            if (phoneBook[key].length > 1) {
                phoneBook[key].splice((phoneBook[key].indexOf(PhoneRemove)),1);
            }
            //Иначе просто удаляем свойство
            else {
                delete phoneBook[key];
            };

            //Вернем true если телефон успешно удален
            return true;
        };
    };

    //Вернем false - такого телефона не существует
    return false;
};
/**
 * @param {*} - ничего не принемает
 * @returns {Object} -  возвращает stringArray
 */
// Функция возвращает содержимое массива
function show() {

    //Объявляем переменную, которая будет хранить отсортированный по имени контактов массив
    var stringArray = [];

    //Получаем список всех контактов
    var keys = Object.keys(phoneBook);

    // Сортируем имена (функция sort меняет массив)
    keys.sort();

    //Проверяем колличесво контактов
    if (keys.length > 0) {
        //Тут для итерации по контактам используем цикл
        for (var i = 0; i < keys.length; i++) {
            // Формируем строчку для контакта
            var resultString = keys[i] + ': ' + phoneBook[keys[i]].join(', ');
            // Добавляем в массив stringArray
            stringArray.push(resultString);
        }
        return stringArray;
    }
    else {
        return stringArray;
    }
};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {

    // Разбиваем комнаду по пробелу
    // В нулевой позиции массива лежит название команды
     var commandName = command.split(' ')[0] ;

    // Проверяем команды
    // Обработка команд ADD
   if (commandName === 'ADD') {
        var name = command.split(' ')[1];
        var phones = command.split(' ')[2];

        // Вернем результат выполнения функции addContact
        return addContact(name, phones);
    };

    // Обработка команд REMOVE_PHONE
    if (commandName === 'REMOVE_PHONE') {

        var PhoneRemove = command.split(' ')[1];

        // Вернем результат выполнения функции removePhoneContact
        return removePhoneContact(PhoneRemove);
    };

    // Обработка команд SHOW
    if (commandName === 'SHOW') {

    // Вернем результат выполнения функции show
    return show();
    };

};
