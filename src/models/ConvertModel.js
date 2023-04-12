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

   async buscaListaLocal(){
     const listaCcd = await ExcelModel.find({ Local: "ccd" }).limit(1).sort({$natural:-1});
     console.log(listaCcd);
     return listaCcd
   }

   async buscaListaSiqueira(){
     const listaSiqueira = await ExcelModel.find({ Local: "siqueira" }).limit(1).sort({$natural:-1});
     console.log(listaSiqueira);
     return listaSiqueira
   }

   async buscaListaEscolaJaburandi(){
     const listaJaburandi = await ExcelModel.find({ Local: "EMEIF Prof. Francisco de Melo Jaborandi" }).limit(1).sort({$natural:-1});
     console.log(listaJaburandi);
     return listaJaburandi
   }

   async buscaListaEscolaDom(){
     const listaDomAloiso = await ExcelModel.find({ Local: "EMEIF Dom Aloísio Lorscheider" }).limit(1).sort({$natural:-1});
     console.log(listaDomAloiso);
     return listaDomAloiso
   }

   async buscaListaEscolaParsifal(){
     const listaParsifalBar = await ExcelModel.find({ Local: "EMEIEF Prof. José Parsifal Barroso" }).limit(1).sort({$natural:-1});
     console.log(listaParsifalBar);
     return listaParsifalBar;
   }

   async buscaListaMuriloSer(){
     const listaMuriloSerpa = await ExcelModel.find({ Local: "EMEF Murilo Serpa" }).limit(1).sort({$natural:-1});
     console.log(listaMuriloSerpa);
     return listaMuriloSerpa;
   }

   async buscaListaEscolaHilberto(){
     const listaHilbertoSilva = await ExcelModel.find({ Local: "Escola Municipal Hilberto Silva" }).limit(1).sort({$natural:-1});
     console.log(listaHilbertoSilva);
     return listaHilbertoSilva;
   }

   async buscaListaEscolaConsuelo(){
     const listaConsueloAmora = await ExcelModel.find({ Local: "EMEIEF Profa. Consuelo Amora" }).limit(1).sort({$natural:-1});
     console.log(listaConsueloAmora);
     return listaConsueloAmora;
   }

   async buscaListaEtufor(){
     const buscaListaEtufor = await ExcelModel.find({ Local: "ETUFOR" }).limit(1).sort({$natural:-1});
     console.log(buscaListaEtufor);
     return buscaListaEtufor;
   }

   async buscaListaEstacaoBonfim(){
     const buscaEstacaoBonfim = await ExcelModel.find({ Local: "Estação  Ótavio Bonfim" }).limit(1).sort({$natural:-1});
     console.log(buscaEstacaoBonfim);
     return buscaEstacaoBonfim;
   }
   async buscaListaEstacaoFatima(){
     const buscaEstacaoFatima = await ExcelModel.find({ Local: "Estação Fátima - BRT" }).limit(1).sort({$natural:-1});
     console.log(buscaEstacaoFatima);
     return buscaEstacaoFatima;
   }
   async getAllSheets() {
     const allSheets = await ExcelModel.find().limit();
     return allSheets;
   }

}

module.exports = Excel;