import { gql, useApolloClient } from "@apollo/client"
import Geolocation from '@react-native-community/geolocation'
import { useFocusEffect } from '@react-navigation/native'
import * as React from "react"
import { useCallback, useState } from "react"
import { PermissionsAndroid, StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-elements"
import MapView, { Callout, CalloutSubview, Marker } from "react-native-maps"
import { Screen } from "../../components/screen"
import { walletIsActive } from "../../graphql/query"
import { isIos } from "../../utils/helper"


const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },

  customView: {
    margin: 12,
    alignItems: 'center',
    // width: 140,
    // height: 140,
  },

})

export const MapScreen: React.FC = ({ navigation }) => {
  const client = useApolloClient()

  const result = client.readQuery({ query: gql`
    query gql_maps {
      maps {
        id
        title
        username
        coordinate {
          latitude
          longitude
        }
      }
  }`})

  const maps = result?.maps ?? []

  const [currentLocation, setCurrentLocation] = useState(null)
  const [grantedPermission, setGrantedPermission] = useState(isIos ? true: false)

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Locate yourself on the map",
          message:
            "Activate your location so you know where you are on the map",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setGrantedPermission(true)
        console.log("You can use the location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  

  useFocusEffect(useCallback(() => {
    requestLocationPermission()

    if (!grantedPermission) {
      return
    }

    const watchId = Geolocation.watchPosition(info => {
      // console.log(info)
      setCurrentLocation(<Marker 
        coordinate={{latitude: info.coords.latitude, longitude: info.coords.longitude}}
        title={"Current location"}
        key={"currentLocation"}
        pinColor="blue"
        />)
    })

    return () => {
      Geolocation.clearWatch(watchId);
    }
  }, [grantedPermission]))

  // React.useLayoutEffect(() => {
  //   navigation.setOptions(
  //     {
  //       title: route.params.title,
  //     },
  //     [],
  //   )
  // })

  const markers = []
  maps.forEach((item) => {
    const onPress = () => walletIsActive(client) ? navigation.navigate("sendBitcoin", {username: item.username}) : navigation.navigate("phoneValidation")
    markers.push(
      <Marker coordinate={item.coordinate} key={item.title} 
          //  title={item.title}
        >
        <Callout
          // alphaHitTest
          // tooltip
            onPress={() => !!item.username && !isIos ? onPress() : null}  
          >
            <View             style={styles.customView}>
              <Text style={{fontSize: 18}}>{item.title}</Text>
              {!!item.username && !isIos && <Button 
                containerStyle={{marginTop: 18}}
                title={"pay this business"}
              />}
              { isIos &&
              <CalloutSubview
                onPress={() => !!item.username ? onPress() : null}  
              >
              { !!item.username && <Button 
                style={{paddingTop: 12}}
                title={"pay this business"}
              />}
              </CalloutSubview>
              }
            </View>
        </Callout>
      </Marker>
    )
  })

  return (
    <Screen>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.496743,
          longitude: -89.439462,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {markers}
        {currentLocation}
      </MapView>
    </Screen>
  )
}
