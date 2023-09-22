'use strict'

const Route = use('Route')

Route.get('/products', 'ProductController.index')
Route.get('/products/:id', 'ProductController.show')
Route.post('/products', 'ProductController.store')
Route.put('/products/:id', 'ProductController.update')
Route.delete('/products/:id', 'ProductController.destroy')
