import { View, FlatList } from "react-native";
import React from "react";
import PostCard from "./PostCard";

const PostList = ({ posts, OnRefresh, loading }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        onRefresh={OnRefresh}
        refreshing={loading}
        // Use a unique key from your post data (e.g., post.id)
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        // Optional: add padding at the bottom so last item isn't cut off
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default PostList;
