import { AlgoIteration } from "./types"


function split(array: number[]): [number[], number[]] {
  if (array.length == 0) return [[], []]
  if (array.length == 1) return [array, []]

  const middle = Math.floor(array.length / 2)
  return [array.slice(0, middle), array.slice(middle)]
}

export function mergeSort(input: number[]): number[] {
  // base case
  if (input.length <= 1) {
    return []
  }
  // recursive case
  const [leftUnsorted, rightUnsorted] = split(input)
  const left = mergeSort(leftUnsorted)
  const right = mergeSort(rightUnsorted)

  // merge step
  const result: number[] = []
  let l = 0
  let r = 0
  while (l < left.length! || r < right.length!) {
    if (left[l]! < right[r]!) {
      result.push(left[l]!)
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