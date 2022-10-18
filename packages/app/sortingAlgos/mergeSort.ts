import { resolveMotionValue } from "framer-motion"
import { AlgoAnimation, Color } from "./types"

function split(startIdx: number, endIdx: number): [[number, number], [number, number]] {
  const range = endIdx - startIdx
  const middleIdx = Math.floor(range/2) + startIdx
  if (range <= 1) return [[startIdx, endIdx], [endIdx, endIdx]]
  return [[startIdx, middleIdx], [middleIdx+1, endIdx]]
}

export function mergeSort(input: number[], startIdx: number = 0, endIdx: number = input.length-1, animations: AlgoAnimation[] = []): [number[], AlgoAnimation[]] {
  // the original call
  const endMerge = (startIdx === 0 && endIdx === input.length - 1)

  // base case
  if ((endIdx - startIdx) < 1) {
    return [[], []]
  }
  // recursive case
  const [[leftStartIdx, leftEndIdx], [rightStartIdx, rightEndIdx]] = split(startIdx, endIdx)
  console.log('splitting into:', 'left', leftStartIdx, leftEndIdx, 'right', rightStartIdx, rightEndIdx)
  const [_left, leftAnimations] = mergeSort(input, leftStartIdx, leftEndIdx, animations)
  const [_right, rightAnimations] = mergeSort(input, rightStartIdx, rightEndIdx, animations)
  animations.concat(leftAnimations)
  animations.concat(rightAnimations)

  // merge step
  const result: number[] = []
  let l = leftStartIdx
  let r = rightStartIdx
  while (l <= leftEndIdx && r <= rightEndIdx) {
    if (input[l]! < input[r]!) {
      result.push(input[l]!)
      animations.push({
        index: l,
        value: input[l]!,
        color: Color.ACTIVE
      })
      l++
    } else {
      result.push(input[r]!)
      animations.push({
        index: r,
        value: input[l]!,
        color: Color.ACTIVE
      })
      r++
    }
    console.log('l', l, 'r', r)
  }
  while (l <= leftEndIdx) {
    result.push(input[l]!)
    animations.push({
      index: l,
      value: input[l]!,
      color: Color.ACTIVE
    })
    l++
  } 
  while (r <= rightEndIdx) {
    result.push(input[r]!)
    animations.push({
      index: r,
      value: input[r]!,
      color: Color.ACTIVE
    })
    r++
  }
  // put the original array back into the section
  const resultIter = result.entries()
  for (let i=startIdx; i<=endIdx; i++) {
    const [_idx, sortedValue] = resultIter.next().value
    input[i] = sortedValue
    animations.push({
      index: i,
      value: input[i]!,
      color: Color.ACTIVE
    })
    if (endMerge) {
      animations.push({
        index: i,
        value: input[i]!,
        color: Color.DONE
      }) 
    }
  }

  return [result, animations]
}