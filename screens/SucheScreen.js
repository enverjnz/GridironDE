import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Search, X, Clock, TrendingUp, Grid } from 'lucide-react-native';

export default function SucheScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Beispielhafte Daten für die letzten Suchergebnisse
  const [recentSearches, setRecentSearches] = useState([
    'Schwäbisch Hall Unicorns',
    'GFL 1 Spielplan',
    'Berlin Kobra Ladies',
    'Flag Football Regionalliga'
  ]);

  // Beispielhafte Daten für "Gerade angesagt" (Trends)
  const trendingTopics = [
    { tag: 'Saisonauftakt 2026', count: '4.2k Klicks' },
    { tag: 'ELF Gewinner', count: '2.8k Klicks' },
    { tag: 'Stuttgart Scorpions Roster', count: '1.9k Klicks' },
  ];

  // Beispielhafte Kategorien
  const categories = ['Teams', 'Spieler', 'Ligen', 'News', 'Fotos & Videos'];

  // Funktion zum Löschen eines einzelnen Eintrags aus dem Verlauf
  const removeRecentSearch = (textToRemove) => {
    setRecentSearches(recentSearches.filter(item => item !== textToRemove));
  };

  return (
    <View style={styles.container}>
      {/* 1. DIE SUCHLEISTE OBEN */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarWrapper}>
          <Search size={18} color="#7C8BA1" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Teams, Ligen, News oder Profile suchen..."
            placeholderTextColor="#7C8BA1"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={18} color="#7C8BA1" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* 2. KATEGORIEN (Ganz oben) */}
        <Text style={styles.sectionTitle}>🗂️ KATEGORIEN</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* TRENNELEMENT */}
        <View style={styles.divider} />

        {/* 3. NEU: LETZTE SUCHERGEBNISSE (Verlauf) */}
        {recentSearches.length > 0 && (
          <View style={styles.recentSection}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitleWithoutMargin}>⏱️ LETZTE SUCHERGEBNISSE</Text>
              <TouchableOpacity onPress={() => setRecentSearches([])}>
                <Text style={styles.clearAllText}>Alle löschen</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.recentList}>
              {recentSearches.map((item, index) => (
                <View key={index} style={styles.recentItemRow}>
                  <TouchableOpacity 
                    style={styles.recentItemClickable}
                    onPress={() => setSearchQuery(item)}
                  >
                    <Clock size={14} color="#7C8BA1" style={{ marginRight: 10 }} />
                    <Text style={styles.recentText} numberOfLines={1}>{item}</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.deleteItemButton}
                    onPress={() => removeRecentSearch(item)}
                  >
                    <X size={14} color="#7C8BA1" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            
            {/* TRENNELEMENT NACH DEM VERLAUF */}
            <View style={styles.divider} />
          </View>
        )}

        {/* 4. GERADE ANGESAGT (Trends ganz unten) */}
        <Text style={styles.sectionTitle}>🔥 GERADE ANGESAGT</Text>
        <View style={styles.trendingContainer}>
          {trendingTopics.map((topic, index) => (
            <TouchableOpacity key={index} style={styles.trendingRow} activeOpacity={0.7}>
              <View style={styles.trendingIconCircle}>
                <TrendingUp size={16} color="#9ef01a" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.trendingTagText}>{topic.tag}</Text>
                <Text style={styles.trendingCountText}>{topic.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Puffer wegen der schwebenden NavBar */}
        <View style={{ height: 150 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#161F38',
  },
  searchBarWrapper: {
    flexDirection: 'row',
    backgroundColor: '#161F38',
    borderColor: '#253359',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 16,
  },
  sectionTitle: {
    color: '#7C8BA1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginLeft: 16,
    marginBottom: 12,
  },
  sectionTitleWithoutMargin: {
    color: '#7C8BA1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  clearAllText: {
    color: '#9ef01a',
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#161F38',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  // Kategorien Styles
  categoriesScroll: {
    paddingLeft: 16,
    flexDirection: 'row',
  },
  categoryBadge: {
    backgroundColor: '#1E294B',
    borderColor: '#2E3F73',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  // Verlauf / Letzte Suchen Styles
  recentSection: {
    width: '100%',
  },
  recentList: {
    paddingHorizontal: 16,
  },
  recentItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#161F38',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 6,
  },
  recentItemClickable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  deleteItemButton: {
    paddingLeft: 10,
    paddingVertical: 4,
  },
  // Trends Styles
  trendingContainer: {
    paddingHorizontal: 16,
  },
  trendingRow: {
    flexDirection: 'row',
    backgroundColor: '#1E294B',
    borderColor: '#2E3F73',
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  trendingIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  trendingTagText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  trendingCountText: {
    color: '#7C8BA1',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
});