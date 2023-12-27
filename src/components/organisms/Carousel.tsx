import React from 'react'
import Carousel from 'react-native-reanimated-carousel'
import CarouselItem from '../molecules/CarouselItem'
import { width } from '../../lib/window'

interface Props {
  onEnd: () => void
  onNext: () => void
  carouselRef: any
  onSnapToItem: (slide: number) => void
  data: { text: string; testID: string }[]
}

export default function Carousel(props: Props) {
  const { onEnd, onNext, onSnapToItem, carouselRef, data } = props
  return (
    <Carousel
      data={data}
      renderItem={({ item, index }) => (
        <CarouselItem item={item} onPress={index === data.length - 1 ? onEnd : onNext} />
      )}
      ref={carouselRef}
      sliderWidth={width}
      itemWidth={width}
      onSnapToItem={onSnapToItem}
    />
  )
}
