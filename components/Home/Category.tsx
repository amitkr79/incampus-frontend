import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

const Category = () => {
  const router = useRouter();

  const categoryOptions = [
    {
      name: "Upcoming Event",
      banner: require("@/assets/images/event.png"),
      path: "/(tabs)/Event",
    },
    {
      name: "Notifications",
      banner: require("@/assets/images/news.png"),
      path: "/screens/smvit",
    },
    {
      name: "VTU",
      banner: require("@/assets/images/vtu.png"),
      path: "/screens/vtu",
    },
    {
      name: "AICTE",
      banner: require("@/assets/images/aicte.png"),
      path: "/screens/aicte",
    },
  ];
  return (
    <View
      style={{
        marginTop: 5,
        alignItems: "center",
        backgroundColor: Colors.WHITE,
      }}
    >
      <FlatList
        data={categoryOptions}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            //@ts-ignore
            onPress={() => router.push(item.path)}
          >
            <Image source={item.banner} style={styles.bannerImage} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
  },
  bannerImage: {
    height: 80,
    objectFit: "cover",
    width: Dimensions.get("screen").width * 0.43,
    borderRadius: 10,
  },
  text: {
    position: "absolute",
    padding: 10,
    fontSize: 17,
    color: Colors.WHITE,
    fontWeight: "400",
  },
});

export default Category;
