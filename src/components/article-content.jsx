import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ArticleItem from './artcile-item';
import { SIZES } from '../../constants';
import data from '../data';


const showActiveCatategoryContent = (activeCategory) => {
    let content = null;
    switch (activeCategory) {
        case "Menstruations":
            content = data[0].content;
            break;
        case "Hygiène menstruelle": 
            content = data[1].content;
            break;
        case "Troubles et maladies":
            content = data[2].content;
            break;
        case "Planning Familiale":
            content = data[3].content;
            break;
        case "Astuces":
            content = data[4].content;
            break;
        default:
            console.log("This category doesn't exist");
    }
    return {
        content: content
    };
}



const ArticleContent = ({navigation, activeCategory, text}) => {
    const content = showActiveCatategoryContent(activeCategory);
    const handleArticleItemPress = (title, content,img) => {
      
        navigation.navigate('ArticleContentScreen', {
            title: title,
            content: content,
            img:img,
        }) 
    }
    return (
        <ScrollView style={styles.container}
          showsVerticalScrollIndicator={false}
        >
            {
                content.content.map((c) => {
                    if(c.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
                        return <ArticleItem onPress={handleArticleItemPress}  navigation={navigation} key={c.title} title={c.title} category={c.category}  content={c.content} img={c.urlImg} />
                    } else {
                        return null; 
                    }
                } ) 

            }
           
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    title: {
        fontFamily: 'Bold',
        fontSize: SIZES.xLarge
    }
})

export default ArticleContent;