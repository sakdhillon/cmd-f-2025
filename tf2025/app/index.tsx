import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import axios from 'axios';
import { useState,useEffect } from "react";
import Header from "../components/Header";
import {colors, defaultStyle} from "../styles/styles"
import Footer from "../components/Footer";


export default function Index() {
  const [message, setMessage] = useState('');
  const router=useRouter();

  const fetchMessage = async () => {
    try {
      const response = await axios.get('http://localhost:8080/page');
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage("Failed to fetch message");
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);


  return (
  <View style={defaultStyle.container}>
    <Header back={"/"}/>
    <View
      style={{
        flex: 1,
        padding:10,
        alignItems: "center",
      }}
    >
    
    
      <Text style={{
        fontSize: 20,
        color: colors.color2,
        backgroundColor:'white',
        padding: 20,    
        borderRadius: 60,
        margin: 10,     
      }}>{message || 'Fetching message...'}</Text>    
   



    <TouchableOpacity onPress={() => router.push("./chat")}>       
    <Text style={{
        fontSize: 20,
        color: colors.color2,
        backgroundColor:'white',
        padding: 20,    
        borderRadius: 60,
        margin: 10, }} >Chat</Text>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={() => router.push("./profile")}>
    <Text
    style={{
      fontSize: 20,
      color: colors.color2,
      backgroundColor:'white',
      padding: 20,    
      borderRadius: 60,
      margin: 10,}} 
    >Profile</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push("./meds")}>
    <Text
    style={{
      fontSize: 20,
      color: colors.color2,
      backgroundColor:'white',
      padding: 20,    
      borderRadius: 60,
      margin: 10,}} >Tracker</Text>
    </TouchableOpacity>



    <TouchableOpacity onPress={() => router.push("./signup")}>
    <Text
    style={{
      fontSize: 20,
      color: colors.color2,
      backgroundColor:'white',
      padding: 20,    
      borderRadius: 60,
      margin: 10,}} >Sign Up </Text>
    </TouchableOpacity>

  
   
    </View>

    <Footer/>
    </View>
  );
}
