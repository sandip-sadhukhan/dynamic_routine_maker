export const capitalize = (name: string) => {
  const nameList = name.split("")
  return (
    nameList[0].toUpperCase() + nameList.slice(1).join("")
  )
}
