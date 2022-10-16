import { AlgoAnimation, AlgoIteration } from "./types"


function split(array: number[], startIdx: number, endIdx: number): [[number, number], [number, number]] {
  const range = endIdx - startIdx
  if (range 
  if (array.length == 0) return [[], []]
  if (array.length == 1) return [array, []]

  const middle = Math.floor(array.length / 2)
  return [array.slice(0, middle), array.slice(middle)]
}

export function mergeSort(input: number[], startIdx: number = 0, endIdx: number = input.length, animations: AlgoAnimation[] = []): [number[], AlgoAnimation[]] {
  // base case
  if (input.length <= 1 || (endIdx - startIdx) <= 1) {
    return [[], []]
  }
  // recursive case
  const [[leftStartIdx, leftEndIdx], [rightStartIdx, rightEndIdx]] = split(input, startIdx, endIdx)
  const [left, leftAnimations] = mergeSort(input, leftStartIdx, leftEndIdx, animations)
  const [right, rightAnimations] = mergeSort(input, rightStartIdx, rightEndIdx, animations)

  // merge step
  const result: number[] = []
  let l = leftStartIdx
  let r = rightStartIdx
  while (l < leftEndIdx || r < rightEndIdx) {
    if (left[l]! < right[r]!) {
      result.push(left[l]!)
      animations.push({
        index: l,
        value: left[l]
      })
      l++
    } else {
      result.push(right[r]!)
      r++
    }
  }
  if (l < left.length) {
    result.concat(left.splice(l))
  } else if (r < right.length) {
    result.concat(right.splice(r))
  }
  return result
}