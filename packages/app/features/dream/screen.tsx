import { Row } from "../../design/layout";
import { View } from "../../design/view";
import { selectionSort } from "../../sortingAlgos/selectionSort";
import { BasicArrayViz } from "./components/viz";

export function DreamScreen() {
  const input = [7,6,8,9,0,1,4,5,2,3]

  return <View className="flex flex-row items-center justify-center">
    <BasicArrayViz input={input} algorithm={selectionSort} speedMilli={500}/>
  </View>
}