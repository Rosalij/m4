require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(process.env.DATABASE)

//create table users
db.serialize(() => {

    //drop table if exists
    db.run("DROP TABLE IF EXISTS users");
    //create table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log("User table created");
});