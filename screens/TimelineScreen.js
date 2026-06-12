import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Trophy, Clock } from 'lucide-react-native';

export default function TimelineScreen({ onBack }) {
  // Beispielhafte Ticker-Daten für den Spielverlauf (Schw. Hall Unicorns vs Allgäu Comets)
  const timelineData = [
    { type: 'quarter', title: '1. QUARTER', score: '00 : 00', time: '12:00' },
    { type: 'score', team: 'Unicorns', event: 'TOUCHDOWN', player: '#5 K. Hauser (12yd Pass)', points: '+6', currentScore: '06 : 00', time: '08:15' },
    { type: 'score', team: 'Unicorns', event: 'PAT GOOD', player: '#12 T. Stadelmayr', points: '+1', currentScore: '07 : 00', time: '08:15' },
    { type: 'quarter', title: '2. QUARTER', score: '07 : 00', time: '00:00' },
    { type: 'score', team: 'Comets', event: 'TOUCHDOWN', player: '#84 J. Joyner (45yd Run)', points: '+6', currentScore: '07 : 06', time: '10:30' },
    { type: 'score', team: 'Comets', event: 'PAT GOOD', player: '#11 M. Schorpp', points: '+1', currentScore: '07 : 07', time: '10:30' },
    { type: 'score', team: 'Unicorns', event: 'FIELD GOAL', player: '#12 T. Stadelmayr (34yd)', points: '+3', currentScore: '10 : 07', time: '02:10' },
    { type: 'quarter', title: 'HALBZEIT', score: '10 : 07', time: '00:00' },
    { type: 'quarter', title: '3. QUARTER', score: '10 : 07', time: '12:00' },
    { type: 'score', team: 'Unicorns', event: 'TOUCHDOWN', player: '#1 M. Rutenfrans (3yd Run)', points: '+6', currentScore: '16 : 07', time: '05:40' },
    { type: 'quarter', title: '4. QUARTER', score: '16 : 07', time: '00:00' },
    { type: 'score', team: 'Comets', event: 'TOUCHDOWN', player: '#84 J. Joyner (14yd Pass)', points: '+6', currentScore: '16 : 13', time: '09:15' },
    { type: 'score', team: 'Comets', event: 'PAT GOOD', player: '#11 M. Schorpp', points: '+1', currentScore: '16 : 14', time: '09:15' },
    { type: 'score', team: 'Unicorns', event: 'TOUCHDOWN', player: '#5 K. Hauser (62yd Pass)', points: '+6', currentScore: '22 : 14', time: '04:20' },
    { type: 'score', team: 'Unicorns', event: '2-PT CONVERSION', player: '#1 M. Rutenfrans Run', points: '+2', currentScore: '24 : 14', time: '04:20' },
    { type: 'quarter', title: 'SPIELENDE (FT)', score: '24 : 14', time: '00:00' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* MINIMALER HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ChevronLeft size={24} color="#9ef01a" />
          <Text style={styles.backText}>Home</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Spielverlauf</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* MATCH-INFO-BAR */}
      <View style={styles.matchBar}>
        <Text style={styles.teamsText}>UNICORNS <Text style={{ color: '#9ef01a' }}>24 : 14</Text> COMETS</Text>
        <Text style={styles.dateText}>GFL 1 • OPTIMA Sportpark</Text>
      </View>

      {/* TIMELINE TIMESTRAHL */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.timelineWrapper}>
          
          {/* DIE VERTIKALE LINIE IM HINTERGRUND */}
          <View style={styles.verticalLine} />

          {timelineData.map((item, index) => {
            if (item.type === 'quarter') {
              // Layout für Quarter-Wechsel / Halbzeit
              return (
                <View key={index} style={styles.quarterRow}>
                  <View style={styles.quarterBadge}>
                    <Text style={styles.quarterBadgeText}>{item.title}</Text>
                  </View>
                  <View style={styles.quarterInfo}>
                    <Text style={styles.quarterScore}>{item.score}</Text>
                  </View>
                </View>
              );
            } else {
              // Layout für Punkte-Ereignisse (Touchdowns, Field Goals etc.)
              const isUnicorns = item.team === 'Unicorns';
              return (
                <View key={index} style={styles.eventRow}>
                  {/* Zeitstempel ganz links */}
                  <View style={styles.timeWrapper}>
                    <Clock size={10} color="#7C8BA1" style={{ marginRight: 2 }} />
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>

                  {/* Der runde Punkt auf der Linie */}
                  <View style={[styles.dot, isUnicorns ? styles.dotHome : styles.dotAway]}>
                    <View style={styles.innerDot} />
                  </View>

                  {/* Die Inhaltsbox des Ereignisses */}
                  <View style={styles.eventCard}>
                    <View style={styles.eventCardHeader}>
                      <Text style={[styles.eventName, isUnicorns ? styles.textHome : styles.textAway]}>
                        {item.event} ({item.team})
                      </Text>
                      <Text style={styles.pointsText}>{item.points}</Text>
                    </View>
                    <Text style={styles.playerText}>{item.player}</Text>
                    <Text style={styles.currentScoreText}>Spielstand: {item.currentScore}</Text>
                  </View>
                </View>
              );
            }
          })}
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#161F38',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
  },
  backText: {
    color: '#9ef01a',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 2,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  matchBar: {
    backgroundColor: '#1E294B',
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2E3F73',
  },
  teamsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  dateText: {
    color: '#7C8BA1',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  timelineWrapper: {
    position: 'relative',
    width: '100%',
  },
  verticalLine: {
    position: 'absolute',
    left: 60, // Exakt unter den runden Punkten ausgerichtet
    top: 10,
    bottom: 10,
    width: 2,
    backgroundColor: '#2E3F73', // Basislinie in gedecktem Blau
  },
  quarterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  quarterBadge: {
    backgroundColor: '#9ef01a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    width: 85,
    alignItems: 'center',
    zIndex: 2,
  },
  quarterBadgeText: {
    color: '#000',
    fontSize: 9,
    fontWeight: '900',
  },
  quarterInfo: {
    marginLeft: 16,
  },
  quarterScore: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 4,
  },
  timeWrapper: {
    width: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 11,
  },
  timeText: {
    color: '#7C8BA1',
    fontSize: 11,
    fontWeight: '700',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  dotHome: {
    backgroundColor: '#9ef01a', // Heimteam leuchtet neongrün
  },
  dotAway: {
    backgroundColor: '#7C8BA1', // Auswärtsteam gedecktes Grau
  },
  innerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0A0E1A',
  },
  eventCard: {
    flex: 1,
    backgroundColor: '#161F38',
    borderColor: '#253359',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginLeft: 16,
  },
  eventCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventName: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  textHome: {
    color: '#9ef01a',
  },
  textAway: {
    color: '#FFF',
  },
  pointsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    backgroundColor: '#1E294B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  playerText: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  currentScoreText: {
    color: '#7C8BA1',
    fontSize: 11,
    fontWeight: '#500',
    marginTop: 6,
  },
});