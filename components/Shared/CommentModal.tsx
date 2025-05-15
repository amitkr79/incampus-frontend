import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";

interface Comment {
  id: string;
  text: string;
  user: {
    name: string;
    image: string;
  };
}

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (commentText: string) => void;
  currentUser: {
    name: string;
    image: string;
  };
}

const CommentModal = ({
  visible,
  onClose,
  comments,
  onAddComment,
  currentUser,
}: CommentModalProps) => {
  const [commentText, setCommentText] = useState("");

  const handlePost = () => {
    if (commentText.trim() === "") return;
    onAddComment(commentText.trim());
    setCommentText("");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}  // allow custom background + rounded corners
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Comments</Text>
              <Pressable onPress={onClose}>
                <AntDesign name="close" size={22} color="black" />
              </Pressable>
            </View>

            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.commentRow}>
                  <Image source={{ uri: item.user?.image }} style={styles.avatar} />
                  <View style={styles.commentTextContainer}>
                    <Text style={styles.username}>{item.user.name}</Text>
                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                </View>
              )}
              contentContainerStyle={styles.commentList}
              ListEmptyComponent={
                <Text style={styles.noComments}>No comments yet.</Text>
              }
              keyboardShouldPersistTaps="handled"
            />

            <View style={styles.inputRow}>
              <Image
                source={{ uri: currentUser.image }}
                style={styles.currentUserAvatar}
              />
              <TextInput
                style={styles.input}
                placeholder="Write a comment..."
                value={commentText}
                onChangeText={setCommentText}
                returnKeyType="send"
                onSubmitEditing={handlePost}
              />
              <Pressable onPress={handlePost} style={styles.postBtn}>
                <Text style={styles.postBtnText}>Post</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // dark translucent background behind modal
    justifyContent: "flex-end", // modal slides from bottom
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: "90%",
    paddingTop: 15,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  commentList: {
    paddingBottom: 100,
  },
  commentRow: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-start",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  currentUserAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  commentTextContainer: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
  },
  commentText: {
    fontSize: 14,
    color: Colors.DARK,
  },
  noComments: {
    textAlign: "center",
    color: Colors.GRAY,
    fontStyle: "italic",
    paddingVertical: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
  },
  postBtn: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  postBtnText: {
    color: "white",
    fontWeight: "bold",
  },
});
