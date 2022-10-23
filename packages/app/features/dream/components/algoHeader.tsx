import { useState } from "react";
import { H1, P } from "../../../design/typography";
import { View } from "../../../design/view";
import { AnimationElem } from "../../../sortingAlgos/types";

export interface AlgoDisplay {
  name: string,
  algorithm: (input: number[]) => [number[], AnimationElem[]],
  selected: boolean
} 

export interface algoHeaderProps {
  algos: AlgoDisplay[],
}

export function getSelectedAlgo(algoDisplays: AlgoDisplay[]): AlgoDisplay {
  return algoDisplays.find((display) => display.selected)!;
}

export function AlgoHeader({algos}: algoHeaderProps): JSX.Element {
  const [currentIdx, setCurrentIdx] = useState(algos.findIndex((display) => display.selected)!)
  return (<View className="flex flex-col justify-start align-middle">
    <H1 className="mb-0">{algos[currentIdx]?.name}</H1>
    <P className="mt-0 text-center">Sorts bars by height</P>
  </View>)
}