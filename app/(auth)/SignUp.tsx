import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Animated,
  Keyboard,
  SafeAreaView,
  StatusBar
} from "react-native";
import React, { useContext, useState, useRef, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import TextINputField from "@/components/Shared/TextINputField";
import Button from "@/components/Shared/Button";
import * as ImagePicker from "expo-image-picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";
import { upload } from "cloudinary-react-native";
import { cld, options } from "@/config/CloudinaryConfig";
import axios from "axios";
import { useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";

const SignUp = () => {
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [fullName, setFullName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const formTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(formTranslateY, {
        toValue: -80,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(formTranslateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const onBtnPress = async () => {
    if (!email || !password || !fullName || !profileImage) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.BOTTOM);
      return;
    }

    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

      await upload(cld, {
        file: profileImage,
        options: options,
        callback: async (error, response) => {
          if (error) {
            console.log(error);
            setLoading(false);
            return;
          }

          try {
            await axios.post(process.env.EXPO_PUBLIC_HOST + "/user", {
              name: fullName,
              email: email,
              image: response?.url || "",
            });

            setUser({ name: fullName, email: email, image: response?.url || "" });
            router.push("/");
          } catch (e) {
            console.log(e);
            ToastAndroid.show("Error saving user data", ToastAndroid.BOTTOM);
          } finally {
            setLoading(false);
          }
        },
      });
    } catch (error: any) {
      setLoading(false);
      ToastAndroid.show(error.message, ToastAndroid.BOTTOM);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar hidden={false} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={styles.title}>Create New Account</Text>

          <View style={styles.profileSection}>
            <TouchableOpacity onPress={pickImage} style={styles.profileTouchable}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={
                    profileImage
                      ? { uri: profileImage }
                      : require("@/assets/images/profile.png")
                  }
                  style={styles.profileImage}
                />
                <View style={styles.cameraIcon}>
                  <Ionicons name="camera" size={22} color="white" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <Animated.View
            style={{
              transform: [{ translateY: formTranslateY }],
              marginTop: 20, // Space between profile section and form
              flex: 1, // Ensures the form takes up remaining space
            }}
          >
            <View style={styles.formContainer}>
              <TextINputField
                label="Full Name"
                onChangeText={setFullName}
              />
              <TextINputField
                label="College Email"
                onChangeText={setEmail}
              />
              <TextINputField
                label="Password"
                password={true}
                onChangeText={setPassword}
              />

              <Button
                text="Create Account"
                onPress={onBtnPress}
                loading={loading}
                marginTop={16}
              />
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.BLACK,
    textAlign: "center",
    marginBottom: 24,
    marginTop: 28,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileTouchable: {
    borderRadius: 100,
    elevation: 4,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: Colors.LIGHT_GRAY,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  formContainer: {
    gap: 10,
  },
  inputField: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    elevation: 4,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SignUp;
