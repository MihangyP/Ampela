import { auth, database } from "./firebaseConfig.js";
import { collection, addDoc, getDocs, getCountFromServer, where, query, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

//ajout des données de l'utilisateur
async function addUserCollection(username, password, profession, lastMenstruationDate, durationMenstruation, cycleDuration) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            mailOrTel,
            password
        );

        const user = userCredential.user;
        const { uid, email } = user;

        const db = getFirestore();
        const usersCollectionRef = doc(db, "users", uid);

        await setDoc(usersCollectionRef, {
            uid: uid,
            email: email,
            pseudo: username,
            profession: profession,
            dernierDateMenstruation: lastMenstruationDate,
            dureeMenstruation: durationMenstruation,
            dureeCycle: cycleDuration
        });

        // setIsAuthenticated(true);

        Alert.alert("Registration Successful!", "Your account has been created successfully.");

    } catch (error) {
        console.error("Error during registration:", error.message);
        Alert.alert("Registration Error", error.message);
    }
}


// Ajout du nouveau post
async function addNewPost(data) {
    console.log(data);
    try {
        if (auth.currentUser) {
            const docRef = await addDoc(collection(database, "posts"), {
                content: data.content,
                authorId: data.authorId,
                like:data.like,

                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            });

           
            const postId = docRef.id;

            console.log(postId);
          
            await updateDoc(docRef, { postId });

            console.log("Nouveau post ajouté avec succès. ID du post :", postId);
        } else {
            return { msg: "no-auth" };
        }
    } catch (err) {
        console.log("Error adding new post: ", err);
    }
}

// Ajout du nouveau commentaire
async function addNewComment(data) {
    console.log(data);
    try {
        if (auth.currentUser) {
            const docRef = await addDoc(collection(database, "comments"), {
                content: data.content,
                authorId: data.authorId,
                postId: data.postId,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            });
            console.log("Comment doc written with ID: ", docRef.id);
        } else {
            return { msg: "no-auth" };
        }
    } catch (err) {
        console.log("Error adding new comment: ", err);
    }
}


// Ajout de nouvelle réaction(like) sur un post
async function addNewLike(data) {
    try {
        if (auth.currentUser) {
            const docRef = await addDoc(collection(database, "likes"), {
                userId: data.userId,
                postId: data.postId,
                createdAt: data.createdAt
            });
            console.log("Like doc written with ID: ", docRef.id);
        } else {
            return { msg: "no-auth" };
        }
    } catch (err) {
        console.log("Error adding new reaction(like): ", err);
    }
}


// Obtient tout posts
function getAllPosts() {
    try {
        const posts = [];
        const querySnapshot = getDocs(collection(database, "posts"));
        querySnapshot.forEach((doc) => {
            // Pour chaque document, vous pouvez extraire ses données
            console.log(doc);
            const post = doc.data();
            posts.push(post);
        });
        return posts;
    } catch (err) {
        console.error("Erreur lors de la récupération des messages : ", err);
        throw err; // Vous pouvez également lever l'erreur pour gérer les erreurs à l'extérieur de cette fonction
    }
}

// Obtient tout commentaires concernant post publié
function getAllComments(postId) {
    try {
        const comments = [];
        const querySnapshot = getDocs(collection(database, "comments"));
        querySnapshot.forEach((doc) => {
            console.log(doc);
            if (doc.data().postId == postId) {
                comments.push(doc.data());
            }
        });
        if (comments.length != 0) {
            return comments;
        } else {
            console.log("No comments docs written yet.");
        }
    } catch (err) {
        console.log("Error getting comments docs: ", err);
    }
}

// Obtient effectif de réaction pour un post
async function getLikeNumber(postId) {
    try {
        // Obtient la référence de la collection
        const colRef = collection(database, "likes");

        // Crée une requête avec une condition
        const q = query(colRef, where("postId", "==", postId));

        // Obtient nombre docs correspond à la requête
        const count = getCountFromServer(q);

        if (count > 0) {
            return count;
        } else {
            console.log("No likes docs written yet.");
        }
    } catch (err) {
        console.log("Error getting likes docs: ", err);
    }
}

// Obtient effectif de commentaire pour un post
async function getCommentNumber(postId) {
    try {
        // Obtient la référence de la collection
        const colRef = collection(database, "comments");

        // Crée une requête avec une condition
        const q = query(colRef, "postId", "==", postId);

        // Obtient nombre docs correspond à la requête
        const count = getCountFromServer(q);

        if (count > 0) {
            return count;
        } else {
            console.log("No comments docs written yet.");
            return "";
        }
    } catch (err) {
        console.log("Error getting comments docs: ", err);
    }
}

export {
    addUserCollection,
    addNewPost,
    addNewComment,
    addNewLike,
    getAllPosts,
    getAllComments,
    getLikeNumber,
    getCommentNumber
}