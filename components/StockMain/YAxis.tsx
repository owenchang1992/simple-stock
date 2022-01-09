import { BUFFER_Y } from '../../constant'

interface Props {
  statistics: {
    value: {
      max: number,
      min: number,
    }
  },
  size: {
    height: number,
    width: number,
  }
}

const YAxis: React.FC<Props> = ({ statistics, size }) => {
  const { max, min } = statistics.value
  let YTitles = Array.from(
    Array(Math.round(max - min + 2 * BUFFER_Y)).keys(),
    x => x + Math.round(min - BUFFER_Y),
  ).reverse()

  return (
    <g
      className="y-axis"
      fill="none"
      fontSize="10"
      fontFamily="sans-serif"
      textAnchor="end"
    >
      <path
        className="domain"
        stroke="currentColor"
        d={`M-6,${size.height}H0.5V0.5H-6`}
      />
      {
        YTitles.map((item, index) => (
          item % 10 === 0 && (
            <g
              key={item}
              className="tick"
              opacity="1"
              transform={`translate(0, ${index * size.height / YTitles.length})`}
            >
              <line stroke="currentColor" x2="-6"></line>
              <text fill="currentColor" x="-9" dy="0.32em">{item}</text>
            </g>
          )
        ))
      }
    </g>
  )
}

export default YAxis