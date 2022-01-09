interface Props {
  translateX: number,
  data: {
    low: number,
    height: number,
    open: number,
    close: number,
  },
  negative: boolean,
  scale: number,
  ybase: number,
}

const Volume: React.FC<Props> = ({ scale, translateX, data, negative, ybase }) => {
  return (
    <rect 
      width="4"
      x={translateX}
      y={negative ? (data.close - ybase) * scale : (data.open - ybase) * scale}
      fill={negative ? "red" : "#01b61a"}
      height={Math.abs(data.open - data.close) * scale}
      style={{
        transform: `scale(1, -1)`,
      }}
    />
  )
}

export default Volume