import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { baseNetwork } from '../../network/Api'
import SvgStar from '../../components/icons/Star'
import SvgWatch from '../../components/icons/Watch'
import SvgPhone from '../../components/icons/Phone'
import SvgLocation from '../../components/icons/Location'
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next'
import { SettingsContext } from '../../context/SettingsContext'


const ProductDetail = ({ route }: any) => {

  const { t, i18n } = useTranslation();
  const { darkMode, setDarkMode } = useContext<any>(SettingsContext)

  const goMap = () => {
    const location = {
      longitude: route.params.long,
      latitude: route.params.lat
    };
    console.log(location.latitude)
    const url = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;
    console.log(url)

    Linking.openURL(url);
  }

  return (
    <View style={{ backgroundColor: darkMode?  '#1C1C1C':"white", flex: 1 }} >
      <View style={{ backgroundColor: darkMode?  '#1C1C1C' :"white", flex: 1 }}>
        <View style={{ alignItems: 'center', marginTop: 20, marginHorizontal: 20 }}>
          <Image source={{ uri: route.params.imageUrl }} style={{ height: 210, width: 350, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 22, color:  darkMode?'white' :"black", fontWeight: "900", fontFamily: "Outfit-Regular" }}>{route.params.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <SvgStar width={14} />
            <Text style={{ color:  darkMode?'white' :"black", marginLeft: 5, fontSize: 15 }}>{route.params.rate}</Text>
          </View>
        </View>
        <View style={{ marginLeft: 20, marginTop: 20 }}>
          <View>
            <Text style={{ fontSize: 20, color:  darkMode?'white' :"black", fontWeight: "500", fontFamily: "Outfit-Regular" }}>{t('information')}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <SvgWatch width={14} height={14} />
            <Text style={{ marginLeft: 5, color: darkMode? "#B9B9B9":"black", fontFamily: "Outfit-Regular", fontSize: 17 }}> {route.params.week}, {route.params.startDate} - {route.params.endDate}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <SvgPhone width={14} height={14} />
            <Text style={{ fontSize: 17, marginLeft: 5, color: darkMode? "#B9B9B9":"black", fontFamily: "Outfit-Regular" }}>{route.params.phone}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <SvgLocation width={14} height={14} />
            <Text style={{ fontSize: 17, marginLeft: 5, color: darkMode? "#B9B9B9":"black", fontFamily: "Outfit-Regular" }}>{route.params.address}</Text>
          </View>
        </View>
        <View style={{ marginLeft: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 18, color: darkMode? 'white':"black", fontFamily: "Outfit-Regular" }}>{t('map')}</Text>
        </View>
        <View style={{ alignItems: 'center', borderRadius: 10 }}>
          <MapView
            zoomEnabled={true}
            scrollEnabled={true}
            showsScale={true}
            style={styles.map}
            initialRegion={{
              latitude: route.params.lat,
              longitude: route.params.long,
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: route.params.lat, longitude: route.params.long }}
              title="Marker Title"
              description="Marker Description"
            />
          </MapView>
        </View>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <TouchableOpacity onPress={goMap} >
            <View
              style={{
                width: 350,
                backgroundColor: '#018CF1',
                alignItems: 'center',
                height: 40,
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{ color: 'white', fontWeight: "500", fontFamily: "Outfit-Regular", fontSize: 17 }}>{t('gotomap')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  map: {
    width: "90%",
    height: 200,
    marginTop: 10,
  }
})