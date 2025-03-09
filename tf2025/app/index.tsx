import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-paper";
import axios from 'axios';
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { colors, defaultStyle } from "../styles/styles"
import Footer from "../components/Footer";
import { ScrollView } from "react-native";

export default function Index() {
  const [message, setMessage] = useState('');
  const router = useRouter();
  
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
      <View style={{ paddingTop: 60 }}>
        <Header back={"/"} />
      </View>
      
      <View style={{ flex: 1, marginBottom: 100 }}>
        <ScrollView 
          contentContainerStyle={{ 
            padding: 10,
          }}
          showsVerticalScrollIndicator={true}
        >
          <View
            style={{
              backgroundColor: colors.color1,
              flexDirection: "row",
              width: "100%",
              minHeight: 200,
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 30, 
              marginTop: 40,
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
            <Text style={{ fontSize: 25 }}>
              Good Morning 🌈
            </Text>
          </View>

          <View>
            <Text style={{
              fontWeight: "bold",
              fontSize: 30,
              textAlign: "center",
            }}>
              Upcoming Care Moment
            </Text>
          </View>

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
            <View>
              <Text style={{
                fontWeight: "bold",   
                fontSize: 25,
                textAlign:"center"
              }}>
                Medicine Reminder
              </Text>
              <Text style={{
                fontSize: 15,
                textAlign:"center"
              }}>
                Description of Medicine
              </Text>

              <View
      style={{
        flexDirection: "row",
        marginTop: 20,  
        width: "100%",
       
      }}
    >
      <Button
        mode="contained"
        style={{
          width: "35%",  
     
        }}
      >
        Taken
      </Button>

      <Button
        mode="contained"
        style={{
          width: "30%",
          paddingHorizontal: 10, 
  
        }}
      >
      Reschedule
      </Button>
    </View>
            </View>
          </View>

          <View>
            <Text style={{
              fontWeight: "bold",
              fontSize: 24,
              marginTop: 40,
              textAlign: "center",
            }}>
              It's been 4 days since you've chatted with Rainbow
            </Text>
          </View>

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


              <Text style={{
                fontWeight: "bold",   
                fontSize: 25,
                textAlign:"center"
              }}>
                Medicine Reminder
              </Text>
              <Text style={{
                fontSize: 15,
                textAlign:"center"
              }}>
                Description of Medicine
              </Text>

              <Image
              source={require("../assets/images/heart.png")}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center", 
              }}
            />
              </View>
              








        </ScrollView>
      </View>

      <Footer />
    </View>
  );
}