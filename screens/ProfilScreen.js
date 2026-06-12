import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  ScrollView, TouchableOpacity, Image, ActivityIndicator,
  TextInput, Alert,
} from 'react-native';
import {
  User, Shield, Users, Ruler, Weight,
  Flag, Hash, Calendar, Pencil, Check, X, Camera,
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';

// ─── Constants ────────────────────────────────────────────────────────────────

const POSITIONS = ['QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'DB', 'K', 'P', 'LS'];
const GENDERS   = ['Männlich', 'Weiblich', 'Divers'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Initials({ firstName, lastName }) {
  const letters = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || '?';
  return (
    <View style={styles.avatarPlaceholder}>
      <Text style={styles.avatarInitials}>{letters}</Text>
    </View>
  );
}

function MembershipBadge({ status }) {
  const config = {
    pending:  { bg: '#2A1F00', border: '#FBBF24', text: '#FBBF24', label: 'Anfrage läuft' },
    approved: { bg: '#0A1F0A', border: '#9ef01a', text: '#9ef01a', label: 'Mitglied'       },
    declined: { bg: '#1F0A0A', border: '#FF4757', text: '#FF4757', label: 'Abgelehnt'      },
  }[status] ?? { bg: '#161F38', border: '#1E2B47', text: '#7C8BA1', label: status };

  return (
    <View style={[styles.badge, { backgroundColor: config.bg, borderColor: config.border }]}>
      <Text style={[styles.badgeText, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statIcon}>{icon}</View>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value || '–'}</Text>
    </View>
  );
}

function EditField({ label, value, onChangeText, placeholder, keyboardType, multiline }) {
  return (
    <View style={styles.editField}>
      <Text style={styles.editLabel}>{label}</Text>
      <TextInput
        style={[styles.editInput, multiline && styles.editInputMulti]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? ''}
        placeholderTextColor="#4A5568"
        keyboardType={keyboardType ?? 'default'}
        autoCapitalize="none"
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ProfilScreen() {
  const [profile, setProfile]         = useState(null);
  const [email, setEmail]             = useState('');
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [isEditing, setIsEditing]     = useState(false);
  const [saving, setSaving]           = useState(false);
  const [draft, setDraft]             = useState({});

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user }, error: authErr } = await supabase.auth.getUser();
      if (authErr || !user) { setLoading(false); return; }

      setEmail(user.email ?? '');

      const { data: prof, error: profErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!profErr && prof) setProfile(prof);

      const { data: mem } = await supabase
        .from('team_memberships')
        .select('status, teams(id, name, avatar_teamlogo)')
        .eq('player_id', user.id);

      if (mem) setMemberships(mem);
    } catch (e) {
      console.warn('ProfilScreen fetch error:', e?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  // ── Edit helpers ────────────────────────────────────────────────────────────

  const startEditing = () => {
    setDraft({
      first_name:    profile.first_name   ?? '',
      last_name:     profile.last_name    ?? '',
      bio:           profile.bio          ?? '',
      avatar:        profile.avatar       ?? '',
      position:      profile.position     ?? '',
      jersey_number: profile.jersey_number ?? '',
      age:           profile.age != null  ? String(profile.age)    : '',
      gender:        profile.gender       ?? '',
      weight:        profile.weight != null ? String(profile.weight) : '',
      height:        profile.height != null ? String(profile.height) : '',
      nationality:   profile.nationality  ?? '',
    });
    setIsEditing(true);
  };

  const cancelEditing = () => setIsEditing(false);

  const updateDraft = (field, value) =>
    setDraft((prev) => ({ ...prev, [field]: value }));

  const pickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Berechtigung fehlt', 'Bitte erlaube den Zugriff auf deine Fotos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets.length > 0) {
      updateDraft('avatar', result.assets[0].uri);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Nicht eingeloggt.');

      const { error } = await supabase.from('profiles').update({
        first_name:    draft.first_name.trim()    || null,
        last_name:     draft.last_name.trim()     || null,
        bio:           draft.bio.trim()           || null,
        avatar:        draft.avatar               || null,
        position:      draft.position.trim()      || null,
        jersey_number: draft.jersey_number.trim() || null,
        age:           draft.age    ? parseInt(draft.age, 10)       : null,
        gender:        draft.gender.trim()        || null,
        weight:        draft.weight ? parseFloat(draft.weight)      : null,
        height:        draft.height ? parseFloat(draft.height)      : null,
        nationality:   draft.nationality.trim()   || null,
      }).eq('id', user.id);

      if (error) throw error;

      await fetchProfile();
      setIsEditing(false);
    } catch (err) {
      Alert.alert(
        'Speichern fehlgeschlagen',
        err?.message?.includes('Network request failed')
          ? 'Keine Verbindung. Bitte prüfe deine Internetverbindung.'
          : err?.message ?? 'Unbekannter Fehler.',
      );
    } finally {
      setSaving(false);
    }
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#9ef01a" />
        </View>
      </SafeAreaView>
    );
  }

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!profile) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centered}>
          <View style={styles.avatarPlaceholder}><User size={40} color="#9ef01a" /></View>
          <Text style={styles.emptyTitle}>Kein Profil gefunden</Text>
          <Text style={styles.emptySubtitle}>Registriere dich, um dein Profil zu sehen.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(' ') || 'Unbekannt';
  const memberSince = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
    : '–';

  // ── View mode ──────────────────────────────────────────────────────────────
  if (!isEditing) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor="#0A0E1A" />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          {/* HEADER */}
          <View style={styles.headerSection}>
            <TouchableOpacity style={styles.editBtn} onPress={startEditing} activeOpacity={0.8}>
              <Pencil size={16} color="#9ef01a" />
              <Text style={styles.editBtnText}>Bearbeiten</Text>
            </TouchableOpacity>

            {profile.avatar
              ? <Image source={{ uri: profile.avatar }} style={styles.avatarImg} />
              : <Initials firstName={profile.first_name} lastName={profile.last_name} />
            }

            <View style={styles.rolePill}>
              <Text style={styles.rolePillText}>
                {profile.role === 'player' ? '🏈 Spieler' : profile.role === 'fan' ? '⭐ Fan' : '🎯 Trainer'}
              </Text>
            </View>

            <Text style={styles.fullName}>{fullName}</Text>
            {profile.bio ? <Text style={styles.bio}>{profile.bio}</Text> : null}
          </View>

          {/* TEAM */}
          <Text style={styles.sectionTitle}>TEAM</Text>
          <View style={styles.card}>
            {memberships.length === 0 ? (
              <Text style={styles.emptyCardText}>Kein Team beigetreten</Text>
            ) : (
              memberships.map((m, i) => (
                <View key={i} style={[styles.teamRow, i > 0 && styles.teamRowBorder]}>
                  {m.teams?.avatar_teamlogo
                    ? <Image source={{ uri: m.teams.avatar_teamlogo }} style={styles.teamLogo} />
                    : <View style={styles.teamLogoPlaceholder}><Users size={18} color="#9ef01a" /></View>
                  }
                  <Text style={styles.teamName} numberOfLines={1}>{m.teams?.name ?? '–'}</Text>
                  <MembershipBadge status={m.status} />
                </View>
              ))
            )}
          </View>

          {/* SPIELER STATS */}
          {profile.role === 'player' && (
            <>
              <Text style={styles.sectionTitle}>SPIELERINFORMATIONEN</Text>
              <View style={styles.statsGrid}>
                <StatCard icon={<Shield size={18} color="#9ef01a" />}   label="Position"      value={profile.position} />
                <StatCard icon={<Hash size={18} color="#9ef01a" />}     label="Trikotnummer"  value={profile.jersey_number ? `#${profile.jersey_number}` : null} />
                <StatCard icon={<Calendar size={18} color="#9ef01a" />} label="Alter"         value={profile.age ? `${profile.age} Jahre` : null} />
                <StatCard icon={<User size={18} color="#9ef01a" />}     label="Geschlecht"    value={profile.gender} />
                <StatCard icon={<Ruler size={18} color="#9ef01a" />}    label="Größe"         value={profile.height ? `${profile.height} cm` : null} />
                <StatCard icon={<Weight size={18} color="#9ef01a" />}   label="Gewicht"       value={profile.weight ? `${profile.weight} kg` : null} />
                <StatCard icon={<Flag size={18} color="#9ef01a" />}     label="Nationalität"  value={profile.nationality} />
              </View>
            </>
          )}

          {/* KONTO */}
          <Text style={styles.sectionTitle}>KONTO</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>E-Mail</Text>
              <Text style={styles.infoValue} numberOfLines={1}>{email || '–'}</Text>
            </View>
            <View style={[styles.infoRow, styles.infoRowBorder]}>
              <Text style={styles.infoLabel}>Mitglied seit</Text>
              <Text style={styles.infoValue}>{memberSince}</Text>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Edit mode ──────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E1A" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* EDIT HEADER */}
        <View style={styles.editHeader}>
          <Text style={styles.editTitle}>Profil bearbeiten</Text>
          <TouchableOpacity onPress={cancelEditing} style={styles.cancelIcon} activeOpacity={0.7}>
            <X size={22} color="#7C8BA1" />
          </TouchableOpacity>
        </View>

        {/* AVATAR */}
        <View style={styles.avatarEditWrap}>
          <TouchableOpacity onPress={pickAvatar} activeOpacity={0.8} style={styles.avatarEditTouch}>
            {draft.avatar
              ? <Image source={{ uri: draft.avatar }} style={styles.avatarImg} />
              : <Initials firstName={draft.first_name} lastName={draft.last_name} />
            }
            <View style={styles.avatarEditOverlay}>
              <Camera size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.avatarEditHint}>Foto ändern</Text>
        </View>

        {/* PERSÖNLICHE DATEN */}
        <Text style={styles.sectionTitle}>PERSÖNLICHE DATEN</Text>
        <View style={styles.editCard}>
          <EditField label="Vorname"  value={draft.first_name}  onChangeText={(v) => updateDraft('first_name', v)}  placeholder="Max" />
          <EditField label="Nachname" value={draft.last_name}   onChangeText={(v) => updateDraft('last_name', v)}   placeholder="Mustermann" />
          <EditField label="Bio"      value={draft.bio}         onChangeText={(v) => updateDraft('bio', v)}         placeholder="Erzähl etwas über dich…" multiline />
        </View>

        {/* SPIELERINFORMATIONEN */}
        {profile.role === 'player' && (
          <>
            <Text style={styles.sectionTitle}>SPIELERINFORMATIONEN</Text>
            <View style={styles.editCard}>

              {/* Position chips */}
              <Text style={styles.editLabel}>POSITION</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                {POSITIONS.map((pos) => (
                  <TouchableOpacity
                    key={pos}
                    style={[styles.chip, draft.position === pos && styles.chipActive]}
                    onPress={() => updateDraft('position', draft.position === pos ? '' : pos)}
                    activeOpacity={0.75}
                  >
                    <Text style={[styles.chipText, draft.position === pos && styles.chipTextActive]}>{pos}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <EditField label="Trikotnummer" value={draft.jersey_number} onChangeText={(v) => updateDraft('jersey_number', v)} placeholder="z.B. 12" keyboardType="numeric" />

              {/* Gender chips */}
              <Text style={styles.editLabel}>GESCHLECHT</Text>
              <View style={styles.genderRow}>
                {GENDERS.map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[styles.genderChip, draft.gender === g && styles.chipActive]}
                    onPress={() => updateDraft('gender', draft.gender === g ? '' : g)}
                    activeOpacity={0.75}
                  >
                    <Text style={[styles.chipText, draft.gender === g && styles.chipTextActive]}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.twoCol}>
                <View style={{ flex: 1 }}>
                  <EditField label="Alter"     value={draft.age}    onChangeText={(v) => updateDraft('age', v)}    placeholder="z.B. 22"  keyboardType="numeric" />
                </View>
                <View style={{ flex: 1 }}>
                  <EditField label="Nationalität" value={draft.nationality} onChangeText={(v) => updateDraft('nationality', v)} placeholder="z.B. Deutsch" />
                </View>
              </View>

              <View style={styles.twoCol}>
                <View style={{ flex: 1 }}>
                  <EditField label="Gewicht (kg)" value={draft.weight} onChangeText={(v) => updateDraft('weight', v)} placeholder="z.B. 85"  keyboardType="decimal-pad" />
                </View>
                <View style={{ flex: 1 }}>
                  <EditField label="Größe (cm)"   value={draft.height} onChangeText={(v) => updateDraft('height', v)} placeholder="z.B. 182" keyboardType="decimal-pad" />
                </View>
              </View>

            </View>
          </>
        )}

        {/* SAVE / CANCEL */}
        <View style={styles.saveRow}>
          <TouchableOpacity style={styles.btnCancel} onPress={cancelEditing} activeOpacity={0.85} disabled={saving}>
            <Text style={styles.btnCancelText}>Abbrechen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnSave, saving && styles.btnDisabled]}
            onPress={saveProfile}
            activeOpacity={0.85}
            disabled={saving}
          >
            {saving
              ? <ActivityIndicator color="#0A0E1A" />
              : <><Check size={16} color="#0A0E1A" /><Text style={styles.btnSaveText}>Speichern</Text></>
            }
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe:     { flex: 1, backgroundColor: '#0A0E1A' },
  scroll:   { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },

  // ── View mode header
  headerSection: { alignItems: 'center', marginBottom: 32 },
  editBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    alignSelf: 'flex-end', marginBottom: 16,
    backgroundColor: '#0F1A2E', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: '#9ef01a',
  },
  editBtnText: { color: '#9ef01a', fontSize: 12, fontWeight: '800' },

  avatarImg: {
    width: 100, height: 100, borderRadius: 50,
    borderWidth: 3, borderColor: '#9ef01a', marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#161F38', borderWidth: 2, borderColor: '#1E2B47',
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  avatarInitials: { color: '#9ef01a', fontSize: 32, fontWeight: '900' },
  rolePill: {
    backgroundColor: '#0F1A2E', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 4,
    borderWidth: 1, borderColor: '#9ef01a', marginBottom: 10,
  },
  rolePillText: { color: '#9ef01a', fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  fullName: { color: '#fff', fontSize: 24, fontWeight: '900', marginBottom: 8, textAlign: 'center' },
  bio:      { color: '#7C8BA1', fontSize: 13, lineHeight: 20, textAlign: 'center', maxWidth: 300 },

  // ── Section title
  sectionTitle: {
    color: '#7C8BA1', fontSize: 10, fontWeight: '800',
    letterSpacing: 1.2, marginBottom: 10, marginTop: 4,
  },

  // ── Cards
  card: {
    backgroundColor: '#161F38', borderRadius: 16,
    borderWidth: 1, borderColor: '#1E2B47',
    marginBottom: 24, overflow: 'hidden',
  },
  emptyCardText: { color: '#4A5568', fontSize: 13, padding: 16, textAlign: 'center' },

  // ── Team row
  teamRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, gap: 12,
  },
  teamRowBorder: { borderTopWidth: 1, borderTopColor: '#1E2B47' },
  teamLogo:      { width: 36, height: 36, borderRadius: 8 },
  teamLogoPlaceholder: {
    width: 36, height: 36, borderRadius: 8,
    backgroundColor: '#0F1A2E', justifyContent: 'center', alignItems: 'center',
  },
  teamName: { flex: 1, color: '#fff', fontSize: 14, fontWeight: '700' },

  // ── Badge
  badge: { borderRadius: 8, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.4 },

  // ── Stats grid
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  statCard: {
    width: '47%', backgroundColor: '#161F38',
    borderRadius: 14, borderWidth: 1, borderColor: '#1E2B47',
    padding: 14, gap: 6,
  },
  statIcon:  { marginBottom: 2 },
  statLabel: { color: '#7C8BA1', fontSize: 10, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase' },
  statValue: { color: '#fff', fontSize: 15, fontWeight: '800' },

  // ── Account info
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14,
  },
  infoRowBorder: { borderTopWidth: 1, borderTopColor: '#1E2B47' },
  infoLabel: { color: '#7C8BA1', fontSize: 13, fontWeight: '600' },
  infoValue: { color: '#fff', fontSize: 13, fontWeight: '700', maxWidth: '60%', textAlign: 'right' },

  // ── Empty state
  emptyTitle:    { color: '#fff', fontSize: 18, fontWeight: '800', marginTop: 8 },
  emptySubtitle: { color: '#7C8BA1', fontSize: 13, textAlign: 'center', maxWidth: 260 },

  // ── Edit mode header
  editHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 24,
  },
  editTitle:  { color: '#fff', fontSize: 22, fontWeight: '900' },
  cancelIcon: { padding: 4 },

  // ── Avatar edit
  avatarEditWrap:  { alignItems: 'center', marginBottom: 28 },
  avatarEditTouch: { position: 'relative' },
  avatarEditOverlay: {
    position: 'absolute', bottom: 0, right: 0,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#9ef01a',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#0A0E1A',
  },
  avatarEditHint: { color: '#7C8BA1', fontSize: 11, fontWeight: '600', marginTop: 8 },

  // ── Edit card
  editCard: {
    backgroundColor: '#161F38', borderRadius: 16,
    borderWidth: 1, borderColor: '#1E2B47',
    padding: 16, marginBottom: 24, gap: 4,
  },

  // ── Edit fields
  editField: { marginBottom: 14 },
  editLabel: {
    color: '#7C8BA1', fontSize: 10, fontWeight: '700',
    letterSpacing: 0.8, marginBottom: 6, textTransform: 'uppercase',
  },
  editInput: {
    backgroundColor: '#0F1A2E', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 12,
    color: '#fff', fontSize: 14,
    borderWidth: 1, borderColor: '#2E3F73',
  },
  editInputMulti: { height: 80, textAlignVertical: 'top' },

  // ── Chips
  chipScroll:  { marginBottom: 16 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 8,
    backgroundColor: '#0F1A2E', borderRadius: 20, marginRight: 8,
    borderWidth: 1, borderColor: '#2E3F73',
  },
  chipActive:     { backgroundColor: '#9ef01a', borderColor: '#9ef01a' },
  chipText:       { color: '#7C8BA1', fontSize: 13, fontWeight: '700' },
  chipTextActive: { color: '#0A0E1A' },
  genderRow:      { flexDirection: 'row', gap: 8, marginBottom: 14 },
  genderChip: {
    flex: 1, paddingVertical: 10, alignItems: 'center',
    backgroundColor: '#0F1A2E', borderRadius: 10,
    borderWidth: 1, borderColor: '#2E3F73',
  },
  twoCol: { flexDirection: 'row', gap: 12 },

  // ── Save / cancel
  saveRow:      { flexDirection: 'row', gap: 12, marginTop: 8 },
  btnCancel: {
    flex: 1, backgroundColor: '#161F38', borderRadius: 14,
    paddingVertical: 16, alignItems: 'center',
    borderWidth: 1, borderColor: '#1E2B47',
  },
  btnCancelText: { color: '#7C8BA1', fontSize: 15, fontWeight: '700' },
  btnSave: {
    flex: 2, backgroundColor: '#9ef01a', borderRadius: 14,
    paddingVertical: 16, alignItems: 'center',
    flexDirection: 'row', justifyContent: 'center', gap: 8,
  },
  btnDisabled:  { opacity: 0.6 },
  btnSaveText:  { color: '#0A0E1A', fontSize: 15, fontWeight: '900' },
});
