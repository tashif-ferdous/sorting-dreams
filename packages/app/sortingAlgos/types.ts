export interface AlgoIteration {
  prev: number[]
  curr: number[]
  active: number  // element that is active
}

export enum Color {
  DONE = 1,
  ACTIVE = 2
}

export interface AlgoAnimation {
  index: number,
  value: number,
  color: Color,
}