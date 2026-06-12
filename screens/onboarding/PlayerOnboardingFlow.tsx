import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  Alert,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import Step1_RoleSelect from './steps/Step1_RoleSelect';
import Step2_BasicInfo from './steps/Step2_BasicInfo';
import Step3_TeamSearch from './steps/Step3_TeamSearch';
import Step4_AthleticProfile from './steps/Step4_AthleticProfile';
import Step5_AccountCreate from './steps/Step5_AccountCreate';
import PendingScreen from './PendingScreen';

// ─── Types ────────────────────────────────────────────────────────────────────

export type OnboardingData = {
  role: 'player';
  firstName: string;
  lastName: string;
  bio: string;
  avatarUri: string | null;
  selectedTeamId: string | null;
  selectedTeamName: string | null;
  position: string;
  jerseyNumber: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  nationality: string;
};

const INITIAL_DATA: OnboardingData = {
  role: 'player',
  firstName: '',
  lastName: '',
  bio: '',
  avatarUri: null,
  selectedTeamId: null,
  selectedTeamName: null,
  position: '',
  jerseyNumber: '',
  age: '',
  gender: '',
  weight: '',
  height: '',
  nationality: '',
};

// ─── Progress Bar ─────────────────────────────────────────────────────────────

const TOTAL_STEPS = 5;

const ProgressBar = ({ step }: { step: number }) => (
  <View style={styles.progressContainer}>
    {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
      <View
        key={i}
        style={[
          styles.progressSegment,
          i < step && styles.progressSegmentActive,
        ]}
      />
    ))}
  </View>
);

// ─── Main Component ───────────────────────────────────────────────────────────

type Props = {
  onComplete: () => void;
};

export default function PlayerOnboardingFlow({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const update = (fields: Partial<OnboardingData>) =>
    setData((prev) => ({ ...prev, ...fields }));

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (email: string, password: string) => {
    setIsSubmitting(true);
    try {
      // 1. Supabase Auth – Konto anlegen
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      const user = signUpData?.user;
      if (!user) throw new Error('Kein Benutzer zurückgegeben.');

      // 2. Profil speichern
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.id,
        role: 'player',
        first_name: data.firstName.trim(),
        last_name: data.lastName.trim(),
        bio: data.bio.trim(),
        avatar: data.avatarUri ?? null,
        position: data.position.trim(),
        jersey_number: data.jerseyNumber.trim(),
        age: data.age ? parseInt(data.age, 10) : null,
        gender: data.gender.trim(),
        weight: data.weight ? parseFloat(data.weight) : null,
        height: data.height ? parseFloat(data.height) : null,
        nationality: data.nationality.trim(),
      });

      if (profileError) throw profileError;

      // 3. Vereinsmitgliedschaft beantragen
      if (data.selectedTeamId) {
        const { error: membershipError } = await supabase
          .from('team_memberships')
          .insert({
            player_id: user.id,
            team_id: data.selectedTeamId,
            status: 'pending',
          });

        if (membershipError) throw membershipError;
      }

      setIsDone(true);
    } catch (err: any) {
      const msg =
        err?.message?.includes('Network request failed')
          ? 'Keine Verbindung zum Server. Bitte prüfe deine Internetverbindung.'
          : err?.message ?? 'Unbekannter Fehler. Bitte versuche es erneut.';
      Alert.alert('Fehler', msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDone) {
    return <PendingScreen onContinue={onComplete} />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E1A" />
      <View style={styles.header}>
        <Text style={styles.logo}>
          GRIDIRON<Text style={styles.logoGreen}>DE</Text>
        </Text>
        <Text style={styles.stepLabel}>
          Schritt {step} / {TOTAL_STEPS}
        </Text>
      </View>
      <ProgressBar step={step} />

      <View style={styles.content}>
        {step === 1 && <Step1_RoleSelect data={data} onNext={next} />}
        {step === 2 && (
          <Step2_BasicInfo data={data} update={update} onNext={next} onBack={back} />
        )}
        {step === 3 && (
          <Step3_TeamSearch data={data} update={update} onNext={next} onBack={back} />
        )}
        {step === 4 && (
          <Step4_AthleticProfile
            data={data}
            update={update}
            onBack={back}
            onSubmit={next}
            isSubmitting={false}
          />
        )}
        {step === 5 && (
          <Step5_AccountCreate
            onBack={back}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A0E1A' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  logo: { color: '#fff', fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  logoGreen: { color: '#9ef01a' },
  stepLabel: { color: '#7C8BA1', fontSize: 12, fontWeight: '600' },
  progressContainer: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#161F38',
  },
  progressSegmentActive: { backgroundColor: '#9ef01a' },
  content: { flex: 1 },
});
