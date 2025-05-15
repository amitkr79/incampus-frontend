import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import UserAvatar from "./UserAvatar";
import Colors from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const PostCard = ({ post, currentUserId }: { post: any, currentUserId?: string }) => {
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likeLoading, setLikeLoading] = useState(false);

  const handleLike = async () => {
    if (!currentUserId) return;
    
    try {
      setLikeLoading(true);
      const newLikeStatus = !liked;
      
      // Optimistic UI update
      setLiked(newLikeStatus);
      setLikeCount(prev => newLikeStatus ? prev + 1 : prev - 1);

      const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/api/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post.id,
          userId: currentUserId,
        }),
      });

      if (!response.ok) {
        // Revert if API call fails
        setLiked(!newLikeStatus);
        setLikeCount(prev => newLikeStatus ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error("Like error:", error);
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <UserAvatar name={post?.name} image={post?.image} date={post?.createdon} />

      <Text style={styles.content}>{post?.content}</Text>

      {post.imageurl && (
        <Image source={{ uri: post?.imageurl }} style={styles.image} />
      )}

      <View style={styles.iconRow}>
        <Pressable onPress={handleLike} disabled={likeLoading}>
          <View style={styles.subContainer}>
            {likeLoading ? (
              <ActivityIndicator size="small" color={Colors.PRIMARY} />
            ) : (
              <>
                <AntDesign
                  name={liked ? "like1" : "like2"}
                  size={20}
                  color={liked ? Colors.PRIMARY : "black"}
                />
                <Text style={styles.countText}>{likeCount}</Text>
              </>
            )}
          </View>
        </Pressable>

        <View style={styles.subContainer}>
          <MaterialCommunityIcons name="comment-text-outline" size={20} color="black" />
          <Text style={styles.countText}>{post.commentCount || 0}</Text>
        </View>

        <View style={styles.subContainer}>
          <MaterialCommunityIcons name="share-outline" size={20} color="black" />
        </View>
      </View>

      <Text style={styles.viewComments}>View All Comments</Text>
    </View>
  );
};

// Keep your existing styles exactly the same
const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    paddingVertical: 1,
  },
  content: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 456,
    resizeMode: "cover",
  },
  iconRow: {
    marginTop: 10,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  countText: {
    fontSize: 17,
    color: Colors.GRAY,
  },
  viewComments: {
    marginTop: 7,
    color: Colors.GRAY,
    textDecorationLine: "underline",
  },
});

export default PostCard;