/* eslint-disable no-undef */
const excelToJson = require('convert-excel-to-json');

const mongoose = require('mongoose');
const ExcelSchema = new mongoose.Schema({  
    Date:{  
        type:Date  
    },  
    Hour:{  
        type:Number  
    },  
    Humidity:{  
        type:Number    
    },    
    NO2ppm:{  
        type:Number    
    },
    COppm:{  
        type:Number    
    },
    O3ppb:{  
        type:Number    
    },
    PM2ug:{  
        type:Number    
    },
    PM10ug:{  
        type:Number    
    },
    ExTemp:{  
        type:Number    
    },
    NO2ug:{  
        type:Number    
    },
    O3ug:{  
        type:Number    
    },
    Local:{  
        type:String  
    },
    Latitude:{
        type:String  
    },
    Longitude:{
        type:String  
    },

});

const ExcelModel = mongoose.model('Excel', ExcelSchema);
class Excel {
    constructor(){
        this.errors = [];
        this.excel = {};
    }

    async importExcelData2MongoDB(filePath){
        const excelData = excelToJson({
            sourceFile: filePath,
            header:{
                rows: 1
            },
            columnToKey: {
                '*': '{{columnHeader}}'
            }
        });
        await this.deleteExcel();
        await this.insertExcel(excelData);
   }

   async deleteExcel(){
     await ExcelModel.deleteMany({});
   }

   async insertExcel(data){
    let valDatas;
    await Object.values(data).forEach((val) =>{ 
        ExcelModel.insertMany(val).then(
            (result) => {
               console.log("Items added succesfully");
            }
          ).catch(
            (err) => {
               console.log(err);
            }
        )
    });
   }

   checkString (strLocal, subStrLocal) {
    console.log(strLocal.indexOf(subStrLocal) !== -1); // true
   }
   //{ "$regex": "Alex", "$options": "i" }

   async buscaListaThomaz(){
     const listaCcd = await ExcelModel.find({ Local:/Thomaz/i  }).limit(2).sort({$natural:-1});
     return listaCcd;
   }

   async buscaHelderCam(){
     const listaHelderCam = await ExcelModel.find({ Local:/Hélder/i }).limit(2).sort({$natural:-1});
     return listaHelderCam;
   }

   async buscaMajorAssis(){
    const listaMajorAssis = await ExcelModel.find({ Local:/Major Assis/i}).limit(2).sort({$natural:-1});
    return listaMajorAssis;
   }

   async buscaDomLustosa(){
    const listaDomLustosa = await ExcelModel.find({ Local:/Dom Lustosa/i}).limit(2).sort({$natural:-1});
    return listaDomLustosa;
   }

   async buscaHilbertoSilva(){
    const listaHilbertoSil = await ExcelModel.find({ Local:/Hilberto Silva/i}).limit(2).sort({$natural:-1});
    return listaHilbertoSil;
   }

   async buscaConsueloAmora(){
    const listaConsueloAmo = await ExcelModel.find({ Local:/Consuelo Amora/i}).limit(2).sort({$natural:-1});
    return listaConsueloAmo;
   }

   async buscaBaraoSobral(){
    const listaBaraoSob = await ExcelModel.find({ Local:/Barão de Sobral/i}).limit(2).sort({$natural:-1});
    return listaBaraoSob;
   }

   async buscaCezarCals(){
    const listaCezarCals = await ExcelModel.find({ Local:/César Cals/i}).limit(2).sort({$natural:-1});
    return listaCezarCals;
   }

   async buscaGiomarSilva(){
    const listaGiomarSilv = await ExcelModel.find({ Local:/Guiomar da Silva/i}).limit(2).sort({$natural:-1});
    return listaGiomarSilv;
   }

   async buscaBezerraMenezes(){
    const listaBezerraMen = await ExcelModel.find({ Local:/José Jatahy/i}).limit(2).sort({$natural:-1});
    return listaBezerraMen;
   }

   async buscaPracaPortugal(){
    const listaPracaPortu = await ExcelModel.find({ Local:/Praça Portugal/i}).limit(2).sort({$natural:-1});
    return listaPracaPortu;
   }

   async buscaNautico(){
    const listaNautico = await ExcelModel.find({ Local:/Nautico/i}).limit(2).sort({$natural:-1});
    return listaNautico;
   }

   async buscaPracaLagoinha(){
    const listaPracaLagoinha = await ExcelModel.find({ Local:/Praça da Lagoinha/i}).limit(2).sort({$natural:-1});
    return listaPracaLagoinha;
   }

   async buscaPracaFatima(){
    const listaPracaFatima = await ExcelModel.find({ Local:/de Fátima/i}).limit(1).sort({$natural:-1});
    return listaPracaFatima;
   }

   async buscaLeonelMoura(){
    const listaLeonelMoura = await ExcelModel.find({ Local:/Leonel de Moura/i}).limit(1).sort({$natural:-1});
    return listaLeonelMoura;
   }

   async buscaPedroDeAlencar(){
    const listaPedroDeAlencar = await ExcelModel.find({ Local:/Pedro de Alencar/i}).limit(1).sort({$natural:-1});
    return listaPedroDeAlencar;
   }

   async buscaIsabelFerreira(){
    const listaIsabelFerreira = await ExcelModel.find({ Local:/Isabel Ferreira/i}).limit(1).sort({$natural:-1});
    return listaIsabelFerreira;
   }

   async buscaBeiraMar(){
    const listaBeiraMar = await ExcelModel.find({ Local:/Beira Mar/i}).limit(1).sort({$natural:-1});
    return listaBeiraMar;
   }

   async buscaLagoaZeza(){
    const listaLagoaZeza = await ExcelModel.find({ Local:/Lagoa da Zeza/i}).limit(1).sort({$natural:-1});
    return listaLagoaZeza;
   }

   async buscaExpedicionarios(){
    const listaExpedicionarios = await ExcelModel.find({ Local:/Expedicionários/i}).limit(1).sort({$natural:-1});
    return listaExpedicionarios;
   }

   async buscaKubitschek (){
    const listaKubitschek = await ExcelModel.find({ Local:/Kubitschek/i}).limit(1).sort({$natural:-1});
    return listaKubitschek;
   }

   async buscaGodofredoCastro(){
    const listaGodofredCast = await ExcelModel.find({ Local:/Godofredo de Castro/i}).limit(1).sort({$natural:-1});
    return listaGodofredCast;
   }

   async buscaJoseWalte(){
    const listaJoseWalter = await ExcelModel.find({ Local:/José Walter/i}).limit(1).sort({$natural:-1});
    return listaJoseWalter;
   }

   async getAllSheets() {
     const allSheets = await ExcelModel.find().limit(1).sort({$natural:-1});
     console.log(allSheets);
     return allSheets;
   }

}

module.exports = Excel;