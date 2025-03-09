import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { defaultStyle, colors } from '@/styles/styles'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'


const [medName, setmedName] = useState('');
const [keyMolecules, setkeyMolecules] = useState('');
const [dosing, setdosing] = useState('');
const[amount, setamount] = useState('');
const[frequency, setfrequency] = useState('');
const[description, setdescription] = useState('');


const meds = () => {



return (
<View style={defaultStyle.container}>
    <Header back={"/"}/>

<View style={{
      flex:1,
  
      backgroundColor:colors.color1,
      borderRadius:50,
      width:"100%",
      padding:10,
      height:"auto"

}}>


<TextInput
  label="Name of Medication"
  value={medName}
  onChangeText={text => setmedName(text)}
  style={{ marginBottom: 15,
  borderRadius:30,
  color:"indigo",


   }} // Added space
/>


<TextInput
  label="Key Molecules"
  value={keyMolecules}
  onChangeText={text => setkeyMolecules(text)}
  style={{ marginBottom: 15,
    borderRadius:30,
    color:"indigo",


  }} // Added space
/>


<TextInput
  label="Dosing per Intake"
  value={dosing}
  onChangeText={text => setdosing(text)}
  style={{ marginBottom: 15,
    borderRadius:30,
    color:"indigo",


   }} // Added space
/>

<TextInput
  label="Frequency of Intake"
  value={frequency}
  onChangeText={text => setfrequency(text)}
  style={{ marginBottom: 15,
    borderRadius:30,
    color:"indigo",



   }} // Added space
/>

<TextInput
  label="Amount per Day"
  value={amount}
  onChangeText={text => setamount(text)}
  style={{ marginBottom: 15,
    borderRadius:30,
    color:"indigo",

  }} // Added space
/>


<TextInput
  label="Description"
  value={description}
  onChangeText={text => setdescription(text)}
  style={{ marginBottom: 15,
    borderRadius:30,
    color:"indigo",

  }} // Added space
/>



</View>


</View>
  )
}

export default meds