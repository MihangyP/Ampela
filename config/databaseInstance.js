import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("ampela.db");

export default db;