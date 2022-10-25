import { AnimationElem, Color } from './types'

function swap(array: number[], i: number, j: number): void {
  const temp = array[j]!
  array[j] = array[i]!
  array[i] = temp
}

export function bubbleSort(input: number[]): [number[], AnimationElem[]] {
  const array = input.slice() // bubblesort modifies in place
  const animations: AnimationElem[] = []
  
  for (let end=array.length-1; end >= 0; end--) {
    for (let i=0; i<end; i++) {
      animations.push({
        index: i,
        value: array[i]!,
        color: Color.ACTIVE
      })
      if (array[i]! > array[i+1]!) {
        swap(array, i, i+1)
        animations.push({
          index: i,
          value: array[i]!,
          color: Color.ACTIVE
        })
        animations.push({
          index: i+1,
          value: array[i+1]!,
          color: Color.ACTIVE
        }) 
      }
    }
    animations.push({
      index: end,
      value: array[end]!,
      color: Color.DONE
    }) 
  }
  return [array, animations]
}