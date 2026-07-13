import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { API } from '../config';
import { colors } from '../theme';

export default function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg]           = useState('');
  const [ok, setOk]             = useState(false);
  const [loading, setLoading]   = useState(false);

  async function register() {
    if (!username || !email || !password) {
      setMsg('Të gjitha fushat janë të detyrueshme.'); return;
    }
    setLoading(true); setMsg('');
    try {
      const res  = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setOk(true);
        setMsg(data.message || 'Regjistrimi u krye me sukses!');
        setTimeout(() => navigation.navigate('Login'), 1500);
      } else {
        setMsg(data.message || 'Gabim gjatë regjistrimit.');
      }
    } catch {
      setMsg('Nuk u lidh me serverin. Provoni përsëri.');
    }
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.primary }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.brand}>
          <FontAwesome name="fire" size={26} color={colors.accent} />
          <Text style={styles.brandTxt}>Efi Term</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.h2}>Regjistrohu</Text>
          <Text style={styles.sub}>Krijo llogari të re falas</Text>

          <Text style={styles.label}>Emri</Text>
          <View style={styles.inputWrap}>
            <FontAwesome name="user" size={16} color={colors.muted} />
            <TextInput style={styles.input} placeholder="Emri juaj" value={username} onChangeText={setUsername} />
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrap}>
            <FontAwesome name="envelope" size={15} color={colors.muted} />
            <TextInput
              style={styles.input} placeholder="email@example.com"
              autoCapitalize="none" keyboardType="email-address"
              value={email} onChangeText={setEmail}
            />
          </View>

          <Text style={styles.label}>Fjalëkalimi</Text>
          <View style={styles.inputWrap}>
            <FontAwesome name="lock" size={17} color={colors.muted} />
            <TextInput
              style={styles.input} placeholder="Minimum 6 karaktere"
              secureTextEntry value={password} onChangeText={setPassword}
            />
          </View>

          {!!msg && <Text style={ok ? styles.ok : styles.err}>{msg}</Text>}

          <TouchableOpacity style={styles.btn} onPress={register} disabled={loading}>
            <Text style={styles.btnTxt}>{loading ? 'Duke u regjistruar...' : 'Regjistrohu →'}</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            Ke llogari?{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Kyçu këtu</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  brand: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24 },
  brandTxt: { color: colors.white, fontSize: 24, fontWeight: '800' },
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 24 },
  h2: { fontSize: 24, fontWeight: '800', color: colors.text },
  sub: { color: colors.muted, marginTop: 4, marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1, borderColor: colors.border, borderRadius: 10,
    paddingHorizontal: 12, marginBottom: 16,
  },
  input: { flex: 1, paddingVertical: 12, fontSize: 15, color: colors.text },
  err: { color: colors.danger, marginBottom: 12 },
  ok: { color: colors.ok, marginBottom: 12 },
  btn: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  btnTxt: { color: colors.white, fontSize: 16, fontWeight: '700' },
  footer: { textAlign: 'center', marginTop: 18, color: colors.muted },
  link: { color: colors.accent, fontWeight: '700' },
});
