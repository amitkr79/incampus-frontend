import { View, Text } from 'react-native'
import React from 'react'
import WritePost from '@/components/Post/WritePost'
import AddNewClub from '@/components/Clubs/AddNewClub'

const AddClub = () => {
  return (
    <View style={{
        padding:20
    }}>
      <AddNewClub/>
    </View>
  )
}

export default AddClub