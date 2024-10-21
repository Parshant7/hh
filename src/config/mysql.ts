import { Dialect, Sequelize } from "sequelize";
let instance: Sequelize;

export function getInstance(): Sequelize{
    if(!instance){
        const dbConfig = {
            port: 3306,
            host: '127.0.0.1',
            database: 'chatmysql',
            username: 'Parshant',
            password: 'Password@123',
            logging: true,
            dialect: "mysql" as Dialect,
            pool: {
                max: 30000,
                acquire: 100000,
                idle: 100000
            }
        }
        instance= new Sequelize(dbConfig);
    }
    return instance;        
}

export async function connectDatabase(){
    try {
        const instance = getInstance();
        instance.authenticate();
        console.log("database connected successfully")
    } catch (error) {
        console.log("error occured while connecting to database ", error);
    }
    
}