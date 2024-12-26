import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import DATA from './data.json'
import { customScale } from "@/utils/CustomScale";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const HomeScreen = () => {
  const renderItem = ({ item }) => (
    <Item title={item.Warehouse_name} />
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
  }
});

export default HomeScreen;