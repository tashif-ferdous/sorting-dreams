import { Row } from "../../../design/layout"
import { StyleSheet } from 'react-native'

interface ProgressProps {
  percentage: number 
}

export function Progress({percentage}: ProgressProps) {
  const styles = StyleSheet.create({
    width: {
      width: `${percentage.toFixed(2)}%`
    }
  })
  return (
    <Row className='min-w-full min-h-full flex-row items-start'>
      <Row style={styles.width} className='bg-red-500 min-h-full'></Row>
    </Row>
  )
}