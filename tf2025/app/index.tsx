import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";


export default function Index() {

  const router=useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <Text>We're going to try this now</Text>
     <TouchableOpacity onPress={() => router.push("/profile")}>
      <Text>Let's go</Text>
      </TouchableOpacity>
    </View>
  );
}
