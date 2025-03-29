import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import EmptyState from "@/components/Clubs/EmptyState";
import { useRouter } from "expo-router";
import axios from "axios";
import PostList from "@/components/Post/PostList";
import Button from "@/components/Shared/Button";

const Clubs = () => {
  const router = useRouter();
  const [followedClubs, setFollowedClubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetPosts();
  }, []);

  const GetPosts = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        process.env.EXPO_PUBLIC_HOST + "/post?club=1,2&orderField=post.id"
      );
      setFollowedClubs(result?.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Clubs</Text>
          <TouchableOpacity  style={styles.addButton} onPress={() => router.push("/explore-clubs")}>
            <Text style={styles.addButtonText}>Explore Club</Text>
          </TouchableOpacity>
        </View>
        {followedClubs?.length === 0 && <EmptyState />}
      </View>
      <PostList posts={followedClubs} loading={loading} OnRefresh={GetPosts} />
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    elevation:6
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
})

export default Clubs;
