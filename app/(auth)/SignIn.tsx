import { View, Text, Image, Pressable, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import TextINputField from "@/components/Shared/TextINputField";
import Button from "@/components/Shared/Button";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";


const SignIn = () => {
  const [email,setEmail] = useState<string | undefined>();
  const [password,setPassword] = useState<string | undefined>();
  const [loading,setLoading] = useState(false)
  const {user,setUser}=useContext(AuthContext)
  const router = useRouter()

  const onSignInBtnClick = () => {
    if(!email || !password){
      ToastAndroid.show('Enter Email & Pssword',ToastAndroid.BOTTOM);
      return ;
    }
    setLoading(true)
    signInWithEmailAndPassword(auth,email,password,)
    .then(async (resp) =>{
      if(resp.user){
        // console.log(resp.user.email)
        // API call to fetch user data

        const result = await axios.get(process.env.EXPO_PUBLIC_HOST+"/user?email="+resp.user.email)
        console.log(result.data)
        // save to context to share across application
        setUser(result?.data)
      }
      setLoading(false)
    }).catch(e=>{
      setLoading(false)
      ToastAndroid.show('Incorrect email & password',ToastAndroid.BOTTOM)
    })

  }
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 50,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 25,
        }}
      >
        <Image
          source={require("@/assets/images/Light.png")}
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
          }}
        />

        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginTop: 15,
            marginBottom:15
          }}
        >
          Sign In To Incampus
        </Text>
      </View>
      <TextINputField
        label="College Email"
        onChangeText={(v) => setEmail(v)}
        />
      <TextINputField
        label="College Password"
        password={true}
        onChangeText={(v) => setPassword(v)}
      />
      <Button text='Sign In' onPress={() =>onSignInBtnClick()}
        loading={loading}
      />

       <Pressable onPress={() => router.push("/(auth)/SignUp")}>
                <Text
                  style={{
                    fontSize: 17,
                    textAlign: "center",
                    marginTop: 10,
                    color: Colors.GRAY,
                  }}
                >
                 New to Incampus? Sign Up Here
                </Text>
              </Pressable>
    </View>
  );
};

export default SignIn;
