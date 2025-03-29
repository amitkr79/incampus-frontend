import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const PreviousYear = () => {
    const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Previous Year Paper</Text>
      </View>

    </SafeAreaView>
  )
}

export default PreviousYear

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFAFA",
        padding: 10,
      },
      scrollContainer: {
        paddingBottom: 20,
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1FD4AF",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 10,
      },
      headerButton: {
        padding: 5,
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        flex: 1,
        textAlign: "center",
      },
})