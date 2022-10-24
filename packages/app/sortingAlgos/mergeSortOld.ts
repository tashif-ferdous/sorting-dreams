import { AnimationElem, Color } from "./types"

function split(startIdx: number, endIdx: number): [[number, number], [number, number]] {
  const range = endIdx - startIdx
  const middleIdx = Math.floor(range/2) + startIdx
  if (range <= 1) return [[startIdx, endIdx], [endIdx, endIdx]]
  return [[startIdx, middleIdx], [middleIdx+1, endIdx]]
}

export function mergeSort(input: number[], startIdx: number = 0, endIdx: number = input.length-1, animations: AnimationElem[] = []): [number[], AnimationElem[]] {
  console.log('input', input, 'startIdx:', startIdx, 'endIdx:', endIdx)
  // the original call
  const endMerge = (startIdx === 0 && endIdx === input.length - 1)

  // base case
  if ((endIdx - startIdx == 1)) { // 2 elems
    if (input[startIdx]! > input[endIdx]!) {
      const result = [input[endIdx]!, input[startIdx]!]
      const animations: AnimationElem[] = [{
        index: startIdx,
        value: input[endIdx]!,
        color: Color.ACTIVE
      }, {
        index: endIdx,
        value: input[startIdx]!,
        color: Color.ACTIVE
      }]
      return [result, animations]
    }
  }
  if ((endIdx - startIdx) < 1) {
    return [[input[startIdx]!], []]
  }
  // first make a copy
  const array = input.slice()

  // recursive case
  const [[leftStartIdx, leftEndIdx], [rightStartIdx, rightEndIdx]] = split(startIdx, endIdx)
  console.log('splitting into:', 'left', leftStartIdx, leftEndIdx, 'right', rightStartIdx, rightEndIdx)
  const [left, leftAnimations] = mergeSort(array, leftStartIdx, leftEndIdx, animations)
  const [right, rightAnimations] = mergeSort(array, rightStartIdx, rightEndIdx, animations)

  // update the sorted left and right sides
  for (let l=leftStartIdx; l<=leftEndIdx; l++) {
    array[l] = left[l-leftStartIdx]!
  }
  for (let r=rightStartIdx; r<=rightEndIdx; r++) {
    array[r] = right[r-rightStartIdx]!
  }

  animations.concat(leftAnimations)
  animations.concat(rightAnimations)

  // merge step
  const result: number[] = []
  let l = leftStartIdx
  let r = rightStartIdx
  while (l <= leftEndIdx && r <= rightEndIdx) {
    if (array[l]! < array[r]!) {
      result.push(array[l]!)
      animations.push({
        index: l,
        value: array[l]!,
        color: Color.ACTIVE
      })
      l++
    } else {
      result.push(array[r]!)
      animations.push({
        index: r,
        value: array[l]!,
        color: Color.ACTIVE
      })
      r++
    }
    console.log('l', l, 'r', r)
  }
  while (l <= leftEndIdx) {
    result.push(array[l]!)
    animations.push({
      index: l,
      value: array[l]!,
      color: Color.ACTIVE
    })
    l++
  } 
  while (r <= rightEndIdx) {
    result.push(array[r]!)
    animations.push({
      index: r,
      value: array[r]!,
      color: Color.ACTIVE
    })
    r++
  }
  // put the original array back into the section
  const resultIter = result.entries()
  for (let i=startIdx; i<=endIdx; i++) {
    const [_idx, sortedValue] = resultIter.next().value
    array[i] = sortedValue
    animations.push({
      index: i,
      value: array[i]!,
      color: Color.ACTIVE
    })
    if (endMerge) {
      animations.push({
        index: i,
        value: array[i]!,
        color: Color.DONE
      }) 
    }
  }

  return [result, animations]
}