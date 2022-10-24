import { AnimationElem, Color } from './types'

function swap(array: number[], startIdx: number, endIdx: number): void {
  const temp = array[endIdx]!
  array[endIdx] = array[startIdx]!
  array[startIdx] = temp
}

function partition(array: number[], animations: AnimationElem[], startIdx: number, endIdx: number): number {
   const pivot = array[endIdx]! // default pivot is the last element
   let leftOfPivotIdx = (startIdx - 1)
 
   for (let j = startIdx; j <= endIdx; j++) {
    animations.push({
      index: j,
      value: array[j]!,
      color: Color.ACTIVE
    })
    if (array[j]! < pivot) {
        leftOfPivotIdx++;
        swap(array, leftOfPivotIdx, j)
        animations.push({
          index: j,
          value: array[j]!,
          color: Color.ACTIVE
        })
        animations.push({
          index: leftOfPivotIdx,
          value: array[leftOfPivotIdx]!,
          color: Color.ACTIVE
        })
    }
   }
   swap(array, leftOfPivotIdx + 1, endIdx) // swap the pivot 
   animations.push({
    index: endIdx,
    value: array[endIdx]!,
    color: Color.ACTIVE
  })
  animations.push({
    index: leftOfPivotIdx + 1,
    value: array[leftOfPivotIdx + 1]!,
    color: Color.ACTIVE
  })
   return (leftOfPivotIdx + 1)
}

function quickSortRecursive(array: number[], animations: AnimationElem[], startIdx: number, endIdx: number): void {
  if (startIdx < endIdx) {
    const pivotIdx = partition(array, animations, startIdx, endIdx)
    animations.push({
      index: pivotIdx,
      value: array[pivotIdx]!,
      color: Color.DONE
    })
    quickSortRecursive(array, animations, startIdx, pivotIdx - 1)
    quickSortRecursive(array, animations, pivotIdx + 1, endIdx)
  } else {
    // push the DONE animation
    animations.push({
      index: startIdx,
      value: array[startIdx]!,
      color: Color.DONE
    })
  }
} 

export function quickSort(input: number[]): [number[], AnimationElem[]] {
  const array = input.slice()
  const animations: AnimationElem[] = []
 
  quickSortRecursive(array, animations, 0, array.length-1)
  return [array, animations]
}