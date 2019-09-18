import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import Header from './common/Header';
import Footer from './common/Footer';
import LocationView from './common/LocationView';
import AdditionalDataView from './common/AdditionalDataView';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';
import { SQLite } from 'expo-sqlite';
import HistoryList from './HistoryList';


const db = SQLite.openDatabase("database4.db", 1);

export default class WeatherInfoView extends Component {
    state = {
        items: [],
        lattitude: 0,
        longitude: 0,
        city: 'Unknown',
        weather: '',
        tempreture: '',
        updatedDate: '',
        updatedTime: '',
        showList: false,
        showHistoryItem: false,
        item: {},
        loading: true,
    }

    componentWillMount() {
        db.transaction(tx => {
            tx.executeSql(
                "create table if not exists tbl_weather (id integer primary key not null, updatedDate  text, updatedTime  text, city text, weatherStatus text, humidity text, tempreture text,  pressure text, visibility text, windDirection text, windSpeed text);", [], console.log("create table sucess"), null
            );
        });
        this.getLocationAsync();
    }

    componentDidMount() {
        this.setTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getLocationAsync = async () => {
        this.setState({ loading: true })
        await navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = parseFloat(position.coords.latitude);
                let long = parseFloat(position.coords.longitude);
                this.setState({ lattitude: lat, longitude: long });
                console.log(this.state.lattitude);
                this.getCurrentLocationAddress(this.state.lattitude, this.state.longitude);
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    getCurrentLocationAddress = async () => {
        let location = await Location.getCurrentPositionAsync({});
        let geocode = await Location.reverseGeocodeAsync(location.coords);

        if (geocode[0].city !== undefined) {
            this.setState({ city: geocode[0].city });
            this.getWeatherInformation(geocode[0].city);
        }
    }

    setTimer = () => {
        let THIS = this;
        this.interval = setInterval(function () { THIS.getLocationAsync(); }, 60000);
    }

    getWeatherInformation = (city) => {
        //city = "Ambalangoda"
        fetch('https://community-open-weather-map.p.rapidapi.com/weather?q=' + city, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': 'b2e7308875mshf1c8edb86f0683cp1d9427jsn114b5d81e0c5',
            }
        })
            .then(res => res.json())
            .then(res => {
                //console.log(res);
                this.setState(
                    {
                        weather: res.weather[0].main,
                        tempreture: res.main.temp - 273.15 + " C",
                        humidity: res.main.humidity,
                        pressure: res.main.pressure,
                        visibility: res.visibility !== null ? res.visibility : "",
                        windSpeed: res.wind.speed,
                        windDirection: res.wind.deg,
                    });
            })
            .then(() =>
                this.saveToDatabase()
            ).catch(error => {
                this.setState({
                    loading: false,
                    tempreture: "Not Available",
                    humidity: "Not Available",
                    windDirection: "Not Available",
                    windSpeed: "Not Available",
                    visibility: "Not Available",
                    pressure: "Not Available",
                })
                console.log("..-" + JSON.stringify(error));
            });
    }

    saveToDatabase = () => {
        this.setState({
            updatedDate: new Date().toDateString(),
            updatedTime: new Date().toLocaleTimeString()
        })
        let queryString = "?, ?, ?, ?, ?, ?, ?, ?, ? ,?";
        let values = [];
        values.push(new Date().toDateString(), new Date().toLocaleTimeString(), this.state.city, this.state.weather, this.state.tempreture + "", this.state.humidity + "", this.state.pressure + "", this.state.visibility + "", this.state.windSpeed + "", this.state.windDirection + "")
        db.transaction(
            tx => {
                tx.executeSql("insert into tbl_weather (updatedDate, updatedTime, city, weatherStatus, tempreture, humidity , pressure, visibility, windSpeed, windDirection) values (" + queryString + ")", values,
                    this.onDataSaveSuccess(tx), this.onDataSaveError());
            },
            null,
        );
    }

    onDataSaveSuccess = (tx) => {
        this.setState({ loading: false })
        console.log("sucess");
        db.transaction(tx => {
            tx.executeSql(
                "select * from tbl_weather",
                [],
                (_, { rows: { _array } }) => this.setState({ items: _array })
            );
        });
    }

    onDataSaveError = () => {
        this.setState({ loading: false })
        console.log("save to database is failded");
    }

    componentWillUnmount() {
        //navigator.geolocation.clearWatch(this.watchID);
    }

    onClose() {
        this.setState({ showList: false })
    }

    onHistoryItemClicked = (item) => {
        console.log("item clicked " + item.city)
        this.setState({ showHistoryItem: true, item: item, })
    }

    renderInnerView() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={[styles.innerView, { alignItems: 'center', justifyContent: 'center' }]}>
                        <LocationView   {...this.state} />
                    </View>
                    <View style={[styles.innerView, { backgroundColor: 'white' }]}>
                        <AdditionalDataView {... this.state} />
                    </View>
                </View>
            )
        }
    }

    renderView() {
        if (this.state.showList) {
            if (this.state.showHistoryItem) {
                return (
                    <View style={{ flex: 1 }}>
                        <Header buttonText="ClOSE" onPress={() => this.setState({ showHistoryItem: !this.state.showHistoryItem })} />
                        <View style={{ flex: 1 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{this.state.item.updatedDate + "" + this.state.item.updatedTime}</Text>
                            </View>
                            <View style={[styles.innerView, { alignItems: 'center', justifyContent: 'center' }]}>
                                <LocationView city={this.state.item.city} tempreture={this.state.item.tempreture} weather={this.state.item.weatherStatus} />
                            </View>
                            <View style={[styles.innerView, { backgroundColor: 'white' }]}>
                                <AdditionalDataView {...this.state.item} />
                            </View>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View>
                        <HistoryList data={this.state.items} onClose={() => this.onClose()} onItemClicked={this.onHistoryItemClicked} />
                    </View>
                );
            }
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <Header buttonText="History" onPress={() => this.setState({ showList: !this.state.showList })} />
                    {this.renderInnerView()}
                </View>
            );
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderView()}
                <Footer updatedDate={this.state.updatedDate} updatedTime={this.state.updatedTime} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    },
    innerView: {
        flex: 1,
        //height : '50%',
        marginTop: 10,
        alignItems: 'center',

    },

});