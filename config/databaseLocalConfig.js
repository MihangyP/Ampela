import { async } from '@firebase/util';
import * as SQLite from 'expo-sqlite';

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
function connectlocalDb() {
const localDb = SQLite.openDatabase('ampela.db');
  
}

// Appel de la fonction pour créer la table des utilisateurs

async function authenticateUser(email, password) {  
  try {
      const localDb = SQLite.openDatabase('ampela.db');
      const query = 'SELECT * FROM utilisateurs WHERE email = ? AND password = ?';
      const [userData] = await localDb.executeSql(query, [email, password]);
  
      if (userData.rows.length > 0) {
        // L'utilisateur existe dans la base de données locale
        return true;
      } else {
        // L'utilisateur n'existe pas ou les informations d'identification sont incorrectes
        return false;
      }
    } catch (error) {
      console.error('Erreur d\'authentification locale :', error);
      throw error;
    }
  }

  async function addDataSignup(data) {
    try {
      const localDb = SQLite.openDatabase('ampela.db');
      
      // Requête SQL pour vérifier si l'utilisateur existe dans la base de données SQLite
      const query = 'SELECT * FROM users WHERE email = ?';
      const [userData] = await localDb.executeSql(query, data.username);
  
      if (userData.rows.length === 0) {
        // L'utilisateur n'existe pas encore, insérez-le
        const InsertUser = 'INSERT INTO users (username, password, profession, lastMenstruationDate, durationMenstruation, cycleDuration) VALUES(?,?,?,?,?,?,?)';
          const values = [
          data.username,
          data.password,
          data.profession,
          data.lastMenstruationDate,
          data.durationMenstruation,
          data.cycleDuration
        ];
  
        await localDb.executeSql(InsertUser, values);
        console.log('Utilisateur inséré avec succès.');
      } else {
        // L'utilisateur existe déjà, vous pouvez gérer ce cas ici
        console.log('L\'utilisateur existe déjà.');
      }
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'utilisateur :', error);
      throw error;
    }
  }
   function getAllUsersData() {
    const localDb = SQLite.openDatabase('ampela.db');
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM utilisateurs';
      
      localDb.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  async function displayAllUserData() {
    try {
      const users = await getAllUsersData();
      
      if (users.length > 0) {
        console.log("Données des utilisateurs :");
        users.forEach((user, index) => {
          console.log(`Utilisateur ${index + 1}:`);
          console.log("ID :", user.id);
          console.log("Nom :", user.nom);
          console.log("Email :", user.email);
          // Ajoutez d'autres propriétés ici selon votre schéma de base de données.
        });
      } else {
        console.log("Aucun utilisateur trouvé.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  }
  
  
  export{
    connectlocalDb,
    authenticateUser,
    addDataSignup,
    displayAllUserData
  }


