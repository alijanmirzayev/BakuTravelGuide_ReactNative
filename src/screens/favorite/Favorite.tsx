import { useIsFocused } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SvgLocation from '../../components/icons/Location'
import SvgSave from '../../components/icons/Save'
import SvgStar from '../../components/icons/Star'
import SvgWatch from '../../components/icons/Watch'
import { LocationContext } from '../../context/Location'
import { SavedContext } from '../../context/Saved'
import { SettingsContext } from '../../context/SettingsContext'
import { getUserFavorites, saveUserFavorites } from '../../helpers/userFavorites'


export default function Favorite({ navigation }: any) {
  const { savedItem, setSavedItem } = useContext(SavedContext)
  const isFocused = useIsFocused()
  const { location, setLocation } = useContext<any>(LocationContext)
  const { t, i18n } = useTranslation();
  const { darkMode, setDarkMode } = useContext<any>(SettingsContext)


  useEffect(() => {
    try {
      if (isFocused) {
        getUserFavorites().then(res => {
          if (res) {
            setSavedItem(res)
            saveUserFavorites(savedItem).then(res => console.log('Save olundu', res))
            return
          }
          return
        })
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const deleteSave = (item: any) => {
    const filtered = savedItem.filter(e => e.id !== item.id)
    setSavedItem(filtered)
    saveUserFavorites(savedItem).then(res => console.log('Save olundu', res))
    console.log('Delete Oldugu ucun dusdu bura')
  }

  const render = ({ item }: any) => {
    function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
      const R = 6371; // Earth's radius in km
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km
      return d.toFixed(2);
    }

    function deg2rad(deg: number) {
      return deg * (Math.PI / 180);
    }
    const distanceInKm = distance(item.lat, item.long, location.latitude, location.longitude);

    return (
      <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", item)} >
        <View style={styles.card} >
          <View>
            <Image style={styles.imageStyle}
              source={{ uri: item.imageUrl }}
            />
          </View>
          <View style={styles.cardDetail}>
            <Text style={{ color: darkMode? "white":"black", fontSize: 20, fontWeight: "600" }}>{item.name}</Text>
            <View style={styles.mainDetail}>
              <View style={{ flexDirection: "row", gap: 7 }}>
                <SvgLocation style={{ width: 16, height: 18 }} />
                <Text style={{
                  fontSize: 13,
                  fontWeight: "500",
                  color: darkMode ? "white" : "black"
                }}>{distanceInKm} km</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 7 }}>
                <SvgWatch />
                <Text style={{
                  fontSize: 13,
                  fontWeight: "500",
                  color: darkMode ? "white" : "black"
                }}>{item.startDate} - {item.endDate}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 7 }}>
                <SvgStar />
                <Text style={{
                  fontSize: 13,
                  fontWeight: "500",
                  color: darkMode ? "white" : "black"
                }}>{item.rate}</Text>
              </View>
            </View>
          </View>
          <View style={styles.favorite} >

            <TouchableOpacity onPress={() => deleteSave(item)} >
              <SvgSave
                style={{
                  stroke: "white",
                  width: 20,
                  height: 20,
                  fill: "white"
                }} />
            </TouchableOpacity>

          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ backgroundColor: darkMode ? "#1c1c1c" : "white", flex: 1 }}>

      <View>
        <View style={{ marginHorizontal: 20, marginTop: 25 }}>
          <Text style={{ fontWeight: "600", fontSize: 25, color: darkMode ? "white" : "black", marginBottom: 5 }}>{t('saved')}</Text>
        </View>
        <FlatList
          data={savedItem}
          keyExtractor={(item, index) => item + index}
          renderItem={render}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  favorite: {
    width: 40,
    height: 40,
    backgroundColor: "#1C1C1C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    position: "absolute",
    right: 10,
    top: 10
  },
  textDetailStyle: {
    fontSize: 13,
    fontWeight: "500",
    color: "white"
  },
  mainDetail: {
    flexDirection: "row",
    gap: 30,
    marginTop: 10
  },
  cardDetail: {
    // backgroundColor:"red",
    padding: 10,
    borderWidth: 1,
    borderColor: "#353535",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },

  card: {
    marginHorizontal: 20,
    marginTop: 20,
    width: 350,
  },
  imageStyle: {
    width: 350,
    height: 240,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  categoryName: {
    color: "white"
  },
  weather: {
    backgroundColor: "#262626",
    width: 75,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 12,
  }
})