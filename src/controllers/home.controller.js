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
    const tablesJaburandi = await excel.buscaListaEscolaJaburandi();
    const tablesEscolasDom = await excel.buscaListaEscolaDom();
    const tablesEscolaParsifal = await excel.buscaListaEscolaParsifal();
    const tablesHilberto = await excel.buscaListaEscolaHilberto();
    const tablesEscolaConsuelo = await excel.buscaListaEscolaConsuelo();
    const tablesMurilo = await excel.buscaListaMuriloSer();
    const tablesEtufor = await excel.buscaListaEtufor();
    const tableEstacaoBonfim = await excel.buscaListaEstacaoBonfim();
    const tableEstacaoFatima = await excel.buscaListaEstacaoFatima();

    jsonObject = { 
        tablesCcd, 
        tablesSiquera,
        tablesJaburandi,
        tablesEscolasDom,
        tablesEscolaParsifal,
        tablesHilberto,
        tablesEscolaConsuelo,
        tablesMurilo,
        tablesEtufor,
        tableEstacaoBonfim,
        tableEstacaoFatima
    };
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
