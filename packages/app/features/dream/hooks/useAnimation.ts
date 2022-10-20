import { useState, useEffect } from 'react'
import { AnimationElem, Color } from '../../../sortingAlgos/types'

export interface useAnimationProps {
  array: number[],
  algorithm: (array: number[]) => [number[], AnimationElem[]]
  speedMillis: number,
}

export function useAnimation({array, algorithm, speedMillis}: useAnimationProps): [AnimationElem[], boolean, (array?: number[]) => void, () => void, () => void] {
  const [animating, setAnimating] = useState(false)
  const [currAnimationIdx, setCurrAnimationIdx] = useState(0)

  // run the algorithm initially and set state
  const [initSortedInput, initAlgoOutput]: [number[], AnimationElem[]] = algorithm(array)
  const [_sortedInput, setSortedInput] = useState(initSortedInput)
  const [algoOutput, setAlgoOutput] = useState(initAlgoOutput)

  const [prevActiveElem, setPrevActiveElem] = useState<AnimationElem | undefined>(undefined)

  const generateStartingAnimation = (input: number[]): AnimationElem[] => {
    return array.map((item: number, index: number) => {
      return {
        index: index,
        value: item,
        color: Color.NEUTRAL
      }
    })
  }
  const [animations, setAnimation] = useState(generateStartingAnimation(array))

  const reset = (array: number[]): void => {
    setAnimating(false)
    setCurrAnimationIdx(0)
    setAnimation(generateStartingAnimation(array))
    const [sortedInput, algoOutput] = algorithm(array)
    setSortedInput(sortedInput)
    setAlgoOutput(algoOutput)
  }

  const start = (): void => {
    setAnimating(true)
  }

  const pause = (): void => {
    setAnimating(false)
  }

  // main loop
  useEffect(() => {
    const id = setInterval(() => {
      // have we reached the end?
      if (currAnimationIdx === array.length - 1) {
        setAnimating(false)
        return
      }

      // are we paused, or not started?
      if (!animating) {
        return
      }

      // animate the next change
      const {index, value, color}: AnimationElem = algoOutput[currAnimationIdx]!
      setAnimation((animations) => {
        console.log('animating...', animations)
        const nextAnimations = animations.slice()

        if (prevActiveElem && color === Color.ACTIVE) { // can only have 1 active element
          console.log('debug', 'nextAnimations', nextAnimations, 'prevActiveElem', prevActiveElem)
          nextAnimations[prevActiveElem!.index]!.color = Color.NEUTRAL // reset to neutral
        }
        nextAnimations[index] = {
          index: index,
          value: value,
          color: color
        }
        return nextAnimations
      })
      if (prevActiveElem === null) {
        setPrevActiveElem(algoOutput[currAnimationIdx])
      }
      setCurrAnimationIdx((idx) => idx+1)
      
    }, speedMillis)

    return () => {
      clearInterval(id)
    }
  }, [algoOutput, animating, array.length, currAnimationIdx, prevActiveElem, speedMillis])

  return [animations, animating, reset, start, pause]
}