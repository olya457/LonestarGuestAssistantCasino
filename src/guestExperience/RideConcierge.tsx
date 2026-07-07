import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TaxiCategoryCard} from '../kit/cards';
import {
  Chip,
  ConfirmationModal,
  GlassCard,
  PrimaryGreenButton,
  Screen,
  ScreenHeader,
  textStyles,
} from '../kit/ui';
import {storageKeys, useStoredState} from '../memory/useStoredState';
import {colors} from '../styling/colors';
import type {TaxiCategoryId, TaxiDraft} from '../models';

const taxiCategories = [
  {
    id: 'economy' as TaxiCategoryId,
    icon: '🚗',
    name: 'Economy',
    price: '$0.80/km',
    description: 'Comfortable city ride for short resort transfers.',
    wait: '5-8 min',
  },
  {
    id: 'standard' as TaxiCategoryId,
    icon: '🚘',
    name: 'Standard',
    price: '$1.10/km',
    description: 'Balanced comfort with extra luggage room.',
    wait: '4-7 min',
  },
  {
    id: 'family' as TaxiCategoryId,
    icon: '🚙',
    name: 'Family',
    price: '$1.40/km',
    description: 'Spacious cabin for families and larger groups.',
    wait: '8-12 min',
  },
  {
    id: 'premium' as TaxiCategoryId,
    icon: '✨',
    name: 'Premium',
    price: '$2.00/km',
    description: 'Executive car with elevated guest comfort.',
    wait: '10-15 min',
  },
];

const timeOptions = [
  '08:00',
  '09:30',
  '11:00',
  '12:30',
  '14:00',
  '15:30',
  '17:00',
  '18:30',
  '20:00',
  '21:30',
  '23:00',
];

function toDateValue(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateLabel(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
}

const todayValue = toDateValue(new Date());

const defaultTaxiDraft: TaxiDraft = {
  selectedCategory: 'standard',
  bookingType: 'ASAP',
  scheduledDate: todayValue,
  scheduledTime: '14:00',
};

export function RideConcierge() {
  const [draft, setDraft] = useStoredState<TaxiDraft>(
    storageKeys.taxiDraft,
    defaultTaxiDraft,
  );
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const dateOptions = useMemo(
    () =>
      Array.from({length: 7}).map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        return toDateValue(date);
      }),
    [],
  );

  const selectedCategory =
    taxiCategories.find(category => category.id === draft.selectedCategory) ??
    taxiCategories[1];

  const setDraftField = <K extends keyof TaxiDraft>(
    field: K,
    value: TaxiDraft[K],
  ) => {
    setDraft(current => ({...current, [field]: value}));
  };

  return (
    <Screen>
      <ScreenHeader
        title="Taxi Service"
        subtitle="Book a ride now or schedule it for later."
      />
      <View style={styles.segmented}>
        {(['ASAP', 'Scheduled'] as const).map(type => (
          <TouchableOpacity
            key={type}
            activeOpacity={0.84}
            onPress={() => setDraftField('bookingType', type)}
            style={[
              styles.segment,
              draft.bookingType === type && styles.segmentActive,
            ]}>
            <Text
              style={[
                styles.segmentText,
                draft.bookingType === type && styles.segmentTextActive,
              ]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {taxiCategories.map(category => (
        <TaxiCategoryCard
          key={category.id}
          {...category}
          selected={category.id === draft.selectedCategory}
          onPress={id => setDraftField('selectedCategory', id)}
        />
      ))}
      {draft.bookingType === 'Scheduled' ? (
        <GlassCard style={styles.pickerCard}>
          <Text style={textStyles.cardTitle}>Schedule Pickup</Text>
          <Text style={styles.pickerLabel}>Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dateOptions.map(date => (
              <Chip
                key={date}
                label={formatDateLabel(date)}
                active={draft.scheduledDate === date}
                onPress={() => setDraftField('scheduledDate', date)}
              />
            ))}
          </ScrollView>
          <Text style={styles.pickerLabel}>Time</Text>
          <View style={styles.timeGrid}>
            {timeOptions.map(time => (
              <TouchableOpacity
                key={time}
                activeOpacity={0.82}
                onPress={() => setDraftField('scheduledTime', time)}
                style={[
                  styles.timePill,
                  draft.scheduledTime === time && styles.timePillActive,
                ]}>
                <Text
                  style={[
                    styles.timeText,
                    draft.scheduledTime === time && styles.timeTextActive,
                  ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassCard>
      ) : null}
      <GlassCard style={styles.waitCard}>
        <Text style={styles.waitLabel}>Estimated Waiting Time</Text>
        <Text style={styles.waitValue}>{selectedCategory.wait}</Text>
        <Text style={styles.waitNote}>
          {draft.bookingType === 'Scheduled'
            ? `Pickup scheduled for ${formatDateLabel(draft.scheduledDate)} at ${draft.scheduledTime}.`
            : 'A nearby driver will be requested as soon as you confirm.'}
        </Text>
      </GlassCard>
      <PrimaryGreenButton
        title="Confirm Booking"
        onPress={() => setConfirmationVisible(true)}
      />
      <ConfirmationModal
        visible={confirmationVisible}
        title="Taxi Booking Confirmed"
        message={`${selectedCategory.name} taxi selected. ${selectedCategory.wait} estimated wait time.`}
        primaryLabel="Done"
        secondaryLabel="Edit"
        onPrimary={() => setConfirmationVisible(false)}
        onClose={() => setConfirmationVisible(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  segmented: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 18,
    backgroundColor: colors.graphite,
    borderWidth: 1,
    borderColor: colors.divider,
    marginBottom: 16,
  },
  segment: {
    flex: 1,
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  segmentActive: {
    backgroundColor: colors.emerald,
  },
  segmentText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '900',
  },
  segmentTextActive: {
    color: colors.background,
  },
  pickerCard: {
    padding: 16,
    marginTop: 4,
    marginBottom: 14,
  },
  pickerLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 15,
    marginBottom: 10,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  timePill: {
    minWidth: '30%',
    margin: 4,
    minHeight: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.graphite,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  timePillActive: {
    backgroundColor: colors.greenGlass,
    borderColor: colors.emerald,
  },
  timeText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '900',
  },
  timeTextActive: {
    color: colors.emerald,
  },
  waitCard: {
    padding: 16,
    marginBottom: 14,
  },
  waitLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '900',
  },
  waitValue: {
    color: colors.emerald,
    fontSize: 28,
    fontWeight: '900',
    marginTop: 4,
  },
  waitNote: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
});
