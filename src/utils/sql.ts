import sqlite3  from "sqlite3";
import { Event, Log } from "./utils";


const db = new sqlite3.Database('./data/event.db');


export function createTableEvent(){
    const query = `
        CREATE TABLE IF NOT EXISTS event(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            date DATE,
            user TEXT
        );
    `

    db.run(query, (erro) => {
        if(erro){
            console.log(`Erro creating table`)
        } else{ 
            console.log(`Table created sucessfuly`)
        }
    })
}

export function createTableLog(){
    const query = `
        CREATE TABLE IF NOT EXISTS logs(
            id TEXT PRIMARY KEY,
            action TEXT NOT NULL,
            tableName TEXT NOT NULL,
            userId TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;
    db.run(query, (erro) => {
        if (erro) {
            console.log(`Error creating log table: ${erro}`);
        } else {
            console.log(`Log table created successfully`);
        }
    });
}


export function insertEvent(event: Event){
    const query = `
        INSERT INTO event (name, date, user)
        VALUES (?, ?, ?)
    `

    db.run(query, [event.name, event.date, event.user], function(erro){
        if(erro){
            console.log(`Erro entering event, ${erro}`)
        }else{
            console.log(`Event entering sucessfuly`)
        }
    })
}

export function insertLog(log: Log){
    const query = `
        INSERT INTO logs (id, action, tableName, userId, timestamp)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [log.action, log.tableName, log.userId, log.timestamp], (erro) => {
        if (erro) {
            console.log(`Error inserting log: ${erro}`);
        }
    });
}

export function listAllEvents(){
    const query = `
        SELECT * FROM event
    `

    db.all(query, (erro, lines) => {
        if(erro){
            console.log(`Failed list all events ${erro}`)
        } else{
            console.log(lines)
        }
    })
}

export function listEventbyId(id: number):void{
    const query = `
        SELECT * FROM event WHERE id = ? 
    `
    db.get(query, [id], (erro, line) => {
        if(erro){
            console.log(`Erro when listing ${id}, ${erro}`)
        } else{ 
            console.log(line)
        }
    })
}

export function deleteEvent(id: number):void{ 
    const query = `
        DELETE FROM event WHERE id = ?
    `
    db.run(query, [id], function(erro){
        if(erro){
            console.log(`Error when deleted event ${id}, ${erro}`)
        }
        else if(this.changes === 0){
            console.log(`event not found`)
        }
        else {
            console.log(`Event successfully deleted`)
        }
    })

}

export function dropTables() {
    const queryEvent = `DROP TABLE IF EXISTS event;`;
    const queryLog = `DROP TABLE IF EXISTS logs;`;

    db.run(queryEvent, (erro) => {
        if (erro) {
            console.log(`Erro ao excluir a tabela event: ${erro}`);
        } else {
            console.log(`Tabela event excluída com sucesso.`);
        }
    });


    db.run(queryLog, (erro) => {
        if (erro) {
            console.log(`Erro ao excluir a tabela logs: ${erro}`);
        } else {
            console.log(`Tabela logs excluída com sucesso.`);
        }
    });
}




