const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/add', async (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
        res.end();
    } catch (err) {
        res.status(400).json({ message: err.message });
        res.end();
    }
});

router.get('/list', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        console.log("\n\n 正確", users);
        res.end();
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("\n\n 錯誤", "\n\n");
        res.end();
    }
});

router.get('/', (req, res) => {
    res.write("hello 9527");
    res.end();
});


router.delete('/:firstname', async (req, res) => {
    try {
        const firstname = req.params.firstname;
        const deletedUser = await User.findOneAndDelete({ firstname });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', deletedUser });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;