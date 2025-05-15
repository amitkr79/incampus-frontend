// PostList.tsx
import { View, FlatList, StyleSheet } from "react-native";
import React from "react";
import PostCard from "./PostCard";

const PostList = ({ posts, onRefresh, loading }: any) => {
  return (
    <FlatList
      data={posts}
      onRefresh={onRefresh}
      refreshing={loading}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={({ item }) => <PostCard post={item} />}
      contentContainerStyle={styles.listContainer}
      ListFooterComponent={<View style={styles.footer} />}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
  },
  footer: {
    height: 20, // Small buffer at bottom
  },
});

export default PostList;