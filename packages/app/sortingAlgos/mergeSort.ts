import { color } from "react-native-reanimated"
import { AnimationElem, Color } from "./types"

function split(startIdx: number, endIdx: number): [[number, number], [number, number]] {
  const range = endIdx - startIdx
  const middleIdx = Math.floor(range/2) + startIdx
  return [[startIdx, middleIdx], [middleIdx+1, endIdx]]
}

function mergeSortRecursive(input: number[], overAllStartIdx: number): [number[], AnimationElem[]] {
  const startIdx = 0
  const endIdx = input.length - 1
  const range = endIdx - startIdx

  if (range == 0) { // no work, base case
    return [[input[startIdx]!], []]
  }

  let animations: AnimationElem[] = []

  // recursively merge sort
  const [[leftStart, leftEnd], [rightStart, rightEnd]] = split(startIdx, endIdx)

  const leftSide = input.slice(leftStart, leftEnd+1)
  const rightSide = input.slice(rightStart, rightEnd+1)

  if (leftEnd - leftStart > 0) {
    const [leftSorted, leftAnimations] = mergeSortRecursive(leftSide, overAllStartIdx)
    for (let l=leftStart; l<=leftEnd; l++) {
      input[l] = leftSorted[l-leftStart]!
    }
    animations = animations.concat(leftAnimations)
  }
  if (rightEnd - rightStart > 0) {
    const [rightSorted, rightAnimations] = mergeSortRecursive(rightSide, overAllStartIdx + rightStart)
    for (let r=rightStart; r<=rightEnd; r++) {
      input[r] = rightSorted[r-rightStart]!
    }
    animations = animations.concat(rightAnimations)
  }

  // do the merge step
  const merged: number[] = []
  let l = leftStart
  let r = rightStart
  while (l <= leftEnd && r <= rightEnd) {
    if (input[l]! <= input[r]!) {
      merged.push(input[l]!)
      animations.push({
        index: overAllStartIdx + l,
        value: input[l]!,
        color: Color.ACTIVE
      })
      l++
    } else {
      merged.push(input[r]!)
      animations.push({
        index: overAllStartIdx + r,
        value: input[r]!,
        color: Color.ACTIVE
      })
      r++ 
    }
  }
  // copy of the the leftover sides
  while (l <= leftEnd) {
    merged.push(input[l]!)
    animations.push({
      index: overAllStartIdx + l,
      value: input[l]!,
      color: Color.ACTIVE
    })
    l++
  }
  while (r <= rightEnd) {
    merged.push(input[r]!)
    animations.push({
      index: overAllStartIdx + r,
      value: input[r]!,
      color: Color.ACTIVE
    })
    r++ 
  }
  return [merged, animations]
} 

export function mergeSort(input: number[]): [number[], AnimationElem[]] {
  const [merged, priorAnimations] =  mergeSortRecursive(input.slice(), 0)
  // add final done animations
  merged.forEach((value, index) => {
    priorAnimations.push({
      index: index,
      value: value,
      color: Color.DONE
    })
  })
  return [merged, priorAnimations]
}