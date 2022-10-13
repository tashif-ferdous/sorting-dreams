import { Row } from "../../../design/layout"
import { P } from "../../../design/typography"
import { View } from "../../../design/view"

export interface CellProps {
  value: number
  active: boolean
  first: boolean
}

export interface GridProps {
  input: number[]
}

export function Cell({value, active, first}: CellProps): JSX.Element {
  const className = (first)? "border-2": "border-b-2 border-t-2 border-r-2"

  return (<View className={`${className} p-2`}>
    <P>{value}</P>
  </View>)
}

export function Grid({input}: GridProps): JSX.Element {
  return (<Row>
      {input.map((item: number, index: number) => {
        return <Cell value={item} key={index} active={false} first={index === 0}/>
      })}
    </Row>)
}