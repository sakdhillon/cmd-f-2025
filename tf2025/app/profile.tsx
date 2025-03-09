import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { defaultStyle, colors } from '@/styles/styles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';

const Profile = () => {

const router=useRouter();
  //Currently hardcoded values to check styling
  const [firstName, setFirstName] = useState('ABC');
  const [lastName, setLastName] = useState('EFG');
  const [email, setEmail] = useState('HIJ@cmdf.com');
  const [pronouns, setPronouns] = useState('He/Her');
  const [identity, setIdentity] = useState('Heterosexual');
  const [prefName, setPrefName] = useState('Tara');
  const [goal, setGoal] = useState('Get less Anxious-Avoidant');

  return (

  

    <View style={defaultStyle.container}>
    <View style={{ paddingTop: 60 }}>
      <Header back={"/"} />
    </View>
    <View style={{
      flex:1,
      backgroundColor: '#FFFFFF',
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
      <Footer/>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
 
  profileLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',

  },
  profileValue: {
    fontSize: 14,
    marginBottom: 10,
    color: '#ffffff',
    backgroundColor:colors.color4,
    padding:10,
    borderRadius:10},

  button: {
    backgroundColor: colors.color1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.color3,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
