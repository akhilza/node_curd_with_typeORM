
const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'akhil@23',
    database: 'curdoperation',
    synchronize: true, // Set to false in production
    logging: false,
    entities: [require('./models/Item')],
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });

module.exports = AppDataSource;


// without typeORM

// const mysql = require("mysql2")

// const db = mysql.createConnection({
//     host: 'localhost',        
//     user: 'root',            
//     password: 'akhil@23',
//     database: 'curdoperation'
//   })

//   db.connect((err)=>{
//     if(err){
//         console.error('Error connecting to MySQL:', err.message);
//     } else {
//         console.log('Connected to MySQL database');
//     }
//   })

//   module.exports = db;



