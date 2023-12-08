const express = require('express');
const UserController = require('../controllers/User');

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const user = await UserController.createUser(nome, email, senha);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try{
        const users = await UserController.getAllUsers();
        res.status(200).json(users);
    }
    catch (error){
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserController.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado'});
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const updatedUser = await UserController.updateUserById(id, newData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(updatedUser);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }

});

router.delete('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserController.deleteUserById(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(deletedUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;