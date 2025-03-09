import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import { defaultStyle, colors } from "@/styles/styles";
import { Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import Footer from "@/components/Footer";
import { CiSquarePlus } from "react-icons/ci";
import { MdAllInbox, MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";
import { useRouter } from "expo-router";
import { getMed, addMed, editMed, deleteMed } from "../services/services";

const AddMed = () => {
  const router = useRouter();
  const [medName, setMedName] = useState("");
  const [keyMolecules, setKeyMolecules] = useState("");
  const [dosing, setDosing] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("");
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [oldName, setOldName] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const [showInput, setShowInput] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  // const [allMeds, setAllMeds] = useState([]);

  type Med = {
    _id: string;
    name: string;
    keyMol?: string;
    intakeDosing?: string;
    intakeFrequency?: string;
    amountpd?: string;
    description?: string;
  };

  const handleEdit = (med: any) => {
    setIsEdit(true);
    setOldName(med.name);
    setMedName(med.name);
    setKeyMolecules(med.keyMol);
    setDosing(med.intakeDosing);
    setFrequency(med.intakeFrequency);
    setAmount(med.amountpd);
    setDescription(med.description);
    setShowInput(true);
  };

  const [allMeds, setAllMeds] = useState<Med[]>([]);

  const getAllMeds = () => {
    const url = "http://localhost:8080/tracker/allmeds";
    axios
      .get(url)
      .then((res) => {
        setAllMeds(res.data);
      })
      .catch((err) => {
        console.log("error with getting all meds: ", err);
      });
  };

  useEffect(() => getAllMeds(), []);

  //   useEffect(() => {
  //     if (med) {
  //       getUser();
  //     }
  //   }, [med]);

  const remove = async (id: string, name: any) => {
    try {
      await deleteMed(id, "aLove", name);
      console.log("Medication deleted successfully!");
      getAllMeds();
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const handleSubmit = async () => {
    const medData = {
      name: medName,
      keyMol: keyMolecules,
      intakeDosing: dosing,
      intakeFrequency: frequency,
      amountpd: amount,
      description,
      oldName: oldName,
    };
    console.log("medData", medData);

    if (isEdit) {
      const updatedMed = await editMed({
        // med: medName,
        inputData: medData,
      });
      console.log("updatedMed ======== ", updatedMed);
      if (updatedMed) {
        console.log("Medication updated!");
        setAllMeds((prevMeds) =>
          prevMeds.map((med) => (med._id === updatedMed._id ? updatedMed : med))
        );
        medData;
        setIsEdit(false);
        setShowInput(false);
      }
    } else {
      const newMed = await addMed({ inputData: medData });
      if (newMed) {
        console.log("New medication added!");
        setAllMeds((prevMeds) => [...prevMeds, newMed]);
        setShowInput(false);
      }
    }
    getAllMeds();
  };

  return (
    <View style={defaultStyle.container}>
      <View>
        <Header back={"/"} />
      </View>
      <ScrollView
        style={{ flex: 1, padding: 10 }}
        ref={scrollViewRef}
        // onContentSizeChange={scrollToBottom}
        // onContentSizeChange={scrollToBottom}
        contentContainerStyle={{ paddingBottom: 500 }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: colors.color1,
            padding: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              minHeight: 200,
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 30,
              marginTop: 10,
            }}
          >
            <Image
              source={require("../assets/images/Self-love.png")}
              style={{
                width: 150,
                height: 200,
                alignSelf: "center",
              }}
            />
            <Text style={{ fontSize: 25 }}>Your Medication 🌈</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center", // Center items vertically
              paddingHorizontal: 10, // Add some spacing
              paddingVertical: 5, // Adjust padding
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.color3,
              }}
            >
              {" "}
              Add a New Medication{" "}
            </Text>
            <TouchableOpacity onPress={() => setShowInput(true)}>
              <CiSquarePlus size={60} color="black" />
            </TouchableOpacity>
          </View>

          {showInput && (
            <View
              style={{
                marginTop: 20,
                padding: 20,
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                width: "100%",
                alignItems: "center",
              }}
            >
              <TextInput
                label="Name of Medication"
                value={medName}
                onChangeText={setMedName}
                style={styles.input}
              />
              <TextInput
                label="Key Molecules"
                value={keyMolecules}
                onChangeText={setKeyMolecules}
                style={styles.input}
              />
              <TextInput
                label="Dosing"
                value={dosing}
                onChangeText={setDosing}
                style={styles.input}
              />
              <TextInput
                label="Amount"
                value={amount}
                onChangeText={setAmount}
                style={styles.input}
              />
              <TextInput
                label="Frequency"
                value={frequency}
                onChangeText={setFrequency}
                style={styles.input}
              />
              <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
          {isSaved && (
            <Text style={{ fontSize: 18, color: "green", marginTop: 20 }}>
              Medicine Saved Successfully!
            </Text>
          )}
          {allMeds.length > 0 && (
            <View style={{ marginTop: 30, width: "100%" }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", textAlign: "left" }}
              >
                Your Current List of Medications
              </Text>
              <View style={{ marginTop: 20 }}>
                {allMeds.map((med) => (
                  <View key={med._id} style={styles.medItem}>
                    <Text style={{ fontSize: 18, color: "white" }}>
                      {med.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 20,
                        marginLeft: 10,
                      }}
                    >
                      <Pressable
                        style={{ color: "white", marginRight: 20 }}
                        onPress={() => handleEdit(med)}
                      >
                        <MdEdit />
                      </Pressable>
                      <Pressable
                        style={{ color: "white", marginRight: 20 }}
                        onPress={() => remove(med._id, med.name)}
                      >
                        <MdDelete />
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
    borderRadius: 20,
    color: "indigo",
    backgroundColor: "white",
    width: "80%",
  },
  saveButton: {
    backgroundColor: colors.color1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  saveButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  medItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.color4,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AddMed;
