import { Row } from "../../../design/layout"
import { AnimatedView, View } from "../../../design/view"
import { AnimationElem, Color } from "../../../sortingAlgos/types"
import { StyleSheet } from "react-native"
import { useMemo } from "react"

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

function calculateHeight(input: number, max:number, maxHeightPercantage=95): number {
  const heightPercentage = ((input / max) * maxHeightPercantage)
  return heightPercentage
}

function calculateWidth(input: number, numBars: number, maxWidthPercentage=95): number {
  const widthPercentage = ((input / numBars) * maxWidthPercentage)
  return widthPercentage
}

export function Bar({value, max, numBars, active, done}: BarProps): JSX.Element {
  const styles = useMemo(() => {
    const color = done? 'green': 'red'
    return StyleSheet.create({
    bar: {
      backgroundColor: color,
      height: `${calculateHeight(value, max).toFixed(2)}%`,
      width: `${calculateWidth(1, numBars).toFixed(2)}%`,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      borderWidth: 1,
      borderColor: active? 'black': 'white'
    }
  })}, [value, max, numBars, active, done])

  return (
    <AnimatedView style={styles.bar} animate={{
      height: styles.bar.height,
    }}/>
  )
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