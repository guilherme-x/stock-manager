'use strict'

const fs = require('fs')
const Helpers = use('Helpers')

class ProductController {
    constructor() {
        this.filePath = Helpers.publicPath('products.json')
    }

    index = async ({ response }) => {
        try {
            const products = JSON.parse(fs.readFileSync(this.filePath))
            return response.status(200).json(products)
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao listar produtos.' })
        }
    }

    show = async ({ params, response }) => {
        try {
            const products = JSON.parse(fs.readFileSync(this.filePath))
            const product = products.find((p) => p.id === parseInt(params.id))
            if (!product) {
                return response.status(404).json({ error: 'Produto não encontrado.' })
            }
            return response.status(200).json(product)
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao buscar o produto.' })
        }
    }

    store = async ({ request, response }) => {
        try {
            const products = JSON.parse(fs.readFileSync(this.filePath))
            const newProduct = request.only([
                'name',
                'brand',
                'category',
                'price',
                'weight',
                'volume',
                'description'
            ])
            newProduct.id = products.length + 1
            products.push(newProduct)
            fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2))
            return response.status(201).json(newProduct)
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao criar o produto.' })
        }
    }

    update = async ({ params, request, response }) => {
        try {
            const products = JSON.parse(fs.readFileSync(this.filePath))
            const index = products.findIndex((p) => p.id === parseInt(params.id))
            if (index === -1) {
                return response.status(404).json({ error: 'Produto não encontrado.' })
            }
            const updatedProduct = request.only([
                'name',
                'brand',
                'category',
                'price',
                'weight',
                'volume',
                'description'
            ])
            products[index] = { ...products[index], ...updatedProduct }
            fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2))
            return response.status(200).json(products[index])
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao atualizar o produto.' })
        }
    }

    destroy = async ({ params, response }) => {
        try {
            const products = JSON.parse(fs.readFileSync(this.filePath))
            const index = products.findIndex((p) => p.id === parseInt(params.id))
            if (index === -1) {
                return response.status(404).json({ error: 'Produto não encontrado.' })
            }
            products.splice(index, 1)
            fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2))
            return response.status(204).json()
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao excluir o produto.' })
        }
    }
}

module.exports = ProductController
