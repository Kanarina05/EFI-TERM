import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { colors } from '../theme';

const info = [
  { icon: 'phone',        label: 'Telefoni', val: '+383 44 574 631' },
  { icon: 'envelope',     label: 'Email',    val: 'efi.term.01@gmail.com' },
  { icon: 'map-marker',   label: 'Adresa',   val: 'Lipjan, Kosovë' },
  { icon: 'clock-o',      label: 'Orari',    val: 'E Hënë – E Shtunë, 08:00 – 18:00' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Header />
      <ScrollView>
        <View style={styles.hero}>
          <Text style={styles.badge}>Kontaktoni</Text>
          <Text style={styles.heroH1}>Na Kontaktoni</Text>
          <Text style={styles.heroP}>Jemi gjithmonë në dispozicion tuaj — 24/7</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.tag}>Informata</Text>
          <Text style={styles.h2}>Si të na gjeni?</Text>
          {info.map((r, i) => (
            <View style={styles.row} key={i}>
              <View style={styles.ico}>
                <FontAwesome name={r.icon} size={16} color={colors.white} />
              </View>
              <View>
                <Text style={styles.rowLabel}>{r.label}</Text>
                <Text style={styles.rowVal}>{r.val}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Na shkruani</Text>
          {sent ? (
            <View style={styles.success}>
              <Text style={styles.successTxt}>
                ✓ Mesazhi juaj u dërgua! Do t'ju kontaktojmë së shpejti.
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.label}>Emri</Text>
              <TextInput style={styles.input} placeholder="Emri juaj" />
              <Text style={styles.label}>Email</Text>
              <TextInput style={styles.input} placeholder="email@gmail.com" keyboardType="email-address" autoCapitalize="none" />
              <Text style={styles.label}>Telefoni (opsional)</Text>
              <TextInput style={styles.input} placeholder="+383..." keyboardType="phone-pad" />
              <Text style={styles.label}>Mesazhi</Text>
              <TextInput style={[styles.input, styles.textarea]} placeholder="Si mund të ju ndihmojmë?" multiline />
              <TouchableOpacity style={styles.btn} onPress={() => setSent(true)}>
                <Text style={styles.btnTxt}>Dërgo Mesazhin →</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.primary, padding: 32, paddingVertical: 44 },
  badge: {
    color: colors.white, backgroundColor: 'rgba(255,107,53,0.25)', alignSelf: 'flex-start',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, fontSize: 12, overflow: 'hidden',
  },
  heroH1: { color: colors.white, fontSize: 32, fontWeight: '900', marginTop: 14 },
  heroP: { color: '#cdd9d8', fontSize: 14, marginTop: 8 },

  section: { padding: 24 },
  tag: { color: colors.accent, fontWeight: '700', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 },
  h2: { fontSize: 24, fontWeight: '800', color: colors.text, marginTop: 6, marginBottom: 16 },

  row: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  ico: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { color: colors.muted, fontSize: 12 },
  rowVal: { color: colors.text, fontSize: 15, fontWeight: '600' },

  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6, marginTop: 4 },
  input: {
    borderWidth: 1, borderColor: colors.border, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 12, fontSize: 15, marginBottom: 14, backgroundColor: colors.white,
  },
  textarea: { height: 110, textAlignVertical: 'top' },
  btn: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  btnTxt: { color: colors.white, fontSize: 16, fontWeight: '700' },
  success: { backgroundColor: '#dcfce7', borderRadius: 10, padding: 20 },
  successTxt: { color: colors.ok, fontSize: 15, fontWeight: '600' },
});
