const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Item',
    tableName: 'items',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
            length: 255,
        },
        price: {
            type: 'decimal',
            precision: 10,
            scale: 2,
        },
    },
});




// _____________________________________________________________________

// const mongoose = require("mongoose");

//  const itemSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true,
//     },
//     age:{
//         type: Number,
//         required: true,
//     }
//   })
  
// module.exports = mongoose.model('Item', itemSchema);
