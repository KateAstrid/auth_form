Приветствую!

Чтобы запустить проект, сначала нужно запустить сервер с моковыми данными. Я использовала сервер json-server-auth, который 
лишает меня необходимости писать бэкэнд. Чтобы запустить сервер, набираем в консоли:

npm install -D json-server json-server-auth
json-server db.json -m ./node_modules/json-server-auth -r routes.json

После установки и запуска сервера набираем:
npm start

Как и требовалось в задании, приложение состоит из двух страниц. Поскольку я писала приложение с использованием React JS, 
для ссылок на каждую страницу использовала библиотеку React Router. Также подключила библиотеку FontAwesomeIcon и подгрузила
шрифт Inconsolata из  Google Fonts. Люблю плоский дизайн и темные темы. 

Кратко по файлам проекта:
- LoginComponent.js - страница входа;
- ContactsTable.js - работа с контактами: добавление, редактирование, удаление и поиск;
- App.js - HTML-разметка страницы с контактами и роуты на обе страницы приложения. 

Сейчас в базе три пользователя:

1)  login 111@111.111
    password 111.111@111

2)  login 222@222.222
    password 222@222.222

3)  login: 333@333.333
    password: 333@333.333

Первый и второй пользователь имеют свой набор контактов, третий - пустой. Также можно зарегистрировать новый контакт, введя новые данные в логин и пароль.  Логин требует почту, поэтому должен содержать '@', а пароль должен быть не меньше четырех символов. 
Контакты можно редактировать, удалять и добавлять. Поиск работает как по номерам, так и по именам контактов. Выход из пользователя
очищает куки и требует введения пароля заново. Я не стала делать пагинацию, так как этого не требовало задание, но знаю, как это
реализовать - постраничный запрос к серверу на каждую кнопку страницы. 

При авторизации или регистрации приложение отправляет запрос контактов на сервер. Код сервера написан таким образом, что он сравнивает
userId пользователя с имеющимися записями по этому пользователю в базе данных. И если ни одна строчка данных не совпадает по userId (например, когда регистрирую нового пользователя, у которого еще нет контактов), то сервер падает. Поэтому запрос контактов я отправляю без указания роута 600, который требует, чтобы пользователь владел данными для чтения и редактирования. Все остальные запросы (удаление, редактирование и добавление контактов) я отправляю через роут 600. 

Приятного тестирования)
