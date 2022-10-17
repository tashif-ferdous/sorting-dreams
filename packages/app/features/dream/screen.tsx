import { useState } from "react"
import { Button } from "react-native"
import { Row } from "../../design/layout"
import { View } from "../../design/view"
import { selectionSort } from "../../sortingAlgos/selectionSort"
import { Dream } from "./components/viz"

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

  const createArray = () => {
    const newArray = generateArray(10)
    console.log('new array = ', newArray)
    setArray(newArray)
  }

  return <View className="flex flex-row items-center justify-center h-full">
    <Dream input={array} algorithm={selectionSort} speedMilli={250}/>
    <Button onPress={() => createArray()} title="Generate new array"/>
  </View>
}