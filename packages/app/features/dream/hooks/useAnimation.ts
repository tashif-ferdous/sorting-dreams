import { useState, useEffect } from 'react'
import { AnimationElem, Color } from '../../../sortingAlgos/types'

export interface useAnimationProps {
  array: number[],
  initAlgorithm: (array: number[]) => [number[], AnimationElem[]]
  speedMillis?: number | undefined,
}

function calculateAnimationSpeedMillis(numElems: number, scale=10, targetMillis=5000) {
  return Math.max((targetMillis / (numElems * scale)), 50)
}

function percentage(index: number, array: any[]): number {
  return (index / (array.length)) * 100
}

export function useAnimation({array, initAlgorithm, speedMillis}: useAnimationProps): [AnimationElem[], number, boolean, boolean, (array?: number[]) => void, (algo: (input: number[]) => [number[], AnimationElem[]]) => void,() => void, () => void] {
  const [animating, setAnimating] = useState(false)
  const [currAnimationIdx, setCurrAnimationIdx] = useState(0)

  // run the algorithm initially and set state
  const [algorithm, setAlgorithm] = useState(() => initAlgorithm)
  const [initSortedInput, initAlgoOutput]: [number[], AnimationElem[]] = algorithm(array)
  const [_sortedInput, setSortedInput] = useState(initSortedInput)
  const [algoOutput, setAlgoOutput] = useState(initAlgoOutput)
  const [paintDone, setPaintDone] = useState(new Set<number>)
  const [done, setDone] = useState(false)

  const [prevActiveElem, setPrevActiveElem] = useState<AnimationElem | undefined>(undefined)
  const animationSpeedMillis = speedMillis? speedMillis: calculateAnimationSpeedMillis(array.length)

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

  const resetArray = (input?: number[]): void => {
    setAnimating(false)
    setDone(false)
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
  }

  const resetAlgo = (algo: (input: number[]) => [number[], AnimationElem[]]): void => {
    console.log('resetting algo with:', algo.toString())
    setAnimating(false)
    setDone(false)
    setCurrAnimationIdx(0)
    setPaintDone(new Set<number>)

    setAlgorithm(() => algo)
    const [sorted, animationsOutput]: [number[], AnimationElem[]] = algo(array)
    setAlgoOutput(animationsOutput)
    setSortedInput(sorted)
    setAnimation(generateStartingAnimation(array))
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
        setDone(true)
        return
      }

      // are we paused, or not started?
      if (!animating) {
        return
      }

      // animate the next change
      const next: AnimationElem = algoOutput[currAnimationIdx]!
      setAnimation((animations) => {
        const nextAnimations = animations.slice()

        if (prevActiveElem && next.color === Color.ACTIVE) { // can only have 1 active element
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
      
    }, animationSpeedMillis)

    return () => {
      clearInterval(id)
    }
  }, [algoOutput, animating, array.length, currAnimationIdx, prevActiveElem, paintDone, animationSpeedMillis])

  return [animations, percentage(currAnimationIdx, algoOutput), animating, done, resetArray, resetAlgo, start, pause]
}