import React, { useState, useEffect } from "react";
import { ScrollView, Text } from 'react-native';
import CommentItem from "./forum-comment-item";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../../config/firebaseConfig";

const CommentContent = ({ post, refToCommentItem }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAuthorName = async (authorId) => {
            try {
                const usersCollection = collection(database, 'users');
                const authorQuery = query(usersCollection, where('uid', '==', authorId));
                const authorSnapshot = await getDocs(authorQuery);

                if (authorSnapshot.size > 0) {
                    const authorData = authorSnapshot.docs[0].data();
                    return authorData.pseudo;
                } else {
                    console.error('Aucun document d\'auteur correspondant trouvé.');
                    return "Auteur inconnu";
                }
            } catch (error) {
                console.error('Erreur lors de la recherche du nom de l\'auteur :', error);
                return "Auteur inconnu";
            }
        };

        const fetchComments = async () => {
            try {
                const commentsQuery = query(collection(database, "comments"), where("postId", "==", post.postId));
                const unsubscribe = onSnapshot(commentsQuery, async (querySnapshot) => {
                    const commentsData = [];

                    for (const doc of querySnapshot.docs) {
                        const commentData = doc.data();
                        const authorId = commentData.authorId;
                        const authorName = await fetchAuthorName(authorId);

                        const date = new Date(commentData.createdAt.toDate());
                        const months = [
                            'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
                            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
                        ];

                        const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

                        const day = date.getDate();
                        const month = months[date.getMonth()];
                        const year = date.getFullYear();
                        const dayOfWeek = days[date.getDay()];

                        const formattedDate = `${day} ${month} ${year} (${dayOfWeek})`;

                        commentsData.push({
                            ...commentData,
                            authorName,
                            formattedDate,
                        });
                    }

                    setComments(commentsData);
                    setIsLoading(false);
                });

                return unsubscribe;
            } catch (error) {
                console.log(error);
            }
        };

        const unsubscribe = fetchComments();

        return () => unsubscribe();
    }, [post.postId]);

    if (isLoading) {
        return <Text>Chargement des commentaires...</Text>;
    }

    return (
        <ScrollView style={{ marginTop: 30, height: 300 }} ref={refToCommentItem}>
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <CommentItem
                        key={index}
                        authorPic={{
                            uri: "https://i.pravatar.cc/300" + Math.floor(Math.random() * 1000) + 1
                        }}
                        authorName={comment.authorName}
                        creationDate={comment.formattedDate}
                        content={comment.content}
                    />
                ))
            ) : (
                <Text>Aucun commentaire pour le moment.</Text>
            )}
        </ScrollView>
    );
}

export default CommentContent;
