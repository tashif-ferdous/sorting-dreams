import { NativeNavigation } from '@sorting-dreams/app/navigation/native'
import { Provider } from '@sorting-dreams/app/provider'

export default function App() {
  return (
    <Provider>
      <NativeNavigation />
    </Provider>
  )
}
