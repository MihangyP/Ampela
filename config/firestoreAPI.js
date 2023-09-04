<<<<<<< HEAD
import { auth, database } from "./firebase.js";
import { collection, addDoc, getDocs, getCountFromServer } from "firebase/firestore";

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
=======
import { auth, database } from "./firebase.js";
import { collection, addDoc, getDocs, getCountFromServer } from "firebase/firestore";

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
>>>>>>> 2947b5bc57dbebe6bacae97819ef1d377410b17e
}