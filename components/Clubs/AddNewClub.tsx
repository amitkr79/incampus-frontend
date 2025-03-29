import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    ToastAndroid,
  } from "react-native";
  import React, { useContext, useState } from "react";
  import Colors from "@/constants/Colors";
  import Button from "../Shared/Button";
  import * as ImagePicker from "expo-image-picker";
  import { upload } from "cloudinary-react-native";
  import { cld, options } from "@/config/CloudinaryConfig";
  import axios from "axios";
  import { AuthContext } from "@/context/AuthContext";
  import { useRouter } from "expo-router";
  
  const AddNewClub = () => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const router = useRouter();
  
    const [clubName, setClubName] = useState<string>("");
    const [about, setAbout] = useState<string>("");
  
    // Function to handle club creation
    const onPostBtnClick = async () => {
        if (!clubName || !about) {
          ToastAndroid.show("Please enter all details", ToastAndroid.BOTTOM);
          return;
        }
      
        setLoading(true);
        
        let uploadedImageUrl = "";
        if (selectedImage) {
          try {
            const resultData: any = await new Promise(async (resolve, reject) => {
              await upload(cld, {
                file: selectedImage,
                options: options,
                callback: (error: any, response: any) => {
                  if (error) reject(error);
                  else resolve(response);
                },
              });
            });
            uploadedImageUrl = resultData?.url || "";
          } catch (error) {
            console.error("Image Upload Error:", error);
            ToastAndroid.show("Image upload failed!", ToastAndroid.BOTTOM);
          }
        }
      
        try {
          const result = await axios.post(process.env.EXPO_PUBLIC_HOST + "/api/clubs", {
            name: clubName,
            clublogo: uploadedImageUrl,
            about: about,
          });
      
          console.log("Club Created:", result.data);
          ToastAndroid.show("Club added successfully!", ToastAndroid.BOTTOM);
          router.replace("/explore-clubs");
        } catch (error) {
          console.error("Club Creation Error:", error);
          ToastAndroid.show("Failed to create club!", ToastAndroid.BOTTOM);
        } finally {
          setLoading(false);
        }
      };
      
  
    // Image Picker
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.5,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    };
  
    return (
      <View>
        <Text style={styles.heading}>Add New Club</Text>
  
        <TouchableOpacity onPress={pickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <Image source={require("@/assets/images/image.png")} style={styles.image} />
          )}
        </TouchableOpacity>
  
        {/* Club Name Input */}
        <View style={styles.inputContainer}>
          <Text>Club/Team Name</Text>
          <TextInput
            placeholder="Enter Club/Team name"
            style={styles.input}
            value={clubName}
            onChangeText={setClubName}
          />
        </View>
  
        {/* About Club Input */}
        <TextInput
          placeholder="Write your club description..."
          style={styles.textArea}
          multiline={true}
          numberOfLines={5}
          maxLength={500}
          value={about}
          onChangeText={setAbout}
        />
  
        <Button text="Add" onPress={onPostBtnClick} loading={loading} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    heading: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 15,
    },
    inputContainer: {
      marginTop: 15,
    },
    input: {
      padding: 15,
      backgroundColor: Colors.WHITE,
      height: 50,
      marginTop: 10,
      borderRadius: 15,
      elevation: 7,
    },
    textArea: {
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
  
  export default AddNewClub;
  