import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import TextINputField from "@/components/Shared/TextINputField";
import Button from "@/components/Shared/Button";
import * as ImagePicker from "expo-image-picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";
import {upload} from "cloudinary-react-native"
import { cld, options } from "@/config/CloudinaryConfig";
import axios from "axios";  // This is a third party library
import { useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";

const SignUp = () => {
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [fullName, setFullName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading,setLoading] = useState(false)
  const router = useRouter()

  const {user,setUser} = useContext(AuthContext);
  const onBtnPress = () => {
    if(!email?.length || !password?.length || !fullName?.length || !profileImage){
      ToastAndroid.show("Please enter all the fields", ToastAndroid.BOTTOM);
      return;
    };
    setLoading(true)
    createUserWithEmailAndPassword(auth,email,password).then(async(useCrediantials)=>{
        console.log(useCrediantials);
        //Upload profile
            await upload(cld,{
                file:profileImage,
                options:options,
                callback:async(error:any,response:any)=>{
                    if(error){
                        console.log(error);
                        return;
                    }

                    //save to nile Database
                    if(response){
                      try{

                        // console.log(response?.url)
                        const result = await axios.post(process.env.EXPO_PUBLIC_HOST+"/user",{
                          name:fullName,
                          email:email,
                          image:response?.url??''
                        });
                        // console.log(result);
                        //setting the user context to signup user
                        setUser({
                          name:fullName,
                          email:email,
                          image:response?.url??''
                        })
                        //Route to the home page
                        router.push("/")
                        setLoading(false)
                      }catch(e){
                        console.log(e);
                        setLoading(false)
                      }
                    }
                    
                }
            })
    }).catch((error)=>{
        const errMsg = error?.message;
        ToastAndroid.show(errMsg,ToastAndroid.BOTTOM);  
    })
};

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  return (
    <View
      style={{
        paddingTop: 40,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        Create New Account
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <View>
          <TouchableOpacity onPress={() => pickImage()}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require("@/assets/images/profile.png")}
                style={styles.profileImage}
              />
            )}
            <Ionicons
              name="camera"
              size={24}
              color={Colors.PRIMARY}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TextINputField label="Full Name" onChangeText={(v) => setFullName(v)} />
      <TextINputField label="College Email" onChangeText={(v) => setEmail(v)} />
      <TextINputField
        label="Password"
        password={true}
        onChangeText={(v) => setPassword(v)}
      />
      <Button text="Create Account" onPress={() => onBtnPress()} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 99,
    marginTop: 20,
  },
});

export default SignUp;
