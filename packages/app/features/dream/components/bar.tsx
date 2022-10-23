import { Row } from "../../../design/layout"
import { View } from "../../../design/view"
import { AnimationElem, Color } from "../../../sortingAlgos/types"

export interface BarProps {
  value: number
  active: boolean
  done: boolean
  max: number
  numBars: number
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

function calculateWidth(input: number, numBars: number, maxWidthPercentage=95) {
  const widthPercentage = ((input / numBars) * maxWidthPercentage)
  return widthPercentage
}

export function Bar({value, max, numBars, active, done}: BarProps): JSX.Element {
  let className = `border-1`
  if (done) {
    className = `${className} bg-indigo-500`
  }
  else if (active) {
    className = `${className} bg-green-500`
  } else {
    className = `${className} bg-orange-500`
  }
  const heightAndWidth = {
    height: `${calculateHeight(value, max)}%`,
    width: `${calculateWidth(1, numBars)}%`
  }
  return (<View className={`${className} p-1`} style={heightAndWidth}>
  </View>)
}

export interface BarChartProps {
  input: AnimationElem[]
}
export function BarChart({input}: BarChartProps) {
  const max: number = Math.max(...input.map(elem => elem.value))
  return (
    <Row className="h-full w-full content-evenly items-end justify-center">
      {input.map((elem: AnimationElem, index: number) => {
        return <Bar value={elem.value} key={index} active={elem.color === Color.ACTIVE} done={elem.color === Color.DONE} max={max} numBars={input.length}/>
      })}
    </Row>) 
}