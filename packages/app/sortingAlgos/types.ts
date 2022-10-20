export interface AlgoIteration {
  prev: number[]
  curr: number[]
  active: number  // element that is active
}

export enum Color {
  NEUTRAL = 0,
  DONE = 1,
  ACTIVE = 2
}

export interface AnimationElem {
  index: number,
  value: number,
  color: Color,
}