import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {images} from '../media';
import {
  ConfirmationModal,
  PrimaryGreenButton,
  Screen,
  ScreenHeader,
  textStyles,
} from '../kit/ui';
import {ImageHero, OfferCard, ReservationCard} from '../kit/cards';
import {menuItems} from '../catalog/menu';
import {colors} from '../styling/colors';
import {storageKeys, useStoredState} from '../memory/useStoredState';

const discounts = [10, 15, 20];
const sessionOffers = {
  dish: discounts[Math.floor(Math.random() * discounts.length)],
  drink: discounts[Math.floor(Math.random() * discounts.length)],
};

const dishOfDay = menuItems.find(item => item.id === 'grilled-salmon-fillet') ?? menuItems[0];
const drinkOfDay = menuItems.find(item => item.id === 'emerald-mojito') ?? menuItems[16];

export function GuestDashboard() {
  const [doNotDisturb, setDoNotDisturb] = useStoredState(
    storageKeys.doNotDisturb,
    false,
  );
  const [conciergeVisible, setConciergeVisible] = useState(false);

  return (
    <Screen>
      <ImageHero
        image={images.onboardingWelcome}
        title="Lonestar Guest Assistan Casino"
        subtitle="Your stay. One tap away."
      />
      <ReservationCard doNotDisturb={doNotDisturb} onToggle={setDoNotDisturb} />
      <PrimaryGreenButton
        title="Call Concierge Now"
        onPress={() => setConciergeVisible(true)}
        style={styles.conciergeButton}
      />
      <View style={styles.section}>
        <ScreenHeader title="Daily Offers" subtitle="Premium picks prepared for today." />
        <OfferCard title="Dish of the Day" item={dishOfDay} discount={sessionOffers.dish} />
        <OfferCard title="Drink of the Day" item={drinkOfDay} discount={sessionOffers.drink} />
      </View>
      <View style={styles.footerNote}>
        <Text style={textStyles.caption}>RESORT STATUS</Text>
        <Text style={styles.footerTitle}>All guest services are ready</Text>
      </View>
      <ConfirmationModal
        visible={conciergeVisible}
        title="Concierge Request"
        message="A concierge request has been prepared for your room. A guest services specialist will contact you shortly."
        primaryLabel="Confirm"
        secondaryLabel="Cancel"
        onPrimary={() => setConciergeVisible(false)}
        onClose={() => setConciergeVisible(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  conciergeButton: {
    marginBottom: 22,
  },
  section: {
    marginTop: 4,
  },
  footerNote: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.graphite,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  footerTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 6,
  },
});
