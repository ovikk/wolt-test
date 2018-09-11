import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import TitleConainer from './common/TitleContainer';




export default class MyShifts extends React.Component {
    render() {
        console.log('my shifts')
        return (
            <View style={styles.container}>
                <TitleConainer title='today' />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    titleContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#F1F4F8',
        paddingLeft: 20,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
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
