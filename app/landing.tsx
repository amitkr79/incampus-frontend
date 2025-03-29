import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import Button from "@/components/Shared/Button";
import { useRouter } from "expo-router";
const LandingScreen = () => {
  const router = useRouter();
  return (
    <View>
      <Image
        source={require("@/assets/images/login.png")}
        style={{
          width: "100%",
          height: 400,
        }}
      />
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Welcome to  SMVIT College
        </Text>
        <Text
          style={{
            fontSize: 17,
            textAlign: "center",
            marginTop: 10,
            color: Colors.GRAY,
          }}
        >
          Your College notification updates in your pocket, Join the club,
          Register for new event and Many more!
        </Text>

        <Button
          text="Get Started"
          onPress={() => router.push("/(auth)/SignUp")}
        />

        <Pressable onPress={() => router.push("/(auth)/SignIn")}>
          <Text
            style={{
              fontSize: 17,
              textAlign: "center",
              marginTop: 10,
              color: Colors.GRAY,
            }}
          >
            Already have an account? Sign In Here
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LandingScreen;
