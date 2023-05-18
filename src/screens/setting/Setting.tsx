import { View, Text, Pressable, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next';
import '../../language/i18n';
import { getUserLanguage, saveUserLanguage } from '../../helpers/userLanguage';
import { LanguageContext } from '../../context/Language';
import { SettingsContext } from '../../context/SettingsContext';

export default function Setting() {
    const { currentLanguage, setcurrentLanguage } = useContext(LanguageContext)
    const { darkMode, toggleDarkMode } = useContext(SettingsContext);

    const { t, i18n } = useTranslation();

    useEffect(() => {
        saveUserLanguage(currentLanguage).then(res => console.log(`${currentLanguage} asyncstorage əlavə edildi`))
    }, [currentLanguage])

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language)
            .then(res => {
                setcurrentLanguage(language);
            })

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: darkMode ? '#1C1C1C' : "white",
            paddingTop: 20
        }}>
            <View style={styles.headerContainer}>
                <Text style={{
                    fontSize: 24,
                    textAlign: 'center',
                    fontWeight: '500',
                    color: darkMode ? "white" : "black",
                    fontFamily: 'Outfit-Bold'
                }}>{t('selectlanguage')}</Text>
            </View>
            <View style={styles.languageContainer}>
                <TouchableOpacity style={[styles.language, { backgroundColor: currentLanguage == 'en' ? 'green' : '#1C1C1C' }]} onPress={() => changeLanguage('en')}>
                    <Text style={styles.languageText}>English</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.language, { backgroundColor: currentLanguage == 'az' ? 'green' : '#1C1C1C' }]} onPress={() => changeLanguage('az')}>
                    <Text style={styles.languageText}>Azerbaijan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.language, { backgroundColor: currentLanguage == 'tr' ? 'green' : '#1C1C1C' }]} onPress={() => changeLanguage('tr')}>
                    <Text style={styles.languageText}>Turkish</Text>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center", gap: 30, flexDirection: "row", marginHorizontal: 20, alignItems: "center", marginTop: 20, }}>
                <Text style={{ fontSize: 25, color: darkMode ? "white" : "black" }}>Light</Text>
                <Switch
                    style={{ transform: [{ scaleX: 1.7 }, { scaleY: 1.5 }] }}
                    value={darkMode}
                    onValueChange={toggleDarkMode}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
                />
                <Text style={{ fontSize: 25, color: darkMode ? "white" : "black" }}>Dark</Text>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {},
    languageContainer: {
        marginTop: 22,
        marginHorizontal: 20,
        gap: 10
    },
    language: {
        borderWidth: 1,
        borderColor: 'white',
    },
    languageText: {
        fontSize: 17,
        fontWeight: '500',
        fontFamily: 'Outfit-Regular',
        paddingLeft: 20,
        paddingVertical: 14,
        color: "white"
    }
})

{/* <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#33A850' }}>
                {t('map')}
            </Text> */}