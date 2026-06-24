import React from 'react';
import {View} from 'react-native';
import {VenueDetailsCard} from '../components/cards';
import {Screen, ScreenHeader} from '../components/ui';
import {venues} from '../data/venues';
import {storageKeys, useStoredState} from '../storage/useStoredState';
import type {ExpandedVenueState} from '../types';

export function VenuesScreen() {
  const [expandedVenues, setExpandedVenues] = useStoredState<ExpandedVenueState>(
    storageKeys.expandedVenues,
    {},
  );

  const toggleExpanded = (venueId: string) => {
    setExpandedVenues(current => ({...current, [venueId]: !current[venueId]}));
  };

  return (
    <Screen>
      <ScreenHeader
        title="Resort Venues"
        subtitle="Browse all places across the complex."
      />
      <View>
        {venues.map(venue => (
          <VenueDetailsCard
            key={venue.id}
            venue={venue}
            expanded={!!expandedVenues[venue.id]}
            onToggleExpanded={() => toggleExpanded(venue.id)}
          />
        ))}
      </View>
    </Screen>
  );
}
