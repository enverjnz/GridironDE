import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Search, Check, X } from 'lucide-react-native';
import { supabase } from '../../../lib/supabase';
import { OnboardingData } from '../PlayerOnboardingFlow';

type Team = { id: string; name: string; town: string };

type Props = {
  data: OnboardingData;
  update: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function Step3_TeamSearch({ data, update, onNext, onBack }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const search = useCallback(async (text: string) => {
    setQuery(text);
    if (text.trim().length < 2) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    setSearchError(null);
    try {
      const { data: teams, error } = await supabase
        .from('teams')
        .select('id, name, town')
        .ilike('name', `%${text.trim()}%`)
        .limit(10);
      if (error) throw error;
      setResults(teams ?? []);
    } catch {
      setSearchError('Suche fehlgeschlagen. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectTeam = (team: Team) => {
    update({ selectedTeamId: team.id, selectedTeamName: team.name });
    setQuery(team.name);
    setResults([]);
  };

  const clearSelection = () => {
    update({ selectedTeamId: null, selectedTeamName: null });
    setQuery('');
    setResults([]);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Was ist dein Team?</Text>
      <Text style={styles.subtitle}>
        Suche nach deinem Team. Deine Anfrage wird zunächst als{' '}
        <Text style={styles.highlight}>ausstehend</Text> eingereicht.
      </Text>

      <View style={styles.searchWrap}>
        <Search size={18} color="#7C8BA1" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={search}
          placeholder="Teamname suchen…"
          placeholderTextColor="#4A5568"
          editable={!data.selectedTeamId}
        />
        {!!data.selectedTeamId && (
          <TouchableOpacity onPress={clearSelection} hitSlop={8}>
            <X size={18} color="#7C8BA1" />
          </TouchableOpacity>
        )}
      </View>

      {isLoading && (
        <ActivityIndicator color="#9ef01a" style={styles.spinner} />
      )}

      {!!searchError && <Text style={styles.error}>{searchError}</Text>}

      {results.length > 0 && (
        <View style={styles.dropdown}>
          {results.map((team, index) => (
            <TouchableOpacity
              key={team.id}
              style={[
                styles.dropdownItem,
                index === results.length - 1 && styles.dropdownItemLast,
              ]}
              onPress={() => selectTeam(team)}
              activeOpacity={0.75}
            >
              <Text style={styles.teamName}>{team.name}</Text>
              <Text style={styles.teamTown}>{team.town}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {!!data.selectedTeamId && (
        <View style={styles.selectedBadge}>
          <Check size={16} color="#9ef01a" />
          <Text style={styles.selectedText}>
            {data.selectedTeamName} – Anfrage wird gestellt
          </Text>
        </View>
      )}

      <Text style={styles.skipHint}>
        Du kannst diesen Schritt auch überspringen und später ein Team anfragen.
      </Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.btnSecondary} onPress={onBack} activeOpacity={0.85}>
          <Text style={styles.btnSecondaryText}>← Zurück</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onNext} activeOpacity={0.85}>
          <Text style={styles.btnText}>Weiter →</Text>
        </TouchableOpacity>
      </View>
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
  title: { color: '#fff', fontSize: 26, fontWeight: '800', marginBottom: 6 },
  subtitle: { color: '#7C8BA1', fontSize: 14, marginBottom: 24 },
  highlight: { color: '#9ef01a', fontWeight: '700' },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161F38',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1E2B47',
    marginBottom: 4,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    paddingVertical: 13,
  },
  spinner: { marginTop: 12 },
  error: { color: '#FF4757', fontSize: 12, marginTop: 8 },
  dropdown: {
    backgroundColor: '#161F38',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E2B47',
    overflow: 'hidden',
    marginTop: 4,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E2B47',
  },
  dropdownItemLast: { borderBottomWidth: 0 },
  teamName: { color: '#fff', fontSize: 14, fontWeight: '700' },
  teamTown: { color: '#7C8BA1', fontSize: 12, marginTop: 2 },
  selectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0F1A2E',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#9ef01a',
    marginTop: 12,
  },
  selectedText: {
    color: '#9ef01a',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  skipHint: { color: '#4A5568', fontSize: 12, marginTop: 16, marginBottom: 24 },
  row: { flexDirection: 'row', gap: 12 },
  btn: {
    flex: 1,
    backgroundColor: '#9ef01a',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnText: { color: '#0A0E1A', fontSize: 15, fontWeight: '800' },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#161F38',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E2B47',
  },
  btnSecondaryText: { color: '#7C8BA1', fontSize: 15, fontWeight: '700' },
});
