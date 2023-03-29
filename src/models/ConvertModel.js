/* eslint-disable no-undef */
const mongoose = require('mongoose');
const ExcelSchema = new mongoose.Schema({  
    Date:{  
        type:String  
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
module.exports = ExcelModel;