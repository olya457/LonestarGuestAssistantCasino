import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GuestPulseBoard} from '../../features/stay-home/screens/GuestPulseBoard';
import {AmbienceConsole} from '../../features/room-control/screens/AmbienceConsole';
import {EstateMapDeck} from '../../features/property/screens/EstateMapDeck';
import {TableSideGuide} from '../../features/dining/screens/TableSideGuide';
import {TransferDesk} from '../../features/transport/screens/TransferDesk';
import {VenueLedger} from '../../features/property/screens/VenueLedger';
import {palette} from '../../shared/theme/palette';
import {platformInsets} from '../../shared/design-system/primitives';

type TabKey = 'Home' | 'Menu' | 'Map' | 'Venues' | 'Taxi' | 'Lights';

const tabs: {key: TabKey; label: string; icon: string}[] = [
  {key: 'Home', label: 'Home', icon: '🏨'},
  {key: 'Menu', label: 'Menu', icon: '🍽️'},
  {key: 'Map', label: 'Map', icon: '📍'},
  {key: 'Venues', label: 'Venues', icon: '✨'},
  {key: 'Taxi', label: 'Taxi', icon: '🚕'},
  {key: 'Lights', label: 'Lights', icon: '💡'},
];

const screenByTab: Record<TabKey, React.ComponentType> = {
  Home: GuestPulseBoard,
  Menu: TableSideGuide,
  Map: EstateMapDeck,
  Venues: VenueLedger,
  Taxi: TransferDesk,
  Lights: AmbienceConsole,
};

export function StayCompassShell() {
  const [activeTab, setActiveTab] = useState<TabKey>('Home');
  const ActiveScreen = screenByTab[activeTab];

  return (
    <View style={styles.root}>
      <ActiveScreen />
      <View style={styles.tabBar}>
        {tabs.map(tab => {
          const active = tab.key === activeTab;
          return (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.82}
              onPress={() => setActiveTab(tab.key)}
              style={styles.tab}>
              <View style={[styles.iconShell, active && styles.iconShellActive]}>
                <Text style={styles.icon}>{tab.icon}</Text>
              </View>
              <Text style={[styles.label, active && styles.labelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.background,
  },
  tabBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: platformInsets.navBottom,
    minHeight: 76,
    borderRadius: 26,
    backgroundColor: 'rgba(17, 23, 21, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(244, 255, 248, 0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 9,
    shadowColor: palette.emerald,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: {width: 0, height: 12},
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  iconShell: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconShellActive: {
    backgroundColor: palette.greenGlass,
    borderWidth: 1,
    borderColor: palette.emerald,
  },
  icon: {
    fontSize: 18,
  },
  label: {
    color: palette.mutedText,
    fontSize: 9,
    fontWeight: '800',
  },
  labelActive: {
    color: palette.textPrimary,
  },
});
