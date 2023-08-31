/********************************************************************
 * -Correction date: 30/08/2023
 * -Fixing bug: suppression de certain élément dans 'ScrollView' pour 
 * simplifier la vue et faciliter la maintenance
 ********************************************************************/


import React from "react";
import { ScrollView } from 'react-native';
import CommentItem from "./forum-comment-item";
import { images } from "../../constants";

const CommentContent = ({ postId }) => {
    return (
        <ScrollView style={{marginTop: 30, height: 300}}>
            <CommentItem 
            authorPic={images.user01} 
            authorName="Jane Doe" 
            creationDate="30/08/2023" 
            content="Hello, World!" />
        </ScrollView>
    );
}

export default CommentContent;