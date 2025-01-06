import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import DATA from './data.json'
import { customScale } from "@/utils/CustomScale";
import { useNavigation } from "expo-router";

const Item = ({ title ,navigation}:any) => (
  <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('LiveDataScreen')}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const navigation = useNavigation()
  const renderItem = ({ item }:any) => (
    <Item title={item.Warehouse_name} navigation={navigation}/>
  );

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>List Of Ware Houses</Text>
      <FlatList
        data={DATA.warehouses}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#489f72',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:customScale(2)
  },
  title: {
    fontSize: customScale(16),
    color:'#fff',
    textAlign:'center'
  
  },
  text:{
    textAlign:'center',
    fontSize:customScale(20),
    fontWeight:'bold',
    fontStyle:'normal',
    fontFamily:'Roboto'
  }
});

export default HomeScreen;