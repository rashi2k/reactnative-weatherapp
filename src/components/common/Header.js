import React from "react"
import { View, Text, StyleSheet, Button } from "react-native"

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        paddingTop: 30,
        paddingLeft: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        paddingRight: 5
    },
    textLogo: {
        //backgroundColor : 'red',
        flex: 1,
        fontSize: 25,
        fontWeight: '600',

    },
    textHistory: {
        flex: 1,
        width: 100,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

const Header = props => {

    return (
        < View style={styles.container} >
            <Text style={styles.textLogo}>Weather</Text>
            <View style={styles.textHistory}>
                <Button onPress={props.onPress} title={props.buttonText} />
            </View>
        </View >
    )
}


export default Header