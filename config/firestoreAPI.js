import { auth, database } from "./firebase.js";
import { collection, addDoc, getDocs, getCountFromServer } from "firebase/firestore";

// Ajout du nouveau post
async function addNewPost(content, authorId, createdAt, updatedAt) {
    try {
        if (auth.currentUser != null) {
            const docRef = await addDoc(collection(database, "posts"), {
                content: content,
                authorId: authorId,
                createdAt: createdAt,
                updatedAt: updatedAt
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
async function addNewComment(content, authorId, postId, createdAt, updatedAt) {
    try {
        if (auth.currentUser != null) {
            const docRef = await addDoc(collection(database, "comments"), {
                content: content,
                authorId: authorId,
                postId: postId,
                createdAt: createdAt,
                updatedAt: updatedAt
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
async function addNewLike(userId, postId, createdAt) {
    try {
        if (auth.currentUser != null) {
            const docRef = await addDoc(collection(database, "likes"), {
                userId: userId,
                postId: postId,
                createdAt: createdAt
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
        let likesNumber = 0;
        const querySnapshot = await getDocs(collection(database, "likes"));
        querySnapshot.forEach((doc) => {
            if (doc.data().postId == postId) {
                likesNumber++;
            }
        });
        if (likesNumber > 0) {
            return likesNumber;
        } else {
            console.log("No likes docs written yet.");
            return "";
        }
    } catch (err) {
        console.log("Error getting likes docs: ", err);
    }
}

// Obtient effectif de commentaire pour un post
async function getCommentNumber(postId) {
    try {
        let commentNumber = 0;
        const querySnapshot = await getDocs(collection(database, "comments"));
        querySnapshot.forEach((doc) => {
            if (doc.data().postId == postId) {
                commentNumber++;
            }
        });
        if (commentNumber > 0) {
            return commentNumber;
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