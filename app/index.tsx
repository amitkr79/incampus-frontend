import { auth } from "@/config/FirebaseConfig";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      console.log("Checking user:", userData?.email);
      if (userData && userData.email) {
        try {
          const result = await axios.get(
            `${process.env.EXPO_PUBLIC_HOST}/user?email=${userData.email}`
          );
          console.log("User Data:", result.data);
          setUser(result.data); // Save user data in context
          router.replace("/(tabs)/Home");
        } catch (error) {
          console.error("API Error:", error);
          router.replace("/landing");
        }
      } else {
        router.replace("/landing");
      }
      setLoading(false); // Stop loading after user check
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []); // Runs only once when component mounts

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null; // Return nothing once redirection happens
}
