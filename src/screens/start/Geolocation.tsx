import { useContext, useState } from 'react'
import { Text, Button, PermissionsAndroid, SafeAreaView } from 'react-native'
import Geolocations from 'react-native-geolocation-service';
import { FirstLoginContext } from '../../context/FirstLogin';
import { LatLongContext } from '../../context/Saved';

function Geolocation({ }) {

    const { firstLogin, setFirstLogin } = useContext(FirstLoginContext);
    const { latitude, longitude, setlatitude, setlongitude } = useContext(LatLongContext);

    const [location, setLocation] = useState<any>({})

    async function requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Uygulama Konum Erişimi",
                    message:
                        "Uygulamanın konumunuza erişmesine izin vermeniz gerekiyor",
                    buttonNeutral: "Daha Sonra Sor",
                    buttonNegative: "İptal",
                    buttonPositive: "Tamam"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocations.getCurrentPosition(
                    position => {
                        console.log(position)
                    },
                    error => {
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );

            } else {
                console.log("Konum erişim izni reddedildi");
            }
        } catch (err) {
            console.warn(err);
        }
    }



    return (
        <SafeAreaView>
            <Text>{location.latitude}</Text>
            <Button title="Konum Erişimi İzni İste" onPress={() => requestLocationPermission()} />

        </SafeAreaView>
    )
}

export default Geolocation