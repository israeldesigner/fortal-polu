/* eslint-disable no-console */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Excel = require('../models/ConvertModel.js');  

exports.index = (req, res) => {
    res.render('convert');
    return
}

exports.uploadfile = async (req, res)  => {
    // res.render('/converter')
    try{
        const excel = new Excel();
        console.log(excel);
        await excel.importExcelData2MongoDB(`./uploads/${req.file.filename}`);
        res.json(req.body);
    }catch(e){
        console.log(e)
    }

}