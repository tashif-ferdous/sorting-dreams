import { Row } from "../../../design/layout"
import { P } from "../../../design/typography"
import { View } from "../../../design/view"

export interface CellProps {
  value: number
  active: boolean
  done: boolean
  first: boolean
}

export interface GridProps {
  input: number[],
  active: Set<number>,
  done: Set<number>
}

export function Cell({value, active, done, first}: CellProps): JSX.Element {
  let className = (first)? "border-2": "border-b-2 border-t-2 border-r-2"
  if (active) {
    className = `${className} bg-green-500`
  }
  else if (done) {
    className = `${className} bg-indigo-500`
  }
  return (<View className={`${className} p-2`}>
    <P>{value}</P>
  </View>)
}

export function Grid({input, active, done}: GridProps): JSX.Element {
  const isActive = (index) => active.has(index)
  const isDone = (index) => done.has(index)
  return (<Row>
      {input.map((item: number, index: number) => {
        return <Cell value={item} key={index} active={isActive(index)} done={isDone(index)} first={index === 0}/>
      })}
    </Row>)
}