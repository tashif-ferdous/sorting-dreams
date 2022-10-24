import { Row } from "../../../design/layout";
import { Pressable } from "../../../design/button";
import { Play } from "../icons/play";
import { Pause } from "../icons/pause";
import { Refresh } from "../icons/refresh";
import { Plus } from "../icons/plus";

export interface NavProps {
  onGenerateArrayPressed: () => void,
  onPlayPressed: () => void,
  playPressable: boolean,
  playShowable: boolean,
  onPausePressed: () => void,
  pausePressable: boolean,
  onResetPressed: () => void,
}

export function Player({
  onGenerateArrayPressed, 
  onPlayPressed, 
  playPressable, 
  playShowable,
  onPausePressed, 
  pausePressable,
  onResetPressed,
}: NavProps): JSX.Element {
  return <Row className='gap-2 border-2 border-rose-500 rounded-2xl'>
    <Pressable onPress={onGenerateArrayPressed} className='p-2'>
      <Plus />
    </Pressable>
    {playShowable && (<Pressable className='p-2'
      onPress={onPlayPressed}
      disabled={!playPressable}
    >
      <Play />
    </Pressable>)}
    {pausePressable && (<Pressable className='p-2'
      onPress={onPausePressed}
    >
      <Pause />
    </Pressable>)}
    <Pressable className='p-2' onPress={onResetPressed}>
      <Refresh />
    </Pressable>
  </Row>
}