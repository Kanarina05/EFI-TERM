import { useState, useCallback } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { API } from '../config';
import { colors } from '../theme';

export default function Profile({ navigation }) {
  const [username, setUsername] = useState('');
  const [token, setToken]       = useState(null);
  const [posts, setPosts]       = useState([]);
  const [loading, setLoading]   = useState(true);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const t = await AsyncStorage.getItem('token');
        if (!t) { navigation.navigate('Login'); return; }
        setToken(t);
        setUsername(await AsyncStorage.getItem('username'));
        loadMyPosts(t);
      })();
    }, [])
  );

  async function loadMyPosts(t) {
    try {
      const res  = await fetch(`${API}/myposts`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      setPosts([]);
    }
    setLoading(false);
  }

  function deletePost(postId) {
    Alert.alert('Konfirmim', 'A jeni të sigurt që dëshironi të fshini këtë postim?', [
      { text: 'Jo', style: 'cancel' },
      {
        text: 'Po, fshije', style: 'destructive',
        onPress: async () => {
          const res = await fetch(`${API}/posts/${postId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) setPosts(posts.filter(p => p._id !== postId));
          else Alert.alert('Gabim', 'Gabim gjatë fshirjes!');
        },
      },
    ]);
  }

  async function logout() {
    await AsyncStorage.multiRemove(['token', 'username', 'userId']);
    navigation.navigate('Login');
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Header />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.card}>
          <Text style={styles.hi}>Mirësevjen, {username}!</Text>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('ShtoProdukt')}>
              <Text style={styles.addTxt}>Shto Produkt të Ri</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outBtn} onPress={logout}>
              <Text style={styles.outTxt}>Dil</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.h3}>Postimet e Mia</Text>

        {loading ? (
          <Text style={styles.empty}>Duke ngarkuar...</Text>
        ) : posts.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.empty}>Nuk keni postime akoma.</Text>
            <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('ShtoProdukt')}>
              <Text style={styles.addTxt}>Shto Produkt të Parë</Text>
            </TouchableOpacity>
          </View>
        ) : (
          posts.map(post => (
            <View style={styles.workCard} key={post._id}>
              <TouchableOpacity style={styles.del} onPress={() => deletePost(post._id)}>
                <FontAwesome name="trash" size={14} color={colors.white} />
              </TouchableOpacity>
              {!!post.image && (
                <Image source={{ uri: `${API}/uploads/${post.image}` }} style={styles.workImg} />
              )}
              <View style={{ padding: 16 }}>
                <Text style={styles.workTitle}>{post.title}</Text>
                {!!post.text && <Text style={styles.workDesc}>{post.text}</Text>}
                {!!post.createdAt && (
                  <Text style={styles.date}>
                    {new Date(post.createdAt).toLocaleDateString('sq-AL')}
                  </Text>
                )}
              </View>
            </View>
          ))
        )}

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 12, padding: 22, marginBottom: 20 },
  hi: { fontSize: 20, fontWeight: '800', color: colors.text },
  btnRow: { flexDirection: 'row', gap: 12, marginTop: 18 },
  addBtn: { backgroundColor: colors.primary, borderRadius: 8, paddingHorizontal: 18, paddingVertical: 12, marginTop: 8 },
  addTxt: { color: colors.white, fontWeight: '700' },
  outBtn: { backgroundColor: colors.danger, borderRadius: 8, paddingHorizontal: 18, paddingVertical: 12 },
  outTxt: { color: colors.white, fontWeight: '700' },
  h3: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 14 },
  empty: { color: colors.muted, textAlign: 'center', paddingVertical: 12 },

  workCard: {
    backgroundColor: colors.white, borderRadius: 12, overflow: 'hidden',
    marginBottom: 18, borderWidth: 1, borderColor: colors.border,
  },
  workImg: { width: '100%', height: 220 },
  del: {
    position: 'absolute', top: 10, right: 10, zIndex: 5,
    backgroundColor: 'rgba(220,53,69,0.9)', width: 34, height: 34,
    borderRadius: 17, alignItems: 'center', justifyContent: 'center',
  },
  workTitle: { fontSize: 17, fontWeight: '700', color: colors.primary },
  workDesc: { color: colors.muted, fontSize: 14, marginTop: 6 },
  date: { color: '#999', fontSize: 12, marginTop: 8 },
});
