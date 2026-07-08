import React from 'react';
import {View} from 'react-native';
import {VenueDetailsCard} from '../../../shared/design-system/guestCards';
import {Screen, ScreenHeader} from '../../../shared/design-system/primitives';
import {venues} from '../../../domain/resort/property/venueDirectory';
import {guestMemoryKeys, useGuestMemory} from '../../../shared/persistence/useGuestMemory';
import type {ExpandedVenueState} from '../../../domain/resort/types';

export function VenueLedger() {
  const [expandedVenues, setExpandedVenues] = useGuestMemory<ExpandedVenueState>(
    guestMemoryKeys.expandedVenues,
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
