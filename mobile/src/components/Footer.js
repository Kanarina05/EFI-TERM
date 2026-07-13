import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../theme';

export default function Footer() {
  return (
    <View style={styles.ft}>
      <View style={styles.brand}>
        <FontAwesome name="fire" size={18} color={colors.accent} />
        <Text style={styles.brandTxt}>Efi Term</Text>
      </View>
      <Text style={styles.p}>
        Firma juaj e besuar për instalimin e ngrohjes qendrore,
        ujësjellësit dhe sistemeve vakumi në Kosovë.
      </Text>

      <View style={styles.row}>
        <FontAwesome name="phone" size={14} color={colors.accent} />
        <Text style={styles.rowTxt}>+383 44 574 631</Text>
      </View>
      <View style={styles.row}>
        <FontAwesome name="envelope" size={13} color={colors.accent} />
        <Text style={styles.rowTxt}>efi.term.01@gmail.com</Text>
      </View>
      <View style={styles.row}>
        <FontAwesome name="map-marker" size={15} color={colors.accent} />
        <Text style={styles.rowTxt}>Lipjan, Kosovë</Text>
      </View>

      <Text style={styles.copy}>
        © {new Date().getFullYear()} Efi Term. Të gjitha të drejtat e rezervuara.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ft: { backgroundColor: '#052f30', padding: 28 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  brandTxt: { color: colors.white, fontSize: 18, fontWeight: '800' },
  p: { color: '#9fb3b2', fontSize: 13, lineHeight: 20, marginBottom: 18 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  rowTxt: { color: '#cdd9d8', fontSize: 13 },
  copy: { color: '#6f8483', fontSize: 12, marginTop: 18, textAlign: 'center' },
});
