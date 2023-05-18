import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchItem } from '../../components/icons'
import SvgLocation from '../../components/icons/Location'
import SvgRestaurant from '../../components/icons/Restaurant'
import SvgSave from '../../components/icons/Save'
import SvgStar from '../../components/icons/Star'
import SvgWatch from '../../components/icons/Watch'
import { baseNetwork } from '../../network/Api'
import { SavedContext } from '../../context/Saved'
import { getUserFavorites, saveUserFavorites } from '../../helpers/userFavorites'
import Loading from '../../components/Load'
import { LocationContext } from '../../context/Location'
import { useTranslation } from 'react-i18next'
import { SettingsContext } from '../../context/SettingsContext'

export default function Home({ navigation }: any) {
  const [loading, setloading] = useState<Boolean>(true)
  const [restaurant, setRestaurant] = useState<any>([])
  const [category, setCategory] = useState([])
  const [searchText, setSearchText] = useState<String>('')
  const [filteredRestaurant, setFilteredRestaurant] = useState<any>([])
  const [selectedCategory, setSelecetedCategory] = useState<any>([])
  const { savedItem, setSavedItem } = useContext(SavedContext)
  const { location, setLocation } = useContext<any>(LocationContext)
  const { t, i18n } = useTranslation();
  const { darkMode, setDarkMode } = useContext<any>(SettingsContext)


  useEffect(() => {
    const Network = new baseNetwork()

    getUserFavorites().then(response => setSavedItem(response))

    Network.getAllCategory().then(response => {
      setCategory(response)
    })
    Network.getAllRestaurant().then(response => {
      setRestaurant(response)
      setFilteredRestaurant(response)
      setloading(false)
    })

  }, [])

  useEffect(() => {
    try {
      const filteredData = restaurant.filter((q: any) => q.name.toLowerCase().includes(searchText.toLowerCase()));
      setFilteredRestaurant(filteredData)
    } catch (error) {
      console.log(error)
    }
  }, [searchText])

  useEffect(() => {
    saveUserFavorites(savedItem).then(res => console.log('Save olundu', res))
  }, [savedItem])

  const addToSave = (item: any) => {
    const isExist = savedItem.find(e => e.id == item.id)
    if (!isExist) {
      setSavedItem([...savedItem, item])
      console.log('Olmadigi ucun dusdu bura')
      return
    }
    const filtered = savedItem.filter(e => e.id !== item.id)
    setSavedItem(filtered)
    console.log('Oldugu ucun dusdu bura')
  }

  const addToSelecetedCategory = (item: any) => {
    try {
      setSelecetedCategory([item])
      const data = restaurant.filter((e: any) => e.categoryId == item.id)
      setFilteredRestaurant(data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderCategory = ({ item }: any) => {
    const isExist = selectedCategory.find((e: any) => e.id == item.id)
    return (
      isExist ? <TouchableOpacity onPress={() => addToSelecetedCategory(item)}>
        <View style={{ backgroundColor: '#E0783E', marginLeft: 15, marginTop: 18, borderWidth: 1, borderColor: darkMode ? "#404040" : "#E0783E", padding: 5, borderRadius: 7 }}>
          <View style={{ flexDirection: "row", gap: 5, paddingRight: 10 }}>
            <SvgRestaurant />
            <Text style={{ color: "white" }} >{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity> : <TouchableOpacity onPress={() => addToSelecetedCategory(item)}>
        <View style={{ marginLeft: 15, marginTop: 18, marginBottom: 10, borderWidth: 1, borderColor: "#404040", padding: 5, borderRadius: 7 }}>
          <View style={{ flexDirection: "row", gap: 5, paddingRight: 10 }}>
            <SvgRestaurant />
            <Text style={{ color: darkMode ? "white" : "black" }} >{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderItem = ({ item }: any) => {
    const favorite = savedItem.find((c: any) => c.id == item.id)
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
      <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", item)}>
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
          <TouchableOpacity style={styles.favorite} onPress={() => addToSave(item)}>
            {
              favorite ?
                <SvgSave
                  style={{
                    stroke: "white",
                    width: 20,
                    height: 20,
                    fill: "white"

                  }} />
                :
                <SvgSave style={{
                  stroke: "white",
                  width: 20,
                  height: 20,
                  fill: "none"

                }} />
            }

          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    loading ? <Loading /> : <SafeAreaView style={{ backgroundColor: darkMode ? "#1c1c1c" : "white", flex: 1 }}>
      {
        <View style={styles.input}>
          <TextInput onChangeText={setSearchText} placeholderTextColor="#B9B9B9" style={styles.inputStyle} placeholder={t('searchbyitems')} />
          <SearchItem style={styles.inputSearch} />
        </View>

      }
      {
        <View>
          <FlatList
            data={category}
            horizontal
            renderItem={renderCategory}
            showsHorizontalScrollIndicator={false}

          />
        </View>
      }
      {
        <View>
          <FlatList
            data={filteredRestaurant}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    paddingLeft: 40,
    color: "#B9B9B9"
  },
  inputSearch: {
    position: "absolute",
    top: 15,
    left: 12
  },
  input: {
    backgroundColor: "#262626",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 13,

  },
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