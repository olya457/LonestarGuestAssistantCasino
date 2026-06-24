import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Dispatch, SetStateAction} from 'react';
import {useCallback, useEffect, useState} from 'react';

export const storageKeys = {
  onboardingCompleted: 'star_resort:onboarding_completed',
  doNotDisturb: 'star_resort:do_not_disturb',
  cart: 'star_resort:cart',
  taxiDraft: 'star_resort:taxi_draft',
  lightingSettings: 'star_resort:lighting_settings',
  expandedVenues: 'star_resort:expanded_venues',
};

export function useStoredState<T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(defaultValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;

    AsyncStorage.getItem(key)
      .then(stored => {
        if (!mounted) {
          return;
        }

        if (stored !== null) {
          setValue(JSON.parse(stored));
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (mounted) {
          setHydrated(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, [key]);

  const setStoredValue = useCallback<Dispatch<SetStateAction<T>>>(
    nextValue => {
      setValue(currentValue => {
        const resolvedValue =
          typeof nextValue === 'function'
            ? (nextValue as (current: T) => T)(currentValue)
            : nextValue;

        AsyncStorage.setItem(key, JSON.stringify(resolvedValue)).catch(
          () => undefined,
        );

        return resolvedValue;
      });
    },
    [key],
  );

  return [value, setStoredValue, hydrated];
}
