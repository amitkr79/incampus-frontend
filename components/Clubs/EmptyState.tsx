import { View, Text, Image } from 'react-native'
import React from 'react'
import Button from '../Shared/Button'
import Colors from '@/constants/Colors'
import { useRouter } from 'expo-router'

const EmptyState = () => {
    const router = useRouter();
  return (
    <View>
      <View style={{
        display:'flex',
        alignItems:'center',
        marginTop:80
      }}>
        <Image source={require('@/assets/images/no-club.png')}
            style={{
                width:200,
                height:170
            }}
        />
        <Text style={{
            fontSize:22,
            textAlign:'center',
            color:Colors.GRAY
        }}>You are not following any Teams / Clubs</Text>
        <Button text='Explore Cubs/Teams' onPress={()=>router.push('/explore-clubs')} />
      </View>
    </View>
  )
}

export default EmptyState