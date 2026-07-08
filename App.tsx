import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {StayCompassShell} from './src/app/stay-shell/StayCompassShell';
import {SplashHold} from './src/features/arrival/screens/SplashHold';
import {ArrivalPrelude} from './src/features/arrival/screens/ArrivalPrelude';
import {guestMemoryKeys, useGuestMemory} from './src/shared/persistence/useGuestMemory';
import {palette} from './src/shared/theme/palette';

type AppPhase = 'loader' | 'onboarding' | 'main';

function App(): React.JSX.Element {
  const [onboardingCompleted, setOnboardingCompleted, hydrated] =
    useGuestMemory<boolean>(guestMemoryKeys.onboardingCompleted, false);
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
        backgroundColor={palette.background}
        translucent={false}
      />
      {phase === 'loader' ? <SplashHold /> : null}
      {phase === 'onboarding' ? (
        <ArrivalPrelude onFinish={finishOnboarding} />
      ) : null}
      {phase === 'main' ? <StayCompassShell /> : null}
    </>
  );
}

export default App;
