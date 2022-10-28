const timeFormatter = (time: string) => {
  return time.split(":").slice(0, 2).join(":")
}
export default timeFormatter
