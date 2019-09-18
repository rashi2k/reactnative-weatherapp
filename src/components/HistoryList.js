import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Button, TouchableHighlight } from 'react-native'
import { List, ListItem } from "react-native-elements";
import Header from './common/Header';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100,
        backgroundColor: 'blue'
    },

})
export default class HistoryList extends Component {
    render() {
        console.log("......................" + this.props.data);
        return (
            <View >
                <View>
                    <Header buttonText="CLOSE" onPress={this.props.onClose} />
                </View>
                <FlatList
                    data={this.props.data}
                    renderItem={({ item }) => (
                        <TouchableHighlight  onPress={ () => this.props.onItemClicked(item)}>
                             <ListItem
                            title={`${item.city} ${item.weatherStatus} ${item.tempreture}`}
                            subtitle={`${item.updatedDate}  ${item.updatedTime}`}
                        />
                        </TouchableHighlight>
                       
                    )}
                    keyExtractor={item => item.id}
                ///ListHeaderComponent={() => { return (<Header buttonText="CLOSE" onPress={this.props.onClose} />) }}
                />
            </View>
        );
    }
}