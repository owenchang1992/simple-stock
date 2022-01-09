import style from './StockMain.module.scss'
import Volume from './Volume'
import LowHeight from './LowHeight'
import OpenClose from './OpenClose'
import { VALUE_VOLUME_RATIO, BUFFER_X, BUFFER_Y } from '../../constant'

// TODO: auto adjust the title interval level
const xAxisUnit = 10

interface TickProps {
  title: string,
  translateX: number
}

const XAxisTick: React.FC<TickProps> = ({ title, translateX }) => (
  <g className="tick" opacity="1" transform={`translate(${translateX})`}>
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">{title}</text>
  </g>
)

interface XAxisProps {
  size: {
    width: number,
    height: number,
  },
  scaleX: number,
  offsetX: number,
  stockData: {
    metaData: any,
    timeSeries: {
      open: number,
      height: number,
      low: number,
      close: number,
      volume: number,
      title: string
    }[],
  }
}

const XAxis: React.FC<XAxisProps> = ({ stockData, size, scaleX, offsetX }) => {
  const { timeSeries, metaData } = stockData


  const getTranslateX = (title: number): number => {
    const unit = size.width / timeSeries.length;
    return title * unit / scaleX + unit * offsetX
  }

  const getScaleY = (value: { max: any; min: any }) => {
    const { max, min } = value

    return size.height / (max - min + 2 * BUFFER_Y)
  }

  const volumeUnit = metaData.statistics.volume.max
  const scale = getScaleY(metaData.statistics.value)
  const ybase = metaData.statistics.value.min - BUFFER_Y

  const titleList = Array.from(
    Array(BUFFER_X * 2 + timeSeries.length + 1).keys(),
    x => ({
      xAxisTitle: x - BUFFER_X,
      ...stockData.timeSeries[x - BUFFER_X],
    })
  )

  return (  
    <g className={style['x-axis']} style={{transform: `translateY(${size.height}px)`}}>
      <path
        className="domain"
        stroke="currentColor"
        d={`M0.5,6V0.5H${size.width}V6`}
      />
      {
        titleList.map((data) => {
          const translateX = getTranslateX(data.xAxisTitle)
    
          // remove overflow items
          return (
            translateX >= 0
            && translateX <= size.width
            && (
              <g key={String(data.xAxisTitle)}>
                {
                  data.title && (
                    <>
                      <OpenClose
                        scale={scale}
                        ybase={ybase}
                        negative={data.open - data.close > 0}
                        translateX={getTranslateX(data.xAxisTitle)}
                        data={data}
                      />
                      <LowHeight
                        ybase={ybase}
                        scale={scale}
                        translateX={getTranslateX(data.xAxisTitle)}
                        data={data}
                      />
                      <Volume 
                        translateX={getTranslateX(data.xAxisTitle)}
                        negative={data.open - data.close > 0}
                        value={(data.volume / volumeUnit * size.height * VALUE_VOLUME_RATIO)}
                      />
                    </>
                  )
                }
                {
                  data.xAxisTitle % xAxisUnit === 0 && (
                    <XAxisTick
                      title={data.xAxisTitle.toString()}
                      translateX={getTranslateX(data.xAxisTitle)}
                    />
                  )
                }
              </g>
            )
          )
        })
      }
    </g>
  )
}

export default XAxis