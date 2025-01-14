import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { customScale } from "@/utils/CustomScale";
import { useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SyncDataFunction} from "@/app/(stacks)/SyncDataFunction";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [wareHouses, setWareHouses] = useState([]);
  const [loading, setLoading] = useState(true); 
  // Fetch warehouses from AsyncStorage
  const getData = async () => {
    try {
      let warehouses = await AsyncStorage.getItem('warehouses');
      if (warehouses) {
        setWareHouses(JSON.parse(warehouses)); // Parse the stored string into an array
        setLoading(false); 
      }
    } catch (error) {
      console.error('Error retrieving warehouses from AsyncStorage:', error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    SyncDataFunction(); // Synchronize data initially
  }, []);

  useEffect(() => {
    getData(); // Fetch data after syncing
  }, []); // Only run once on component mount

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.item} 
        onPress={async () => {
          try {
            await AsyncStorage.setItem('selectedWarehouse', JSON.stringify(item)); // Store the selected warehouse
            navigation.navigate('LiveDataScreen'); // Navigate to LiveDataScreen
          } catch (error) {
            console.error("Error storing warehouse:", error);
          }
        }}
      >
        <Text style={styles.title}>{item.Warehouse_name}</Text>
      </TouchableOpacity>
    );
  };
console.log(wareHouses,"wareHouses")
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.text}>List Of Warehouses</Text>
     {wareHouses? <FlatList
        data={wareHouses} // Use the state as the data source
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} // Ensure keys are unique and of type string
      />:<ActivityIndicator size={"large"}/>} */}
       {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Show loader while data is loading
      ) : (
        <>
         <Text style={styles.text}>List Of Warehouses</Text>
         <FlatList
          data={wareHouses} // Use the state as the data source
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()} // Ensure keys are unique and of type string
        />
        </>
        )}
    </SafeAreaView>
  );
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

// import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
// import DATA from './data.json'
// import { customScale } from "@/utils/CustomScale";
// import { useNavigation } from "expo-router";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { baseURL, AuthToken } from '../../api/apiUrls';
// import {syncDataFunction}  from './SyncDataFunction'


// const HomeScreen = () => {
//   const navigation = useNavigation()
//   const [wareHouses, setWareHouses] = useState([])

// useEffect(()=>{
//    syncDataFunction()
// },[])

// const getData = async()=>{
//   let warehouses1:any = await AsyncStorage.getItem('warehouses');
//   setWareHouses(warehouses1)
// }
// useEffect(()=>{
//   getData()
// },[])

// console.log(wareHouses,"warehouses")

//   return (
//     <SafeAreaView style={styles.container}>
//         <Text style={styles.text}>List Of Ware Houses</Text>
//       <FlatList
//         data={wareHouses}
//         renderItem={({item})=>{
//           console.log(item)
//           return(  <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('LiveDataScreen')}>
//         <Text style={styles.title}>{item.Warehouse_name}</Text>
//       </TouchableOpacity>)}}
//         keyExtractor={item => item.id}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     backgroundColor: '#489f72',
//     padding: 16,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius:customScale(2)
//   },
//   title: {
//     fontSize: customScale(16),
//     color:'#fff',
//     textAlign:'center'
  
//   },
//   text:{
//     textAlign:'center',
//     fontSize:customScale(20),
//     fontWeight:'bold',
//     fontStyle:'normal',
//     fontFamily:'Roboto'
//   }
// });

// export default HomeScreen;
// // import React from "react";
// // import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
// // import DATA from './data.json'
// // import { customScale } from "@/utils/CustomScale";
// // import { useNavigation } from "expo-router";

// // const Item = ({ title ,navigation}:any) => (
// //   <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('LiveDataScreen')}>
// //     <Text style={styles.title}>{title}</Text>
// //   </TouchableOpacity>
// // );

// // const HomeScreen = () => {
// //   const navigation = useNavigation()
// //   const renderItem = ({ item }:any) => (
// //     <Item title={item.Warehouse_name} navigation={navigation}/>
// //   );

// //   return (
// //     <SafeAreaView style={styles.container}>
// //         <Text style={styles.text}>List Of Ware Houses</Text>
// //       <FlatList
// //         data={DATA.warehouses}
// //         renderItem={renderItem}
// //         keyExtractor={item => item.id}
// //       />
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     marginTop: StatusBar.currentHeight || 0,
// //   },
// //   item: {
// //     backgroundColor: '#489f72',
// //     padding: 16,
// //     marginVertical: 8,
// //     marginHorizontal: 16,
// //     borderRadius:customScale(2)
// //   },
// //   title: {
// //     fontSize: customScale(16),
// //     color:'#fff',
// //     textAlign:'center'
  
// //   },
// //   text:{
// //     textAlign:'center',
// //     fontSize:customScale(20),
// //     fontWeight:'bold',
// //     fontStyle:'normal',
// //     fontFamily:'Roboto'
// //   }
// // });

// // export default HomeScreen;