import React, {useState} from 'react';
import {ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import {LightingPresetCard} from '../components/cards';
import {BrightnessSlider} from '../components/BrightnessSlider';
import {
  Chip,
  ConfirmationModal,
  GlassCard,
  PrimaryGreenButton,
  Screen,
  ScreenHeader,
  textStyles,
} from '../components/ui';
import {storageKeys, useStoredState} from '../storage/useStoredState';
import {colors} from '../theme/colors';
import type {LightingColor, LightingPreset, LightingSettings} from '../types';

const lightingColors: {label: LightingColor; color: string}[] = [
  {label: 'Emerald', color: '#00F28A'},
  {label: 'Warm White', color: '#FFF4D8'},
  {label: 'Soft Gold', color: '#D9B46A'},
  {label: 'Ocean Blue', color: '#4AA8FF'},
  {label: 'Rose', color: '#FF7AAE'},
  {label: 'Violet', color: '#A98CFF'},
];

const presets: LightingPreset[] = [
  'Relax',
  'Reading',
  'Night',
  'Romantic',
  'Work',
  'Custom',
];

const timeOptions = [
  '06:30',
  '07:00',
  '08:00',
  '18:00',
  '19:30',
  '21:00',
  '22:30',
  '23:30',
  '00:00',
];

const defaultLightingSettings: LightingSettings = {
  brightness: 62,
  color: 'Emerald',
  preset: 'Relax',
  timerEnabled: false,
  turnOnTime: '18:00',
  turnOffTime: '23:30',
};

export function LightsScreen() {
  const [settings, setSettings] = useStoredState<LightingSettings>(
    storageKeys.lightingSettings,
    defaultLightingSettings,
  );
  const [savedVisible, setSavedVisible] = useState(false);

  const updateSetting = <K extends keyof LightingSettings>(
    key: K,
    value: LightingSettings[K],
  ) => {
    setSettings(current => ({...current, [key]: value}));
  };

  return (
    <Screen>
      <ScreenHeader
        title="Lighting Control"
        subtitle="Create the perfect room atmosphere."
      />
      <GlassCard style={styles.heroControl}>
        <View style={styles.lightOrbWrap}>
          <View
            style={[
              styles.lightOrb,
              {
                backgroundColor:
                  lightingColors.find(item => item.label === settings.color)?.color ??
                  colors.emerald,
                opacity: Math.max(0.25, settings.brightness / 100),
              },
            ]}
          />
        </View>
        <BrightnessSlider
          value={settings.brightness}
          onChange={value => updateSetting('brightness', value)}
        />
      </GlassCard>
      <GlassCard style={styles.sectionCard}>
        <Text style={textStyles.cardTitle}>Lighting Color</Text>
        <View style={styles.colorGrid}>
          {lightingColors.map(item => {
            const selected = settings.color === item.label;
            return (
              <TouchableOpacity
                key={item.label}
                activeOpacity={0.84}
                onPress={() => updateSetting('color', item.label)}
                style={[styles.colorButton, selected && styles.colorButtonSelected]}>
                <View style={[styles.swatch, {backgroundColor: item.color}]} />
                <Text style={[styles.colorLabel, selected && styles.colorLabelSelected]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </GlassCard>
      <GlassCard style={styles.sectionCard}>
        <Text style={textStyles.cardTitle}>Preset Modes</Text>
        <View style={styles.presetGrid}>
          {presets.map(preset => (
            <LightingPresetCard
              key={preset}
              label={preset}
              selected={settings.preset === preset}
              onPress={() => updateSetting('preset', preset)}
            />
          ))}
        </View>
      </GlassCard>
      <GlassCard style={styles.sectionCard}>
        <View style={styles.timerHeader}>
          <View>
            <Text style={textStyles.cardTitle}>Light Timer</Text>
            <Text style={styles.timerHint}>Turn lights on and off automatically</Text>
          </View>
          <Switch
            value={settings.timerEnabled}
            onValueChange={value => updateSetting('timerEnabled', value)}
            thumbColor={settings.timerEnabled ? colors.emerald : colors.textSecondary}
            trackColor={{
              false: colors.divider,
              true: 'rgba(0, 242, 138, 0.35)',
            }}
          />
        </View>
        <Text style={styles.timerLabel}>Turn On Time</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {timeOptions.map(time => (
            <Chip
              key={`on-${time}`}
              label={time}
              active={settings.turnOnTime === time}
              onPress={() => updateSetting('turnOnTime', time)}
            />
          ))}
        </ScrollView>
        <Text style={styles.timerLabel}>Turn Off Time</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {timeOptions.map(time => (
            <Chip
              key={`off-${time}`}
              label={time}
              active={settings.turnOffTime === time}
              onPress={() => updateSetting('turnOffTime', time)}
            />
          ))}
        </ScrollView>
      </GlassCard>
      <PrimaryGreenButton title="Save Settings" onPress={() => setSavedVisible(true)} />
      <ConfirmationModal
        visible={savedVisible}
        title="Lighting Saved"
        message={`${settings.preset} mode is saved at ${settings.brightness}% brightness with ${settings.color} color.`}
        primaryLabel="Done"
        secondaryLabel="Adjust"
        onPrimary={() => setSavedVisible(false)}
        onClose={() => setSavedVisible(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroControl: {
    padding: 16,
    marginBottom: 14,
  },
  lightOrbWrap: {
    height: 132,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  lightOrb: {
    width: 118,
    height: 118,
    borderRadius: 59,
    shadowColor: colors.emerald,
    shadowOpacity: 0.55,
    shadowRadius: 32,
    shadowOffset: {width: 0, height: 0},
  },
  sectionCard: {
    padding: 16,
    marginBottom: 14,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
    marginTop: 12,
  },
  colorButton: {
    width: '50%',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  colorButtonSelected: {
    opacity: 1,
  },
  swatch: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.textPrimary,
  },
  colorLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '900',
    flexShrink: 1,
  },
  colorLabelSelected: {
    color: colors.emerald,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
    marginTop: 12,
  },
  timerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
  },
  timerHint: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  timerLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 16,
    marginBottom: 10,
  },
});
