import { Row } from "../../../design/layout";
import { Pressable } from "../../../design/button";
import { Play } from "../icons/play";
import { Pause } from "../icons/pause";
import { Refresh } from "../icons/refresh";
import { Plus } from "../icons/plus";

export interface NavProps {
  done: boolean,
  onGenerateArrayPressed: () => void,
  onPlayPressed: () => void,
  playPressable: boolean,
  onPausePressed: () => void,
  pausePressable: boolean,
  onResetPressed: () => void,
}

export function Player({
  onGenerateArrayPressed, 
  onPlayPressed, 
  playPressable, 
  done,
  onPausePressed, 
  pausePressable,
  onResetPressed,
}: NavProps): JSX.Element {
  const showPlay = !done && playPressable
  const showPause = !done && pausePressable
  
  return <Row className='gap-2 border-2 border-rose-500 rounded-2xl'>
    <Pressable onPress={onGenerateArrayPressed} className='p-2'>
      <Plus />
    </Pressable>
    {showPlay && (<Pressable className='p-2'
      onPress={onPlayPressed}
    >
      <Play />
    </Pressable>)}
    {showPause && (<Pressable className='p-2'
      onPress={onPausePressed}
    >
      <Pause />
    </Pressable>)}
    <Pressable className='p-2' onPress={onResetPressed}>
      <Refresh />
    </Pressable>
  </Row>
}