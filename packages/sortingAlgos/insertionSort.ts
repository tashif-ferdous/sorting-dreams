import { AlgoIteration } from "."

export function* InsertionSort(input: number[]): Generator<AlgoIteration, undefined, undefined> {
  let iteration = 0
  let prevInput = input.slice()
  let currInput = input.slice()
  for (let outer=0; outer < input.length-1; outer++) {
    const range = input.slice(outer)
    let smallestIndex = outer
    for (let inner=outer+1; inner< input.length; inner++) {
      const smallest = currInput[smallestIndex]
      const current = currInput[inner]
      if (smallest! > current!) {
        smallestIndex = inner
      }
      // swap at the end
      if (smallestIndex != outer) {
        prevInput = currInput.slice()
        // swap
        const temp = currInput[outer]
        currInput[outer] = currInput[smallestIndex]!
        currInput[smallestIndex] = temp!
      }

      const output: AlgoIteration = {
        num: iteration,
        prev: prevInput,
        next: currInput,
        comparingIndices: [outer, smallestIndex],
        range: range
      }
      yield output
    }
  }
  return
}