import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../styling/colors';
import type {CartItem, MenuItem, TaxiCategoryId, Venue} from '../models';
import {
  GlassCard,
  PrimaryGreenButton,
  SecondaryGraphiteButton,
  textStyles,
} from './ui';

export function ReservationCard({
  doNotDisturb,
  onToggle,
}: {
  doNotDisturb: boolean;
  onToggle: (value: boolean) => void;
}) {
  const rows = [
    ['Booking Code', 'SRC-48291'],
    ['Room Number', '1608'],
    ['Check-in', 'June 24, 2026 · 03:00 PM'],
    ['Check-out', 'June 29, 2026 · 11:00 AM'],
  ];

  return (
    <GlassCard style={styles.reservationCard}>
      <View style={styles.cardHeaderRow}>
        <Text style={textStyles.cardTitle}>Reservation Details</Text>
        <View style={styles.liveBadge}>
          <Text style={styles.liveBadgeText}>ACTIVE</Text>
        </View>
      </View>
      {rows.map(([label, value]) => (
        <View key={label} style={styles.infoRow}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValue}>{value}</Text>
        </View>
      ))}
      <View style={styles.dndRow}>
        <View>
          <Text style={styles.dndTitle}>Do Not Disturb</Text>
          <Text style={styles.dndSubtitle}>Keep room service notifications quiet</Text>
        </View>
        <Switch
          value={doNotDisturb}
          onValueChange={onToggle}
          thumbColor={doNotDisturb ? colors.emerald : colors.textSecondary}
          trackColor={{
            false: colors.divider,
            true: 'rgba(0, 242, 138, 0.35)',
          }}
        />
      </View>
    </GlassCard>
  );
}

export function OfferCard({
  title,
  item,
  discount,
}: {
  title: string;
  item: MenuItem;
  discount: number;
}) {
  const discountedPrice = item.price * (1 - discount / 100);

  return (
    <GlassCard style={styles.offerCard}>
      <Image source={item.image} style={styles.offerImage} />
      <View style={styles.offerBody}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.offerLabel}>{title}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}% OFF</Text>
          </View>
        </View>
        <Text style={styles.offerTitle}>{item.name}</Text>
        <Text style={styles.offerDescription} numberOfLines={2}>
          {item.ingredients}
        </Text>
        <Text style={textStyles.price}>${discountedPrice.toFixed(2)}</Text>
      </View>
    </GlassCard>
  );
}

export function MenuItemCard({
  item,
  onAdd,
}: {
  item: MenuItem;
  onAdd: () => void;
}) {
  return (
    <GlassCard style={styles.menuCard}>
      <Image source={item.image} style={styles.menuImage} />
      <View style={styles.menuBody}>
        <View style={styles.menuTitleRow}>
          <Text style={styles.menuTitle}>{item.name}</Text>
          <Text style={styles.menuPrice}>${item.price}</Text>
        </View>
        <Text style={styles.ingredients}>{item.ingredients}</Text>
        <PrimaryGreenButton title="Add to Cart" onPress={onAdd} style={styles.addButton} />
      </View>
    </GlassCard>
  );
}

export function CartItemRow({
  cartItem,
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  cartItem: CartItem;
  item: MenuItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) {
  return (
    <View style={styles.cartRow}>
      <Image source={item.image} style={styles.cartImage} />
      <View style={styles.cartInfo}>
        <Text style={styles.cartTitle}>{item.name}</Text>
        <Text style={styles.cartMeta}>${item.price} each</Text>
        <TouchableOpacity onPress={onRemove} activeOpacity={0.8}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.quantityBox}>
        <TouchableOpacity onPress={onDecrease} style={styles.qtyButton}>
          <Text style={styles.qtyText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qtyValue}>{cartItem.quantity}</Text>
        <TouchableOpacity onPress={onIncrease} style={styles.qtyButton}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function VenueDetailsCard({
  venue,
  expanded,
  onToggleExpanded,
  onClose,
  compact,
}: {
  venue: Venue;
  expanded: boolean;
  onToggleExpanded: () => void;
  onClose?: () => void;
  compact?: boolean;
}) {
  return (
    <GlassCard style={[styles.venueCard, compact && styles.venueCardCompact]}>
      <Image source={venue.image} style={compact ? styles.venueImageCompact : styles.venueImage} />
      <View style={styles.venueContent}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.venueTitle}>{venue.name}</Text>
          {onClose ? (
            <TouchableOpacity onPress={onClose} style={styles.closePill}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <Text style={styles.venueMeta}>Hours: {venue.openingHours}</Text>
        <Text style={styles.venueMeta}>Phone: {venue.phone}</Text>
        <Text style={styles.venueShort}>{venue.shortDescription}</Text>
        {expanded ? (
          <View style={styles.expandedBody}>
            <Text style={styles.expandedText}>{venue.fullDescriptionParagraph1}</Text>
            <Text style={styles.expandedText}>{venue.fullDescriptionParagraph2}</Text>
          </View>
        ) : null}
        <SecondaryGraphiteButton
          title={expanded ? 'Collapse Details' : 'Expand Details'}
          onPress={onToggleExpanded}
          style={styles.expandButton}
        />
      </View>
    </GlassCard>
  );
}

export function TaxiCategoryCard({
  id,
  icon,
  name,
  price,
  description,
  wait,
  selected,
  onPress,
}: {
  id: TaxiCategoryId;
  icon: string;
  name: string;
  price: string;
  description: string;
  wait: string;
  selected: boolean;
  onPress: (id: TaxiCategoryId) => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.86} onPress={() => onPress(id)}>
      <GlassCard style={[styles.taxiCard, selected && styles.selectedCard]}>
        <View style={[styles.taxiIcon, selected && styles.selectedIcon]}>
          <Text style={styles.taxiEmoji}>{icon}</Text>
        </View>
        <View style={styles.taxiContent}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.taxiTitle}>{name}</Text>
            <Text style={styles.taxiPrice}>{price}</Text>
          </View>
          <Text style={styles.taxiDescription}>{description}</Text>
          <Text style={styles.taxiWait}>{wait} estimated wait</Text>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

export function LightingPresetCard({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.84} onPress={onPress} style={styles.presetWrap}>
      <View style={[styles.presetCard, selected && styles.presetSelected]}>
        <Text style={[styles.presetText, selected && styles.presetTextSelected]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function ImageHero({
  image,
  title,
  subtitle,
}: {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.hero}>
      <Image source={image} style={styles.heroImage} />
      <View style={styles.heroShade} />
      <View style={styles.heroCopy}>
        <Text style={styles.heroTitle}>{title}</Text>
        <Text style={styles.heroSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reservationCard: {
    padding: 16,
    marginBottom: 16,
  },
  cardHeaderRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  liveBadge: {
    borderRadius: 10,
    backgroundColor: colors.greenGlass,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  liveBadgeText: {
    color: colors.emerald,
    fontSize: 10,
    fontWeight: '900',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    gap: 16,
  },
  infoLabel: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '700',
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '800',
    flexShrink: 1,
    textAlign: 'right',
  },
  dndRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    paddingTop: 14,
  },
  dndTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '900',
  },
  dndSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
  offerCard: {
    overflow: 'hidden',
    marginBottom: 14,
  },
  offerImage: {
    width: '100%',
    height: 150,
  },
  offerBody: {
    padding: 14,
  },
  offerLabel: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  discountBadge: {
    backgroundColor: colors.emerald,
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  discountText: {
    color: colors.background,
    fontSize: 11,
    fontWeight: '900',
  },
  offerTitle: {
    color: colors.textPrimary,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 8,
  },
  offerDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
    marginBottom: 8,
  },
  menuCard: {
    overflow: 'hidden',
    marginBottom: 14,
  },
  menuImage: {
    width: '100%',
    height: 160,
  },
  menuBody: {
    padding: 14,
  },
  menuTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  menuTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '900',
    flex: 1,
  },
  menuPrice: {
    color: colors.emerald,
    fontSize: 18,
    fontWeight: '900',
  },
  ingredients: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },
  addButton: {
    marginTop: 12,
  },
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    gap: 12,
  },
  cartImage: {
    width: 58,
    height: 58,
    borderRadius: 12,
  },
  cartInfo: {
    flex: 1,
  },
  cartTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '900',
  },
  cartMeta: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
  removeText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 5,
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.graphite,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  qtyButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    color: colors.emerald,
    fontSize: 20,
    fontWeight: '900',
  },
  qtyValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '900',
    minWidth: 20,
    textAlign: 'center',
  },
  venueCard: {
    overflow: 'hidden',
    marginBottom: 14,
  },
  venueCardCompact: {
    marginBottom: 0,
  },
  venueImage: {
    width: '100%',
    height: 154,
  },
  venueImageCompact: {
    width: '100%',
    height: 126,
  },
  venueContent: {
    padding: 14,
  },
  venueTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '900',
    flex: 1,
  },
  closePill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.graphite,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  closeText: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '900',
  },
  venueMeta: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 6,
  },
  venueShort: {
    color: colors.emerald,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 8,
  },
  expandedBody: {
    marginTop: 10,
    gap: 8,
  },
  expandedText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  expandButton: {
    marginTop: 12,
    minHeight: 44,
  },
  taxiCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 12,
    gap: 13,
  },
  selectedCard: {
    borderColor: colors.emerald,
    backgroundColor: 'rgba(0, 242, 138, 0.11)',
  },
  taxiIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.graphite,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  selectedIcon: {
    borderColor: colors.emerald,
    backgroundColor: colors.greenGlass,
  },
  taxiEmoji: {
    fontSize: 27,
  },
  taxiContent: {
    flex: 1,
  },
  taxiTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '900',
  },
  taxiPrice: {
    color: colors.emerald,
    fontSize: 13,
    fontWeight: '900',
  },
  taxiDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
  },
  taxiWait: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 6,
  },
  presetWrap: {
    width: '33.333%',
    padding: 5,
  },
  presetCard: {
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.graphite,
    borderWidth: 1,
    borderColor: colors.divider,
    paddingHorizontal: 8,
  },
  presetSelected: {
    backgroundColor: colors.greenGlass,
    borderColor: colors.emerald,
  },
  presetText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  presetTextSelected: {
    color: colors.emerald,
  },
  hero: {
    height: 250,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 138, 0.16)',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
  },
  heroCopy: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
  },
  heroTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
  },
  heroSubtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 4,
  },
});
