import { useEffect, useState } from "react"
import { Button } from "react-native"
import { View } from "../../../design/view"
import { AlgoAnimation, Color } from "../../../sortingAlgos/types"
import { BarChart } from "./bar"

export interface DreamProps {
  input: number[]
  algorithm: (input: number[]) => [number[], AlgoAnimation[]]
  speedMilli: number
}

export function Dream({input, algorithm, speedMilli}: DreamProps) : JSX.Element {
  const [array, setArray] = useState(input? input: [])
  const [finished, setFinished] = useState(false)
  const [animating, setAnimating] = useState(false)
  const algoAnimationEmpty: AlgoAnimation[] = []
  const [animations, setAnimations] = useState(algoAnimationEmpty)
  const [animationIdx, setAnimationIdx] = useState(0)
  const [active, setActive] = useState(new Set<number>())
  const [done, setDone] = useState(new Set<number>())

  useEffect(() => {
    setArray(input)
    setAnimations(algorithm(input)[1])
    setAnimating(false)
    setFinished(false)
    setActive(new Set())
    setDone(new Set())
    setAnimationIdx(0)
  }, [input, algorithm])

  useEffect(() => {
    const id = setInterval(() => {
      if (animations && animating) {
        if (!finished) {
          // check if finished
          if (animationIdx === animations.length) {
            console.log('done animating!')
            setFinished(true)
            setAnimating(false)
          } else {
            const {index, value, color} = animations[animationIdx]!
            setArray((currentArray) => {
              const newArray = currentArray.slice()
              newArray[index] = value
              return newArray
            })
            if (color === Color.ACTIVE) {
              setActive((currActive) => {
                return new Set([index]) // only one elem is active
              })

            } else if (color == Color.DONE) {
              setDone((currDone) => {
                currDone.add(index)
                return currDone
              })
            }


            setAnimationIdx((animationIdx) => animationIdx + 1)
          }
        }    
      }
    }, speedMilli)
  
    return () => {
      clearInterval(id)
    }
  }, [array, finished, animating, animations, animationIdx, speedMilli])
  
  const reset = (event: any) => {
    console.log('resetting', event)
    setArray(input.slice())
    setAnimating(false)
    setFinished(false)
    setAnimations(algorithm(array)[1])
  }

  const animate = (event: any) => {
    console.log('animating', event)
    setAnimating(true)
  } 

  return (<View className="h-full">
    <BarChart input={array} active={active} done={done} />
    <View className="flex flex-col justify-center items-center gap-4 pt-3">
      <Button title="Reset" onPress={(event) => reset(event)} disabled={!animating}/>
      <Button title="Start" onPress={(event) => animate(event)} disabled={animating || finished}/>
    </View>
  </View>)
}