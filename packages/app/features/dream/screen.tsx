import { useState } from "react"
import { View } from "../../design/view"
import { selectionSort } from "../../sortingAlgos/selectionSort"
import { BarChart } from "./components/bar"
import { Nav, NavProps } from "./components/nav"
import { useAnimation } from "./hooks/useAnimation"

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min: number, max: number): number { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateArray(size=10, scale=2): number[] {
  const alreadyCreated = new Set()
  const array: number[] = []
  for (let _=0; _<size; _++) {
    let num = randomIntFromInterval(1, (size+1) * scale)
    while (alreadyCreated.has(num)) {
      num = randomIntFromInterval(1, (size+1) * scale) 
    } 
    alreadyCreated.add(num)
    array.push(num)
  }
  return array
}

export function DreamScreen() {
  const input = [10, 8, 4, 7, 3, 2, 6, 1, 5, 9]
  const [array, setArray] = useState(input) 
  const [animations, animating, reset, start, pause] = useAnimation({
    array: array, 
    algorithm: selectionSort, 
    speedMillis: 250
  })

  const createArray = () => {
    const newArray = generateArray(100)
    console.log('new array = ', newArray)
    setArray(newArray)
    reset(newArray)
  }

  return <View className="flex flex-col items-center h-full justify-around">
    <View>
      <BarChart input={animations}/> 
    </View>
    <View>
      <Nav 
        onGenerateArrayPressed={createArray} 
        onPlayPressed={start}
        playPressable={!animating}
        onPausePressed={pause}
        pausePressable={animating}
        onResetPressed={() => reset()}
      />
    </View>
    
  </View>
}