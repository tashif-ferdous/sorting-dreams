export interface AlgoIteration {
  num: number
  prev: number[]
  next: number[]
  comparingIndices: [number, number] // the two numbers we're comparing
  range: number[]
}