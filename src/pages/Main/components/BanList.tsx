type BanListProps = {
  banList: string[]
  handleClickItem: (attribute: string) => void
}

export const BanList = ({ banList, handleClickItem }: BanListProps) => {
  return (
    <div
      className="fixed bg-slate-500 top-0 right-0 bottom-0 h-screen w-full overflow-y-scroll w-2/12 flex justify-start items-center center flex-col">
      <div className="text-2xl mt-5">Ban List</div>
      <div className="flex flex-col items-center">
        { banList.map((attribute) => {
          return (
            <div className="flex flex-row justify-between">
              <button className="text-xl mt-5" onClick={() => handleClickItem(attribute)}>{ attribute }</button>
            </div>
          )
        }) }
      </div>
    </div>
  )
}