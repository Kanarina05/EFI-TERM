import { useState, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { API } from '../config';
import { colors } from '../theme';

export default function ShtoProdukt({ navigation }) {
  const [token, setToken]     = useState(null);
  const [title, setTitle]     = useState('');
  const [text, setText]       = useState('');
  const [image, setImage]     = useState(null); // { uri, name, type }
  const [msg, setMsg]         = useState('');
  const [ok, setOk]           = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('token').then(t => {
        if (!t) navigation.navigate('Login');
        else setToken(t);
      });
    }, [])
  );

  async function pickImage() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) { setMsg('Nuk u dha leje për galerinë.'); return; }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (result.canceled) return;

    const asset = result.assets[0];
    const name  = asset.uri.split('/').pop();
    const ext   = name.split('.').pop().toLowerCase();
    setImage({ uri: asset.uri, name, type: `image/${ext === 'jpg' ? 'jpeg' : ext}` });
  }

  async function shto() {
    if (!title.trim()) { setMsg('Titulli është i detyrueshëm.'); return; }
    setLoading(true); setMsg('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    if (image) formData.append('image', image);

    try {
      const res  = await fetch(`${API}/posts`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setOk(true);
        setMsg('Puna u shtua me sukses!');
        setTimeout(() => navigation.navigate('Ballina'), 1200);
      } else {
        setMsg(data.message || 'Gabim gjatë shtimit.');
      }
    } catch {
      setMsg('Nuk u lidh me serverin.');
    }
    setLoading(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Header />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View style={styles.card}>
          <Text style={styles.h2}>Shto ndonjë punë</Text>
          <Text style={styles.sub}>Ngarko foton dhe detajet e punës</Text>

          <Text style={styles.label}>Foto e punës</Text>
          {image ? (
            <View style={styles.preview}>
              <Image source={{ uri: image.uri }} style={styles.previewImg} />
              <TouchableOpacity style={styles.remove} onPress={() => setImage(null)}>
                <FontAwesome name="times" size={16} color={colors.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.upload} onPress={pickImage}>
              <FontAwesome name="image" size={28} color={colors.muted} />
              <Text style={styles.uploadTxt}>Kliko për të zgjedhur foto</Text>
              <Text style={styles.uploadSmall}>JPG, PNG, WEBP</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.label}>Titulli</Text>
          <TextInput
            style={styles.input}
            placeholder="p.sh. Instalim ngrohjeje qendrore — Lipjan"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Përshkrimi (opsional)</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Përshkruaj punën e kryer, materialet e përdorura..."
            value={text}
            onChangeText={setText}
            multiline
          />

          {!!msg && <Text style={ok ? styles.ok : styles.err}>{msg}</Text>}

          <TouchableOpacity style={styles.btn} onPress={shto} disabled={loading}>
            <Text style={styles.btnTxt}>{loading ? 'Duke u ngarkuar...' : 'Publiko Punën →'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 22 },
  h2: { fontSize: 22, fontWeight: '800', color: colors.text },
  sub: { color: colors.muted, marginTop: 4, marginBottom: 18 },
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6, marginTop: 6 },
  upload: {
    borderWidth: 2, borderColor: colors.border, borderStyle: 'dashed', borderRadius: 12,
    paddingVertical: 30, alignItems: 'center', marginBottom: 10,
  },
  uploadTxt: { color: colors.text, marginTop: 10, fontWeight: '600' },
  uploadSmall: { color: colors.muted, fontSize: 12, marginTop: 4 },
  preview: { position: 'relative', marginBottom: 10 },
  previewImg: { width: '100%', height: 200, borderRadius: 12 },
  remove: {
    position: 'absolute', top: 10, right: 10, backgroundColor: colors.danger,
    width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center',
  },
  input: {
    borderWidth: 1, borderColor: colors.border, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 12, fontSize: 15, marginBottom: 6,
  },
  textarea: { height: 100, textAlignVertical: 'top' },
  err: { color: colors.danger, marginTop: 10 },
  ok: { color: colors.ok, marginTop: 10 },
  btn: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  btnTxt: { color: colors.white, fontSize: 16, fontWeight: '700' },
});
