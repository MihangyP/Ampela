import { auth, database } from "./firebase.js";
import { collection, addDoc, getDoc } from "firebase/firestore";

// Ajout du nouveau post
async function addNewPost({ content, authorId, createdAt, updatedAt }) {
    try {
        if (auth.currentUser != null) {
            const docRef = await addDoc(collection(database, "users"), {
                content: content,
                authorId: authorId,
                createdAt: createdAt,
                updatedAt: updatedAt
            });
            console.log("Doc written with ID: ", docRef.id);
        } else {
            return { msg: "no-auth" };
        }
    } catch (err) {
        console.log("Error adding new doc: ", err);
    }
}

// Obtient de tout posts
// async function getPosts() {
//     try {

//     }
// }