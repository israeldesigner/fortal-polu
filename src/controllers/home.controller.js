/* eslint-disable no-undef */
const HomeModel = require('../models/HomeModel');
const Excel = require('../models/ConvertModel');

exports.index = async (req, res) => {
    res.render('index');
    return
}

exports.apiExcel = async (req, res) => {
    let jsonObject = {}
    const excel = new Excel();
    const tablesCcd = await excel.buscaListaLocal();
    const tablesSiquera = await excel.buscaListaSiqueira();
    jsonObject = { tablesCcd, tablesSiquera };
    res.json(jsonObject);
}

exports.apiAll = async(req, res) => {
    let jsonAllSheets = {}
    const excel = new Excel();
    const allSheets = await excel.getAllSheets();
    jsonAllSheets = { allSheets };
    res.json(jsonAllSheets);
}

exports.alt_index = async (req, res) => {
    res.render('index');
}
