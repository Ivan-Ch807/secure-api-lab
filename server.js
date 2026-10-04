const express = require('express');
// Імпортуємо всі дані
const { users, documents, employees } = require('./data');

const app = express();
const PORT = 3000;

// 1. Автоматичний парсинг JSON
app.use(express.json());

// --- MIDDLEWARE ЛОГУВАННЯ ---
const loggingMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;

    // Виводимо інформацію в консоль
    console.log(`[${timestamp}] ${method} ${url}`);

    // Обов'язково передаємо управління далі
    next();
};

// Глобально застосовуємо логер до всіх запитів
app.use(loggingMiddleware);

// --- MIDDLEWARE БЕЗПЕКИ ---

// Middleware для аутентифікації
const authMiddleware = (req, res, next) => {
    const login = req.headers['x-login'];
    const password = req.headers['x-password'];

    const user = users.find(u => u.login === login && u.password === password);

    if (!user) {
        return res.status(401).json({
            message: 'Authentication failed. Please provide valid credentials in headers X-Login and X-Password.'
        });
    }

    req.user = user;
    next();
};

// Middleware для авторизації
const adminOnlyMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Access denied. Admin role required.'
        });
    }
    next();
};

// --- МАРШРУТИ ДЛЯ РЕСУРСІВ ---

app.get('/documents', authMiddleware, (req, res) => {
    res.status(200).json(documents);
});

app.post('/documents', authMiddleware, (req, res) => {
    const newDocument = req.body;
    newDocument.id = Date.now();
    documents.push(newDocument);
    res.status(201).json(newDocument);
});

app.get('/employees', authMiddleware, adminOnlyMiddleware, (req, res) => {
    res.status(200).json(employees);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});