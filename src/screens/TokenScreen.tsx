import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { MMKV } from 'react-native-mmkv';

const COINGECKO_API =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h';

const storage = new MMKV();
const UPDATE_INTERVAL = 60 * 1000; 
const RATE_LIMIT_COOLDOWN = 10;
type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

const TokenScreen = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const coinsRef = useRef([]);

  // 로컬 데이터에서 불러오기
  const loadFromStorage = () => {
    const cachedData = storage.getString('cached_coins');
    const lastUpdateTime = storage.getString('last_updated');

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setCoins(parsedData);
      coinsRef.current = parsedData;
    }
    if (lastUpdateTime) {
      setLastUpdated(parseInt(lastUpdateTime, 10));
    }
  };

  // API에서 최신 가격 가져오기
  const fetchPrices = async () => {
    if (cooldown > 0) return;

    setLoading(true);
    setError('');
    try {
      const response = await fetch(COINGECKO_API);
      if (!response.ok) throw new Error('Rate Limited or API Error');

      const data = await response.json();

      // 변경된 데이터가 있으면 업데이트
      if (JSON.stringify(data) !== JSON.stringify(coinsRef.current)) {
        setCoins(data);
        coinsRef.current = data;
      }

      storage.set('cached_coins', JSON.stringify(data));
      storage.set('last_updated', Date.now().toString());
      setLastUpdated(Date.now());
    } catch (err) {
      setError('⚠️ API Rate Limited! 데이터는 최신이 아닐 수 있습니다.');
      loadFromStorage();
      setCoins(coinsRef.current);
      startCooldown();
    } finally {
      setLoading(false);
    }
  };

  // 10초 쿨다운 시작 (자동 업데이트 방해 방지)
  const startCooldown = () => {
    setCooldown(RATE_LIMIT_COOLDOWN);
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 
  useEffect(() => {
    loadFromStorage();
    const now = Date.now();
    if (!lastUpdated || now - lastUpdated >= UPDATE_INTERVAL) {
      fetchPrices();
    }
    const interval = setInterval(fetchPrices, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📈 시가총액 TOP 10</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {loading && !coins.length ? (
        <ActivityIndicator size="large" color="#008CBA" />
      ) : (
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          extraData={coins} // ✅ 변경된 경우에만 렌더링
          renderItem={({ item }) => {
            const isPriceUp = item.price_change_percentage_24h >= 0;
            return (
              <View style={styles.coinCard}>
                <Image source={{ uri: item.image }} style={styles.coinImage} />
                <View style={styles.coinInfo}>
                  <Text style={styles.coinName}>
                    {item.name} ({item.symbol.toUpperCase()})
                  </Text>
                  <Text testID='coinPrice' style={styles.coinPrice}>${item.current_price.toLocaleString()}</Text>
                  <View style={styles.priceChangeContainer}>
                    <Icon name={isPriceUp ? 'arrow-up-right' : 'arrow-down-right'} size={16} color={isPriceUp ? 'green' : 'red'} />
                    <Text style={[styles.priceChange, { color: isPriceUp ? 'green' : 'red' }]}>
                      {item.price_change_percentage_24h.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {lastUpdated && <Text style={styles.lastUpdated}>⏳ 마지막 업데이트: {new Date(lastUpdated).toLocaleTimeString()}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  listContainer: { paddingBottom: 20 },
  coinCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    width: '100%',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coinImage: { width: 50, height: 50, marginRight: 15 },
  coinInfo: { flex: 1 },
  coinName: { fontSize: 16, fontWeight: 'bold' },
  coinPrice: { fontSize: 14, color: '#333', marginTop: 3 },
  priceChangeContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  priceChange: { fontSize: 14, marginLeft: 5 },
  errorText: { color: 'red', fontSize: 16, marginTop: 10, textAlign: 'center' },
  lastUpdated: { marginTop: 10, fontSize: 14, color: '#666', textAlign: 'center' },
});

export default TokenScreen;
