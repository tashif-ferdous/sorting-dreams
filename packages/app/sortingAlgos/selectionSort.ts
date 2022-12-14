import { AnimationElem, AlgoIteration, Color } from "./types"

export function selectionSort(input: number[]): [number[], AnimationElem[]] {
  // setup
  const array = input.slice()
  const animations: AnimationElem[] = []
 
  // outer for loop
  for (let outer=0; outer<array.length-1; outer++) {
    let smallest = array[outer]
    let smallestIndex = outer
    animations.push({
      index: outer,
      value: array[outer]!,
      color: Color.ACTIVE
    })
    // inner loop
    for (let inner=outer+1; inner<array.length; inner++) {
      animations.push({
        index: inner,
        value: array[inner]!,
        color: Color.ACTIVE
      })
      // find the smallest element
      if (array[inner]! < smallest!) {
        smallest = array[inner]
        smallestIndex = inner
      }
    }
    // swap the smallest element if needed
    if (smallestIndex != outer) {
      const temp = array[smallestIndex]
      array[smallestIndex] = array[outer]!
      array[outer] = temp!

      animations.push({
        index: smallestIndex,
        value: array[smallestIndex]!,
        color: Color.ACTIVE
      })
      animations.push({
        index: outer,
        value: array[outer]!,
        color: Color.ACTIVE 
      })
    }
    animations.push({
      index: outer,
      value: array[outer]!,
      color: Color.DONE
    })  
  }
  animations.push({
    index: array.length-1,
    value: array[array.length-1]!,
    color: Color.DONE
  })  
  return [array, animations]
}