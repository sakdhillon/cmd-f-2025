import { View, Text } from 'react-native'
import React from 'react'
import { defaultStyle, colors } from '@/styles/styles'
import Header from '@/components/Header'
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { getInfo } from "../services/user" 


const Profile = () => {

  const router = useRouter()
  const [userLoaded,setUserLoadState] = useState(false)
  const [user,setUser] = useState(null)

  const getUser = async () => {
      let user = await getInfo()
      if (user) {
          setUser(user)
          setUserLoadState(true)
      } else {
          router.push('/')
      }
  }

  useEffect(() => {
      getUser()
  }, [])
  
  return (
    <View style={defaultStyle.container}>
        <Header back={"/"}/>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile