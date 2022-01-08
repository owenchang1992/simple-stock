import { LegacyRef, useEffect, useRef, useState } from 'react'
import style from './StockMain.module.scss'
import XAxis from './XAxis'

type RefType = LegacyRef<HTMLDivElement> | null

interface Stock {
  open: number,
  height: number,
  low: number,
  close: number,
  volume: number,
  title: string
}
interface Props {
  timeSeries: Stock[]
}

/**
 * states:
 *  size: container width and height
 *  offsetX: pan level
 *  scaleX: zoom level
 * 
 *  TODO: adjust width when window size change
 * @returns 
 */
const StockMain: React.FC<Props>= ({ timeSeries }) => {
  const svgRef: RefType= useRef(null)

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  const [scaleX, setScaleX] = useState(1)
  const [offsetX, setOffsetX] = useState(0)

  const zoom = (event: { deltaY: number; }) => {
    let scale = scaleX

    if (event.deltaY < 0) {
      // Zoom in
      scale += 0.01
    } else {
      // Zoom out
      scale -= 0.01
    }

    // TODO: Limit the range of scale
    setScaleX(Math.min(Math.max(0.4, scale), 1))
  }

  const pan = (event: { clientX: number }) => {
    if (svgRef?.current) {
      svgRef.current.onmousemove = (e) => {
        // TODO: Adjust the limit of pan level
        setOffsetX(event.clientX - e.clientX)
      }

      svgRef.current.onmouseup = (e) => {
        if (svgRef?.current) {
          svgRef.current.onmousemove = null
          svgRef.current.onmouseup = null
        }
      }
    }
  }

  useEffect(() => {
    if (svgRef?.current) {
      setSize({
        height: svgRef.current.offsetHeight,
        width: svgRef.current.offsetWidth,
      })
    }
  }, [svgRef])
  
  // TODO: customize length
  const length = 200

  let titleList = Array.from(
    Array(length + 1).keys(),
    x => ({ 
      xAxisTitle: x - 40,
      ...timeSeries[x - 40],
    })
  )

  return (
    <div
      className={style.container}
      ref={svgRef}
      onWheel={zoom}
      onMouseDown={pan}
    >
      <XAxis
        size={size}
        scaleX={scaleX}
        offsetX={offsetX}
        timeSeries={titleList}
      />
    </div>
  )
}

export default StockMain