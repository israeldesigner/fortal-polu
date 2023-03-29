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
    NO2:{  
        type:Number    
    },
    CO:{  
        type:Number    
    },
    O3:{  
        type:Number    
    },
    PM2:{  
        type:Number    
    },
    PM10:{  
        type:Number    
    },
    ExTemp:{  
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
    setInterval(() => {
        console.log('enviando')
    }, 10000);
     const listaCcd = await ExcelModel.find({ Local: "ccd" }).limit(5);
     return listaCcd
   }
}

module.exports = Excel;