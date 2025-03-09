import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { defaultStyle, colors } from "@/styles/styles";
import { IoSendSharp } from "react-icons/io5";

import axios from "axios";
import { TextInput } from "react-native-paper";

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

  const quesAns = [];

  return (
    <View style={defaultStyle.container}>
      <Header back={"/"} />
      <View>
        {chatHistory &&
          chatHistory.map((chat, idx) => (
            <View
              key={chat._id}
              style={{
                flexDirection: "row",
                justifyContent: chat.userQuery ? "flex-end" : "flex-start",
                marginBottom: 10,
              }}
            >
              {/* <Text style={{ color: "red" }}>{chat.userQuery}</Text>
              <Text>{chat.botResponse}</Text> */}
              {chat.userQuery && (
                <View
                  style={{
                    backgroundColor: "#DCF8C6", // A light green background for user messages
                    padding: 10,
                    borderRadius: 15,
                    maxWidth: "80%",
                    marginLeft: "auto", // Push user message to the right
                  }}
                >
                  <Text style={{ color: "black" }}>{chat.userQuery}</Text>
                </View>
              )}
              {chat.botResponse && (
                <View
                  style={{
                    backgroundColor: "grey", // A light green background for user messages
                    padding: 10,
                    borderRadius: 15,
                    maxWidth: "80%",
                    marginLeft: "auto", // Push user message to the right
                  }}
                >
                  <Text style={{ color: "black" }}>{chat.botResponse}</Text>
                </View>
              )}
            </View>
          ))}
      </View>
      {!chatHistory && <Text>{response}</Text>}
      <form action="submit">
        <input
          value={question}
          type="text"
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type here..."
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            getChatResponse(question);
          }}
        >
          <IoSendSharp />
        </button>
      </form>
    </View>
  );
};

export default chat;
