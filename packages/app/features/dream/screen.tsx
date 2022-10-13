import { Row } from "../../design/layout";
import { insertionSort } from "../../sortingAlgos/insertionSort";
import { BasicArrayViz } from "./components/viz";

export function DreamScreen() {
  const input = [7,6,8,9,0,1,4,5,2,3]

  return <Row className="flex flex-row items-center justify-center">
    <BasicArrayViz input={input} algorithm={insertionSort} speedMilli={500}/>
  </Row>
}