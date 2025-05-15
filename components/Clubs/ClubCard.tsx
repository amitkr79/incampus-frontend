import { View, Text, Image } from "react-native";
import React, { useContext, useState } from "react";
import Colors from "@/constants/Colors";
import Button from "../Shared/Button";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
type CLUB = {
  id: number;
  name: string;
  clublogo: string;
  createdon: string;
  about: string;
  isFollowed:boolean,
  refreshData:()=>void
};
const ClubCard = (club: CLUB) => {
    const {user} = useContext(AuthContext)
    const [loading,setLoading] = useState(false)
    
    const onFollowBtnClick = async () => {
        setLoading(true);
        try {
          if (club.isFollowed) {
            await axios.delete(
              `${process.env.EXPO_PUBLIC_HOST}/clubfollower?u_email=${user.email}&club_id=${club.id}`
            );
          } else {
            await axios.post(`${process.env.EXPO_PUBLIC_HOST}/clubfollower`, {
              u_email: user?.email,
              clubId: club?.id,
            });
          }
          club.refreshData(); // Ensure the parent component updates
        } catch (error) {
          console.error("Error updating follow status:", error);
        }
        setLoading(false);
      };
      
  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: Colors.WHITE,
        margin: 10,
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: club.clublogo }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 99,
        }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {club.name}
      </Text>
      <Text
        numberOfLines={2}
        style={{
          color: Colors.GRAY,
        }}
      >
        {club.about}
      </Text>
      <Button outline={club.isFollowed} text={club.isFollowed ? "Unfollow" : "Follow"} loading={loading} onPress={() => onFollowBtnClick()} />
    </View>
  );
};

export default ClubCard;
