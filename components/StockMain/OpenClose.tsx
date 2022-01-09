interface Props {
  translateX: number,
  data: {
    low: number,
    height: number,
    open: number,
    close: number,
  },
  negative: boolean,
  scale: number
}

const Volume: React.FC<Props> = ({ scale, translateX, data, negative }) => {
  return (
    <rect 
      width="4"
      x={translateX}
      y={negative ? data.close * scale : data.open * scale}
      fill={negative ? "red" : "#01b61a"}
      height={Math.abs(data.open - data.close) * scale}
      style={{
        transform: `scale(1, -1)`,
      }}
    />
  )
}

export default Volume