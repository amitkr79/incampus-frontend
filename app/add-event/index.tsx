import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import React, { useContext, useState } from "react";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import TextINputField from "@/components/Shared/TextINputField";
import { AuthContext } from "@/context/AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "@/components/Shared/Button";
import moment from "moment";
import axios from "axios";
import { upload } from "cloudinary-react-native";
import { cld, options } from "@/config/CloudinaryConfig";
import { useRouter } from "expo-router";

const AddEvent = () => {
  const [image, setImage] = useState<string>();
  const [eventName, setEventName] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [link, setLink] = useState<string>();
  const [time, setTime] = useState<string>("Select Time");
  const [date, setDate] = useState<string>("Select Date");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<Date>();
  const [openTimePicker, setOpenTimePicker] = useState<boolean>(false);
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useContext(AuthContext);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 10],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onTimeChange = (event: any, selectedTime: Date | undefined) => {
    setOpenTimePicker(false);
    if (selectedTime) {
      setSelectedTime(selectedTime);
      setTime(moment(selectedTime).format("hh:mm A"));
    }
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    setOpenDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setDate(moment(selectedDate).format("DD MMMM YYYY"));
    }
  };

  const onSubmitBtnPress = async () => {
    if (!image || !eventName || !location || !link || !selectedTime || !selectedDate) {
      Alert.alert("Please enter all the fields!", "All fields are required to add an event");
      return;
    }

    setLoading(true);
    upload(cld, {
      file: image,
      options: options,
      callback: async (error, resp) => {
        if (resp) {
          try {
            await axios.post(`${process.env.EXPO_PUBLIC_HOST}/events`, {
              name: eventName,
              bannerUrl: resp.secure_url,
              location,
              link,
              eventDate: moment(selectedDate).format("DD MMMM YYYY"),
              eventTime: moment(selectedTime).format("hh:mm A"),
              email: user?.email,
            });
            setLoading(false);
            Alert.alert("Event Added Successfully", "Your event has been added successfully", [
              { text: "OK", onPress: () => router.replace("/Event") },
            ]);
          } catch (err) {
            console.error("Error saving event:", err);
            Alert.alert("Error", "Failed to add event. Please try again.");
          }
        } else {
          console.error("Failed to upload banner:", error);
          Alert.alert("Upload Error", "Failed to upload event image.");
        }
        setLoading(false);
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Event</Text>

      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image source={require("@/assets/images/image.png")} style={styles.image} />
        )}
      </TouchableOpacity>

      <TextINputField label="Event Name" onChangeText={(v) => setEventName(v)} />
      <TextINputField label="Location" onChangeText={(v) => setLocation(v)} />
      <TextINputField label="Link For Event Details " onChangeText={(v) => setLink(v)} />
      
      <View>
        <Button text={date} outline={true} onPress={() => setOpenDatePicker(!openDatePicker)} />
        <Button text={time} outline={true} onPress={() => setOpenTimePicker(!openTimePicker)} />
      </View>

      {openTimePicker && <DateTimePicker mode="time" value={new Date()} onChange={onTimeChange} />}
      {openDatePicker && <DateTimePicker mode="date" value={new Date()} onChange={onDateChange} />}

      <Button text="Submit" onPress={onSubmitBtnPress} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 0.4,
  },
});

export default AddEvent;
