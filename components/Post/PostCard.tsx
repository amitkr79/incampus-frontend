import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import UserAvatar from "./UserAvatar";
import Colors from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const PostCard = ({ post }: any) => {
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        marginTop: 10,
      }}
    >
      <UserAvatar
        name={post?.name}
        image={post?.image}
        date={post?.createdon}
      />
      <Text
        style={{
          fontSize: 15,
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        {post?.content}
      </Text>
      {post.imageurl && (
        <Image
          source={{ uri: post?.imageurl }}
          style={{
            width: "100%",
            height: 456,
            objectFit: "cover",
          }}
        />
      )}
      <View
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          justifyContent:'space-between'
        }}
      >
        <View style={styles.subContainer}>
          <AntDesign name="like2" size={20} color="black" />
          <Text style={{ fontSize: 17, color: Colors.GRAY }}>25</Text>
        </View>

        <View style={styles.subContainer}>
          <MaterialCommunityIcons
            name="comment-text-outline"
            size={20}
            color="black"
          />
          <Text style={{ fontSize: 17, color: Colors.GRAY }}>25</Text>
        </View>
        <View style={styles.subContainer}>
          <MaterialCommunityIcons
            name="share-outline"
            size={20}
            color="black"
          />
          <Text style={{ fontSize: 17, color: Colors.GRAY }}>25</Text>
        </View>
      </View>
      <Text
        style={{
          marginTop: 7,
          color: Colors.GRAY,
          textDecorationLine: "underline",
        }}
      >
        View All Comment
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
});

export default PostCard;
