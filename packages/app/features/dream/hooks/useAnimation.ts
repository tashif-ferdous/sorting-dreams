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
  const [paintDone, setPaintDone] = useState(new Set<number>)

  const [prevActiveElem, setPrevActiveElem] = useState<AnimationElem | undefined>(undefined)

  const generateStartingAnimation = (input: number[]): AnimationElem[] => {
    return input.map((item: number, index: number) => {
      return {
        index: index,
        value: item,
        color: Color.NEUTRAL
      }
    })
  }
  const [animations, setAnimation] = useState(generateStartingAnimation(array))

  const reset = (input?: number[]): void => {
    console.log('reset(): input=',input)
    setAnimating(false)
    setCurrAnimationIdx(0)
    setPaintDone(new Set<number>())
    if (input) {
      setAnimation(generateStartingAnimation(input))
      const [sortedInput, algoOutput] = algorithm(input)
      setSortedInput(sortedInput)
      setAlgoOutput(algoOutput)
    } else {
      setAnimation(generateStartingAnimation(array))
    }
    setCurrAnimationIdx(0)
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
      if (currAnimationIdx === algoOutput.length) {
        setAnimating(false)
        return
      }

      // are we paused, or not started?
      if (!animating) {
        return
      }

      // animate the next change
      const next: AnimationElem = algoOutput[currAnimationIdx]!
      console.log('applying change:', next)
      setAnimation((animations) => {
        const nextAnimations = animations.slice()

        if (prevActiveElem && next.color === Color.ACTIVE) { // can only have 1 active element
          console.log('debug', 'nextAnimations', nextAnimations, 'prevActiveElem', prevActiveElem)
          const priorColor = paintDone.has(prevActiveElem.index) ? Color.DONE : Color.NEUTRAL
          nextAnimations[prevActiveElem!.index]!.color = priorColor // reset to neutral
        }
        nextAnimations[next.index] = {
          index: next.index,
          value: next.value,
          color: next.color
        }
        return nextAnimations
      })
      if (next.color === Color.DONE) {
        setPaintDone((set) => {
          set.add(next.index)
          return set
        })
      }
      if (prevActiveElem === undefined || algoOutput[currAnimationIdx]?.color === Color.ACTIVE) {
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