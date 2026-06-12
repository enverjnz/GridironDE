import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Clock } from 'lucide-react-native';

type Props = { onContinue: () => void };

export default function PendingScreen({ onContinue }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E1A" />
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <Clock size={48} color="#9ef01a" />
        </View>

        <Text style={styles.title}>Anfrage eingereicht!</Text>
        <Text style={styles.body}>
          Deine Anfrage läuft noch.{'\n\n'}
          Sobald ein Admin dich bestätigt,{'\n'}
          siehst du alle Teaminhalte.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Status</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Ausstehend</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btn} onPress={onContinue} activeOpacity={0.85}>
          <Text style={styles.btnText}>Zur App →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A0E1A' },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#161F38',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#9ef01a',
    marginBottom: 28,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 14,
    textAlign: 'center',
  },
  body: {
    color: '#7C8BA1',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#161F38',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1E2B47',
    alignSelf: 'stretch',
    marginBottom: 40,
  },
  cardLabel: {
    color: '#4A5568',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F6AD55',
  },
  statusText: { color: '#F6AD55', fontSize: 14, fontWeight: '700' },
  btn: {
    backgroundColor: '#9ef01a',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  btnText: { color: '#0A0E1A', fontSize: 15, fontWeight: '800' },
});
