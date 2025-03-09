import { View, Text } from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import { defaultStyle, colors } from "@/styles/styles";
import axios from "axios";

const chat = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const getChatResponse = (question: string) => {
    axios
      .post("http://localhost:8080/chat", { question: question })
      .then((res) => {
        setResponse(res.data.answer);
      });
  };

  const quesAns = [];

  return (
    <View style={defaultStyle.container}>
      <Header back={"/"} />
      {response && <Text>{response}</Text>}
      <form action="submit">
        <input
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
          Submit
        </button>
      </form>
    </View>
  );
};

export default chat;
