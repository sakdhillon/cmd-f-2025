import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { defaultStyle, colors } from '@/styles/styles'

const chat = () => {
  return (
<View style={defaultStyle.container}>
 <Header back={"/"}/>
  <Text>Tracker</Text>
</View>
  )
}

export default chat