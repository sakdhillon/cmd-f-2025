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

const meds = () => {
  const [medName, setmedName] = useState("");
  const [keyMolecules, setkeyMolecules] = useState("");
  const [dosing, setdosing] = useState("");
  const [amount, setamount] = useState("");
  const [frequency, setfrequency] = useState("");
  const [description, setdescription] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

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
              onChangeText={(text) => setmedName(text)}
              style={{ marginBottom: 15, borderRadius: 30, color: "indigo" }} // Added space
            />

            <TextInput
              label="Key Molecules"
              value={keyMolecules}
              onChangeText={(text) => setkeyMolecules(text)}
              style={{ marginBottom: 15, borderRadius: 30, color: "indigo" }} // Added space
            />

            <TextInput
              label="Dosing per Intake"
              value={dosing}
              onChangeText={(text) => setdosing(text)}
              style={{ marginBottom: 15, borderRadius: 30, color: "indigo" }} // Added space
            />

            <TextInput
              label="Frequency of Intake"
              value={frequency}
              onChangeText={(text) => setfrequency(text)}
              style={{ marginBottom: 15, borderRadius: 30, color: "indigo" }} // Added space
            />

            <TextInput
              label="Amount per Day"
              value={amount}
              onChangeText={(text) => setamount(text)}
              style={{ marginBottom: 15, borderRadius: 30, color: "indigo" }} // Added space
            />

            <TextInput
              label="Description"
              value={description}
              onChangeText={(text) => setdescription(text)}
              style={{
                marginBottom: 15,
                borderRadius: 30,
                color: "indigo",
              }} // Added space
            />
          </View>
          <TouchableOpacity
            onPress={() => console.log("Create Medication List Pressed")}
            style={styles.button}
          >
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
