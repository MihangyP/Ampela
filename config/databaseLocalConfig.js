import { async } from "@firebase/util";
import * as SQLite from "expo-sqlite";


const createTable = async (db) => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR  NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        profession VARCHAR NULL,
        lastMenstruationDate DATE NULL,
        durationMenstruation INT NULL,
        cycleDuration INT NULL,
        email VARCHAR NULL
      );`, [],
      () => console.log('Table des utilisateurs créée avec succès.'),
      (_, error) => console.error('Erreur lors de la création de la table des utilisateurs :', error.message)
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

function insertUser(db, username, password, profession, lastMenstruationDate, durationMenstruation, cycleDuration) {
  console.log(username, password, profession, lastMenstruationDate, durationMenstruation, cycleDuration);

  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO user (username, password, profession, lastMenstruationDate, durationMenstruation, cycleDuration) VALUES (?, ?, ?, ?, ?, ?);`,
      [username, password, profession, lastMenstruationDate, durationMenstruation, cycleDuration],
      (_, results) => {
        if (results.rowsAffected > 0) {
          console.log('Utilisateur ajouté avec succès.');
        } else {
          console.error('Erreur lors de l\'ajout d\'utilisateur : Aucune ligne n\'a été affectée.');
        }
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
        if (result.rows.length < 0) {
          console.log("no result");
          return null;
        }
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

// Select user data from DB
function getMenstruationData(db, username) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT lastMenstruationDate, durationMenstruation, cycleDuration FROM user WHERE username=?;',
        [username],
        (_, result) => {
          const row = result.rows._array[0];
          console.log("row :", row);
          // On convertis le JSON en objet puis on le retourne
          resolve(row)
        },
        (error) => {
          console.log(error.message);
          reject(error)
        }
      )
    })
  })
}


// Delete all records from user table
function deleteAllUsers(db) {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM user',
      [],
      (_, { rowsAffected }) => {
        console.log(`Deleted ${rowsAffected} rows from users table.`);
      });
  });
}

// Retourne l'ID du dernier utilisateur inséré
async function getLastInsertedUserId(db) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM user ORDER BY id DESC LIMIT 1;',
        [],
        (tx, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows.item(0).id);
          } else {
            reject('Aucun utilisateur trouvé.');
          }
        },
        (error) => {
          reject(error.message);
        }
      );
    });
  });
}


// Fetch and update email
async function updateEmailForUser(db, userId, newEmail) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE user SET email = ? WHERE id = ?',
        [newEmail, userId],
        (tx, result) => {
          if (result.rowsAffected > 0) {
            resolve({ id: userId, email: newEmail });
          } else {
            reject('No update made.');
          }
        },
        (error) => {
          reject(error.message);
        }
      );
    });
  });
}


// async function addDataSignup(data) {
//   try {
//     const localDb = SQLite.openDatabase("ampela.db");

//     // Requête SQL pour vérifier si l'utilisateur existe dans la base de données SQLite
//     const query = "SELECT COUNT(*) FROM users WHERE username = ?";
//     const [userData] = await localDb.executeSql(query, data.username);

//     if (userData.rows.length === 0) {
//       // L'utilisateur n'existe pas encore, insérez-le
//       const InsertUser =
//         "INSERT INTO users (username, password, profession, lastMenstruationDate, durationMenstruation, cycleDuration) VALUES(?,?,?,?,?,?,?)";
//       const values = [
//         data.username,
//         data.password,
//         data.profession,
//         data.lastMenstruationDate,
//         data.durationMenstruation,
//         data.cycleDuration,
//       ];

//       await localDb.executeSql(InsertUser, values);
//       console.log("Utilisateur inséré avec succès.");
//     } else {
//       // L'utilisateur existe déjà, vous pouvez gérer ce cas ici
//       console.log("L'utilisateur existe déjà.");
//     }
//   } catch (error) {
//     console.error("Erreur lors de l'ajout d'utilisateur :", error);
//     throw error;
//   }
// }

export { createTable, insertUser, selectUsers, authenticateUser, updateEmailForUser, getLastInsertedUserId, deleteAllUsers, getMenstruationData };
