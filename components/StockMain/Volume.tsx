interface Props {
  translateX: number,
  value: number,
  negative: boolean,
}

const Volume: React.FC<Props> = ({ translateX, value, negative }) => {
  return (
    <rect 
      width="4"
      x={translateX}
      y="0"
      fill={negative ? "red" : "#01b61a"}
      height={value}
      style={{
        transform: 'scale(1, -1)',
        opacity: 0.5
      }}
    />
  )
}

export default Volume