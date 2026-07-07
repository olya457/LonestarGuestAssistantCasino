import React, {useCallback, useMemo, useRef} from 'react';
import {
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../styling/colors';

export function BrightnessSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const widthRef = useRef(1);

  const updateByX = useCallback(
    (x: number) => {
      const next = Math.max(
        0,
        Math.min(100, Math.round((x / widthRef.current) * 100)),
      );
      onChange(next);
    },
    [onChange],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: event => updateByX(event.nativeEvent.locationX),
        onPanResponderMove: event => updateByX(event.nativeEvent.locationX),
      }),
    [updateByX],
  );

  const handleLayout = (event: LayoutChangeEvent) => {
    widthRef.current = Math.max(1, event.nativeEvent.layout.width);
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.label}>Brightness</Text>
        <Text style={styles.value}>{value}%</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.82}
          style={styles.stepButton}
          onPress={() => onChange(Math.max(0, value - 5))}>
          <Text style={styles.stepText}>−</Text>
        </TouchableOpacity>
        <View
          style={styles.track}
          onLayout={handleLayout}
          {...panResponder.panHandlers}>
          <View style={[styles.fill, {width: `${value}%`}]} />
          <View style={[styles.thumb, {left: `${value}%`}]} />
        </View>
        <TouchableOpacity
          activeOpacity={0.82}
          style={styles.stepButton}
          onPress={() => onChange(Math.min(100, value + 5))}>
          <Text style={styles.stepText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '900',
  },
  value: {
    color: colors.emerald,
    fontSize: 16,
    fontWeight: '900',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  track: {
    flex: 1,
    height: 22,
    borderRadius: 999,
    justifyContent: 'center',
    backgroundColor: colors.graphite,
    borderWidth: 1,
    borderColor: colors.divider,
    overflow: 'visible',
  },
  fill: {
    position: 'absolute',
    left: 0,
    height: 20,
    borderRadius: 999,
    backgroundColor: colors.emerald,
  },
  thumb: {
    position: 'absolute',
    width: 28,
    height: 28,
    marginLeft: -14,
    borderRadius: 14,
    backgroundColor: colors.textPrimary,
    borderWidth: 4,
    borderColor: colors.emerald,
    shadowColor: colors.emerald,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 5},
  },
  stepButton: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.softCard,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  stepText: {
    color: colors.emerald,
    fontSize: 24,
    fontWeight: '900',
  },
});
