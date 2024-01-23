type ButtonProps = {
  text: string
}

export const Button = ({ text }: ButtonProps) => {
  return (
    <button className="bg-[#00ADB5] text-white font-bold text-sm rounded mx-1 my-1">
      { text }
    </button>
  )
}
