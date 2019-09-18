import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WeatherInfoView from './src/components/WeatherInfoView';


export default function App() {
  return (
    <View style={styles.container}>
      <WeatherInfoView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop : 20,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
