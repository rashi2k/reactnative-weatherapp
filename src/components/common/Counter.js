import React from "react"
import {View, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container :{
        alignItems :'center'
    },
    title :  {
        fontSize : 10,
        color: '#fff'
    },
    counterText : {
        fontSize : 20,
        color: '#fff',
        
    }
})

const Counter = props =>(
    <View style={styles.container}>
         <Text style={styles.title}>Seconds to next update</Text>
         <Text style={styles.counterText}>{props.count}</Text>
    </View>
   
)

export default Counter