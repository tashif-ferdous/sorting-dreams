import { A, H1, P, Text, TextLink } from '@sorting-dreams/app/design/typography'
import { Row } from '@sorting-dreams/app/design/layout'
import { View } from '@sorting-dreams/app/design/view'

import { MotiLink } from 'solito/moti'

export function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center p-3">
      <H1>Welcome to Sorting Dreams.</H1>
      <View className="max-w-xl">
        <P className="text-center">
          See how sorting algorithms work!
        </P>
      </View>
      <View className="h-[32px]" />
      <Row className="space-x-8">
        <MotiLink
          href="/dream"
          animate={({ hovered, pressed }) => {
            'worklet'

            return {
              scale: pressed ? 0.95 : hovered ? 1.1 : 1,
              rotateZ: pressed ? '0deg' : hovered ? '-15deg' : '0deg',
            }
          }}
          transition={{
            type: 'timing',
            duration: 150,
          }}
        >
          <Text selectable={false} className="text-base font-bold">
            Open
          </Text>
        </MotiLink>
      </Row>
    </View>
  )
}
