import React from 'react';
import {View} from 'react-native';
import {VenueDetailsCard} from '../kit/cards';
import {Screen, ScreenHeader} from '../kit/ui';
import {venues} from '../catalog/venues';
import {storageKeys, useStoredState} from '../memory/useStoredState';
import type {ExpandedVenueState} from '../models';

export function ResortDirectory() {
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
