import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Trophy, Plus, ArrowLeftRight, RotateCcw } from 'lucide-react-native';

export default function TickerScreen() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Beispiel-Kader für das Dropdown
  const teamRoster = [
    { id: '1', number: '12', name: 'Tobias Müller', pos: 'QB' },
    { id: '2', number: '28', name: 'Sebastian Kraft', pos: 'RB' },
    { id: '3', number: '84', name: 'Julian Schmid', pos: 'WR' },
    { id: '4', number: '11', name: 'Leon Ginter', pos: 'WR' },
    { id: '5', number: '99', name: 'Max Becker', pos: 'K' },
  ];

  // States für die Spielstände
  const [scoreHome, setScoreHome] = useState(0);
  const [scoreAway, setScoreAway] = useState(0);
  
  // Welches Team ist gerade für die Punkteauswahl ausgewählt? ('home' oder 'away')
  const [selectedTeam, setSelectedTeam] = useState('home');

  // Hilfsfunktion, um dem aktuell ausgewählten Team Punkte hinzuzufügen
  const addPoints = (points) => {
    if (selectedTeam === 'home') {
      setScoreHome(scoreHome + points);
    } else {
      setScoreAway(scoreAway + points);
    }
  };

  // Spielstand zurücksetzen (Reset-Funktion)
  const resetScore = () => {
    setScoreHome(0);
    setScoreAway(0);
    setSelectedTeam('home');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 1. LIVE SCOREBOARD ANZEIGE */}
      <View style={styles.scoreboard}>
        <TouchableOpacity 
          style={[styles.teamScoreBox, selectedTeam === 'home' && styles.activeTeamBox]}
          onPress={() => setSelectedTeam('home')}
        >
          <Text style={styles.teamLabel}>HEIM</Text>
          <Text style={styles.scoreNumber}>{scoreHome}</Text>
        </TouchableOpacity>

        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
          <TouchableOpacity style={styles.resetButton} onPress={resetScore}>
            <RotateCcw size={16} color="#7C8BA1" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.teamScoreBox, selectedTeam === 'away' && styles.activeTeamBox]}
          onPress={() => setSelectedTeam('away')}
        >
          <Text style={styles.teamLabel}>GAST</Text>
          <Text style={styles.scoreNumber}>{scoreAway}</Text>
        </TouchableOpacity>
      </View>

      {/* INFO-TEXT WELCHES TEAM AKTIV IST */}
      <Text style={styles.infoText}>
        Punkte hinzufügen für: <Text style={styles.infoTeamText}>{selectedTeam === 'home' ? 'HEIMTEAM' : 'GASTTEAM'}</Text>
      </Text>

      {/* 2. DIE EINGABEMASKE (SCORING BUTTONS) */}
      <View style={styles.buttonGrid}>
        
        {/* TOUCHDOWN (+6) */}
        <TouchableOpacity style={[styles.scoreButton, styles.tdButton]} onPress={() => addPoints(6)}>
          <View style={styles.buttonHeader}>
            <Text style={styles.buttonPoints}>+6</Text>
            <Trophy size={18} color="#000" />
          </View>
          <Text style={styles.buttonLabel}>TOUCHDOWN</Text>
        </TouchableOpacity>

        {/* FIELD GOAL (+3) */}
        <TouchableOpacity style={styles.scoreButton} onPress={() => addPoints(3)}>
          <View style={styles.buttonHeader}>
            <Text style={styles.buttonPointsGreen}>+3</Text>
            <Plus size={18} color="#9ef01a" />
          </View>
          <Text style={styles.buttonLabelSub}>FIELD GOAL</Text>
        </TouchableOpacity>

        {/* SAFETY (+2) */}
        <TouchableOpacity style={styles.scoreButton} onPress={() => addPoints(2)}>
          <View style={styles.buttonHeader}>
            <Text style={styles.buttonPointsGreen}>+2</Text>
            <Plus size={18} color="#9ef01a" />
          </View>
          <Text style={styles.buttonLabelSub}>SAFETY</Text>
        </TouchableOpacity>

        {/* TWO-POINT CONVERSION (+2) */}
        <TouchableOpacity style={styles.scoreButton} onPress={() => addPoints(2)}>
          <View style={styles.buttonHeader}>
            <Text style={styles.buttonPointsGreen}>+2</Text>
            <Plus size={18} color="#9ef01a" />
          </View>
          <Text style={styles.buttonLabelSub}>2-PT CONVERSION</Text>
        </TouchableOpacity>

        {/* PAT (+1) */}
        <TouchableOpacity style={styles.scoreButton} onPress={() => addPoints(1)}>
          <View style={styles.buttonHeader}>
            <Text style={styles.buttonPointsGreen}>+1</Text>
            <Plus size={18} color="#9ef01a" />
          </View>
          <Text style={styles.buttonLabelSub}>POINT AFTER (PAT)</Text>
        </TouchableOpacity>

        {/* SPIELER DROP-DOWN MENÜ */}
        <Text style={[styles.inputLabel, { marginTop: 16 }]}>Involvierter Spieler (Optional)</Text>
        
        <TouchableOpacity 
          style={styles.dropdownButton} 
          activeOpacity={0.8}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <View style={styles.dropdownButtonContent}>
            <Text style={selectedPlayer ? styles.dropdownSelectedText : styles.dropdownPlaceholderText}>
              {selectedPlayer ? `#${selectedPlayer.number} ${selectedPlayer.name} (${selectedPlayer.pos})` : 'Spieler auswählen...'}
            </Text>
          </View>
          <Text style={{ color: isDropdownOpen ? '#9ef01a' : '#7C8BA1', fontWeight: 'bold' }}>
            {isDropdownOpen ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>

        {/* AUSKLAPPBARE LISTE */}
        {isDropdownOpen && (
          <View style={styles.dropdownList}>
            {teamRoster.map((player) => (
              <TouchableOpacity 
                key={player.id} 
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedPlayer(player);
                  setIsDropdownOpen(false);
                }}
              >
                <Text style={styles.playerNumber}>#{player.number}</Text>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerPos}>{player.pos}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

      </View>

      {/* BUTTON: TICKER UPDATE SENDEN */}
        <TouchableOpacity 
          style={styles.sendUpdateButton} 
          onPress={() => alert(`📢 Ticker-Update gesendet! Spielstand: ${scoreHome}:${scoreAway}`)}
        >
          <Text style={styles.sendUpdateDataText}>Spielstand: {scoreHome}:{scoreAway}</Text>
          <Text style={styles.sendUpdateButtonText}>TICKER UPDATE SENDEN </Text>
        </TouchableOpacity>

      {/* PLATZHALTER UNTEN WEGEN NAVBAR */}
      <View style={{ height: 140 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A',
    padding: 16,
  },
  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#161F38',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#253359',
    marginBottom: 16,
    marginTop: 8,
  },
  teamScoreBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#0E1424',
    borderWidth: 1,
    borderColor: '#1D2947',
  },
  activeTeamBox: {
    borderColor: '#9ef01a',
    backgroundColor: '#16223F',
  },
  teamLabel: {
    color: '#7C8BA1',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  scoreNumber: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '900',
  },
  vsContainer: {
    width: 50,
    alignItems: 'center',
  },
  vsText: {
    color: '#7C8BA1',
    fontSize: 14,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  resetButton: {
    marginTop: 10,
    padding: 6,
    backgroundColor: '#0E1424',
    borderRadius: 8,
  },
  infoText: {
    color: '#7C8BA1',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  infoTeamText: {
    color: '#9ef01a',
    fontWeight: '800',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  scoreButton: {
    backgroundColor: '#161F38',
    borderWidth: 1,
    borderColor: '#253359',
    borderRadius: 16,
    padding: 16,
    width: '48%', // Zwei Knöpfe nebeneinander
    marginBottom: 16,
  },
  tdButton: {
    width: '100%', // Touchdown geht über die volle Breite, weil wichtigster Move
    backgroundColor: '#9ef01a',
    borderColor: '#9ef01a',
  },
  buttonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonPoints: {
    color: '#000',
    fontSize: 24,
    fontWeight: '900',
  },
  buttonPointsGreen: {
    color: '#9ef01a',
    fontSize: 24,
    fontWeight: '900',
  },
  buttonLabel: {
    color: '#000',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  buttonLabelSub: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  sendUpdateButton: {
    backgroundColor: '#161F38',
    borderColor: '#9ef01a', // Neongrüner Rahmen für den Signal-Effekt
    borderWidth: 2,
    borderRadius: 16,
    padding: 18,
    width: '100%', // Volle Breite unter den Kacheln
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    // Schatten für iOS
    shadowColor: '#9ef01a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Schatten für Android
    elevation: 4,
  },
  sendUpdateDataText: {
    color: '#7C8BA1',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  sendUpdateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  // 1. Das Label über dem Dropdown
  inputLabel: { 
    color: '#7C8BA1', 
    fontSize: 12, 
    fontWeight: '700', 
    marginBottom: 8, 
    letterSpacing: 0.5 
  },
  
  // 2. Der Button (Jetzt langgezogen über die volle Breite)
  dropdownButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: '#161F38', // Angepasst an deine schönen blauen Cards
    borderColor: '#253359', 
    borderWidth: 1, 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    height: 52,
    width: '100%', // Zwingt das Feld, die volle Breite zu nutzen
  },
  
  dropdownButtonContent: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  
  dropdownPlaceholderText: { 
    color: '#7C8BA1', 
    fontSize: 14, 
    fontWeight: '500' 
  },
  
  dropdownSelectedText: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: '600' 
  },
  
  // 3. Die schwebende Ausklappliste (Zerstört jetzt nicht mehr das Layout)
  dropdownList: { 
    backgroundColor: '#161F38', 
    borderColor: '#253359', 
    borderWidth: 1, 
    borderRadius: 12, 
    marginTop: 4, 
    overflow: 'hidden',
    position: 'absolute', // Absolute Positionierung lässt sie über dem Content schweben
    top: 76,              // Perfekter Abstand unterhalb des Buttons
    left: 0,
    right: 0,
    zIndex: 999,          // Schiebt die Liste optisch in den Vordergrund
  },
  
  dropdownItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 14, 
    borderBottomWidth: 1, 
    borderBottomColor: '#253359' 
  },
  
  playerNumber: { 
    color: '#9ef01a', 
    fontWeight: '800', 
    width: 40, 
    fontSize: 14 
  },
  
  playerName: { 
    color: '#fff', 
    flex: 1, 
    fontSize: 14, 
    fontWeight: '500' 
  },
  
  playerPos: { 
    color: '#7C8BA1', 
    fontSize: 12, 
    fontWeight: '700' 
  },
  scoreCard: {
    backgroundColor: '#161F38',
    borderColor: '#253359',
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    width: 220, // Etwas breiter für die Wappen
    marginRight: 12,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Zwingt den Text abzuschnappen, falls er zu lang wird
    marginRight: 8,
  },
  teamLogo: {
    width: 20,
    height: 20,
    borderRadius: 10, // Perfekt rund
    marginRight: 8,   // Abstand zum Teamnamen
    backgroundColor: '#0E1424', // Falls das Bild lädt, schicker Hintergrund
  },
  teamName: {
    color: '#7C8BA1',
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
});     