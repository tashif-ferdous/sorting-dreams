import { useState } from "react";
import { Pressable } from "../../../design/button";
import { Row } from "../../../design/layout";
import { H1, P } from "../../../design/typography";
import { View } from "../../../design/view";
import { AnimationElem } from "../../../sortingAlgos/types";
import { Left } from "../icons/left";
import { Right } from "../icons/right";

export interface AlgoDisplay {
  name: string,
  algorithm: (input: number[]) => [number[], AnimationElem[]],
  description: string | undefined,
} 

export interface algoHeaderProps {
  algos: AlgoDisplay[],
  initialSelectedIdx: number,
  onAlgoChange: (algo: (input: number[]) => [number[], AnimationElem[]]) => void
}

const leftIdx = (currentIdx: number, algos: AlgoDisplay[]): number => {
  if (currentIdx == 0) {
    return algos.length-1
  } else {
    return currentIdx - 1
  }
}

const rightIdx = (currentIdx: number, algos: AlgoDisplay[]): number => {
  if (currentIdx == algos.length-1) {
    return 0
  } else {
    return currentIdx + 1
  }
}

export function AlgoHeader({algos, initialSelectedIdx, onAlgoChange}: algoHeaderProps): JSX.Element {
  const [currentIdx, setCurrentIdx] = useState(initialSelectedIdx)
  const moveLeft = () => {
    const nextIdx = leftIdx(currentIdx, algos)
    setCurrentIdx(nextIdx)
    onAlgoChange(algos[nextIdx]!.algorithm)
  }
  const moveRight = () => {
    const nextIdx = rightIdx(currentIdx, algos)
    setCurrentIdx(nextIdx)
    onAlgoChange(algos[nextIdx]!.algorithm)
  }

  return (<View className="flex flex-col justify-start align-middle">
    <Row className='flex-row justify-center items-center my-4 mb-0'>
      <Pressable onPress={moveLeft}><Left /></Pressable>
      <H1 className="mb-0 my-0">{algos[currentIdx]? algos[currentIdx]!.name : "Loading..."}</H1>
      <Pressable onPress={moveRight}><Right /></Pressable>
    </Row>
    <P className="mt-0 text-center">{algos[currentIdx] && algos[currentIdx]!.description}</P>
  </View>)
}