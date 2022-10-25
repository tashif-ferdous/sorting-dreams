import { useState } from "react"
import { View } from "../../design/view"
import { bubbleSort } from "../../sortingAlgos/bubbleSort"
import { mergeSort } from "../../sortingAlgos/mergeSort"
import { quickSort } from "../../sortingAlgos/quickSort"
import { selectionSort } from "../../sortingAlgos/selectionSort"
import { AlgoDisplay, AlgoHeader } from "./components/algoHeader"
import { BarChart } from "./components/bar"
import { Player } from "./components/player"
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

const algos: AlgoDisplay[] = [
  {
    name: 'Selection Sort',
    algorithm: selectionSort,
    description: 'Find the smallest number, one at a time'
  },
  {
    name: 'Merge Sort',
    algorithm: mergeSort,
    description: 'Divide and conquer, and then merge the smaller sorted arrays up.'
  },
  {
    name: 'Quick Sort',
    algorithm: quickSort,
    description: 'Divide and conquer, by finding a random pivot to order around.'
  },
  {
    name: 'Bubble Sort',
    algorithm: bubbleSort,
    description: 'Slow sort where the highest value bubbles to the top.'
  }
]

const algoDisplayIdx = 2

export function DreamScreen() {
  const input = [10, 8, 4, 7, 3, 2, 6, 1, 5, 9]
  const [array, setArray] = useState(input) 
  const [animations, animating, done, resetArray, resetAlgo, start, pause] = useAnimation({
    array: array, 
    algorithm: algos[algoDisplayIdx]!.algorithm 
  })

  const createArray = () => {
    const newArray = generateArray(100)
    console.log('new array = ', newArray)
    setArray(newArray)
    resetArray(newArray)
  }

  return <View className="flex flex-col items-center h-full justify-around">
    <View className="h-[10%] align-center justify-start">
      <AlgoHeader algos={algos} initialSelectedIdx={algoDisplayIdx} onAlgoChange={(algo) => {resetAlgo(algo)}}/>
    </View>
    <View className="h-[75%] w-screen items-center pb-5">
      <BarChart input={animations}/> 
    </View>
    <View className="h-[15%]">
      <Player 
        done={done}
        onGenerateArrayPressed={createArray} 
        onPlayPressed={start}
        playPressable={!animating}
        onPausePressed={pause}
        pausePressable={animating}
        onResetPressed={() => resetArray()}
      />
    </View>
    
  </View>
}