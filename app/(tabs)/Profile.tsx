import { View, Text, Image, FlatList, TouchableOpacity, StatusBar } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";
const profileOptions = [
  {
    name: "Add Post",
    path: "/add-post",
    icon: "add-circle-outline",
  },
  {
    name: "My Events",
    path: "/Event",
    icon: "calendar-outline",
  },
  {
    name: "Logout",
    path: "logout",
    icon: "log-out-outline",
  },
];
const Profile = () => {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);

  const onPressOptions = (item: any) => {
    if (item.path == "logout") {
      //logout logic
      signOut(auth).then(() => {
        setUser(null);
        router.replace("/landing");
        return;
      });
    } else {
      router.push(item.path);
    }
  };
  return (
    <View
      style={{
        padding: 20,
        marginTop:StatusBar.currentHeight
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        Profile
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Image
          source={{ uri: user?.image }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
        />
        <Text
          style={{
            marginTop: 7,
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          {user?.name}
        </Text>
        <Text
          style={{
            marginTop: 5,
            fontSize: 18,
            color: Colors.GRAY,
          }}
        >
          {user?.email}
        </Text>
      </View>
      <FlatList
        data={profileOptions}
        style={{ marginTop: 25 }}
        renderItem={({ item, index }: any) => (
          <TouchableOpacity
            onPress={() => onPressOptions(item)}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
              padding: 10,
              margin: 6,
              borderWidth: 0.4,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Ionicons name={item.icon} size={24} color={Colors.PRIMARY} />
            <Text style={{ fontSize: 20 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Profile;
