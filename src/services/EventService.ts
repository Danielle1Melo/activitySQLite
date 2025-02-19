import sqlite3 from "sqlite3";
import { Event } from "../models/EventModels";

const db = new sqlite3.Database("./data/event.db");

export function createTableEvent(): Promise<boolean> {
  const query = `
        CREATE TABLE IF NOT EXISTS event(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            date TEXT,
            userID INTEGER
            FOREIGN KEY (userID) REFERENCES user(id)
        );
    `;

  return new Promise((res, rej) => {
    db.run(query, (erro) => {
      if (erro) {
        console.log(`Erro creating table`);
        rej(erro);
      } else {
        console.log(`Table created sucessfuly`);
        res(true);
      }
    });
  });
}

export function insertEvent(event: Event): Promise<any> {
  const query = `
        INSERT INTO event (name, date, user)
        VALUES (?, ?, ?)
    `;

  return new Promise((res, rej) => {
    db.run(query, [event.name, event.date, event.userID], function (erro) {
      if (erro) {
        console.log(`Erro entering event, ${erro}`);
        rej(erro);
      } else {
        console.log(`Event entering sucessfuly`);
        res(true);
      }
    });
  });
}

export function listAllEvents(): Promise<any> {
  const query = `
        SELECT * FROM event
    `;

  return new Promise((res, rej) => {
    db.all(query, (erro, lines) => {
      if (erro) {
        console.log(`Failed list all events ${erro}`);
        rej(erro);
      } else {
        console.log(lines);
        res(lines);
      }
    });
  });
}

export function listEventbyId(id: number): Promise<any> {
  const query = `
        SELECT * FROM event WHERE id = ? 
    `;

  return new Promise((res, rej) => {
    db.get(query, [id], (erro, line) => {
      if (erro) {
        console.log(`Erro when listing ${id}, ${erro}`);
        rej(erro);
      } else {
        console.log(line);
        res(line);
      }
    });
  });
}

export function deleteEvent(id: number): Promise<any> {
  const query = `
        DELETE FROM event WHERE id = ?
    `;

  return new Promise((res, rej) => {
    db.run(query, [id], function (erro) {
      if (erro) {
        console.log(`Error when deleted event ${id}, ${erro}`);
        rej(erro);
      } else if (this.changes === 0) {
        console.log(`event not found`);
        res(false);
      } else {
        console.log(`Event successfully deleted`);
        res(true);
      }
    });
  });
}
