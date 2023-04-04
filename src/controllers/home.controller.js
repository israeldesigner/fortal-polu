/* eslint-disable no-undef */
const HomeModel = require('../models/HomeModel');
const Excel = require('../models/ConvertModel');

exports.index = async (req, res) => {
    const excel = new Excel();
    const tables = await excel.buscaListaLocal();
    console.log(tables);
    const tablesSiquera = await excel.buscaListaSiqueira();
    res.render('index', {
        tables,
        tablesSiquera
    });
    return
}

exports.apiExcel = async (req, res) => {
    let jsonObject = {}
    const excel = new Excel();
    const tablesCcd = await excel.buscaListaLocal();
    const tablesSiquera = await excel.buscaListaSiqueira();
    jsonObject = { tablesCcd, tablesSiquera};
    res.json(jsonObject);
}
