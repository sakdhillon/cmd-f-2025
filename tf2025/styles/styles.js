import {StyleSheet, Platform, StatusBar} from "react-native"

export const colors= {
color1:"FFFFF9",
color2:" #ffffff",
color3:" #FEFAEE",
color4: "#006F4F",


}

export const defaultStyle = StyleSheet.create({

    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
        flex: 1,
        backgroundColor:"FFFFF9",
      },
});
