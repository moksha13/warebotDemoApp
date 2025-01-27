import { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { customScale } from "@/utils/CustomScale";
import { useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SyncDataFunction} from "@/app/(stacks)/SyncDataFunction";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [wareHouses, setWareHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inventories, setInventories] = useState([]);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const syncAndFetchData = async () => {
      try {
        setLoading(true); 
        await SyncDataFunction();
        await getData();
      } catch (error) {
        console.error('Error during synchronization or fetching:', error);
      } finally {
        setLoading(false); 
      }
    };

    syncAndFetchData();
  }, []);

  const getData = async () => {
    try {
      let warehouses = await AsyncStorage.getItem('warehouses');
      let userTypeData = await AsyncStorage.getItem('user_type');
      let inventory = await AsyncStorage.getItem('inventory');
      if (warehouses) setWareHouses(JSON.parse(warehouses));
      if (inventory) setInventories(JSON.parse(inventory));
      if (userTypeData) setUserType(userTypeData);
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={async () => {
          try {
            if (userType === 'owner') {
              await AsyncStorage.setItem('selectedWarehouse', JSON.stringify(item));
            } else {
              await AsyncStorage.setItem('selectedInventories', JSON.stringify(item));
            }
            navigation.navigate('LiveDataScreen');
          } catch (error) {
            console.error('Error storing selected item:', error);
          }
        }}
      >
        <Text style={styles.title}>
          {userType === 'owner' ? item.Warehouse_name : item.inventory_id}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (userType === 'owner') {
      return (
        <>
          <Text style={styles.text}>List Of Warehouses</Text>
          {wareHouses.length > 0 ? (
            <FlatList
              data={wareHouses}
              renderItem={renderItem}
              keyExtractor={(item) => item?.id?.toString()}
            />
          ) : (
            <Text style={styles.text}>No warehouses available.</Text>
          )}
        </>
      );
    }

    if (userType === 'viewer') {
      return (
        <>
          <Text style={styles.text}>List Of Inventories</Text>
          {inventories.length > 0 ? (
            <FlatList
              data={inventories}
              renderItem={renderItem}
              keyExtractor={(item) => item?.inventory_id?.toString()}
            />
          ) : (
            <Text style={styles.text}>No inventories available.</Text>
          )}
        </>
      );
    }

    return <Text style={styles.text}>No data available</Text>;
  };

  return <SafeAreaView style={styles.container}>{renderContent()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'#fff',
    paddingTop:customScale(10)
  },
  item: {
    backgroundColor: '#489f72',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: customScale(2),
  },
  title: {
    fontSize: customScale(16),
    color: '#fff',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: customScale(20),
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
  },
});

export default HomeScreen;

