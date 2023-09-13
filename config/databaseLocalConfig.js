import { async } from "@firebase/util";
import * as SQLite from "expo-sqlite";

// localDb.transaction((tx) => {
//   tx.executeSql(
//     `CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       username VARCHAR(50),
//       password VARCHAR(50),
//       email TEXT NULL UNIQUE,
//       address VARCHAR(50) NULL,
//       profession CHAR NOT NULL,
//       lastMenstruationDate DATE NOT NULL,
//       durationMenstruation INTEGER NOT NULL,
//       cycleDuration INTEGER NOT NULL,
//       picture BLOB NULL,
//       status CHAR NOT NULL
//     );`,
//     [],
//     () => {
//       console.log('Table des utilisateurs créée avec succès.');
//     },
//     (error) => {
//       console.error('Erreur lors de la création de la table des utilisateurs :', error);
//     }
//   );
// });
// Fonction pour créer la table des utilisateurs

// async function openDatabase(pathToDatabaseFile) {
//   if (
//     !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
//       .exists
//   ) {
//     await FileSystem.makeDirectoryAsync(
//       FileSystem.documentDirectory + "SQLite"
//     );
//   }
//   await FileSystem.downloadAsync(
//     Asset.fromModule(require(pathToDatabaseFile)).uri,
//     FileSystem.documentDirectory + "SQLite/ampela.db"
//   );
//   return SQLite.openDatabase("ampela.db");
// }

// function connectlocalDb() {
//   const localDb = SQLite.openDatabase("ampela.db");
// }

// Appel de la fonction pour créer la table des utilisateurs

const createTable = (db) => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        profession TEXT NULL,
        lastMenstruationDate TEXT NULL,
        durationMenstruation TEXT NULL,
        cycleDuration TEXT  NULL
      );`,
      [],
      () => {
        console.log('Table des utilisateurs créée avec succès.');
      },
      (error) => {
        console.error('Erreur lors de la création de la table des utilisateurs :', error.message);
      }
    );
  });
};

async function authenticateUser(email, password) {
  try {
    const localDb = SQLite.openDatabase("ampela.db");
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    const [userData] = await localDb.executeSql(query, [email, password]);

    if (userData.rows.length > 0) {
      // L'utilisateur existe dans la base de données locale
      return true;
    } else {
      // L'utilisateur n'existe pas ou les informations d'identification sont incorrectes
      return false;
    }
  } catch (error) {
    console.error("Erreur d'authentification locale :", error);
    throw error;
  }
}

async function addDataSignup(data) {
  try {
    const localDb = SQLite.openDatabase("ampela.db");

    // Requête SQL pour vérifier si l'utilisateur existe dans la base de données SQLite
    const query = "SELECT COUNT(*) FROM users WHERE username = ?";
    const [userData] = await localDb.executeSql(query, data.username);

    if (userData.rows.length === 0) {
      // L'utilisateur n'existe pas encore, insérez-le
      const InsertUser =
        "INSERT INTO users (username, password, profession, lastMenstruationDate, durationMenstruation, cycleDuration) VALUES(?,?,?,?,?,?,?)";
      const values = [
        data.username,
        data.password,
        data.profession,
        data.lastMenstruationDate,
        data.durationMenstruation,
        data.cycleDuration,
      ];

      await localDb.executeSql(InsertUser, values);
      console.log("Utilisateur inséré avec succès.");
    } else {
      // L'utilisateur existe déjà, vous pouvez gérer ce cas ici
      console.log("L'utilisateur existe déjà.");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout d'utilisateur :", error);
    throw error;
  }
}



const insertUser = (db, username, password, profession, lastMenstruationDate, durationMenstruation, cycleDuration) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO user (username, password, profession, lastMenstruationDate, durationMenstruation, cycleDuration) VALUES (?, ?, ?, ?, ?, ?);`,
      [username, password, profession, lastMenstruationDate, durationMenstruation, cycleDuration],
      () => {
        console.log('Utilisateur ajouté avec succès.');
      },
      (error) => {
        console.error('Erreur lors de l\'ajout d\'utilisateur :', error.message);
      }
    );
  });
};
const selectUsers = (db) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM user;',
      [],
      (tx, result) => {
        const rows = result.rows;
        for (let i = 0; i < rows.length; i++) {
          const user = rows.item(i);
          console.log('Utilisateur récupéré :', user);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error.message);
      }
    );
  });
};


export { createTable, insertUser, selectUsers, authenticateUser, addDataSignup };
