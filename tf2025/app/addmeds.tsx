import {
  View,
  Text,
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
import { getMed, addMed, editMed } from "../services/services";

const AddMed = () => {
  const router = useRouter();
  const [medName, setMedName] = useState("");
  const [keyMolecules, setKeyMolecules] = useState("");
  const [dosing, setDosing] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("");
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const [showInput, setShowInput] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [allMeds, setAllMeds] = useState([]);

  const getAllMeds = () => {
    const url = "http://localhost:8080/tracker/allmeds";
    axios
      .get(url)
      .then((res) => {
        setAllMeds(res.data);
        console.log("result == ", res);
      })
      .catch((err) => {
        console.log("error with getting all meds: ", err);
      });
  };

  useEffect(() => getAllMeds(), []);
  useEffect(() => {
    scrollToBottom(allMeds.length > 0); // Scroll only if there are meds
  }, [allMeds]);

  const handleEdit = (med) => {
    setIsEdit(true);
    setMedName(med.name);
    setKeyMolecules(med.keyMol);
    setDosing(med.intakeDosing);
    setFrequency(med.intakeFrequency);
    setAmount(med.amountpd);
    setDescription(med.description);
    setShowInput(true);
  };

  const getUser = async () => {
    const fetchedMed = await getMed("aLove", "medName"); // Update this with actual userID and med name
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

  //   useEffect(() => {
  //     if (med) {
  //       getUser();
  //     }
  //   }, [med]);

  const handleSubmit = async () => {
    const medData = {
      name: medName,
      keyMol: keyMolecules,
      intakeDosing: dosing,
      intakeFrequency: frequency,
      amountpd: amount,
      description,
    };
    console.log("medData", medData);

    if (isEdit) {
      const updatedMed = await editMed({
        med: medData.name,
        inputData: medData,
      });
      if (updatedMed) {
        console.log("Medication updated!");
        setIsEdit(false);
      }
    } else {
      const newMed = await addMed({ inputData: medData });
      if (newMed) {
        console.log("New medication added!");
      }
    }
    getAllMeds();
    setMedName("");
    setKeyMolecules("");
    setDosing("");
    setFrequency("");
    setAmount("");
    setDescription("");
    setShowInput(false);
  };

  const scrollToBottom = (shouldScroll) => {
    if (shouldScroll) {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }
  };

  const handleDelete = (id) => {
    axios.delete("http://localhost:8080/addmeds/delete");
  };

  return (
    <View style={defaultStyle.container}>
      <View>
        <Header back={"/"} />
      </View>
      <ScrollView
        style={{ flex: 1, padding: 10 }}
        ref={scrollViewRef}
        onContentSizeChange={scrollToBottom}
        contentContainerStyle={{ paddingBottom: 500 }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            padding: 20,
            width: "100%",
            alignItems: "center",
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
              Add Medication
            </Text>
          </View>
          <TouchableOpacity onPress={() => setShowInput(true)}>
            <CiSquarePlus size={40} color="black" />
          </TouchableOpacity>
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
            <View style={{ marginTop: 30 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Medicines Added:
              </Text>
              <View style={{ marginTop: 10 }}>
                {allMeds.map((med) => (
                  <View key={med._id} style={styles.medItem}>
                    <Text style={{ fontSize: 18 }}>{med.name}</Text>
                    <Pressable onPress={() => handleEdit(med)}>
                      <MdEdit />
                    </Pressable>
                    <Pressable onPress={() => handleDelete(med._id)}>
                      <MdDelete />
                    </Pressable>
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
    backgroundColor: "#c9d1c9",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AddMed;
