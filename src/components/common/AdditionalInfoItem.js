import React from "react"
import {View, Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"

const styles = StyleSheet.create({
    container :  {
        alignItems : "center",
        flexDirection : 'column',
    },
})

const AdditionalInfoItem = props =>(
    <View style={styles.container}>
         <Text >{props.title}</Text>
         <Text >{props.value}</Text>
    </View>
   
)

AdditionalInfoItem.propTypes = {
    title : PropTypes.string,
    value :PropTypes.string,
}

export default AdditionalInfoItem