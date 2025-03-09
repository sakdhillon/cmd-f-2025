import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/home"); // Navigate to Home.js after 3 seconds
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require("../assets/images/logo2.png")} 
        style={{   width: 200, // Adjust size
          height: 200,
          resizeMode: "contain",
        borderRadius:20}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 200, // Adjust size
    height: 200,
    resizeMode: "contain",
  },
});
