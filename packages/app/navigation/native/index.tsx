import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { DreamScreen } from '../../features/dream/screen'
import { HomeScreen } from '../../features/home/screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  dream: undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
       <Stack.Screen
        name="dream"
        component={DreamScreen}
        options={{
          title: 'Dream',
        }}
      />
    </Stack.Navigator>
  )
}
