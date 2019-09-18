import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Counter from "./Counter";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 40,
        paddingLeft: 10,
        backgroundColor : 'black'
    },
    fontStyleTitle: {
        fontSize: 10,
        color: '#fff'
    },

    fontStyleValue: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff'
    }
})
const num = 60;
export default class Footer extends React.Component {
    state = {
        count: 60,
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.fontStyleTitle}>Last Update</Text>
                    <Text style={styles.fontStyleValue}>{this.props.updatedDate} {this.props.updatedTime}</Text>
                </View>
                <View>
                    <Counter count={this.state.count} />
                </View>
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.updatedTime !== nextProps.updatedTime) {
            //nextProps.setTimer;
            //console.log(nextProps.setTimer);
            clearInterval(this.interval);
            this.startCounter();
        }
        console.log("update component")
        return true;
    }

    startCounter = () =>{
        let THIS = this;
        this.setState({ count : 60})
        this.interval = setInterval( function(){THIS.setCounterValue()} , 1000);
    }

    setCounterValue = (value) => {
        this.setState({ count : (this.state.count - 1)  > 0 ? this.state.count - 1 : 0 })
    }

    componentWillUnmount(){
        clearInterval(this.interval);
       }
} 