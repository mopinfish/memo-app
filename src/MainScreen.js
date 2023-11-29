import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { List } from 'react-native-paper';
import format from 'date-fns/format';

const memos = [
  {
    text: "メモメモメモ",
    createdAt: 1585574700000, // 2020.03.30 22:25
  },
  {
    text: "メモメモメモ",
    createdAt: 1585567500000, // 2020.03.30 20:25
  },
  {
    text: "長いメモメモメモメモメモメモメモメモメモメモメモメモメモメモ",
    createdAt: 1585459500000, // 2020.03.29 14:25
  },
  {
    text: "メモメモメモ",
    createdAt: 1585369500000, // 2020.03.28 13:25
  },
  {
    text: "メモメモメモ",
    createdAt: 1585275900000, // 2020.03.27 11:25
  },
];

export const MainScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={memos}
        keyExtractor={item => `${item.createdAt}`}
        renderItem={({ item }) => (
          <List.Item
            title={item.text}
            titleNumberOfLines={5}
            description={
              `作成日時: ${format(item.createdAt, 'yyyy.MM.dd HH:mm')}`
            }
            descriptionStyle={{ textAlign: 'right' }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});