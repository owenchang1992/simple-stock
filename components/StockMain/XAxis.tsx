import style from './StockMain.module.scss'

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
  }[],
}

const XAxis: React.FC<XAxisProps> = ({ timeSeries, size, scaleX, offsetX }) => {
  const getX = () => {
    const getTranslateX = (title: number): number => {
      const unit = size.width / timeSeries.length;
      return title * unit / scaleX + unit * offsetX
    }
 
    return timeSeries.map((data) => {
      const translateX = getTranslateX(data.xAxisTitle)
      console.log(data)
      // TODO: auto adjust the title interval level
      return (
        <>
          {
            data.xAxisTitle % 10 === 0
            && translateX >= 0
            && translateX <= size.width
            && (
              <XAxisTick
                key={data.xAxisTitle}
                title={data.xAxisTitle.toString()}
                translateX={getTranslateX(data.xAxisTitle)}
              />
            )
          }
        </> 
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