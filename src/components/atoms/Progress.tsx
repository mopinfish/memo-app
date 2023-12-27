import React from 'react'
import { StyleSheet } from 'react-native'
import { Bar } from 'react-native-progress'
import { COLOR } from '../../constants/theme'

const styles = StyleSheet.create({
  progress: {
    height: 200,
    width: 200,
  },
})

interface Props {
  value: number
}

export default function Progress(props: Props) {
  const { value } = props
  return <Bar style={styles.progress} progress={value} color={COLOR.PRIMARY} />
}
