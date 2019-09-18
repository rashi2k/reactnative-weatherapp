import React from "react"
import {View, Text, StyleSheet } from "react-native"
import AdditionalInfoItem from "./AdditionalInfoItem"
import PropTypes from "prop-types"

const styles = StyleSheet.create({
    container :  {
        //backgroundColor:'black',
        width :"100%",
        flexDirection: 'row',
        justifyContent : "space-around",
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 20,
        borderBottomColor : '#000',
        borderBottomWidth : 1,
    },
})

const AdditionalInfoRow = props =>(
    <View style={styles.container}>
         <AdditionalInfoItem title = {props.ItemOneTitle} value = {props.ItemOneValue}  />
         <AdditionalInfoItem title = {props.ItemTwoTitle} value = {props.ItemTwoValue}  />
    </View>
)

AdditionalInfoRow.propTypes = {
    ItemOneTitle : PropTypes.string,
    ItemOneValue :  PropTypes.string,
    ItemTwoTitle : PropTypes.string,
    ItemTwoValue :  PropTypes.string,
}
export default AdditionalInfoRow