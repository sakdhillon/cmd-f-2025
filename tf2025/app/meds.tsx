import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import Header from "@/components/Header";
import { defaultStyle, colors } from "@/styles/styles";
import { TextInput } from "react-native-paper";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import Footer from "@/components/Footer";
import { getMed, addMed, editMed } from '../services/services';

const meds = () => {

  const router = useRouter();
  const [medName, setMedName] = useState('');
  const [keyMolecules, setKeyMolecules] = useState('');
  const [dosing, setDosing] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('');
  const [description, setDescription] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);



  const getUser = async () => {
    const fetchedMed = await getMed('aLove', 'medName'); // Update this with actual userID and med name
    if (fetchedMed) {
      setIsEdit(true);
      setMedName(fetchedMed.name);
      setKeyMolecules(fetchedMed.keyMol);
      setDosing(fetchedMed.intakeDosing);
      setFrequency(fetchedMed.intakeFrequency);
      setAmount(fetchedMed.amountpd);
      setDescription(fetchedMed.description);
    }
  };

  // useEffect(() => {
  //   if (med) {
  //     getUser(); 
  //   }
  // }, [med]);

  const handleSubmit = async () => {
    const medData = {
      name: medName,
      keyMol: keyMolecules,
      intakeDosing: dosing,
      intakeFrequency: frequency,
      amountpd: amount,
      description,
    };

    if (isEdit) {
      // Handle editing medication
      const updatedMed = await editMed({ inputData: medData }); // This should call the backend to update
      if (updatedMed) {
        console.log("Medication updated!");
      }
    } else {
      // Handle adding new medication
      const newMed = await addMed({ inputData: medData });
      if (newMed) {
        console.log("New medication added!");
      }
    }
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  };
  return (
    <View style={defaultStyle.container}>
      <View style={{ paddingTop: 60 }}>
        <Header back={"/"} />
      </View>
      <ScrollView
        style={{ flex: 1, padding: 10 }}
        ref={scrollViewRef}
        onContentSizeChange={scrollToBottom}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            padding: 20,
            width: "100%",
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: colors.color3,
              }}
            >
              Add Medicine
            </Text>
          </View>

          <View style={styles.inputContainer}>

  <TextInput
    label="Name of Medication"
    value={medName}
    onChangeText={text => setMedName(text)}
    style={{ marginBottom: 15,
    borderRadius:30,
    color:"indigo",


    }} // Added space
  />


  <TextInput
    label="Key Molecules"
    value={keyMolecules}
    onChangeText={text => setKeyMolecules(text)}
    style={{ marginBottom: 15,
      borderRadius:30,
      color:"indigo",


    }} // Added space
  />


  <TextInput
    label="Dosing per Intake"
    value={dosing}
    onChangeText={text => setDosing(text)}
    style={{ marginBottom: 15,
      borderRadius:30,
      color:"indigo",


    }} // Added space
  />

  <TextInput
    label="Frequency of Intake"
    value={frequency}
    onChangeText={text => setFrequency(text)}
    style={{ marginBottom: 15,
      borderRadius:30,
      color:"indigo",



    }} // Added space
  />

<TextInput
  label="Amount per Day"
  value={amount}
  onChangeText={text => setAmount(text)}
  style={{ marginBottom: 15,
    borderRadius:30,
    color:"indigo",

  }} // Added space
/>


<TextInput
  label="Description"
  value={description}
  onChangeText={text => setDescription(text)}
  style={{ 
    marginBottom: 15,
    borderRadius:30,
    color:"indigo",

  }} // Added space
/>



</View>
<TouchableOpacity onPress={handleSubmit} style={styles.button}>
<Text style={styles.buttonText}>Create</Text>
</TouchableOpacity>
      </View>

    </ScrollView>
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
      alignItems: "center",
    },
    buttonText: {
      color: colors.color3,
      fontSize: 18,
      fontWeight: "bold",
    paddingBottom: 30,
    },
  });

export default meds;
