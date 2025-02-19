import sqlite3 from "sqlite3";
import { User } from "./../models/UserModels";

const db = new sqlite3.Database("./data/event.db");

export function createTableUser(): Promise<boolean> {
  const query = `
        CREATE TABLE IF NOT EXISTS user (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            name       TEXT,
            email      TEXT,
            password   TEXT
        )
    `;

  return new Promise((res, rej) => {
    db.run(query, (erro) => {
      if (erro) {
        console.log(`Erro creating user`);
        rej(erro);
      } else {
        console.log(`User created sucessfuly`);
        res(true);
      }
    });
  });
}

export function insertUser(user: User): Promise<number> {
  const query = `
        INSERT INTO user (name, email, password)
        VALUES (?, ?, ?)
    `;

  return new Promise((res, rej) => {
    db.run(query, [user.name, user.email, user.password], function (erro) {
      if (erro) {
        console.log(`Erro entering user, ${erro}`);
        rej(erro);
      } else {
        console.log(`User entering sucessfuly`);
        res(this.lastID);
      }
    });
  });
}

export function listAllUsers(): Promise<any[]> {
  const query = `
        SELECT * FROM user
    `;

  return new Promise((res, rej) => {
    db.all(query, (erro, lines) => {
      if (erro) {
        console.log(`Failed list all users ${erro}`);
        rej(erro);
      } else {
        console.log(lines);
        res(lines);
      }
    });
  });
}

export function listUserbyId(id: number): Promise<any> {
  const query = `
        SELECT * FROM user WHERE id = ?
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

export function deleteUser(id: number): Promise<any> {
  const query = `
        DELETE FROM user WHERE id = ?
    `;

  return new Promise((res, rej) => {
    db.run(query, [id], function (erro) {
      if (erro) {
        console.log(`Error when deleted user ${id}, ${erro}`);
        rej(erro);
      } else if (this.changes === 0) {
        console.log(`user not found`);
        res(false);
      } else {
        console.log(`User successfully deleted`);
        res(true);
      }
    });
  });
}
