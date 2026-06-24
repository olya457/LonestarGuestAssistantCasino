import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {images} from '../assets';
import {colors} from '../theme/colors';

const dots = [0, 1, 2, 3, 4];

export function LoaderScreen() {
  const dotAnimations = useRef(dots.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.stagger(
        110,
        dotAnimations.map(dot =>
          Animated.sequence([
            Animated.timing(dot, {
              toValue: 1,
              duration: 360,
              easing: Easing.inOut(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(dot, {
              toValue: 0,
              duration: 360,
              easing: Easing.inOut(Easing.cubic),
              useNativeDriver: true,
            }),
          ]),
        ),
      ),
    );

    animation.start();

    return () => animation.stop();
  }, [dotAnimations]);

  return (
    <ImageBackground source={images.loader} resizeMode="cover" style={styles.container}>
      <View style={styles.overlay} />
      <View style={styles.dotsWrap}>
        {dotAnimations.map((dot, index) => {
          const translateY = dot.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, -18, 0],
          });
          const translateX = dot.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 5, 0],
          });
          const scale = dot.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.78, 1.18, 0.78],
          });
          const opacity = dot.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.45, 1, 0.45],
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  opacity,
                  transform: [{translateX}, {translateY}, {scale}],
                },
              ]}
            />
          );
        })}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 7, 6, 0.08)',
  },
  dotsWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'android' ? 42 : 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: colors.emerald,
    shadowColor: colors.emerald,
    shadowOpacity: 0.9,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
  },
});
