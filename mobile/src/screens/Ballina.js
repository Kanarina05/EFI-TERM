import { useState, useCallback } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { API } from '../config';
import { colors } from '../theme';

const stats = [
  { number: '10+',  label: 'Vjet Eksperiencë' },
  { number: '500+', label: 'Projekte të Kryera' },
  { number: '300+', label: 'Klientë të Kënaqur' },
  { number: '24/7', label: 'Mbështetje Teknike' },
];

const services = [
  { icon: 'fire',    title: 'Ngrohje Qendrore',      desc: 'Instalim profesional i sistemeve moderne të ngrohjes qendrore.' },
  { icon: 'tint',    title: 'Ujësjellës',            desc: 'Sistem i plotë ujësjellësi me materiale cilësore.' },
  { icon: 'magic',   title: 'Sistemi Vakumi',        desc: 'Instalim i sistemeve vakum me teknologji bashkëkohore.' },
  { icon: 'wrench',  title: 'Mirëmbajtje & Servis',  desc: 'Shërbim i shpejtë dhe cilësor pas instalimit.' },
];

export default function Ballina({ navigation }) {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [userId, setUserId]   = useState(null);
  const [token, setToken]     = useState(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setUserId(await AsyncStorage.getItem('userId'));
        setToken(await AsyncStorage.getItem('token'));
        loadPosts();
      })();
    }, [])
  );

  async function loadPosts() {
    try {
      const res  = await fetch(`${API}/allposts`);
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      setPosts([]);
    }
    setLoading(false);
  }

  function deletePost(postId) {
    Alert.alert('Konfirmim', 'A jeni të sigurt?', [
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

  const filtered = posts.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Header />
      <ScrollView>

        {/* HERO */}
        <View style={styles.hero}>
          <Text style={styles.badge}>Kompania Nr.1 në Kosovë</Text>
          <Text style={styles.heroH1}>Efi Term</Text>
          <Text style={styles.heroP}>
            Ngrohje Qendrore · Ujësjellës · Sisteme Vakumi
          </Text>
          <TouchableOpacity style={styles.heroBtn} onPress={() => navigation.navigate('Contact')}>
            <Text style={styles.heroBtnTxt}>Na Kontaktoni →</Text>
          </TouchableOpacity>
        </View>

        {/* STATS */}
        <View style={styles.stats}>
          {stats.map((s, i) => (
            <View style={styles.stat} key={i}>
              <Text style={styles.statN}>{s.number}</Text>
              <Text style={styles.statL}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* RRETH NESH */}
        <View style={styles.section}>
          <Text style={styles.tag}>Kompania jonë</Text>
          <Text style={styles.h2}>Kush jemi ne?</Text>
          <Text style={styles.p}>
            Efi Term është një firmë profesionale e fokusuar në sisteme moderne
            të ngrohjes dhe ftohjes, duke kombinuar teknologjinë, cilësinë dhe
            korrektësinë.
          </Text>
        </View>

        {/* SHËRBIMET */}
        <View style={[styles.section, { backgroundColor: colors.primary }]}>
          <Text style={[styles.tag, { color: colors.accent }]}>Çfarë ofrojmë</Text>
          <Text style={[styles.h2, { color: colors.white }]}>Shërbimet Tona</Text>
          {services.map((s, i) => (
            <View style={styles.svcCard} key={i}>
              <FontAwesome name={s.icon} size={24} color={colors.accent} />
              <Text style={styles.svcName}>{s.title}</Text>
              <Text style={styles.svcDesc}>{s.desc}</Text>
            </View>
          ))}
        </View>

        {/* PUNËT TONA */}
        <View style={styles.section}>
          <Text style={styles.tag}>Galeria jonë</Text>
          <Text style={styles.h2}>Punët Tona</Text>

          <View style={styles.searchBox}>
            <FontAwesome name="search" size={15} color={colors.muted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Kërko punë..."
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {loading ? (
            <Text style={styles.empty}>Duke ngarkuar...</Text>
          ) : filtered.length === 0 ? (
            <Text style={styles.empty}>
              {search ? 'Nuk u gjet asnjë punë.' : 'Nuk ka punë të shtuara akoma.'}
            </Text>
          ) : (
            filtered.map(post => {
              const isOwner =
                userId && (post.userId?._id || post.userId)?.toString() === userId;
              return (
                <View style={styles.workCard} key={post._id}>
                  {isOwner && (
                    <TouchableOpacity style={styles.del} onPress={() => deletePost(post._id)}>
                      <FontAwesome name="trash" size={13} color={colors.white} />
                    </TouchableOpacity>
                  )}
                  {post.image ? (
                    <Image
                      source={{ uri: `${API}/uploads/${post.image}` }}
                      style={styles.workImg}
                    />
                  ) : (
                    <View style={[styles.workImg, styles.noImg]}>
                      <FontAwesome name="fire" size={30} color={colors.muted} />
                    </View>
                  )}
                  <View style={{ padding: 16 }}>
                    <Text style={styles.workTitle}>{post.title}</Text>
                    {!!post.text && <Text style={styles.workDesc}>{post.text}</Text>}
                  </View>
                </View>
              );
            })
          )}
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.primary, padding: 32, paddingVertical: 60, alignItems: 'flex-start' },
  badge: {
    color: colors.white, backgroundColor: 'rgba(255,107,53,0.25)',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, fontSize: 12, overflow: 'hidden',
  },
  heroH1: { color: colors.white, fontSize: 40, fontWeight: '900', marginTop: 16 },
  heroP: { color: '#cdd9d8', fontSize: 15, marginTop: 10, lineHeight: 22 },
  heroBtn: { backgroundColor: colors.accent, borderRadius: 10, paddingHorizontal: 22, paddingVertical: 13, marginTop: 22 },
  heroBtnTxt: { color: colors.white, fontWeight: '700', fontSize: 15 },

  stats: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#052f30' },
  stat: { width: '50%', padding: 22, alignItems: 'center' },
  statN: { color: colors.accent, fontSize: 26, fontWeight: '900' },
  statL: { color: '#cdd9d8', fontSize: 12, marginTop: 4, textAlign: 'center' },

  section: { padding: 24 },
  tag: { color: colors.accent, fontWeight: '700', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 },
  h2: { fontSize: 26, fontWeight: '800', color: colors.text, marginTop: 6, marginBottom: 14 },
  p: { color: colors.muted, fontSize: 15, lineHeight: 23 },

  svcCard: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: 20, marginTop: 14 },
  svcName: { color: colors.white, fontSize: 17, fontWeight: '700', marginTop: 10 },
  svcDesc: { color: '#b9cbca', fontSize: 14, marginTop: 6, lineHeight: 20 },

  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: 10, paddingHorizontal: 12, marginVertical: 16,
  },
  searchInput: { flex: 1, paddingVertical: 11, fontSize: 15 },
  empty: { color: colors.muted, textAlign: 'center', paddingVertical: 30 },

  workCard: {
    backgroundColor: colors.white, borderRadius: 14, overflow: 'hidden',
    marginBottom: 18, borderWidth: 1, borderColor: colors.border,
  },
  workImg: { width: '100%', height: 200 },
  noImg: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#eef2f1' },
  del: {
    position: 'absolute', top: 10, right: 10, zIndex: 5,
    backgroundColor: 'rgba(220,53,69,0.9)', width: 34, height: 34,
    borderRadius: 17, alignItems: 'center', justifyContent: 'center',
  },
  workTitle: { fontSize: 17, fontWeight: '700', color: colors.primary },
  workDesc: { color: colors.muted, fontSize: 14, marginTop: 6 },
});
