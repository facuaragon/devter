import { useEffect, useState } from "react"
import { formatDate } from "./useTimeFormat"

const isRelativeTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.DateTimeFormat

const DATE_UNITS = [
  ["year", 31536000],
  ["month", 2629746],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]
const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000 // trabajamos en segundos

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}
export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))
  useEffect(() => {
    let interval = null
    if (isRelativeTimeFormatSupported) {
      interval = setInterval(() => {
        const newTimeago = getDateDiffs(timestamp)
        setTimeago(newTimeago)
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [timestamp])
  if (!isRelativeTimeFormatSupported) {
    return formatDate(timestamp)
  }
  const rtf = new Intl.RelativeTimeFormat("es", { style: "short" })
  const { value, unit } = timeago
  return rtf.format(value, unit)
}
