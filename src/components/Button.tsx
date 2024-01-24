type ButtonProps = {
  text: string;
  onClick: (attribute: string) => void;
}

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={() => onClick(text)}
      className="bg-[#00ADB5] text-white font-bold text-sm rounded mx-1 my-1">
      { text }
    </button>
  )
}
