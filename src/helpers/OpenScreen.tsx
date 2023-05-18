import { View, Text } from 'react-native'
import { useContext, useEffect, useState } from "react";
import { FirstLoginContext } from '../context/FirstLogin';
import { getUserCategories } from './userCategoies';
import Start from '../navigations/stack/Start'
import Main from '../navigations/tab/Main';
import { FavoriteCategoryProvider } from '../context/FavoriteCategory';
import { SavedProvider } from '../context/Saved';
import { LocationProvider } from '../context/Location';
import { LanguageProvider } from '../context/Language';
import { SettingsProvider } from '../context/SettingsContext';

export default function OpenScreen() {

  const [loading, setloading] = useState<boolean>(true);

  const { firstLogin, setFirstLogin } = useContext(FirstLoginContext)

  useEffect(() => {

    getUserCategories()
      .then(res => {
        if (res) {
          setFirstLogin(false)
          setloading(false);
        }
        else {
          setFirstLogin(true);
          setloading(false);
        }
      })

  }, [])

  if (loading) {
    return <></>
  }
  else {

    if (firstLogin)
      return <Start />
    else
      return <FavoriteCategoryProvider>
        <LocationProvider>
          <SavedProvider>
            <LanguageProvider>
              <SettingsProvider>
                <Main />
              </SettingsProvider>
            </LanguageProvider>
          </SavedProvider>
        </LocationProvider>
      </FavoriteCategoryProvider>
  }
}
