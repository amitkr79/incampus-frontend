import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import Header from '@/components/Home/Header'
import Category from '@/components/Home/Category'
import LatestPost from '@/components/Home/LatestPost'

const Home = () => {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <>
          <Header/>
          <Category/>
          <LatestPost/>
        </>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    paddingBottom: 20, // Add padding only at bottom if needed
  },
})

export default Home