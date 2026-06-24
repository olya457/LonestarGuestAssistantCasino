import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {AppNavigator} from './src/navigation/AppNavigator';
import {LoaderScreen} from './src/screens/LoaderScreen';
import {OnboardingScreen} from './src/screens/OnboardingScreen';
import {storageKeys, useStoredState} from './src/storage/useStoredState';
import {colors} from './src/theme/colors';

type AppPhase = 'loader' | 'onboarding' | 'main';

function App(): React.JSX.Element {
  const [onboardingCompleted, setOnboardingCompleted, hydrated] =
    useStoredState<boolean>(storageKeys.onboardingCompleted, false);
  const [phase, setPhase] = useState<AppPhase>('loader');

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const timer = setTimeout(() => {
      setPhase(onboardingCompleted ? 'main' : 'onboarding');
    }, 5000);

    return () => clearTimeout(timer);
  }, [hydrated, onboardingCompleted]);

  const finishOnboarding = () => {
    setOnboardingCompleted(true);
    setPhase('main');
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
        translucent={false}
      />
      {phase === 'loader' ? <LoaderScreen /> : null}
      {phase === 'onboarding' ? (
        <OnboardingScreen onFinish={finishOnboarding} />
      ) : null}
      {phase === 'main' ? <AppNavigator /> : null}
    </>
  );
}

export default App;
