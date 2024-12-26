import { StyleSheet, TouchableOpacity, Text, View, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { customScale } from '@/utils/CustomScale';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '@/utils/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignupScreen() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        user_type: 'viewer'
    });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [errors, setErrors] = useState({
        name: '',
        password: '',
    });

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: '',
        }));
    };

    const handleSubmit = async() => {
        const { name,   password,  } = formData;
        let validationErrors = {};
        if (!name) validationErrors.name = 'Name is required.';
       
        if (!password) {
            validationErrors.password = 'Password is required.';
        } else if (password.length <= 5) {
            validationErrors.password = 'Incorrect password.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log('Form submitted:', formData);
            await AsyncStorage.setItem('isLoggedIn', 'true');
            navigation.navigate('HomeScreen')
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Login</Text>
            <Text style={styles.description}>Please login to get started
            </Text> 
            <View style={{ flexDirection: 'row', justifyContent: 'center',  }}>
            <TouchableOpacity
        style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5,
            backgroundColor: formData.user_type === 'owner' ? '#489f72' : 'white',
            borderWidth: formData.user_type !== 'owner' ? 1 : 0,
            borderColor: '#489f72',
          }}
        onPress={() => setFormData({ ...formData, user_type: 'owner' })}
      >
        <Text
           style={{fontWeight: 'bold',
            textAlign: 'center',
            color: formData.user_type === 'owner' ? 'white' : 'black',}}
        >
          Owner
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5,
            backgroundColor: formData.user_type === 'owner' ?  'white':'#489f72' ,
            borderWidth:1, 
            borderColor: '#489f72',
        }}
        onPress={() => setFormData({ ...formData, user_type: 'viewer' })}
      >
        <Text
          style={{fontWeight: 'bold',
            textAlign: 'center',
            color: formData.user_type !== 'owner' ? 'white' : 'black',}}
        >
          Viewer
        </Text>
      </TouchableOpacity>
      </View>
            <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>USERNAME</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter your name"
                        placeholderTextColor="#B0B0B0"
                        value={formData.name}
                        onChangeText={(value) => handleInputChange('name', value)}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                </View>

             
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>PASSWORD</Text>
                    <View style={[styles.inputField, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor="#B0B0B0"
                            value={formData.password}
                            onChangeText={(value) => handleInputChange('password', value)}
                            secureTextEntry={!passwordVisible}
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Icon
                                name={passwordVisible ? 'eye' : 'eye-slash'}
                                size={20}
                                color="#B0B0B0"
                                style={{ left: -25 }}
                            />
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>
               
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: customScale(10) }}>
                    <Text style={[styles.checkedText, { color: '#646982' }]}>Do have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('index')}>
                        <Text style={[styles.forgotText, { marginLeft: 4 }]}>Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}