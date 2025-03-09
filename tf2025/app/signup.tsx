import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { defaultStyle, colors } from '@/styles/styles'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'

const [firstName, setfirstName] = useState('');
const [lastName, setlastName] = useState('');
const [email, setEmail] = useState('');
const[pronouns,setPronouns]= useState('');
const[identify, setIdentify] = useState('');
const[prefName, setPrefName] = useState('');
const[goal, setGoal] = useState('');


const SignUp = () => {



return (
<View style={defaultStyle.container}>
    <Header back={"/"}/>

<View style={{
      flex:1,
      marginTop:40,
      backgroundColor:colors.color1,
      borderRadius:50,
      width:"100%",
      padding:100,

}}>


<TextInput
  label="First Name"
  value={firstName}
  onChangeText={text => setfirstName(text)}/>


<TextInput
  label="Last Name"
  value={lastName}
  onChangeText={text => setlastName(text)}/>


<TextInput
  label="Email"
    value={email}
  onChangeText={text => setEmail(text)}/>


<TextInput
  label="Pronouns"
  value={pronouns}
  onChangeText={text => setPronouns(text)}/>


<TextInput
  label="How do you identify?"
  value={identify}
  onChangeText={text => setIdentify(text)}/>
 


<TextInput
  label="What is your preferred name?"
  value={prefName}
  onChangeText={text => setPrefName(text)}/>


<TextInput
  label="What is your goal?"
  value={goal}
  onChangeText={text => setGoal(text)}/>



</View>


  <Text>Sign Up</Text>
</View>
  )
}

export default SignUp