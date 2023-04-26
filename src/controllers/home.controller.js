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

    const tablesThomaz = await excel.buscaListaThomaz();
    const tablesHelder = await excel.buscaHelderCam();
    const tableMajorAs = await excel.buscaMajorAssis();
    const tableDomLust = await excel.buscaDomLustosa();
    const tablesHilSil = await excel.buscaHilbertoSilva();
    const tableConsAmo = await excel.buscaConsueloAmora();
    const tablebaraoSo = await excel.buscaBaraoSobral();
    const tableCezarCa = await excel.buscaCezarCals();
    const tableGioSilv = await excel.buscaGiomarSilva();
    const tableBezerMe = await excel.buscaBezerraMenezes();
    const tablePraPort = await excel.buscaPracaPortugal();
    const tablePraLago = await excel.buscaPracaLagoinha();
    const tableNautico = await excel.buscaNautico();
    const tablePraFati = await excel.buscaPracaFatima();
    const tableLeoMour = await excel.buscaLeonelMoura();
    const tablePedAlen = await excel.buscaPedroDeAlencar();
    const tableIsabFer = await excel.buscaIsabelFerreira();
    const tableBeirMar = await excel.buscaBeiraMar();
    const tableBusLago = await excel.buscaLagoaZeza();
    const tableExpedic = await excel.buscaExpedicionarios();
    const tableGodoFre = await excel.buscaGodofredoCastro();
    const tableKubiche = await excel.buscaKubitschek();
    const tableJoseWal = await excel.buscaJoseWalte();
    

    jsonObject = { 
        tablesThomaz,
        tablesHelder,
        tableMajorAs,
        tableDomLust,
        tableConsAmo,
        tablebaraoSo,
        tablesHilSil,
        tableCezarCa,
        tableGioSilv,
        tableBezerMe,
        tablePraPort,
        tablePraLago,
        tableNautico,
        tablePraFati,
        tableLeoMour,
        tablePedAlen,
        tableIsabFer,
        tableBeirMar,
        tableBusLago,
        tableExpedic,
        tableGodoFre,
        tableKubiche,
        tableJoseWal
        
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
