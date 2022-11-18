import { useEffect, useState } from 'react'

const DATE_UNITS = [
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiffs = timestamp => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    // if(Math.abs(elapsed) > secondsInUnit || unit === 'second') {

    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo (timestamp) {
  // min 28
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp)
      setTimeAgo(newTimeAgo)
    }, 10000) // 10 seg

    return () => clearInterval(interval)
  }, [timestamp])

  const rtf = new Intl.RelativeTimeFormat('es', {
    style: 'long'
  })
  const { value, unit } = timeAgo

  return rtf.format(value, unit)
}
