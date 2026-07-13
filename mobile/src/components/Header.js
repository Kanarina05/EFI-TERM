import { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../theme';

export default function Header({ transparent = false }) {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('token').then(t => setIsLoggedIn(!!t));
    }, [])
  );

  return (
    <View style={[styles.bar, transparent && styles.transparent]}>
      <TouchableOpacity onPress={() => navigation.navigate('Ballina')}>
        <View style={styles.brand}>
          <FontAwesome name="fire" size={18} color={colors.accent} />
          <Text style={styles.brandTxt}>Efi Term</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
          <Text style={styles.link}>Kontakti</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(isLoggedIn ? 'Profile' : 'Login')}
        >
          <FontAwesome name="user" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.primary,
  },
  transparent: { backgroundColor: 'transparent' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandTxt: { color: colors.white, fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  link: { color: colors.white, fontSize: 14, fontWeight: '500' },
});
