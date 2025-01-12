import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, StatusBar, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { customScale } from "@/utils/CustomScale";
import { Dropdown } from 'react-native-element-dropdown';
import axios from "axios";

const LiveDataScreen = () => {
  const [warehouse, setWarehouse] = useState(null);
  const [devices, setDevices] = useState(null);
  const [inventories, setInventories] = useState(null);
  const [viewers,setViewers] = useState(null)
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [selectedViewers, setSelectedViewers] = useState(null);
  const [botDataHistory, setBotDataHistory] = useState([]);
  const [liveData, setLiveData] = useState({})
  const [loader, setLoader] = useState(false)

  // Fetch the warehouse, devices, and inventories data from AsyncStorage
  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch the warehouse data
        const storedWarehouse = await AsyncStorage.getItem('selectedWarehouse');
        if (storedWarehouse) {
          setWarehouse(JSON.parse(storedWarehouse)); // Parse and set warehouse data
        }

        // Fetch devices and inventories data
        const storedDevices = await AsyncStorage.getItem('devices');
        const storedInventories = await AsyncStorage.getItem('inventory');
        const storedViewers = await AsyncStorage.getItem('viewers')
        // console.log(storedViewers,'storedViewers',storedInventories)
        
        if (storedDevices) {
          setDevices(JSON.parse(storedDevices)); // Parse and set devices data
        }
        if (storedInventories) {
          setInventories(JSON.parse(storedInventories)); // Parse and set inventories data
        }
        if (storedViewers) {
          // console.log(JSON.parse(storedViewers),"JSON.parse(storedViewers)")
          setViewers(JSON.parse(storedViewers)); // Parse and set devices data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  // console.log(viewers,inventories,devices,"moooooooooo")
  // console.log(devices,"moooooooooo")

  const scriptData = async () => {
    if (!selectedDevice) return;
    setLoader(true)
    try {
      const response = await axios.get(
        `https://script.google.com/macros/s/AKfycbylXB05vFfOBHhKHjnqejd0xfU2k1QbtOWaar9y8A6hGAiWSlK3g3qcuHB0n7Iz5z6Xkw/exec`,
        {
          params: {
            bot_id: selectedDevice.device_id
          }
        }
      );

      if (response.status !== 200) {
        setLoader(false)
        throw new Error('Failed to fetch bot data');
      }
      console.log(response.data,response.status,selectedDevice.device_id,"response.status")
      setLoader(false)
      // Update bot data history with the new data point
      setBotDataHistory((prevData) => [
        ...prevData,
        { ...response.data.data, Time: new Date().toLocaleTimeString() } // Add the current time to the data
      ]);
    } catch (error) {
      setLoader(false)
      console.error('An error occurred:', error.message);
    }
  };

  const handleDropDown = (event) => {
    const { value } = event.target;
    const selectedDeviceData = devices?.find((item) => item?.bot_name === value);
    if (selectedDeviceData) {
      setSelectedDevice(selectedDeviceData);
    }
    setBotDataHistory([]); // Clear previous data history
  };

  // useEffect(()=>{
  // scriptData()
  // },[selectedDevice?.bot_name])
  useEffect(() => {
    if (!selectedDevice?.bot_name) return;

    // Call scriptData initially
    scriptData();

    // Set interval to call scriptData every 5 seconds
    const intervalId = setInterval(() => {
      scriptData();
    }, 60000); // 5000ms = 5 seconds

    // Clear the interval on component unmount or when selectedDevice?.bot_name changes
    return () => clearInterval(intervalId);
  }, [selectedDevice?.bot_name]);


  useEffect(()=>{
    let liveResponse = botDataHistory.filter(item=>item.Bot_Id ===selectedDevice.device_id)
    setLiveData(liveResponse)
  }, [botDataHistory])

  const Card = ({ title,val, max, min, bgColor }: any) => {
    // console.log(selectedDevice,"----------")
    return (
      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <Text style={[styles.liveDataText ]}>{title}</Text>
        <View style={styles.cardContainer}>
          
          <View style={{ width: '55%' }}>
            
            <Text style={[styles.liveDataText, { textAlign: 'right', paddingTop: customScale(20), fontSize:customScale(22) }]}>
              {val}
            </Text>
          </View>
          <View style={styles.tempContainer}>
            <Text style={styles.liveDataText}>{max}<Text style={[styles.liveDataText, {fontSize:customScale(10)}]}>max</Text>
            </Text>
            <Text style={styles.liveDataText}>{min}<Text style={[styles.liveDataText, {fontSize:customScale(10),}]}>max</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };

  console.log(botDataHistory?.length > 0 ? liveData[0]?.Temperature : '_ _', liveData,"devices")

  // color: botDataHistory.length > 0 && botDataHistory[botDataHistory.length - 1].TempRelay !== undefined
  // ? botDataHistory[botDataHistory.length - 1].TempRelay === 1
  //   ? 'red'
  //   : 'gray'
  // : 'white',

  return (
    <SafeAreaView style={styles.container}>
      {warehouse ? (
        <>
          <Text style={[styles.text, { borderColor: '#ccc', borderWidth: 1, marginHorizontal: customScale(10), marginBottom: customScale(6) ,paddingVertical:customScale(6)}]}>
            {warehouse?.Warehouse_name}
          </Text>

          <View style={[styles.card, { backgroundColor: '#fff',width: '95%',  margin:customScale(10), borderRadius: 0, borderColor: '#ccc', borderWidth: 1 }]}>
           
            <Text style={{paddingHorizontal:customScale(10), paddingTop:customScale(10), fontSize:customScale(16)}}>Devices</Text>
              {devices&&   
             
              <Dropdown
                data={devices}
                labelField="bot_name"
                valueField="device_id"
                value={selectedDevice}
                onChange={item => {
                  setSelectedDevice(item);  // Ensure you're passing the correct value
                }}
                style={[styles.dropdown, { marginBottom: customScale(0) }]}
                placeholder="Devices"
              />
                }
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop:customScale(20) }}>
              <Card title="Temperature" val={botDataHistory?.length > 0 ? liveData[0]?.Temperature : '_ _'} max={selectedDevice?.temp_max} min={selectedDevice?.temp_min} bgColor={'#fff'} />
              <Card title="Gas" val= {botDataHistory?.length?liveData[0]?.Gas : '_ _'} max={selectedDevice?.gas_max} min={selectedDevice?.gas_min} bgColor={'#fff'} />
              <Card title="Humidity" val={ botDataHistory?.length?liveData[0]?.Humidity : '_ _'} max={selectedDevice?.humidity_max} min={selectedDevice?.humidity_min} bgColor={'#fff'} />
            </View>
          </View>

          <View style={styles.container1}>
      <Text style={{paddingTop:customScale(10), fontSize:customScale(16)}}>Viewers</Text>
     {viewers&&liveData&& <Dropdown
        data={viewers}
        labelField="username"
        valueField="id"
        value={selectedViewers}
        onChange={item => setSelectedViewers(item)}
        style={styles.dropdown}
        placeholder="Viewers"
      />}
      <Text style={{paddingTop:customScale(10), fontSize:customScale(16)}}>Inventories</Text>
      {inventories&&<Dropdown
        data={inventories}
        labelField="goods"
        valueField="inventory_id"
        value={selectedInventory}
        onChange={item => setSelectedInventory(item)}
        style={styles.dropdown}
        placeholder="Select Inventory"
      />}
    </View>
        </>
      ) : (
        <Text style={styles.text}>Loading warehouse data...</Text>
      )}
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'#fff',
    paddingTop:customScale(20)
  },
  text: {
    textAlign: 'center',
    fontSize: customScale(18),
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
  },
  liveDataText: {
    fontSize: customScale(12),
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: customScale(5),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    padding: customScale(6),
    width: '30%',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  tempContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: customScale(70),
  },
  container1: {
    paddingHorizontal:customScale(10)
  },
  title: {
    fontSize: customScale(20),
    marginBottom: 16,
  },
  dropdown: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    paddingLeft: 8,
    marginTop:customScale(8),
    fontSize:customScale(16)
  },
  selectedValue: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default LiveDataScreen;

