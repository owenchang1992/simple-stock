interface Props {
  translateX: number,
  data: {
    low: number,
    height: number,
    open: number,
    close: number,
  }
  scale: number
}

const LowHeight: React.FC<Props> = ({ scale, translateX, data }) => {
  return (
    <line
      width="1"
      x1={translateX + 2}
      y1={`${data.height * scale}`}
      x2={translateX + 2}
      y2={`${data.low * scale}`}
      style={{
        stroke: `${data.open - data.close > 0 ? "red" : "#01b61a"}`,
        transform: 'scale(1, -1)',
      }}
    /> 
  )
}

export default LowHeight