import { Row } from "../../../design/layout"
import { View } from "../../../design/view"
import { AnimationElem, Color } from "../../../sortingAlgos/types"

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

function calculateHeight(input: number, max:number, maxHeightPercantage=95) {
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

export interface BarChartProps {
  input: AnimationElem[]
}
export function BarChart({input}: BarChartProps) {
  const max: number = Math.max(...input.map(elem => elem.value))
  return (
    <Row className="h-full flex-row content-evenly items-end">
      {input.map((elem: AnimationElem, index: number) => {
        return <Bar value={elem.value} key={index} active={elem.color === Color.ACTIVE} done={elem.color === Color.DONE} max={max} />
      })}
    </Row>) 
}