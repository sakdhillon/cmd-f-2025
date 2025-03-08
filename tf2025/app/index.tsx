import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import axios from 'axios';
import { useState,useEffect } from "react";
import Header from "../components/Header";
import {colors} from "../styles/styles"


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
    <View
      style={{
        flex: 1,
        padding:30,
        alignItems: "center",
      }}
    >

      <Header back={"/"}/>
      <Text>{message || 'Fetching message...'}</Text>
      
      <Text>We're going to try this now</Text>
     <TouchableOpacity onPress={() => router.push("./profile")}>
      <Text>Let's go</Text>
      </TouchableOpacity>
    </View>
  );
}
