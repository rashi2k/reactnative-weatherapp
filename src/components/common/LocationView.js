import React from "react"
import {View, Text, StyleSheet } from "react-native"
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    container :  {
        flexDirection : 'column',
        justifyContent : 'flex-start',
        alignContent : 'center',
        borderColor : "#000",
        //borderWidth : 1,
        //width : 200,
    },
    textStyle :{
        textAlign :'center',
        fontSize : 30,
        fontWeight : 'bold'
    }
})

const LocationView = props =>(
    <View style={styles.container}>
         <Text style={styles.textStyle} >{props.city}</Text>
         <Text style={styles.textStyle}>{props.weather}</Text>
         <Text style={styles.textStyle}>{props.tempreture}</Text>
    </View>
   
)

LocationView.propTypes = {
    city :PropTypes.string,
    weather :PropTypes.string,
    tempreture : PropTypes.string
}

export default LocationView