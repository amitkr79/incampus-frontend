import React, { useState, useContext } from "react";
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
import CommentModal from "../Shared/CommentModal";
import { AuthContext } from "@/context/AuthContext";
import { Share } from "react-native";

const PostCard = ({ post }: { post: any }) => {
  const { user } = useContext(AuthContext);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likeLoading, setLikeLoading] = useState(false);

  const [comments, setComments] = useState<
    {
      id: string;
      text: string;
      user: {
        name: string;
        image: string;
      };
    }[]
  >([]);
  const [showModal, setShowModal] = useState(false);

  const handleLike = () => {
    const newLikeStatus = !liked;
    setLiked(newLikeStatus);
    setLikeCount((prev:any) => (newLikeStatus ? prev + 1 : prev - 1));
  };

  const handleAddComment = (commentText: string) => {
    const newComment = {
      id: Math.random().toString(),
      text: commentText,
      user: {
        name: user.name,
        image: user.image,
      },
    };
    setComments((prev) => [...prev, newComment]);
  };


  const handleSharePost = async () => {
  try {
    const postUrl = `https://yourapp.com/posts/${post.id}`;
    const result = await Share.share({
      message: `Check out this post!\n\n${post.content}\n\nView it here: ${postUrl}`,
    });
    if (result.action === Share.sharedAction) {
      console.log("Post shared!");
    }
  } catch (error) {
    console.error("Error sharing post:", error);
  }
};

  return (
    <View style={styles.container}>
      <UserAvatar
        name={post?.name}
        image={post?.image}
        date={post?.createdon}
      />

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

        <Pressable onPress={() => setShowModal(true)}>
          <View style={styles.subContainer}>
            <MaterialCommunityIcons
              name="comment-text-outline"
              size={20}
              color="black"
            />
            <Text style={styles.countText}>{comments.length}</Text>
          </View>
        </Pressable>

        <Pressable onPress={handleSharePost}>
          <View style={styles.subContainer}>
            <MaterialCommunityIcons
              name="share-outline"
              size={20}
              color="black"
            />
          </View>
        </Pressable>
      </View>

      <Pressable onPress={() => setShowModal(true)}>
        <Text style={styles.viewComments}>View All Comments</Text>
      </Pressable>

      <CommentModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        comments={comments}
        onAddComment={handleAddComment}
        currentUser={{
          name: user.name,
          image: user.image,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    paddingVertical: 1,
    marginBottom: 15,
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
    borderRadius: 8,
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
