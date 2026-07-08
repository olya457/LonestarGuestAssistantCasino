import React, {useMemo, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {images} from '../../../assets/guest-atlas';
import {VenueDetailsCard} from '../../../shared/design-system/guestCards';
import {EmptyStateView, GlassCard, Screen, ScreenHeader} from '../../../shared/design-system/primitives';
import {venues} from '../../../domain/resort/property/venueDirectory';
import {guestMemoryKeys, useGuestMemory} from '../../../shared/persistence/useGuestMemory';
import {palette} from '../../../shared/theme/palette';
import type {ExpandedVenueState} from '../../../domain/resort/types';

export function EstateMapDeck() {
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(
    venues[0]?.id ?? null,
  );
  const [expandedVenues, setExpandedVenues] = useGuestMemory<ExpandedVenueState>(
    guestMemoryKeys.expandedVenues,
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
    backgroundColor: palette.blackGlass,
    borderWidth: 2,
    borderColor: palette.emerald,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.emerald,
    shadowOpacity: 0.32,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 5},
  },
  pinSelected: {
    width: 42,
    height: 42,
    marginLeft: -21,
    marginTop: -21,
    backgroundColor: palette.emerald,
  },
  pinText: {
    color: palette.emerald,
    fontSize: 12,
    fontWeight: '900',
  },
  pinTextSelected: {
    color: palette.background,
  },
  previewWrap: {
    marginBottom: 14,
  },
});
