import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Header from '@/components/Header';
import { defaultStyle, colors } from '@/styles/styles';
import { TextInput } from 'react-native-paper';
import Footer from '@/components/Footer';

const SignUp = () => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [identify, setIdentify] = useState('');
  const [prefName, setPrefName] = useState('');
  const [goal, setGoal] = useState('');


  // code to connect sign up page front and back end
  
  // const handleSubmit = async () => {
  //   try {
  //     const userData = {
  //       fname: firstName,
  //       lname: lastName,
  //       email,
  //       pronouns,
  //       identity: identify,
  //       pname: prefName,
  //       goal,
  //     };

  //     const response = await fetch('http://localhost:8080/profile/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(userData),
  //     });

  //     const data = await response.json();
      
  //     if (response.status === 200) {
  //       // Handle successful signup
  //       console.log('User created successfully', data);
  //     } else {
  //       // Handle error response
  //       console.log('Error:', data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <View style={defaultStyle.container}>
      <View style={{ paddingTop: 0 }}>
        <Header back={"/"} />
      </View>

      <View style={{ 
       flex: 1,
       backgroundColor: '#FFFFFF',
       padding: 20,  
       width: '100%',}}>

          <View style={{ 
             alignItems: 'center',
             marginBottom: 10,}}>
              <Text style={{ 
              fontSize: 28,
              fontWeight: 'bold',
              color: colors.color3,}}>Edit Profile</Text>
            </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="First Name"
            textColor={colors.color4}
            value={firstName}
            onChangeText={text => setfirstName(text)}
            style={styles.input}
          />

          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={text => setlastName(text)}
            style={styles.input}
            textColor={colors.color4}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            textColor={colors.color4}
          />

          <TextInput
            label="Pronouns"
            value={pronouns}
            onChangeText={text => setPronouns(text)}
            style={styles.input}
            textColor={colors.color4}
          />

          <TextInput
            label="How do you identify?"
            value={identify}
            onChangeText={text => setIdentify(text)}
            style={styles.input}
            textColor={colors.color4}
          />

          <TextInput
            label="What is your preferred name?"
            value={prefName}
            onChangeText={text => setPrefName(text)}
            style={styles.input}
            textColor={colors.color4}
          />

          <TextInput
            label="What is your goal?"
            value={goal}
            onChangeText={text => setGoal(text)}
            style={styles.input}
            textColor={colors.color4}
          />
        </View>

        <TouchableOpacity onPress={()=> console.log('sign up button pressed')} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({

  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 5,
    backgroundColor: colors.color1,
  
    borderRadius: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: colors.color1,
    paddingVertical: 12,
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

export default SignUp;
