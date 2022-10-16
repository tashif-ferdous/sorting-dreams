import { useEffect, useRef, useState } from "react"
import { Button } from "react-native"
import { View } from "../../../design/view"
import { selectionSort } from "../../../sortingAlgos/selectionSort"
import { Grid } from "./grid"

export function Dream({input, algorithm, speedMilli}) : JSX.Element {
  console.log('input:', input)

  const [array, setArray] = useState(input? input: [])
  const [finished, setFinished] = useState(false)
  const [animating, setAnimating] = useState(false)
  const algoIter = useRef(algorithm(array))

  useEffect(() => {
    setArray(input)
    algoIter.current = algorithm(input)
  }, [input, algorithm])

  useEffect(() => {
    const id = setInterval(() => {
      if (animating) {
        if (!finished) {
          const {value, done} = algoIter.current.next()
          if (done) {
            console.log('done animating!')
            setFinished(true)
            setAnimating(false)
          } else {
            console.log('next iteration of the algo:', value)
            const {curr, index} = value
            setArray(curr)
          }        
        }    
      }
    }, speedMilli)
  
    return () => {
      clearInterval(id)
    }
  }, [array, finished, animating, speedMilli, algoIter])
  
  const reset = (event) => {
    console.log('resetting', event)
    setArray(input.slice())
    setAnimating(false)
    setFinished(false)
    algoIter.current = algorithm(input.slice())
  }

  const animate = (event) => {
    console.log('animating', event)
    setAnimating(true)
  } 

  return (<View>
    <Grid input={array} />
    <View className="flex flex-col justify-center items-center gap-4 pt-3">
      <Button title="Reset" onPress={(event) => reset(event)} disabled={!animating}/>
      <Button title="Start" onPress={(event) => animate(event)} disabled={animating || finished}/>
    </View>
  </View>)
}