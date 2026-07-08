import React from 'react';
import {ImageBackground, Platform, StyleSheet, View} from 'react-native';
import {images} from '../../../assets/guest-atlas';
import {palette} from '../../../shared/theme/palette';

export function SplashHold() {
  return (
    <ImageBackground source={images.loader} resizeMode="cover" style={styles.container}>
      <View style={styles.bottomWebView} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  bottomWebView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'android' ? 0 : 8,
    height: 1,
    opacity: 0,
  },
});
