import { AlgoIteration } from "./types"

export function* selectionSort(input: number[]): Generator<AlgoIteration, undefined, undefined> {
  // setup
  let prevArray = input.slice()
  let currArray = input.slice()
  let currentIteration: AlgoIteration = {
    prev: prevArray,
    curr: currArray,
    active: currArray[0]!
  }
 
  // outer for loop
  for (let outer=0; outer<input.length-1; outer++) {
    let smallest = currArray[outer]
    let smallestIndex = outer
    // inner loop
    for (let inner=outer+1; inner<input.length; inner++) {
      // find the smallest element
      if (currArray[inner]! < smallest!) {
        smallest = currArray[inner]
        smallestIndex = inner
      }

      currentIteration = {
        prev: prevArray,
        curr: currArray,
        active: currArray[inner]!
      }
      yield currentIteration
    }
    // swap the smallest element if needed
    if (smallestIndex != outer) {
      prevArray = currArray
      currArray = currArray.slice()
      const temp = currArray[smallestIndex]
      currArray[smallestIndex] = currArray[outer]!
      currArray[outer] = temp!
    }
    currentIteration = {
      prev: prevArray,
      curr: currArray,
      active: currArray[outer]!
    }
    yield currentIteration
  }
  return
}