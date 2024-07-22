require('dotenv/config');
const cors =require('cors');
const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// created status codes
const { SERVER_ERROR, NO_CONTENT, CREATED } = require('./utils/http_status_codes.js');

// import all routes here
const {expensesRouter} =require('./routes/index.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()) // setup cors
app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({ extended: true, limit: '30mb' })); // To handle URL-encoded data

/**
 * TODO: Refactor server to follow mvc
 * 
 * moved the expense route into routes/expense-route.js file
 * now move the the auth route into routes/auth-route.js file and follow the format as in the expense-route.js
 */


// routes
app.use('/api/expenses', expensesRouter)


// In-memory users data
const users = [
    {
        username: 'user1',
        password: '$2a$10$Qd6Hz/Y7FoY7k1Y1p1hlwec4Ge7YmJlI3HNL.N6.GBWoRa.kIRXme' // hashed password for "password123"
    }
];

// In-memory expenses data
let expenses = [
    { id: 1, user: 'user1', item: 'coffee', amount: 3 },
    { id: 2, user: 'user1', item: 'lunch', amount: 12 }
];



// User authentication endpoint
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(OK).json({ token });
});





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
