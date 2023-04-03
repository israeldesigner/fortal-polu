/* eslint-disable no-undef */
const HomeModel = require('../models/HomeModel');
const Excel = require('../models/ConvertModel');

exports.index = async (req, res) => {
    const excel = new Excel();
    const tables = await excel.buscaListaLocal();
    const tablesSiquera = await excel.buscaListaSiqueira();
    res.render('index', {
        tables,
        tablesSiquera
    });
    return
}
