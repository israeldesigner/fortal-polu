const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/home.controller.js');
const loginController = require('./src/controllers/login.controller.js');
const cadastroController = require('./src/controllers/cadastro.controller.js')
const testeController = require('./src/controllers/teste.controller.js');
const convertController = require('./src/controllers/convert.controller.js');


//rotas da  home
route.get('/', homeController.index);
route.get('/alt_index', homeController.alt_index);
route.get('/api_excel',homeController.apiExcel );
route.get('/api_all',homeController.apiAll );

//rotas de login
route.get('/login', loginController.index);
route.post('/login/login', loginController.login);

//rotas de cadastro
route.get('/cadastro', cadastroController.index);
route.post('/cadastro/register', cadastroController.register);

//rotas de teste
route.get('/cadastro/teste', testeController.index);

//convert
route.get('/converter', convertController.index);
route.post('/converter/upload', convertController.uploadfile);

module.exports = route;
