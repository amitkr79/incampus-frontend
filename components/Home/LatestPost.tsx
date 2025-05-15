// LatestPost.tsx
import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import axios from "axios";
import PostList from "../Post/PostList";

const LatestPost = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetPosts();
  }, []);

  const GetPosts = async () => {
    setLoading(true);
    try {
      const result = await axios.get(process.env.EXPO_PUBLIC_HOST + '/post?club=0&orderField=post.id');
      setPosts(result?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Pressable 
          onPress={() => setSelectedTab(0)}
          style={[
            styles.tabButton,
            selectedTab === 0 && styles.activeTabButton
          ]}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 0 && styles.activeTabText
          ]}>
            Latest
          </Text>
        </Pressable>
      </View>

      <View style={styles.postListContainer}>
        <PostList 
          posts={posts}
          loading={loading}
          onRefresh={GetPosts}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.LIGHT_GRAY,
    paddingBottom: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: Colors.PRIMARY,
  },
  tabText: {
    fontSize: 16,
    color: Colors.PRIMARY,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.WHITE,
  },
  postListContainer: {
    paddingTop: 8, // Reduced space between tab and posts
  },
});

export default LatestPost;