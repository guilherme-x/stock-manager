const User = require ('../models/userModel')

async function createUser(nome, email, senha){
    try {
        const user = await User.create({ nome, email, senha });
        return user;
    }
    catch (error) {
        throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
}

async function getAllUsers() {
    try {
        const users = await User.find();
        return users;
    }
    catch (error) {
        throw new Error(`Erro ao buscar usuários: ${error.message}`);
    }
}

async function getUserById(userId) {
    try {
        const user = await User.findById(userId);
        return user;
    }
    catch (error) {
        throw new Error(`Erro ao atualizar usuário por ID: ${error.message}`);
    }
}

async function updateUserById(userId, newData){
    try {
        const updateUser = await User.findByIdAndUpdate(userId, newData, { new: true });
        return updateUser;
    }
    catch (error) {
        throw new Error(`Erro ao atualizar usuário por ID: ${error.message}`);
    }

}

async function deleteUserById(userId){
    try {
        const deleteUser = await User.findByIdAndDelete(userId);
        return deleteUser;
    }
    catch (error) {
        throw new Error(`Erro ao deletar usuário por ID: ${error.message}`);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};