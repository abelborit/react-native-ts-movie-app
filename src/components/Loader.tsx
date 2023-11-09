import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

interface LoaderProps {
  globalView?: boolean;
  size?: number;
}

export const Loader = ({globalView = true, size = 85}: LoaderProps) => {
  return (
    <View style={{...styles.container, flex: globalView ? 1 : 0}}>
      <ActivityIndicator color="#d00" size={size} />
      <Text style={styles.loaderText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  loaderText: {
    fontSize: 16,
    color: '#d00',
    letterSpacing: 0.5,
  },
});
