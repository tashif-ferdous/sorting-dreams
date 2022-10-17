import { Row } from "../../../design/layout"
import { P } from "../../../design/typography"
import { View } from "../../../design/view"

export interface BarProps {
  value: number
  active: boolean
  done: boolean
  max: number
}

export interface GridProps {
  input: number[],
  active: Set<number>,
  done: Set<number>
}

function calculateHeight(input: number, max:number, maxHeightPercantage=75) {
  const heightPercentage = Math.floor((input / max) * maxHeightPercantage)
  return heightPercentage
}

export function Bar({value, max, active, done}: BarProps): JSX.Element {
  let className = `border-1`
  if (done) {
    className = `${className} bg-indigo-500`
  }
  else if (active) {
    className = `${className} bg-green-500`
  } else {
    className = `${className} bg-orange-500`
  }
  const heightStyle = {
    height: `${calculateHeight(value, max)}%`
  }
  return (<View className={`${className} p-1 w-2`} style={heightStyle}>
  </View>)
}

export function BarChart({input, active, done}: GridProps): JSX.Element {
  const max: number = Math.max(...input)

  const isActive = (index: number) => active.has(index)
  const isDone = (index: number) => done.has(index)
  return (<Row className="h-[75vh] flex-row content-evenly items-end">
      {input.map((item: number, index: number) => {
        return <Bar value={item} key={index} active={isActive(index)} done={isDone(index)} max={max} />
      })}
    </Row>)
}