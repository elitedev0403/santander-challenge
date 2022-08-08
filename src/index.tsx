import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BranchDetails from './BranchDetails';
import BranchesInput from './BranchesInput';
import { ClosestBranchContextParams } from './ClosestBranchProvider';
import Map from './Map';
import Spinner from './Spinner';
import { useClosestBranch } from './useClosestBranch';

export default function Main() {
  const { state, closest } = useClosestBranch() as ClosestBranchContextParams;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Map />
      {state === 'ready' ? (
        <>
          <BranchesInput />
          {closest && <BranchDetails />}
        </>
      ) : state === 'error' ? (
        <View style={styles.centred}>
          <Text style={styles.error}>An error has occurred</Text>
        </View>
      ) : (
        <View style={styles.centred}>
          <Spinner height={60} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  error: {
    fontFamily: 'textRegular',
    fontSize: 24,
    color: '#ED0000',
    padding: 10,
    backgroundColor: '#80808030',
  },
  centred: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
