import React from "react";
import {View, ScrollView, Text, Image, StyleSheet} from 'react-native';
import {SIZES, images} from "../../constants";

const CommentContent = () => {
    // const [isScrollEnabled, setIsScrollEnabled] = useState(false);

    // const enableScroll = () => {
    //     setIsScrollEnabled(true);
    //   };
    
    //   const disableScroll = () => {
    //     setIsScrollEnabled(false);
    //   };
    return (
        <ScrollView 
        style={{marginTop: 30, height: 300}}>
            <View style={{marginVertical: 10}}>
            <View style={styles.header}>
                <Image source={images.user01} style={styles.img} />
                <View>
                <Text style={{fontFamily: "Regular"}}>Jane Green</Text>
                <Text style={{fontFamily: "Regular"}}>26/06/23</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={{fontFamily: "Regular", marginVertical: 5}}>Cela dépend, mais généralement, les personnes peuvent se sentir inconfortables et fatiguées</Text>
            </View>
        </View>
        <View style={{marginVertical: 10}}>
            <View style={styles.header}>
                <Image source={images.user01} style={styles.img} />
                <View>
                <Text style={{fontFamily: "Regular"}}>Jane Green</Text>
                <Text style={{fontFamily: "Regular"}}>26/06/23</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={{fontFamily: "Regular", marginVertical: 5}}>Cela dépend, mais généralement, les personnes peuvent se sentir inconfortables et fatiguées</Text>
            </View>
        </View>
        <View style={{marginVertical: 10}}>
            <View style={styles.header}>
                <Image source={images.user01} style={styles.img} />
                <View>
                <Text style={{fontFamily: "Regular"}}>Jane Green</Text>
                <Text style={{fontFamily: "Regular"}}>26/06/23</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={{fontFamily: "Regular", marginVertical: 5}}>Cela dépend, mais généralement, les personnes peuvent se sentir inconfortables et fatiguées</Text>
            </View>
        </View>
        <View style={{marginVertical: 10}}>
            <View style={styles.header}>
                <Image source={images.user01} style={styles.img} />
                <View>
                <Text style={{fontFamily: "Regular"}}>Jane Green</Text>
                <Text style={{fontFamily: "Regular"}}>26/06/23</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={{fontFamily: "Regular", marginVertical: 5}}>Cela dépend, mais généralement, les personnes peuvent se sentir inconfortables et fatiguées</Text>
            </View>
        </View>
        <View style={{marginVertical: 10}}>
            <View style={styles.header}>
                <Image source={images.user01} style={styles.img} />
                <View>
                <Text style={{fontFamily: "Regular"}}>Jane Green</Text>
                <Text style={{fontFamily: "Regular"}}>26/06/23</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={{fontFamily: "Regular", marginVertical: 5}}>Cela dépend, mais généralement, les personnes peuvent se sentir inconfortables et fatiguées</Text>
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        gap: 5
    },
    img: {
        width: 24,
        height: 24
    }
})

export default CommentContent;

