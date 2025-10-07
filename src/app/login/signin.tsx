import Logine from '@/src/components/profile/logine';
import { ScreenContainer } from '@/src/components/ScreenContainer';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';


export default function SigninScreen() {
  return (
    <ScreenContainer>
      <Logine/>
    </ScreenContainer>
  );
}


