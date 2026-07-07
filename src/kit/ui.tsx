import React from 'react';
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors, spacing} from '../styling/colors';

type BackgroundProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

type ConfirmationModalProps = {
  visible: boolean;
  title: string;
  message: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary: () => void;
  onClose: () => void;
};

export const platformInsets = {
  top: Platform.OS === 'android' ? 30 : 44,
  contentTopOffset: 20,
  navBottom: Platform.OS === 'android' ? 30 : 20,
  screenBottom: Platform.OS === 'android' ? 122 : 112,
};

export function PremiumDarkBackground({children, style}: BackgroundProps) {
  return (
    <View style={[styles.background, style]}>
      <View style={[styles.glow, styles.glowTop]} />
      <View style={[styles.glow, styles.glowMid]} />
      <View style={[styles.glowSmall, styles.glowBottom]} />
      {children}
    </View>
  );
}

export function Screen({children, scroll = true, contentStyle}: ScreenProps) {
  const content = (
    <View style={[styles.screenContent, contentStyle]}>{children}</View>
  );

  return (
    <PremiumDarkBackground>
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </PremiumDarkBackground>
  );
}

export function ScreenHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

export function GlassCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PrimaryGreenButton({
  title,
  onPress,
  disabled,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      disabled={disabled}
      style={[styles.primaryButton, disabled && styles.disabledButton, style]}>
      <Text style={styles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function SecondaryGraphiteButton({
  title,
  onPress,
  disabled,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.secondaryButton,
        disabled && styles.disabledButton,
        style,
      ]}>
      <Text style={styles.secondaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function EmptyStateView({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <GlassCard style={styles.emptyCard}>
      <Text style={styles.emptyIcon}>✦</Text>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyMessage}>{message}</Text>
    </GlassCard>
  );
}

export function ConfirmationModal({
  visible,
  title,
  message,
  primaryLabel = 'Done',
  secondaryLabel = 'Close',
  onPrimary,
  onClose,
}: ConfirmationModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <View style={styles.modalMark}>
            <Text style={styles.modalMarkText}>S</Text>
          </View>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <View style={styles.modalActions}>
            <SecondaryGraphiteButton
              title={secondaryLabel}
              onPress={onClose}
              style={styles.modalButton}
            />
            <PrimaryGreenButton
              title={primaryLabel}
              onPress={onPrimary}
              style={styles.modalButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function AppLogo({size = 88}: {size?: number}) {
  return (
    <View
      style={[
        styles.logoShell,
        {
          width: size,
          height: size,
          borderRadius: size * 0.28,
        },
      ]}>
      <Image source={require('../media/star_resort_loader_s_glow.png')} style={styles.logoImage} />
      <Text style={[styles.logoS, {fontSize: size * 0.46}]}>S</Text>
      <Text style={[styles.logoStar, {fontSize: size * 0.22}]}>★</Text>
    </View>
  );
}

export const textStyles = StyleSheet.create({
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  body: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '700',
  },
  price: {
    color: colors.emerald,
    fontSize: 18,
    fontWeight: '900',
  },
});

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(0, 200, 117, 0.12)',
    shadowColor: colors.glow,
    shadowOpacity: 0.48,
    shadowRadius: 32,
  },
  glowSmall: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(0, 242, 138, 0.08)',
    shadowColor: colors.glow,
    shadowOpacity: 0.32,
    shadowRadius: 24,
  },
  glowTop: {
    top: -90,
    right: -110,
  },
  glowMid: {
    top: 250,
    left: -160,
  },
  glowBottom: {
    bottom: -70,
    right: 24,
  },
  screenContent: {
    paddingHorizontal: spacing.screen,
    paddingTop: platformInsets.top + platformInsets.contentTopOffset,
    paddingBottom: platformInsets.screenBottom,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  card: {
    backgroundColor: colors.cardGlass,
    borderRadius: spacing.cardRadius,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 138, 0.13)',
    shadowColor: colors.emerald,
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 10},
    elevation: 4,
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    backgroundColor: colors.emerald,
    shadowColor: colors.emerald,
    shadowOpacity: 0.28,
    shadowRadius: 14,
    shadowOffset: {width: 0, height: 8},
    elevation: 3,
  },
  primaryButtonText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: '900',
  },
  secondaryButton: {
    minHeight: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    backgroundColor: colors.softCard,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
  },
  disabledButton: {
    opacity: 0.48,
  },
  chip: {
    minHeight: 38,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.divider,
    backgroundColor: colors.graphite,
    marginRight: 10,
  },
  chipActive: {
    backgroundColor: colors.greenGlass,
    borderColor: colors.emerald,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '800',
  },
  chipTextActive: {
    color: colors.emerald,
  },
  emptyCard: {
    alignItems: 'center',
    padding: 24,
  },
  emptyIcon: {
    color: colors.emerald,
    fontSize: 28,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 8,
  },
  emptyMessage: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 6,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    justifyContent: 'center',
    padding: 22,
  },
  modalCard: {
    backgroundColor: colors.darkCard,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 138, 0.22)',
    padding: 22,
    shadowColor: colors.emerald,
    shadowOpacity: 0.24,
    shadowRadius: 26,
    shadowOffset: {width: 0, height: 12},
  },
  modalMark: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.greenGlass,
    borderWidth: 1,
    borderColor: colors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalMarkText: {
    color: colors.emerald,
    fontSize: 24,
    fontWeight: '900',
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
  },
  modalMessage: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
  },
  modalButton: {
    flex: 1,
  },
  logoShell: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.graphite,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 138, 0.36)',
    overflow: 'hidden',
    shadowColor: colors.emerald,
    shadowOpacity: 0.38,
    shadowRadius: 26,
    shadowOffset: {width: 0, height: 14},
  },
  logoImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.34,
    width: '100%',
    height: '100%',
  },
  logoS: {
    color: colors.emerald,
    fontWeight: '900',
  },
  logoStar: {
    position: 'absolute',
    right: 16,
    top: 14,
    color: colors.gold,
    fontWeight: '900',
  },
});
