import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { defaultStyle, colors } from '@/styles/styles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { getInfo } from '../services/services';
import axios from "axios";


const Profile = () => {
  //Currently hardcoded values to check styling
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [identity, setIdentity] = useState('');
  const [prefName, setPrefName] = useState('');
  const [goal, setGoal] = useState('');

  const router = useRouter()
  const [userLoaded,setUserLoadState] = useState(false)
  const [user,setUser] = useState([])
 
  const getUser = async () => {
    const fetchedUser = await getInfo(); 
    console.log("fetchedUser:", fetchedUser);

    if (fetchedUser) {
        setUser(fetchedUser); 
        setFirstName(fetchedUser.fname);
        setLastName(fetchedUser.lname);
        setEmail(fetchedUser.email);
        setPronouns(fetchedUser.pronouns);
        setIdentity(fetchedUser.identity);
        setPrefName(fetchedUser.pname);
        setGoal(fetchedUser.goal);
      } else {
          router.push('/')
      }
  }
 
  useEffect(() => {
      getUser()
  }, [])

  return (

  

    <View style={defaultStyle.container}>

      <Header back={"/"} />
      <ScrollView contentContainerStyle={{ paddingBottom: 100}}>
    <View style={{
      flex:1,
      backgroundColor: colors.color1,
      padding: 20,
    }}>




      <View style={{ 
       alignItems: 'center',
       marginBottom: 10,}}>
        <Text style={{ 
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.color3,}}>Profile</Text>
      </View>



      <Image source={require('../assets/images/ada.jpeg')} 
      style={{width: 100, 
      height: 100,
      alignSelf: 'center',
      marginTop: 10,
      borderRadius: 50, marginBottom: 30}} />

      <View style={{ 
      
        borderRadius:50,     
        marginBottom: 30}}>
          
        <Text style={styles.profileLabel}>First Name:</Text>
        <Text style={styles.profileValue}>{firstName}</Text>

        <Text style={styles.profileLabel}>Last Name:</Text>
        <Text style={styles.profileValue}>{lastName}</Text>

        <Text style={styles.profileLabel}>Email:</Text>
        <Text style={styles.profileValue}>{email}</Text>

        <Text style={styles.profileLabel}>Pronouns:</Text>
        <Text style={styles.profileValue}>{pronouns}</Text>

        <Text style={styles.profileLabel}>Identity:</Text>
        <Text style={styles.profileValue}>{identity}</Text>

        <Text style={styles.profileLabel}>Preferred Name:</Text>
        <Text style={styles.profileValue}>{prefName}</Text>

        <Text style={styles.profileLabel}>Goal:</Text>
        <Text style={styles.profileValue}>{goal}</Text>

      </View>
   
     <TouchableOpacity 
     onPress={() => router.push("./signup")}     
     style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      </View>

      </ScrollView>
      <Footer/>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color1,
    padding: 20,
  },
 
  profileLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',

  },
  profileValue: {
    fontSize: 14,
   
    color: '#ffffff',
    backgroundColor:colors.color4,
    padding:10,
    borderRadius:10},

  button: {
    backgroundColor: colors.color1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop:-10,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.color3,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
