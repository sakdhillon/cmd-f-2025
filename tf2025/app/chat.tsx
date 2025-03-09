import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { defaultStyle, colors } from "@/styles/styles";
import { IoSendSharp } from "react-icons/io5";

import axios from "axios";

const chat = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const getChatResponse = (question: string) => {
    axios
      .post("http://localhost:8080/chat", { question: question })
      .then((res) => {
        setResponse(res.data.answer);
        setQuestion("");
      })
      .catch((err) => {
        setResponse(
          "Sorry, I don't understand that question or it is out of my scope"
        );
        setQuestion("");
      });
  };

  const getChatHistory = () => {
    axios
      .get("http://localhost:8080/chat")
      .then((res) => {
        setChatHistory(res.data);
      })
      .catch((err) => {
        console.log("Failed to get chat history from DB with error: ", err);
      });
  };

  useEffect(getChatHistory, [chatHistory]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Header back={"/"} />
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {chatHistory.map((chat) => (
          <View key={chat._id} style={{ marginBottom: 10 }}>
            {/* User message on the right */}
            {chat.userQuery && (
              <View
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: "#c4eba7",
                  padding: 10,
                  borderRadius: 15,
                  maxWidth: "80%",
                  marginBottom: 5,
                }}
              >
                <Text style={{ fontSize: "1.3rem" }}>{chat.userQuery}</Text>
              </View>
            )}

            {/* Bot response on the left */}
            {chat.botResponse && (
              <View
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "#b6ccbc",
                  padding: 10,
                  borderRadius: 15,
                  maxWidth: "80%",
                }}
              >
                <Text style={{ fontSize: "1.3rem" }}>{chat.botResponse}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          padding: 10,
          borderTopWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
            borderColor: "#ccc",
            backgroundColor: "#fff",
            fontSize: "1.3rem",
          }}
          value={question}
          onChangeText={setQuestion}
          placeholder="Type your query here..."
        />
        <Pressable
          onPress={() => getChatResponse(question)}
          style={{
            backgroundColor: "#007bff",
            padding: 10,
            borderRadius: 8,
            marginLeft: 10,
          }}
        >
          <IoSendSharp color="white" size={20} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default chat;
