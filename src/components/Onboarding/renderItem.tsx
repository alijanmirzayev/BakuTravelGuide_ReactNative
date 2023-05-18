import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const dimension = SCREEN_WIDTH - 32

const OnBoardingItem = ({ item }: any) => {
    return (
        <View style={styles.item}>
            <Image source={item.image} style={{ width: SCREEN_WIDTH-32, alignSelf: "center", height: dimension }} />
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 32 }}>
                <Text style={{ color: "white", fontSize: 24, fontWeight: "500", textAlign: "center", fontFamily: 'Outfit-Bold' }}>{item.title}</Text>
                <Text style={{ color: "white", textAlign: "center", marginTop: 24, fontFamily: 'Outfit-Regular' }}> {item.description}</Text>
            </View>
        </View >
    )
}

export default OnBoardingItem

const styles = StyleSheet.create({
    item: {
        width: SCREEN_WIDTH,
        paddingHorizontal: 16,
        marginTop: 89
    }
})