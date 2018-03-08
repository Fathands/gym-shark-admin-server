exports.getFormatDate = (date) => {
  let day = date
  let Year = 0
  let Month = 0
  let Day = 0
  let CurrentDate = ''
  Year = day.getFullYear()
  Month = day.getMonth() + 1
  Day = day.getDate()
  hours = day.getHours()
  minutes = day.getMinutes()
  secs = day.getSeconds()
  CurrentDate += Year + '-'
  if (Month >= 10) {
    CurrentDate += Month + '-'
  } else {
    CurrentDate += '0' + Month + '-'
  }
  if (Day >= 10) {
    CurrentDate += Day
  } else {
    CurrentDate += '0' + Day + ' '
  }
  if (hours >= 10) {
    CurrentDate += hours + ':'
  } else {
    CurrentDate += '0' + hours + ':'
  }
  if (minutes >= 10) {
    CurrentDate += minutes + ':'
  } else {
    CurrentDate += '0' + minutes + ':'
  }
  if (secs >= 10) {
    CurrentDate += secs + ':'
  } else {
    CurrentDate += '0' + secs
  }
  return CurrentDate
}