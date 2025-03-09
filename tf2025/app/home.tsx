import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { colors, defaultStyle } from "../styles/styles";
import { getInfo } from "../services/services";
import Footer from "../components/Footer";

export default function Home() {
  const [message, setMessage] = useState("");
  const [prefName, setPrefName] = useState("");
  const router = useRouter();

  const getUser = async () => {
    const fetchedUser = await getInfo();
    console.log("fetchedUser:", fetchedUser);

    if (fetchedUser) {
      setPrefName(fetchedUser.pname);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // const fetchMessage = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/page");
  //     setMessage(response.data.message);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setMessage("Failed to fetch message");
  //   }
  // };

  // useEffect(() => {
  //   fetchMessage();
  // }, []);

  return (
    <View style={defaultStyle.container}>
      <Header back={"/"} />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          paddingBottom: 1000,
        }}
      >
        {/* <Text
          style={{
            fontSize: 20,
            color: colors.color2,
            backgroundColor: "white",
            padding: 20,
            borderRadius: 60,
            margin: 10,
          }}
        >
          {message || "Fetching message..."}
        </Text> */}

        <TouchableOpacity onPress={() => router.push("./chat")}>
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
            <Text style={{ fontSize: 25 }}>Good Morning {prefName} 🌈</Text>
          </View>
        </TouchableOpacity>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Upcoming Care Moment
        </Text>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            minHeight: 150,
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 30,
            backgroundColor: "#D4FFF3",
            marginTop: 40,
          }}
        >
          <Image
            source={require("../assets/images/hand.png")}
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
            }}
          />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                textAlign: "center",
                marginRight: 20,
              }}
            >
              Oestrodose Reminder
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                marginRight: 20,
              }}
            >
              Description of Medicine
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: colors.color4,
                  width: "35%",
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginLeft: 10,
                }}
                onPress={() => console.log("Taken Pressed")}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  Taken
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: colors.color1,
                  borderColor: colors.color4,
                  borderWidth: 1,
                  width: "40%",
                  paddingVertical: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                  borderRadius: 5,
                }}
                onPress={() => console.log("Reschedule Pressed")}
              >
                <Text
                  style={{
                    color: colors.color4,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Reschedule
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            marginTop: 40,
            textAlign: "center",
          }}
        >
          It's been 4 days since you've chatted with Rainbow
        </Text>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            minHeight: 150,
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 30,
            backgroundColor: "#D4FFF3",
            marginTop: 40,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              marginRight: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                textAlign: "left",
                marginBottom: 5,
              }}
            >
              Medicine Reminder
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                marginBottom: 10,
              }}
            >
              Description of Medicine
            </Text>

            <TouchableOpacity
              onPress={() => router.push("./chat")}
              style={{
                backgroundColor: colors.color4,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Start a Chat
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("../assets/images/heart.png")}
            style={{
              width: 100,
              height: 80,
              alignSelf: "center",
            }}
          />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
