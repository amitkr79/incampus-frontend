import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ToastAndroid,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Animated,
  Keyboard,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
import TextINputField from "@/components/Shared/TextINputField";
import Button from "@/components/Shared/Button";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  const formTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(formTranslateY, {
        toValue: -30,
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

  const onSignInBtnClick = async () => {
    if (!email || !password) {
      ToastAndroid.show("Enter Email & Password", ToastAndroid.BOTTOM);
      return;
    }

    setLoading(true);
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      if (resp.user) {
        const result = await axios.get(
          process.env.EXPO_PUBLIC_HOST + "/user?email=" + resp.user.email
        );
        setUser(result?.data);
        router.push("/");
      }
    } catch (e) {
      ToastAndroid.show("Incorrect email or password", ToastAndroid.BOTTOM);
    } finally {
      setLoading(false);
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
          <View style={styles.headerContainer}>
            <Image
              source={require("@/assets/images/Light.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Sign In To InCampus</Text>
          </View>

          <Animated.View style={[styles.formContainer, { transform: [{ translateY: formTranslateY }] }]}>
            <TextINputField
              label="College Email"
              onChangeText={(v) => setEmail(v)}
            />
            <TextINputField
              label="College Password"
              password={true}
              onChangeText={(v) => setPassword(v)}
            />

            <Button
              text="Sign In"
              onPress={onSignInBtnClick}
              loading={loading}
            />

            <Pressable onPress={() => router.push("/(auth)/SignUp")}>
              <Text style={styles.linkText}>
                New to InCampus? <Text style={styles.linkHighlight}>Sign Up Here</Text>
              </Text>
            </Pressable>
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
  headerContainer: {
    alignItems: "center",
    marginTop: 28,
    marginBottom: 24,
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.BLACK,
    marginTop: 12,
  },
  formContainer: {
    gap: 20,
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
  linkText: {
    fontSize: 17,
    textAlign: "center",
    marginTop: 16,
    color: Colors.GRAY,
  },
  linkHighlight: {
    color: Colors.PRIMARY,
    fontWeight: "600",
  },
});

export default SignIn;
