# Secure REST API Lab

Даний проєкт є лабораторною роботою з розробки та тестування захищеного RESTful API на Node.js з використанням фреймворку Express.

У проєкті реалізовано механізми логування запитів, аутентифікації за HTTP-заголовками (`X-Login`, `X-Password`) та авторизації на основі ролей (`user`, `admin`).

## Інструкція з запуску

1. Встановлення залежностей:
   ```bash
   npm install
   ```

2. Запуск вебсервера:
   ```bash
   npm start
   ```

3. Запуск автоматичних тестів:
   ```bash
   npm test
   ```

## Опис API Ендпоінтів

| Метод | URL | Необхідні заголовки | Тіло запиту (Body) | Опис | Можливі коди відповідей |
|---|---|---|---|---|---|
| GET | `/documents` | `X-Login`, `X-Password` | — | Отримання списку всіх документів | `200 OK`, `401 Unauthorized` |
| POST | `/documents` | `X-Login`, `X-Password` | `{"title": "...", "content": "..."}` | Створення нового документа | `201 Created`, `400 Bad Request`, `401 Unauthorized` |
| DELETE | `/documents/:id` | `X-Login`, `X-Password` | — | Видалення документа за ідентифікатором | `204 No Content`, `401 Unauthorized`, `404 Not Found` |
| GET | `/employees` | `X-Login`, `X-Password` (тільки `admin`) | — | Отримання списку співробітників | `200 OK`, `401 Unauthorized`, `403 Forbidden` |

## Посилання на репозиторій
`https://github.com/Ivan-Ch807/secure-api-lab`
````