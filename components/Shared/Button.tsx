import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';
type ButtonProps = {
  text: string;
  onPress: () => void;
  loading?: boolean;
  outline?: boolean;
  fullWidth?: boolean;
  marginTop?:number;
  icon?:boolean;
};

const Button = ({
  text,
  onPress,
  loading = false,
  outline = false,
  fullWidth = false,
  marginTop,
  icon
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        backgroundColor: outline ? Colors.WHITE : Colors.PRIMARY,
        borderWidth: outline ? 1 : 0,
        marginTop: marginTop ? 20:20,
        borderRadius: 10,
        borderColor: Colors.PRIMARY,
        flex: fullWidth ? 1 : 0,
      }}
    >
      {loading ? (
        <ActivityIndicator color={Colors.WHITE} />
      ) : (
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            color: outline ? Colors.PRIMARY : Colors.WHITE,
            fontWeight: "bold",
          }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
