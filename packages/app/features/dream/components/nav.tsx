import { Button } from "../../../design/button";
import { Row } from "../../../design/layout";

export interface NavProps {
  onGenerateArrayPressed: () => void,
  onPlayPressed: () => void,
  playPressable: boolean,
  onPausePressed: () => void,
  pausePressable: boolean,
  onResetPressed: () => void,
  // resetPressable: boolean,
  // selectSelectionSort: () => void
}

export function Nav({
  onGenerateArrayPressed, 
  onPlayPressed, 
  playPressable, 
  onPausePressed, 
  pausePressable,
  onResetPressed,
}: NavProps): JSX.Element {
  return <Row>
    <Button title="New Array" onPress={onGenerateArrayPressed}/>
    {/* <Button title="Selection Sort" onPress={selectSelectionSort}/> */}
    <Button title="Play" onPress={onPlayPressed} disabled={!playPressable}/>
    <Button title="Pause" onPress={onPausePressed} disabled={!pausePressable}/>
    <Button title="Reset" onPress={onResetPressed}/> 
  </Row>
}