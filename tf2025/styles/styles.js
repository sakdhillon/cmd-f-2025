import {StyleSheet, Platform, StatusBar} from "react-native"

export const colors= {
color1: "#006F4F",
color2:" #ffffff",
color3:" #FEFAEE",


}

export const defaultStyle = StyleSheet.create({

    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
        flex: 1,
        backgroundColor: colors.color1,
      },
});
