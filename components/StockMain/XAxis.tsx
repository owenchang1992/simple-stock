import style from './StockMain.module.scss'
import Volume from './Volume'
import LowHeight from './LowHeight'
import OpenClose from './OpenClose'

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
  timeSeries: {
    xAxisTitle: number
    open: number,
    height: number,
    low: number,
    close: number,
    volume: number,
    title: string
  }[],
  matadata: any
}

const XAxis: React.FC<XAxisProps> = ({ matadata, timeSeries, size, scaleX, offsetX }) => {
  const getX = () => {
    const getTranslateX = (title: number): number => {
      const unit = size.width / timeSeries.length;
      return title * unit / scaleX + unit * offsetX
    }

    return timeSeries.map((data) => {
      const translateX = getTranslateX(data.xAxisTitle)

      // TODO: detect the max height of volume
      const volumeUnit = matadata.statistics.volume.max
      const scale = size.height / matadata.statistics.value.max

      // TODO: auto adjust the title interval level
      return (
        translateX >= 0
        && translateX <= size.width 
        && (
          <>
            {
              data.open
              && data.close
              && (
                <OpenClose
                  scale={scale}
                  negative={data.open - data.close > 0}
                  translateX={getTranslateX(data.xAxisTitle)}
                  data={data}
                />
              )
            }
            {
              data.low
              && data.height
              && (
                <LowHeight
                  scale={scale}
                  translateX={getTranslateX(data.xAxisTitle)}
                  data={data}
                />
              )
            }
            {
              data.volume && (
                <Volume 
                  translateX={getTranslateX(data.xAxisTitle)}
                  negative={data.open - data.close > 0}
                  value={(data.volume / volumeUnit * size.height * 0.2)}
                />
              )
            }
            {
              data.xAxisTitle % 10 === 0 && (
                <XAxisTick
                  key={String(data.xAxisTitle)}
                  title={data.xAxisTitle.toString()}
                  translateX={getTranslateX(data.xAxisTitle)}
                />
              )
            }
          </>
        )
      )
    })
  }

  return (
    <svg className={style.gragh}>
      <g className={style['x-axis']} style={{transform: `translateY(${size.height}px)`}}>
        <path
          className="domain"
          stroke="currentColor"
          d={`M0.5,6V0.5H${size.width}V6`}
        ></path>
        { getX() }
      </g>
    </svg>
  )
}

export default XAxis