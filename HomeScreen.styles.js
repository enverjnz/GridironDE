import { StyleSheet } from "react-native";

// 4. STYLING (Dein Figma Design in CSS-in-JS)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#161F38',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    backgroundColor: '#9ef01a', 
    padding: 8,
    borderRadius: 10,
    marginRight: 10,
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  logoGreen: {
    color: '#9ef01a',
  },
  subtitle: {
    color: '#7C8BA1',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: -2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 16,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9ef01a',
  },
  profileButton: {
    flexDirection: 'row',
    backgroundColor: '#161F38',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#253359',
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  feedScroll: {
    flex: 1,
    padding: 16,
  },
  heroCard: {
    height: 380,
    marginBottom: 24,
  },
  heroImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 14, 26, 0.55)', 
    borderRadius: 24,
    padding: 20,
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: '#253359',
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  topStoryTag: {
    backgroundColor: '#9ef01a',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  topStoryTagText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '800',
  },
  leagueTag: {
    color: '#A0AEC0',
    fontSize: 12,
    fontWeight: '700',
  },
  heroHeadline: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    fontStyle: 'italic',  
    lineHeight: 34,
    marginBottom: 10,
  },
  heroTeaser: {
    color: '#CBD5E0',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaText: {
    color: '#9ef01a',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginRight: 4,
  },
  filterScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterTab: {
    marginRight: 20,
    paddingVertical: 6,
  },
  activeFilterTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#9ef01a',
  },
  filterTabText: {
    color: '#7C8BA1',
    fontSize: 14,
    fontWeight: '700',
  },
  activeFilterTabText: {
    color: '#9ef01a',
  },
  // Kopiere diesen Block in dein Stylesheet:
  navBarWrapper: {
    position: 'absolute',
    bottom: 30, // Lässt die Leiste über dem iPhone-Balken schweben
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  navBar: {
    flexDirection: 'row', // Ordnet die Icons nebeneinander an statt untereinander!
    backgroundColor: '#0E1424', // Dunkles Blau für das Gehäuse
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    // Schatten-Effekt für iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    // Schatten-Effekt für Android
    elevation: 10,
    borderWidth: 1,
    borderColor: '#1D2947',
  },
  navTab: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavTab: {
    flexDirection: 'row',
    backgroundColor: '#9ef01a', // Deine neongrüne Kapsel
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavTabText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0E1A',
  },
  placeholderText: {
    color: '#7C8BA1',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  adBanner: {
    backgroundColor: '#161F38', // Dunkles Blau, passend zum Header/Profil-Button
    borderWidth: 1,
    borderColor: '#253359',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 12, // Erzeugt den perfekten Abstand nach unten zur Navbar
    alignItems: 'center',
    justifyContent: 'center',
    // Leichter Schatten, damit es über dem Content schwebt
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  adBannerText: {
    color: '#7C8BA1', // Unaufdringliches Grau für den Platzhalter
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  adBannerLink: {
    color: '#9ef01a', // Dein Neongrün, um das Interesse von potenziellen Sponsoren zu wecken
    fontWeight: '850',
  },
  burgerButton: {
    backgroundColor: '#161F38',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#253359',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    flexDirection: 'row',
  },
  drawerCloseDetector: {
    flex: 0.25,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  drawerContainer: {
    flex: 0.75,
    backgroundColor: '#0E1424',
    borderLeftWidth: 1,
    borderLeftColor: '#1D2947',
    paddingTop: 20,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#161F38',
  },
  drawerUserSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#9ef01a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  drawerUserName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  drawerUserEmail: {
    color: '#7C8BA1',
    fontSize: 11,
  },
  drawerCloseButton: {
    padding: 4,
  },
  drawerMenuScroll: {
    flex: 1,
    paddingVertical: 12,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#0A0E1A',
  },
  drawerItemIconWrapper: {
    width: 30,
    alignItems: 'center',
    marginRight: 14,
  },
  drawerItemText: {
    color: '#CBD5E0',
    fontSize: 14,
    fontWeight: '600',
  },
  drawerItemSpecialText: {
    color: '#9ef01a',
    fontWeight: '700',
  },
  scoreCard: {
    backgroundColor: '#1E294B',  // Etwas helleres, satteres Navy-Blau für deutlich besseren Kontrast
    borderColor: '#2E3F73',      // Sichtbarerer Rahmen
    borderWidth: 1,
    borderRadius: 16,            // Abgerundet passend zu deiner coolen Hero-Card oben
    padding: 16,                 // Mehr Innenabstand für ein luftigeres Gefühl
    width: 240,                  // Etwas breiter, damit lange Teamnamen nicht sofort abgeschnitten werden
    marginRight: 14,
    // Kleiner Schatten-Effekt für mehr Tiefe
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  scoreLeague: {
    color: '#7C8BA1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 12,
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
    width: 24,
    height: 24,
    borderRadius: 12, // Perfekt rund
    marginRight: 10,   // Abstand zum Teamnamen
    backgroundColor: '#0F172A', // Falls das Bild lädt, schicker Hintergrund
  },
  teamName: {
    color: '#94A3B8',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  teamScore: {
    color: '#94A3B8',
    fontSize: 15,
    fontWeight: '600',
  },
  winnerTeam: {
    color: '#FFFFFF',            // Das Sieger-Team sticht in reinem Weiß heraus
    fontWeight: '750',
  },
  winnerScore: {
    color: '#9ef01a',            // Dein Signature-Neongrün knallt jetzt richtig auf dem neuen Hintergrund
    fontWeight: '800',
    fontSize: 16,
  },
  gameStatus: {
    color: '#7C8BA1',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 10,               // Mehr Abstand nach oben
    textAlign: 'right',
  },
  mediaCard: {
    backgroundColor: '#1E294B', // Sattes Navy-Blau für besten Kontrast
    borderColor: '#2E3F73',
    borderWidth: 1,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  drawerSignOutWrap: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#1E2B47',
  },
  drawerSignOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1F0A0A',
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#FF4757',
  },
  drawerSignOutText: {
    color: '#FF4757',
    fontSize: 15,
    fontWeight: '800',
  },
});


export default styles;