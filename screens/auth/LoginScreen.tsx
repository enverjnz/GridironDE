import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Trophy, Eye, EyeOff } from 'lucide-react-native';
import { supabase } from '../../lib/supabase';

type Props = {
  onBack: () => void;
  onSuccess: () => void;
};

export default function LoginScreen({ onBack, onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = 'E-Mail ist Pflicht.';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Ungültige E-Mail-Adresse.';
    if (!password) e.password = 'Passwort ist Pflicht.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      onSuccess();
    } catch (err: any) {
      const msg =
        err?.message?.includes('Network request failed')
          ? 'Keine Verbindung zum Server. Bitte prüfe deine Internetverbindung.'
          : err?.message ?? 'Bitte überprüfe deine Eingaben.';
      Alert.alert('Login fehlgeschlagen', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E1A" />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backText}>← Zurück</Text>
        </TouchableOpacity>

        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Trophy size={22} color="#0A0E1A" />
          </View>
          <Text style={styles.logoText}>
            GRIDIRON<Text style={styles.logoGreen}>DE</Text>
          </Text>
        </View>

        <Text style={styles.title}>Einloggen</Text>
        <Text style={styles.subtitle}>Willkommen zurück! Bitte melde dich an.</Text>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>E-MAIL</Text>
          <TextInput
            style={[styles.input, !!errors.email && styles.inputError]}
            value={email}
            onChangeText={setEmail}
            placeholder="deine@email.de"
            placeholderTextColor="#4A5568"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          {!!errors.email && <Text style={styles.error}>{errors.email}</Text>}
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>PASSWORT</Text>
          <View style={styles.passwordWrap}>
            <TextInput
              style={[styles.input, styles.passwordInput, !!errors.password && styles.inputError]}
              value={password}
              onChangeText={setPassword}
              placeholder="Dein Passwort"
              placeholderTextColor="#4A5568"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPassword((v) => !v)}
              activeOpacity={0.7}
            >
              {showPassword ? (
                <EyeOff size={18} color="#7C8BA1" />
              ) : (
                <Eye size={18} color="#7C8BA1" />
              )}
            </TouchableOpacity>
          </View>
          {!!errors.password && <Text style={styles.error}>{errors.password}</Text>}
        </View>

        <TouchableOpacity
          style={[styles.btnPrimary, loading && styles.btnDisabled]}
          onPress={handleLogin}
          activeOpacity={0.85}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0A0E1A" />
          ) : (
            <Text style={styles.btnPrimaryText}>Einloggen</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerHint} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.registerHintText}>
            Noch kein Konto?{' '}
            <Text style={styles.registerHintLink}>Jetzt registrieren</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A0E1A' },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  backBtn: { marginBottom: 24 },
  backText: { color: '#7C8BA1', fontSize: 14, fontWeight: '600' },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 32,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#9ef01a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: { color: '#fff', fontSize: 20, fontWeight: '900', letterSpacing: 1 },
  logoGreen: { color: '#9ef01a' },
  title: { color: '#fff', fontSize: 28, fontWeight: '900', marginBottom: 8 },
  subtitle: { color: '#7C8BA1', fontSize: 14, marginBottom: 32, lineHeight: 20 },
  fieldWrap: { marginBottom: 16 },
  label: {
    color: '#7C8BA1',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#161F38',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#1E2B47',
  },
  inputError: { borderColor: '#FF4757' },
  passwordWrap: { position: 'relative' },
  passwordInput: { paddingRight: 48 },
  eyeBtn: {
    position: 'absolute',
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  error: { color: '#FF4757', fontSize: 11, marginTop: 4 },
  btnPrimary: {
    backgroundColor: '#9ef01a',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  btnDisabled: { opacity: 0.6 },
  btnPrimaryText: { color: '#0A0E1A', fontSize: 16, fontWeight: '900' },
  registerHint: { alignItems: 'center' },
  registerHintText: { color: '#7C8BA1', fontSize: 13 },
  registerHintLink: { color: '#9ef01a', fontWeight: '700' },
});
