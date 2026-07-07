import React, {useMemo, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {images} from '../media';
import {VenueDetailsCard} from '../kit/cards';
import {EmptyStateView, GlassCard, Screen, ScreenHeader} from '../kit/ui';
import {venues} from '../catalog/venues';
import {storageKeys, useStoredState} from '../memory/useStoredState';
import {colors} from '../styling/colors';
import type {ExpandedVenueState} from '../models';

export function PropertyMap() {
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(
    venues[0]?.id ?? null,
  );
  const [expandedVenues, setExpandedVenues] = useStoredState<ExpandedVenueState>(
    storageKeys.expandedVenues,
    {},
  );

  const selectedVenue = useMemo(
    () => venues.find(venue => venue.id === selectedVenueId) ?? null,
    [selectedVenueId],
  );

  const toggleExpanded = (venueId: string) => {
    setExpandedVenues(current => ({...current, [venueId]: !current[venueId]}));
  };

  return (
    <Screen>
      <ScreenHeader
        title="Resort Map"
        subtitle="Tap a pin to explore resort locations."
      />
      <GlassCard style={styles.mapCard}>
        <ImageBackground
          source={images.mapOverview}
          resizeMode="cover"
          style={styles.mapImage}
          imageStyle={styles.mapImageRadius}>
          <View style={styles.mapShade} />
          {venues.map((venue, index) => {
            const selected = venue.id === selectedVenueId;
            return (
              <TouchableOpacity
                key={venue.id}
                activeOpacity={0.82}
                onPress={() => setSelectedVenueId(venue.id)}
                style={[
                  styles.pin,
                  {top: venue.pin.top, left: venue.pin.left},
                  selected && styles.pinSelected,
                ]}>
                <Text style={[styles.pinText, selected && styles.pinTextSelected]}>
                  {index + 1}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ImageBackground>
      </GlassCard>
      <View style={styles.previewWrap}>
        {selectedVenue ? (
          <VenueDetailsCard
            compact
            venue={selectedVenue}
            expanded={!!expandedVenues[selectedVenue.id]}
            onToggleExpanded={() => toggleExpanded(selectedVenue.id)}
            onClose={() => setSelectedVenueId(null)}
          />
        ) : (
          <EmptyStateView
            title="No venue selected"
            message="Tap any glowing pin on the resort plan to open details."
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  mapCard: {
    padding: 8,
    marginBottom: 16,
  },
  mapImage: {
    height: 430,
    overflow: 'hidden',
    borderRadius: 16,
  },
  mapImageRadius: {
    borderRadius: 16,
  },
  mapShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 7, 6, 0.18)',
  },
  pin: {
    position: 'absolute',
    width: 34,
    height: 34,
    marginLeft: -17,
    marginTop: -17,
    borderRadius: 17,
    backgroundColor: colors.blackGlass,
    borderWidth: 2,
    borderColor: colors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.emerald,
    shadowOpacity: 0.32,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 5},
  },
  pinSelected: {
    width: 42,
    height: 42,
    marginLeft: -21,
    marginTop: -21,
    backgroundColor: colors.emerald,
  },
  pinText: {
    color: colors.emerald,
    fontSize: 12,
    fontWeight: '900',
  },
  pinTextSelected: {
    color: colors.background,
  },
  previewWrap: {
    marginBottom: 14,
  },
});
