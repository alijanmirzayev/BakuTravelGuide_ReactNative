import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Home from '../../screens/home/Home'
import Search from '../../screens/search/Search'
import Favorite from '../../screens/favorite/Favorite'
import SvgHome from '../../components/icons/Home'
import SvgSearch from '../../components/icons/Search'
import SvgSave from '../../components/icons/Save'
import ProductDetail from '../../screens/detail/ProductDetail'
import Setting from '../../screens/setting/Setting'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

export default function Main() {

    const TabMain = () => {
        return (
            <Tab.Navigator screenOptions={
                {
                    headerShown: false
                }
            }>
                <Tab.Screen name='HomeTabScreen' component={Home} options={{
                    tabBarStyle: {
                        backgroundColor: "#1C1C1C"
                    },
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <SvgHome style={{
                            stroke: focused ? "#E0783E" : "#494949",
                        }} />
                    )
                }} />
                <Tab.Screen name='SearchTabScreen' component={Search} options={{
                    tabBarStyle: {
                        backgroundColor: "#1C1C1C"
                    },
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <SvgSearch style={{
                            stroke: focused ? "#E0783E" : "#494949",
                        }} />
                    )
                }} />
                <Tab.Screen name='FavoriteTabScreen' component={Favorite} options={{
                    tabBarStyle: {
                        backgroundColor: "#1C1C1C"
                    },
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <SvgSave style={{
                            stroke: focused ? "#E0783E" : "#494949",
                            width: 28,
                            height: 28,
                            fill: "none"
                        }} />
                    )
                }} />
                <Tab.Screen name='SettingTabScreen' component={Setting} options={{
                    tabBarStyle: {
                        backgroundColor: "#1C1C1C"
                    },
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <AntDesign name='setting' size={32} color={focused ? "#E0783E" : "#494949"} />
                    )
                }} />
            </Tab.Navigator>
        )
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Home' component={TabMain} ></Stack.Screen>
            <Stack.Screen name='ProductDetail' component={ProductDetail} ></Stack.Screen>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    mainIcons: {

    }
})