import React, {useState} from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {images} from '../media';
import {colors} from '../styling/colors';
import {
  PrimaryGreenButton,
  PremiumDarkBackground,
  SecondaryGraphiteButton,
} from '../kit/ui';

const pages = [
  {
    title: 'Welcome to Your Stay',
    subtitle:
      'Access your reservation, room details, and resort services in one premium guest app.',
    image: images.onboardingWelcome,
  },
  {
    title: 'Order with Ease',
    subtitle:
      'Browse dishes, drinks, ingredients, prices, and place your order directly from your phone.',
    image: images.onboardingOrder,
  },
  {
    title: 'Explore the Resort',
    subtitle:
      'Find venues on the interactive map, view hours, contacts, photos, and detailed descriptions.',
    image: images.onboardingExplore,
  },
  {
    title: 'Control Your Comfort',
    subtitle:
      'Book a taxi, adjust room lighting, set colors, choose presets, and schedule light timers.',
    image: images.onboardingComfort,
  },
];

export function ArrivalIntro({onFinish}: {onFinish: () => void}) {
  const [index, setIndex] = useState(0);
  const page = pages[index];
  const isLast = index === pages.length - 1;

  const handleNext = () => {
    if (isLast) {
      onFinish();
      return;
    }

    setIndex(current => current + 1);
  };

  return (
    <PremiumDarkBackground>
      <ImageBackground source={page.image} resizeMode="cover" style={styles.image}>
        <View style={styles.shade} />
        <TouchableOpacity activeOpacity={0.82} onPress={onFinish} style={styles.skip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <View style={styles.panel}>
          <View style={styles.indicatorRow}>
            {pages.map(item => (
              <View
                key={item.title}
                style={[
                  styles.indicator,
                  item.title === page.title && styles.indicatorActive,
                ]}
              />
            ))}
          </View>
          <Text style={styles.title}>{page.title}</Text>
          <Text style={styles.subtitle}>{page.subtitle}</Text>
          <View style={styles.actions}>
            {index > 0 ? (
              <SecondaryGraphiteButton
                title="Back"
                onPress={() => setIndex(current => current - 1)}
                style={styles.actionButton}
              />
            ) : null}
            <PrimaryGreenButton
              title={isLast ? 'Enter Resort' : 'Next'}
              onPress={handleNext}
              style={styles.actionButton}
            />
          </View>
        </View>
      </ImageBackground>
    </PremiumDarkBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 30 : 20,
    paddingBottom: Platform.OS === 'android' ? 30 : 26,
    justifyContent: 'flex-end',
  },
  shade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.44)',
  },
  skip: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 34 : 54,
    right: 18,
    minHeight: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    backgroundColor: 'rgba(17, 23, 21, 0.74)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '800',
  },
  panel: {
    backgroundColor: 'rgba(18, 24, 22, 0.88)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 138, 0.18)',
    padding: 20,
  },
  indicatorRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  indicator: {
    height: 6,
    width: 24,
    borderRadius: 3,
    backgroundColor: colors.divider,
  },
  indicatorActive: {
    width: 42,
    backgroundColor: colors.emerald,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 31,
    lineHeight: 37,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 9,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
  },
  actionButton: {
    flex: 1,
  },
});
