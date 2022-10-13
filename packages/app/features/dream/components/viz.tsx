import { useEffect, useRef, useState } from "react"
import { Button } from "react-native"
import { Row } from "../../../design/layout"
import { Grid } from "./grid"

export function BasicArrayViz({input, algorithm, speedMilli}) : JSX.Element {
  const [array, setArray] = useState(input)
  const [finished, setFinished] = useState(false)
  const [animating, setAnimating] = useState(false)

  const algoIter = useRef(algorithm(array.slice()))

  useEffect(() => {
    const id = setInterval(() => {
      if (animating) {
        if (!finished) {
          const {value, done} = algoIter.current.next()
          if (done) {
            console.log('done animating!')
            setFinished(true)
            setAnimating(false)
          } else {
            console.log('next iteration of the algo:', value)
            const {next} = value
            setArray(next)
          }        
        }    
      }
    }, speedMilli)
  
    return () => {
      clearInterval(id)
    }
  }, [array, finished, animating, speedMilli, input, algoIter])
  
  const reset = (event) => {
    console.log('resetting', event)
    setArray(input.slice())
    setAnimating(false)
    setFinished(false)
    algoIter.current = null
    algoIter.current = algorithm(input.slice())
  }

  const animate = (event) => {
    console.log('animating', event)
    setAnimating(true)
  } 

  return (<>
    <Grid input={array} />
    <Row className="flex flex-row justify-center items-center gap-4 pt-3">
      <Button title="Reset" onPress={(event) => reset(event)} disabled={!animating}/>
      <Button title="Start" onPress={(event) => animate(event)} disabled={animating || finished}/>
    </Row>
  </>)
}