import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class TitleContainer extends React.Component {
    render() {
        return (
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{this.props.title}</Text>
                <Text style={styles.additionalText}>{this.props.additionalText}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#F1F4F8',
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        
        borderBottomWidth: 1,
        borderColor: '#CBD2E1'
    },

    titleText: {
        color: '#4F6C92',
        fontSize: 18,
        fontWeight: 'bold',

    },
    
    additionalText: {
        marginLeft: 20,
        fontSize: 18,
        color: '#A4B8D3'
    },
});