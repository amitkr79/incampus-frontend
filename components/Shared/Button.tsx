import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

type ButtonProps = {
  text: string;
  onPress: () => void;
  loading?: boolean;
  outline?: boolean;
  fullWidth?: boolean;
};

const Button = ({
  text,
  onPress,
  loading = false,
  outline = false,
  fullWidth = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        backgroundColor: outline ? Colors.WHITE : Colors.PRIMARY,
        borderWidth: outline ? 1 : 0,
        marginTop: 20,
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
            fontSize: 18,
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
