import { Row } from "../../../design/layout"
import { P } from "../../../design/typography"
import { View } from "../../../design/view"

export interface CellProps {
  value: number
  active: boolean
}

export interface GridProps {
  input: number[]
}

export function Cell({value, active}: CellProps): JSX.Element {
  return (<View className="border-2">
    <P>{value}</P>
  </View>)
}

export function Grid({input}: GridProps): JSX.Element {
  return (<Row>
      {input.map((item: number, index: number) => {
        return <Cell value={item} key={index} active={false}/>
      })}
    </Row>)
}