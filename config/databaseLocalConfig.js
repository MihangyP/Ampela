import * as SQLite from 'expo-sqlite';


// Fonction pour créer la table des utilisateurs
function connectDB() {
const db = SQLite.openDatabase('ampela.db');
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50),   
        email TEXT UNIQUE,
        address VARCHAR(50),
        profession CHAR,
        lastMenstruationDate DATE,
        durationMenstruation INTEGER,
        cycleDuration INTEGER,
        picturePath VARCHAR(100),
        status CHAR
      );`,
      [],
      () => {
        console.log('Table des utilisateurs créée avec succès.');
      },
      (error) => {
        console.error('Erreur lors de la création de la table des utilisateurs :', error);
      }
    );
  });
}

// Appel de la fonction pour créer la table des utilisateurs

async function authenticateUser(email, password) {
    try {
      // Requête SQL pour vérifier si l'utilisateur existe dans la base de données SQLite
      const query = 'SELECT * FROM utilisateurs WHERE email = ? AND password = ?';
      const [userData] = await db.executeSql(query, [email, password]);
  
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
      // Requête SQL pour vérifier si l'utilisateur existe dans la base de données SQLite
      const query = 'SELECT * FROM users WHERE email = ?';
      const [userData] = await db.executeSql(query, [data.email]);
  
      if (userData.rows.length === 0) {
        // L'utilisateur n'existe pas encore, insérez-le
        const InsertUser = 'INSERT INTO users (email,address,profession,lastMenstruationDate,durationMenstruation,cycleDuration,status) VALUES(?,?,?,?,?,?,?,?,?,?)';
        const values = [
          data.username,
          data.email,
          data.address,
          data.profession,
          data.lastMenstruationDate,
          data.durationMenstruation,
          data.cycleDuration,
          data.picturePath,
          data.status
        ];
  
        await db.executeSql(InsertUser, values);
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
  export{
    connectDB,
    authenticateUser,
    addDataSignup
  }