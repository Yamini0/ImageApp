import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ListRenderItemInfo,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {env} from './src/config/config';

import {ApiResponse} from './src/typings/fetchData';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState<ApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const page = useRef(1);

  const getImageFromApi = async (isLoading: boolean) => {
    try {
      const {data} = await axios.get<ApiResponse[]>(
        `${env.BASE_URL}photos?page=${page.current}&client_id=${env.ACCESS_KEY}`,
      );

      setData(prevState => [...prevState, ...data]);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getImageFromApi(true);
  }, []);

  const renderItem = useCallback(({item}: ListRenderItemInfo<ApiResponse>) => {
    return <Image source={{uri: item?.urls?.raw}} style={styles.imageItem} />;
  }, []);

  const fetchMoreData = useCallback(() => {
    page.current += 1;
    getImageFromApi(true);
  }, []);

  if (loading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={item => `${item?.user?.name}-${item?.id}`}
        numColumns={3}
        data={data}
        renderItem={renderItem}
        onEndReached={fetchMoreData}
        horizontal={false}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    width: '100%',
    backgroundColor: '#000000',
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  imageItem: {
    aspectRatio: 1,
    height: '100%',
    flex: 1,
  },
});

export default App;
