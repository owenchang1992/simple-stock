import { SetStateAction, useState } from "react"

interface Props {
  onSubmit: (input: string) => void
}

const Input: React.FC<Props> = ({ onSubmit }) => {
  const [input, setInput] = useState('')

  const handleInput = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value)
  }

  return (
    <div>
      <input 
        value={input}
        onChange={handleInput}
      />
      <button onClick={() => onSubmit(input)}>Search</button>
    </div>
  )
}

export default Input