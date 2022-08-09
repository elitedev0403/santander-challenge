import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { Branch, branchAddress } from './Branch';

export default function Map({ branches }: { branches: Branch[] | undefined }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 55.77,
          latitudeDelta: 11.03,
          longitude: -2.82,
          longitudeDelta: 11.35,
        }}>
          {
            branches?.map((branch: Branch) => (
              branch && branch.PostalAddress.GeoLocation && (
                <Marker
                  key={branch.Identification}
                  title={branch.Name}
                  description={branchAddress(branch)}
                  coordinate={{
                    latitude: parseFloat(
                      branch.PostalAddress.GeoLocation.GeographicCoordinates
                        .Latitude,
                    ),
                    longitude: parseFloat(
                      branch.PostalAddress.GeoLocation.GeographicCoordinates
                        .Longitude,
                    ),
                  }}>
                  <Callout tooltip>
                    <View style={styles.callout}>
                      <Text style={styles.calloutHeader}>
                        {branch.Name || branch.Identification}
                      </Text>
                      <Text style={styles.calloutText}>{branchAddress(branch)}</Text>
                    </View>
                  </Callout>
                </Marker>
              )
            ))
          }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: StyleSheet.absoluteFillObject,
  callout: {
    padding: 5,
    backgroundColor: '#ffffffa0',
    borderRadius: 4,
  },
  calloutHeader: {
    fontFamily: 'textBold',
    color: 'black',
    fontSize: 14,
  },
  calloutText: {
    fontFamily: 'textRegular',
    color: 'black',
    fontSize: 10,
  },
});
