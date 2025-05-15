import { View, Text, FlatList, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ClubCard from "@/components/Clubs/ClubCard";
import Button from "@/components/Shared/Button";
import Colors from "@/constants/Colors";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
export type CLUB = {
  id: number;
  name: string;
  clublogo: string;
  createdon: string;
  about: string;
  isFollowed: boolean;
};
const ExploreClubs = () => {
  const [clubList, setClubList] = useState<CLUB[] | []>([]);
  const [followedClub, setClubFollowedClub] = useState<any>();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    GetAllClubs();
  }, []);

  const GetAllClubs = async () => {
    setLoading(true);
    const result = await axios.get(process.env.EXPO_PUBLIC_HOST + "/clubs");
    console.log(result.data);
    setClubList(result?.data);
    GetUserFollowedClubs();
    setLoading(false);
  };

  const GetUserFollowedClubs = async () => {
    const result = await axios.get(
      process.env.EXPO_PUBLIC_HOST + "/clubfollower?u_email=" + user?.email
    );
    console.log(result.data);
    setClubFollowedClub(result?.data);
  };

  const isFollowed = (clubId: number) => {
    const record =
      followedClub && followedClub?.find((item: any) => item.club_id == clubId);
    return record ? true : false;
  };
  return (
    <View>
      <View
        style={{
          padding: 10,
          margin: 10,
          alignItems: "center",
          borderWidth: 1,
          borderStyle: "dashed",
          borderRadius: 15,
          height:100,
          justifyContent:'center'
        }}
      >
        <Pressable onPress={() => router.push("/add-post/addClub")}>
          <View style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:'center'
          }}>
            <Text
              style={{
                fontSize: 17,
                color: Colors.GRAY,
              }}
            >
              Create New Teams / Clubs
            </Text>
            <Text style={{
              fontSize:30,
              color:Colors.GRAY,
            }}> + </Text>
          </View>
        </Pressable>
      </View>
      <FlatList
        data={clubList}
        onRefresh={GetAllClubs}
        refreshing={loading}
        numColumns={2}
        renderItem={({ item, index }) => (
          <ClubCard
            {...item}
            isFollowed={isFollowed(item.id)}
            refreshData={GetAllClubs}
          />
        )}
      />
    </View>
  );
};

export default ExploreClubs;
