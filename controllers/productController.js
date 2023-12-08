const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
    try {
        let products;

        if (Array.isArray(req.body)) {
            // Se req.body é uma matriz, insere vários produtos
            products = await Product.insertMany(req.body);
        } else {
            // Se req.body não é uma matriz, insere um único produto
            const product = new Product(req.body);
            await product.save();
            products = [product];
        }

        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const page = req.query.page || 1; // Se req.query.page não estiver definido, default para 1
        const limit = 10; // Número de produtos por página
        const products = await Product.paginate({}, { page, limit });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
