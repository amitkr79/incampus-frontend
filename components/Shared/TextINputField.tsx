import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';

type TextINputFieldProps = {
  label: string;
  onChangeText: (text: string) => void;
  password?: boolean;
}
const TextINputField = ({label,onChangeText,password=false}:TextINputFieldProps) => {
  return (
    <View style={{marginTop:15}}>
      <Text style={{color:Colors.GRAY}}>{label}</Text>
      <TextInput placeholder={label} style={styles.textInput} secureTextEntry={password} onChangeText={onChangeText} />
    </View>
  )
}

const styles = StyleSheet.create({
    textInput:{
        padding:15,
        borderWidth:0.2,
        borderRadius:5,
        marginTop:5,
        fontSize:17
    }
})


export default TextINputField