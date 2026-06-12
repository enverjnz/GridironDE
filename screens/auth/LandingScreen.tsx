import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { Trophy } from 'lucide-react-native';

type Props = {
  onLogin: () => void;
  onRegister: () => void;
};

export default function LandingScreen({ onLogin, onRegister }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E1A" />

      <View style={styles.logoSection}>
        <View style={styles.logoBadge}>
          <Trophy size={32} color="#0A0E1A" />
        </View>
        <Text style={styles.logoText}>
          GRIDIRON<Text style={styles.logoGreen}>DE</Text>
        </Text>
        <Text style={styles.tagline}>GERMANYS FOOTBALL TRACKER</Text>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>
          Willkommen im{'\n'}
          <Text style={styles.heroGreen}>deutschen Football</Text>
        </Text>
        <Text style={styles.heroSubtitle}>
          Verfolge Ligen, Spielergebnisse und dein Team – alles an einem Ort.
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnPrimary} onPress={onRegister} activeOpacity={0.85}>
          <Text style={styles.btnPrimaryText}>Jetzt registrieren</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={onLogin} activeOpacity={0.85}>
          <Text style={styles.btnSecondaryText}>Bereits ein Konto? Einloggen</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.legal}>
        Mit der Registrierung stimmst du unseren Nutzungsbedingungen und der Datenschutzerklärung zu.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0A0E1A',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: 40,
    gap: 10,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: '#9ef01a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  logoText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
  },
  logoGreen: { color: '#9ef01a' },
  tagline: {
    color: '#4A5568',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 16,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 42,
    marginBottom: 16,
  },
  heroGreen: { color: '#9ef01a' },
  heroSubtitle: {
    color: '#7C8BA1',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  actions: {
    gap: 12,
    marginBottom: 20,
  },
  btnPrimary: {
    backgroundColor: '#9ef01a',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: '#0A0E1A',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  btnSecondary: {
    backgroundColor: '#161F38',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1E2B47',
  },
  btnSecondaryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  legal: {
    color: '#4A5568',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
});
