const moment = require('moment');

function stringParser(str) {
    try {
        let time = null
        let date = null

        // Support time in this form : "9-" or "10 to" or "2pm to"
        if (res = /^(\d+)(pm)?(?:-|(?: to))$/.exec(str)) {
            now = new Date()

            entryTotalMinutes = parseInt(res[1]) * 60 + (res[2] ? 720 : 0)
            nowTotalMinutes = now.getHours() * 60 + now.getMinutes()

            if (entryTotalMinutes < nowTotalMinutes) {
                time = nowTotalMinutes - entryTotalMinutes
            }
        }
        else {
            // Date Parsing

            // Support date in this form : "month day <time>"
            if (res = /^((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*),? (\d+),?(?: (.+))?$/i.exec(str)) {
                // HERE EN FAIT CA PREND Y(mois) 2(jour) = problème => dans la regex prendre les 3 premieres lettres in les 3 premieres de each month sans case
                str = res[3] ? res[3] : null

                date = moment().month(res[1]).set("date", res[2]);

                if (date > moment()) {
                    date.subtract(1, "year")
                }
            }
            // Support date in this form : "day <time>" or "y <time>"
            else if (res = /^((?:y|yesterday|mon|tue|wed|thu|fri|sat|sun)[a-z]*),?(?: (.+))?$/i.exec(str)) {
                str = res[2] ? res[2] : null

                if (res[1] == 'y' || res[1] == 'yesterday') {
                    date = moment().subtract(1, 'days');
                }
                else {
                    date = moment().day(res[1]);
                }
            }
            // Support date in this form : "2/5, <time>" or "1/1/2017, <time>"
            else if (res = /^(\d+)\/(\d+)(?:\/(\d+)?)?,?(?: (.+))?$/.exec(str)) {
                str = res[4] ? res[4] : null

                res[1] = ('0' + res[1]).substr(-2)
                res[2] = ('0' + res[2]).substr(-2)
                if (res[3]) {
                    res[3] = res[3].substr(-2)
                }

                temp = moment(res[1] + res[2] + res[3], "MMDDYY")

                if (temp > moment() && res[3] == null) {
                    temp.subtract(1, "year")
                }

                // Control that date isn't on the future
                if (temp < moment()) {
                    date = temp
                }
            }

            if (str) {
                // Time parsing

                // Support time in this form : "2h13m"
                if (res = /^(\d+)(?:(m)|(h)(?:(\d+)m?)?)?$/.exec(str)) {
                    if (!res[3] && res[1] > 12) {
                        time = res[1]
                    }
                    else {
                        time = res[1] * 60

                        if (res[4])
                            time += parseInt(res[4])
                    }
                }
                // Support time in this form : "2.75"
                else if (res = /^\d*[\.,]\d+$/.exec(str)) {
                    time = parseFloat(res[0].replace(',', '.')) * 60
                }
                // Support time in this form : "1:15"
                else if (res = /^(\d+)[:](\d+)$/.exec(str)) {
                    time = res[1] * 60 + parseInt(res[2])
                }
                // Support time in this form : "5pm-8"
                else if (res = /^(\d+)(pm|am)?-(\d+)(pm|am)?$/.exec(str)) {
                    lambda = parseInt(res[3]) - parseInt(res[1])

                    if (res[2] == 'pm') {
                        lambda -= 12
                    }

                    if (res[4] == 'pm' || (res[4] == null && lambda <= 0)) {
                        lambda += 12
                    }

                    if (lambda > 0) {
                        time = lambda * 60
                    }
                }
            }
        }

        if (date == null) {
            date = moment()
        }

        date = date.format('MM-DD-YYYY')

        // Round time
        if (time != null) {
            time = Math.ceil(time / 15) * 15;
        }
        
        return {
            "date": date,
            "time": time
        }
    }
    catch (error) {
        console.log(error)
        return null
    }
}

function descriptionParser(str) {
    return str ? str.match(/#[\w]+/g) : null
}

module.exports = {
    stringParser,
    descriptionParser
}