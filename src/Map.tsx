import { StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { branchAddress } from './Branch';
import { ClosestBranchContextParams } from './ClosestBranchProvider';
import { useClosestBranch } from './useClosestBranch';

export default function Map() {
  const { closest } = useClosestBranch() as ClosestBranchContextParams;
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
        {closest && closest.PostalAddress.GeoLocation && (
          <Marker
            key={closest.Identification}
            title={closest.Name}
            description={branchAddress(closest)}
            coordinate={{
              latitude: parseFloat(
                closest.PostalAddress.GeoLocation.GeographicCoordinates
                  .Latitude,
              ),
              longitude: parseFloat(
                closest.PostalAddress.GeoLocation.GeographicCoordinates
                  .Longitude,
              ),
            }}>
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutHeader}>
                  {closest.Name || closest.Identification}
                </Text>
                <Text style={styles.calloutText}>{branchAddress(closest)}</Text>
              </View>
            </Callout>
          </Marker>
        )}
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
