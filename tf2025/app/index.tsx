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
                textAlign:"center",
                marginRight:20,
              }}>
                Medicine Reminder
              </Text>
              <Text style={{
                fontSize: 15,
                textAlign:"center",
                marginRight:20,
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
       <TouchableOpacity
        style={{
          backgroundColor: colors.color4,
          width: '35%',
          paddingVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          marginLeft:10,
        }}
        onPress={() => console.log('Taken Pressed')}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Taken</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: colors.color1,
          borderColor:colors.color4,
          borderWidth:1,
           width: '40%',
          paddingVertical: 12,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft:10,
          borderRadius: 5,
        }}
        onPress={() => console.log('Reschedule Pressed')}
      >
        <Text style={{ color: colors.color4,
          
          fontSize: 16, fontWeight: 'bold' }}>Reschedule</Text>
      </TouchableOpacity>
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
        flexDirection: 'row', // Row direction to place image on the right
        width: '100%',
        minHeight: 150,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#D4FFF3',
        marginTop: 40,
      }}
    >
      <View 
        style={{
          flexDirection: 'column', // Stacks text vertically
          justifyContent: 'center',
          alignItems: 'flex-start', // Align text to the left
          marginRight: 20, // Space between text and image
        }}
      >
        <Text 
          style={{
            fontWeight: 'bold',
            fontSize: 25,
            textAlign: 'left', // Align to the left
            marginBottom: 5, // Space between title and description
          }}
        >
          Medicine Reminder
        </Text>
        <Text 
          style={{
            fontSize: 15,
            textAlign: 'left', // Align to the left
            marginBottom: 10, // Space between description and button
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
            marginTop: 10, // Space between text and button
            alignItems: 'center',
          }}
        >
          <Text 
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
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
          alignSelf: 'center',
        }}
      />
    </View>
              








        </ScrollView>
      </View>

      <Footer />
    </View>
  );
}