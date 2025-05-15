import { View, Text, Image, Pressable, StatusBar, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import Button from "@/components/Shared/Button";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const LandingScreen = () => {
  const router = useRouter();
  
  return (
    <LinearGradient
      colors={['#ffffff', '#f8f9fa']}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/login.png")}
          style={styles.image}
        />
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.imageGradient}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Welcome to {'\n'}
          <Text style={styles.collegeName}>SMVIT College</Text>
        </Text>

        <Text style={styles.subtitle}>
          Your college notification updates in your pocket.
          Join the club, register for new events, and much more!
        </Text>

        <Button
          text="Get Started"
          onPress={() => router.push("/(auth)/SignUp")}
          style={styles.mainButton}
          textStyle={styles.buttonText}
        />

        <Pressable 
          onPress={() => router.push("/(auth)/SignIn")}
          style={({ pressed }) => [styles.signInButton, pressed && styles.pressed]}
        >
          <Text style={styles.signInText}>
            Already have an account?{' '}
            <Text style={styles.signInLink}>Sign In Here</Text>
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: '45%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 40,
    color: Colors.PRIMARY,
    marginBottom: 16,
  },
  collegeName: {
    color: '#2d3436',
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.GRAY,
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  mainButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 18,
    borderRadius: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  signInButton: {
    marginTop: 20,
  },
  signInText: {
    textAlign: 'center',
    color: Colors.GRAY,
    fontSize: 16,
  },
  signInLink: {
    color: Colors.PRIMARY,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  pressed: {
    opacity: 0.7,
  },
});

export default LandingScreen;