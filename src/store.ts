import AsyncStorage from '@react-native-async-storage/async-storage'
import { Memo } from './model'

export const save = async (text: string, createdAt: number) => {
  const data: Memo = {
    text,
    createdAt,
  }

  const key = `${createdAt}`
  const value = JSON.stringify(data)

  await AsyncStorage.setItem(key, value)
}

export async function loadAll(): Promise<Memo[]> {
  const keys = await AsyncStorage.getAllKeys()
  const sortedKeys = keys.map((key) => key).sort()
  const entryList = await AsyncStorage.multiGet(sortedKeys)
  return entryList.map((entry) => JSON.parse(entry[1]! /* 仕組み上nullが出てくることはない */))
}
