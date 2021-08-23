import {days, months} from './constants'

export const getTime = (UTCDate) => {
    let d = new Date(UTCDate)
    let hours = d.getUTCHours()
    let minutes = d.getUTCMinutes()
    let time = "am"
    if (hours >= 12) {
        hours = hours - 12
        time = "pm"
    }
    return hours + ":" + minutes + time
}
export const getDate = (UTCDate) => {
    let d = new Date(UTCDate)
    let date = d.getUTCDate()
    let month = d.getUTCMonth()
    let year = d.getUTCFullYear()

    return date + "/" + month + "/" + year
}
export const getLastUpdateFormated = (t, UTCDate) => {
    let d = new Date(UTCDate)
    let day = days[d.getUTCDay()]
    return t(day) + " " + getDate(UTCDate) + " at " + getTime(UTCDate)
}
export const getPromisedDateFormated = (t, UTCDate) => {
    if(UTCDate){
        let d = new Date(UTCDate)
        let month = months[d.getUTCMonth()]
        return d.getUTCDate(UTCDate) + " " + t(month) + " " + d.getUTCFullYear(UTCDate)
    }
    return null
}