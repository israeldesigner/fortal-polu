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
     const listaCcd = await ExcelModel.find({ Local: "ccd" }).limit(5);
     return listaCcd
   }
   async buscaListaSiqueira(){
     const listaSiqueira = await ExcelModel.find({ Local: "siquera" }).limit(5);
     return listaSiqueira
   }

}

module.exports = Excel;