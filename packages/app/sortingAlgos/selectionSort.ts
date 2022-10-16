import { AlgoIteration } from "."

export function* selectionSort(input: number[]): Generator<AlgoIteration, undefined, undefined> {
  // setup
  let iteration = 0
  let prevArray = input.slice()
  let currArray = input.slice()
  let currentIteration: AlgoIteration = {
    num: iteration,
    prev: prevArray,
    curr: currArray,
    index: 0
  }
 
  // outer for loop
  for (let outer=0; outer<input.length-1; outer++) {
    let smallest = currArray[outer]
    let smallestIndex = outer
    // inner loop
    for (let inner=outer+1; inner<input.length; inner++) {
      iteration += 1
      // find the smallest element
      if (currArray[inner]! < smallest!) {
        smallest = currArray[inner]
        smallestIndex = inner
      }

      currentIteration = {
        num: iteration,
        prev: prevArray,
        curr: currArray,
        index: inner
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
      num: iteration,
      prev: prevArray,
      curr: currArray,
      index: outer
    }
    yield currentIteration
  }
  return
}