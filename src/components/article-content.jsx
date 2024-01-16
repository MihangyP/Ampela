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
    const handleArticleItemPress = (title, content, list, imgInside, imgInsideArr, imgInsideArrMg, content2, list2, img) => {
      
        navigation.navigate('ArticleContentScreen', {
            title,
            content,
            list,
            imgInside,
            imgInsideArr,
            imgInsideArrMg,
            content2,
            list2,
            img,
        }) 
    }
    return (
        <ScrollView style={styles.container}
          showsVerticalScrollIndicator={false}
        >
            {
                content.content.map((c) => {
                    if(c.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
                        return <ArticleItem onPress={handleArticleItemPress}  navigation={navigation} key={c.title} title={c.title} category={c.category}  content={c.content} list={c.list ? c.list : null} imgInside={c.imgInside ? c.imgInside : false} imgInsideArr={c.imgInsideArr ? c.imgInsideArr : null} imgInsideArrMg={c.imgInsideArrMg ? c.imgInsideArrMg : null} content2={c.content2 ? c.content2 : null} list2={c.list2 ? c.list2 : null} img={c.urlImg} />
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