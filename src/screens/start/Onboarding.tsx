import { View, Text, SafeAreaView, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import OnBoardingItem from '../../components/Onboarding/renderItem'
import Paginate from '../../components/Onboarding/Pagination'
import onboarding from '../../data/onboarding'

export default function Onboarding({ navigation }: any) {

  const [currentIndex, setCurrentIndex] = useState(0)
  const slidersRef = useRef(null)

  const nextHandler = () => {
    if (onboarding.length - 1 !== currentIndex) {
      slidersRef.current.scrollToIndex({ index: currentIndex + 1 })
      setCurrentIndex(currentIndex + 1)
    }
    else {
      navigation.navigate("CategoryListStackScreen")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={onboarding}
        ref={slidersRef}
        renderItem={OnBoardingItem}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled

      />
      {
        onboarding.length - 1 !== currentIndex ?
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 58, paddingHorizontal: 16 }}>
            <Paginate datas={onboarding} currentIndex={currentIndex} />
            <TouchableOpacity style={{ backgroundColor: '#018CF1', width: 163, height: 48, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }} onPress={nextHandler}>
              <Text style={{ color: '#F6F6F6', fontSize: 16, fontWeight: '500', fontFamily: 'Outfit-Regular', textAlign: 'center' }}>Next</Text>
            </TouchableOpacity>
          </View>
          :
          <TouchableOpacity style={{marginHorizontal: 16, backgroundColor: '#018CF1', borderRadius: 8, height: 48, justifyContent:'center', marginBottom: 58, }} onPress={nextHandler}>
            <Text style={{fontFamily: 'Outfit-Regular', fontWeight: '500', fontSize: 16, textAlign: 'center', color: '#F6F6F6'}}>Get Started</Text>
          </TouchableOpacity>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c"
  }
})