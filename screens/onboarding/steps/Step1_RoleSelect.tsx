import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { User, Users, Star } from 'lucide-react-native';
import { OnboardingData } from '../PlayerOnboardingFlow';

type Props = {
  data: OnboardingData;
  onNext: () => void;
};

const ROLES = [
  {
    key: 'player',
    label: 'Spieler',
    description: 'Du spielst aktiv in einem Team.',
    Icon: User,
  },
  {
    key: 'coach',
    label: 'Trainer / Coach',
    description: 'Du betreust oder coachst ein Team.',
    Icon: Users,
  },
  {
    key: 'fan',
    label: 'Fan',
    description: 'Du verfolgst und unterstützt Teams.',
    Icon: Star,
  },
] as const;

export default function Step1_RoleSelect({ onNext }: Props) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Als was möchtest du{'\n'}dich registrieren?</Text>
      <Text style={styles.subtitle}>
        Für diese Registrierung ist die Rolle{' '}
        <Text style={styles.highlight}>Spieler</Text> vorausgewählt.
      </Text>

      <View style={styles.cards}>
        {ROLES.map(({ key, label, description, Icon }) => {
          const isSelected = key === 'player';
          return (
            <View
              key={key}
              style={[styles.card, isSelected && styles.cardSelected]}
            >
              <View style={[styles.iconWrap, isSelected && styles.iconWrapSelected]}>
                <Icon size={22} color={isSelected ? '#0A0E1A' : '#7C8BA1'} />
              </View>
              <View style={styles.cardText}>
                <Text style={[styles.cardLabel, isSelected && styles.cardLabelSelected]}>
                  {label}
                  {isSelected && (
                    <Text style={styles.badge}> · Ausgewählt</Text>
                  )}
                </Text>
                <Text style={styles.cardDesc}>{description}</Text>
              </View>
            </View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.btn} onPress={onNext} activeOpacity={0.85}>
        <Text style={styles.btnText}>Weiter als Spieler →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 10,
  },
  subtitle: { color: '#7C8BA1', fontSize: 14, marginBottom: 32 },
  highlight: { color: '#9ef01a', fontWeight: '700' },
  cards: { gap: 12, marginBottom: 40 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161F38',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#1E2B47',
  },
  cardSelected: { borderColor: '#9ef01a', backgroundColor: '#0F1A2E' },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1E2B47',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconWrapSelected: { backgroundColor: '#9ef01a' },
  cardText: { flex: 1 },
  cardLabel: {
    color: '#7C8BA1',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },
  cardLabelSelected: { color: '#fff' },
  cardDesc: { color: '#4A5568', fontSize: 12 },
  badge: { color: '#9ef01a', fontSize: 11, fontWeight: '600' },
  btn: {
    backgroundColor: '#9ef01a',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnText: { color: '#0A0E1A', fontSize: 15, fontWeight: '800' },
});
