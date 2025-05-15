import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Colors from "@/constants/Colors";

import DropDownPicker from "react-native-dropdown-picker";
import Button from "../Shared/Button";
import * as ImagePicker from "expo-image-picker";
import { upload } from "cloudinary-react-native";
import { cld, options } from "@/config/CloudinaryConfig";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";

const WritePost = () => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const {user} = useContext(AuthContext) ;
  const [loading,setLoading] = useState(false);
  const [item, setItem] = useState([
    { label: "Public", value: 0 },
  ]);

  const route = useRouter()

  const[content,setContent] = useState<string | null>();

  useEffect(()=>{
    user && GetUserFollowedClubs()
  },[user])

  //post logic
  const onPostBtnClick = async() => {
    if(!content){
      ToastAndroid.show('Please enter content',ToastAndroid.BOTTOM)
    }
    setLoading(true);
    //uplaod the image
    let uploadImageUrl='';
    if(selectedImage){
      const resultData:any = await new Promise(async(resolve,reject)=>{
        await upload(cld,{
          file:selectedImage,
          options:options,
          callback:(error:any,response:any)=>{
            if(error)
            {
              reject(error)
            }else{
              resolve(response)
            }
          }
        })
      })
      uploadImageUrl=resultData&&resultData?.url
    }
    const result = await axios.post(process.env.EXPO_PUBLIC_HOST+'/post',{
      content:content,
      imageUrl:uploadImageUrl,
      visibleIn:value,
      email:user?.email
    })
    console.log(result.data)
    setLoading(false)
    route.replace('/(tabs)/Home')
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [10, 16],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const GetUserFollowedClubs=async()=>{
    const result = await axios.get(process.env.EXPO_PUBLIC_HOST+'/clubfollower?u_email='+user?.email)
    console.log(result.data);
    const data = result.data?.map((item:any)=>({
      label:item?.name,
      value:item.club_id
    }))
    console.log(data)
    setItem(prev=>[...prev,...data])
  }

  return (
    <View>
      <TextInput
        placeholder="Write your post here..."
        style={styles.textInput}
        multiline={true}
        numberOfLines={5}
        maxLength={500}
        onChangeText={(value)=>setContent(value)}
      />
      <TouchableOpacity onPress={pickImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }}  style={styles.image} />
        ) : (
          <Image
            source={require("@/assets/images/image.png")}
            style={styles.image}
          />
        )}
      </TouchableOpacity>
      
      <View
        style={{
          marginTop: 15,
        }}
      >
        <DropDownPicker
          items={item}
          open={open}
          value={value}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItem}
          style={{
            borderWidth: 0,
            elevation: 3,
          }}
        />
      </View>
      <Button text="Post" onPress={() => onPostBtnClick()} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    height: 140,
    marginTop: 10,
    borderRadius: 15,
    textAlignVertical: "top",
    elevation: 7,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 0.4,
  },
});

export default WritePost;
