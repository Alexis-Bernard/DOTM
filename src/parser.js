function stringParser(str) {
    try {
        minutes = convertTimeString(str)

        if (minutes == null) {
            return {
                "date": '',
                "time": ''
            }
        }
        else {
            date = new Date()
            date.setHours(0, 0, 0, 0)

            return {
                "date": date,
                "time": minutes
            }
        }
    }
    catch (error) {
        console.log(error)
        return null
    }
}

function convertTimeString(str) {
    minutes = null

    try {
        if (res = /^(\d+)(?:(m)|(h)(?:(\d+)m?)?)?$/.exec(str)) {
            minutes = parseInt(res[1]) * (res[2] || (!res[3] && res[1] > 12) ? 1 : 60)

            if (res[4])
                minutes += parseInt(res[4])
        }

        // Round minutes
        if (minutes != null) {
            return Math.ceil(minutes / 15) * 15;
        }
        else {
            return null
        }
    }
    catch (error) {
        return null
    }
}

module.exports = {
    stringParser
}