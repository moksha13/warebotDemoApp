import React from "react";
import { SafeAreaView,Image, ScrollView, StatusBar, StyleSheet , Text, TouchableOpacity, View} from "react-native";
import DATA from './data.json'
import { customScale } from "@/utils/CustomScale";


const LiveDataScreen = () => {

  const Card = ({ title,   max, min, normal, bgColor }:any) => {
    return (
      <View style={[styles.card,{backgroundColor:bgColor}]}>
        <View style={styles.cardContainer}>
        <View style={{width:'50%'}} >
            <Text style={styles.liveDataText}>{title}</Text>
            <Text style={[styles.liveDataText,{textAlign:'right', paddingTop:customScale(20)}]}>{normal}c</Text>
            </View>
            <View style={styles.tempContainer}>
            <Text style={styles.liveDataText}>{max}max</Text>
            <Text style={styles.liveDataText}>{min}min</Text>
            </View>
            </View>
      </View>
    );
  };
  const handlePress = () => {
    alert('Read More clicked!');
  };

  return (
    <SafeAreaView style={styles.container}>
          <Text style={styles.text}>Live Data</Text>
          <ScrollView>
        <Card
          title="Temperature"
          max={30}
          min={20}
          normal={40}
          bgColor='red'
        />
        <Card
          title="Gas"
          max={30}
          min={20}
          normal={40}
           bgColor='skyblue'
        />
         <Card
          title="Humidity"
          max={30}
          min={20}
          normal={40}
          bgColor='green'
        />
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
    text:{
      textAlign:'center',
      fontSize:customScale(20),
      fontWeight:'bold',
      fontStyle:'normal',
      fontFamily:'Roboto',
    
    },
    liveDataText:{
      fontSize:customScale(16),
      fontWeight:'bold',
      fontStyle:'normal',
      fontFamily:'Roboto'
      
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      margin: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
      padding:customScale(10)
    },
    cardContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:'90%'
    },
    tempContainer:{
      flexDirection:'column',
      justifyContent:'space-between',
      height:customScale(100)
    }
  
});

export default LiveDataScreen;