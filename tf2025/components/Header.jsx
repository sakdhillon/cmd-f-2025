import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../styles/styles'
import { Avatar } from 'react-native-paper'
import { useRouter } from "expo-router";



const Header = ({back}) => {
const router = useRouter();


  return (

   
    <View
    style={{
    position:"relative",
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      height:65,
      //backgroundColor:colors.color1,
      width:"100%",
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
    }}
  >

{back && (
    <TouchableOpacity
      style=  {{
      position:"absolute",
      left: 0,
      top:0,
      zIndex:10,
   }}
   onPress={() => router.push(back)}
   >
    <Avatar.Icon icon="arrow-left"
    color={colors.color3}
    style={{ backgroundColor: colors.color1 }}
    size={40}/>
   </TouchableOpacity>
   )}



  
    
</View>

  )
}

export default Header