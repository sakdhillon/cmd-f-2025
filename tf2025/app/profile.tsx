import { View, Text } from 'react-native'
import React from 'react'
import { defaultStyle, colors } from '@/styles/styles'
import Header from '@/components/Header'


const Profile = () => {
  return (
    <View style={defaultStyle.container}>
        <Header back={"/"}/>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile