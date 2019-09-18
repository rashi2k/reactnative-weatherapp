import React from "react"
import {View, Text, StyleSheet } from "react-native"
import AdditionalInfoRow from "./AdditionalInfoRow"
const styles = StyleSheet.create({
    container :  {
       flexDirection : "column",
    },
})

const AdditionalDataView = props =>(

    <View style={styles.container}>
        {console.log(props)}
        <AdditionalInfoRow ItemOneTitle = "HUMIDITY" 
                            ItemOneValue = {props.humidity + ""} 
                            ItemTwoTitle = "PRESURE" 
                            ItemTwoValue = {props.pressure + ""}
                            />
        <AdditionalInfoRow ItemOneTitle = "VISIBILITY" 
                            ItemOneValue = {props.visibility + ""} 
                            ItemTwoTitle = "Tempreture" 
                            ItemTwoValue = {props.tempreture + ""}
                            />
                        
        <AdditionalInfoRow ItemOneTitle = "Wind Speed" 
                            ItemOneValue = {props.windSpeed  + ""} 
                            ItemTwoTitle = "Wind Direction" 
                            ItemTwoValue = {props.windDirection + " degree"}
                            />
                        
       
    </View>
   
)

export default AdditionalDataView