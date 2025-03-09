import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "@/styles/styles";
import { Avatar } from "react-native-paper";
import { useRouter } from "expo-router";

const Footer = ({ activeroute = "/index" }) => {
  router = useRouter();

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: colors.color4,
        alignItems: "center",
        justifyContent: "space-evenly", // evenly spaces icons
        flexDirection: "row",
        height: 100,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: "100%", // Ensure it takes full width
      }}
    >
      {/* Home Icon */}

      <TouchableOpacity onPress={() => router.push("./index")}>
        <Avatar.Icon
          color="white"
          size={60}
          style={{ backgroundColor: colors.color3 }}
          icon={"home-outline"}
        />
      </TouchableOpacity>

      {/* Medic */}

      <TouchableOpacity onPress={() => router.push("./addmeds")}>
        <Avatar.Icon
          color="white"
          size={60}
          style={{ backgroundColor: colors.color3 }}
          icon={"medical-bag"}
        />
      </TouchableOpacity>

      {/* ChatIcon */}

      <TouchableOpacity onPress={() => router.push("./chat")}>
        <Avatar.Icon
          color="white"
          size={60}
          style={{ backgroundColor: colors.color3 }}
          icon={"chat-outline"}
        />
      </TouchableOpacity>

      {/* Home Icon */}

      <TouchableOpacity onPress={() => router.push("./profile")}>
        <Avatar.Icon
          color="white"
          size={60}
          style={{ backgroundColor: colors.color3 }}
          icon={"account"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
