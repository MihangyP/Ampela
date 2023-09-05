import { auth, database } from "./firebaseConfig.js";
import { collection, addDoc, getDocs, getCountFromServer, where, query } from "firebase/firestore";

// Ajout du nouveau post
async function addNewPost(data) {
    try {
        if (auth.currentUser) {
            const docRef = await addDoc(collection(database, "posts"), {
                content: data.content,
                authorId: data.authorId,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            });
            console.log("Post doc written with ID: ", docRef.id);
        } else {
            return { msg: "no-auth" };
        }
    } catch (err) {
        console.log("Error adding new post: ", err);
    }
}

// Ajout du nouveau commentaire
async function addNewComment(data) {
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
async function getAllPosts() {
    try {
        const posts = [];
        const querySnapshot = await getDocs(collection(database, "posts"));
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });
        if (posts) {
            return posts;
        } else {
            console.log("No posts docs written yet.");
        }
    } catch (err) {
        console.log("Error getting posts docs: ", err);
    }
}

// Obtient tout commentaires concernant post publié
async function getAllComments(postId) {
    try {
        const comments = [];
        const querySnapshot = await getDocs(collection(database, "comments"));
        querySnapshot.forEach((doc) => {
            if (doc.data().postId == postId) {
                comments.push(doc.data());
            }
        });
        if (comments) {
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
    addNewPost,
    addNewComment,
    addNewLike,
    getAllPosts,
    getAllComments,
    getLikeNumber,
    getCommentNumber
}