import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
// import { defaultStyle, colors } from "@/styles/styles";
import { colors, defaultStyle } from "../styles/styles";
import { IoSendSharp } from "react-icons/io5";
import { MdAutoDelete } from "react-icons/md";

import axios from "axios";

const chat = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [chatHistory, setChatHistory] = useState<
    {
      _id: string;
      userQuery: any;
      botResponse: any;
    }[]
  >([]);
  const scrollViewRef = useRef<ScrollView>(null);

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

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const deleteChatHistory = () => {
    console.log("Deleting chat history...");
    if (confirm("Are you sure you want to delete the chat history?")) {
      axios
        .delete("http://localhost:8080/chat")
        .then((res) => {
          setChatHistory([]);
        })
        .then(() => "console.log('Chat history deleted')");
    } else {
      return;
    }
  };

  useEffect(() => {
    getChatHistory();
  }, [chatHistory]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Header back={"/"} />
      <ScrollView
        style={{ flex: 1, padding: 10 }}
        ref={scrollViewRef}
        onContentSizeChange={scrollToBottom}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {chatHistory.map((chat) => (
          <View key={chat._id} style={{ marginBottom: 10 }}>
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
                <Text style={{ fontSize: 16 }}>{chat.userQuery}</Text>
              </View>
            )}

            {chat.botResponse && (
              <View
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "#b6ccbc",
                  padding: 10,
                  borderRadius: 20,
                  maxWidth: "80%",
                }}
              >
                <Text style={{ fontSize: 16 }}>{chat.botResponse}</Text>
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
            fontSize: 16,
          }}
          value={question}
          onChangeText={setQuestion}
          returnKeyType="send"
          placeholder="Type your query here..."
          onSubmitEditing={() => getChatResponse(question)}
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
        <Pressable
          onPress={deleteChatHistory}
          style={{
            backgroundColor: "#007bff",
            padding: 10,
            borderRadius: 8,
            marginLeft: 10,
          }}
        >
          <MdAutoDelete color="white" size={20} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default chat;
