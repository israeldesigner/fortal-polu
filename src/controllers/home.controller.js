/* eslint-disable no-undef */
const HomeModel = require('../models/HomeModel');
const Excel = require('../models/ConvertModel');

exports.index = async (req, res) => {
    const excel = new Excel();
    console.log(excel);
    const tables = await excel.buscaListaLocal();
    res.render('index', {
        tables
    });
    return
}
