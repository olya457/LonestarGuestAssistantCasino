import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {StayCoordinator} from './src/guestFlow/StayCoordinator';
import {WelcomeLoader} from './src/guestExperience/WelcomeLoader';
import {ArrivalIntro} from './src/guestExperience/ArrivalIntro';
import {storageKeys, useStoredState} from './src/memory/useStoredState';
import {colors} from './src/styling/colors';

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
      {phase === 'loader' ? <WelcomeLoader /> : null}
      {phase === 'onboarding' ? (
        <ArrivalIntro onFinish={finishOnboarding} />
      ) : null}
      {phase === 'main' ? <StayCoordinator /> : null}
    </>
  );
}

export default App;
