const parser = require('../src/parser');
const moment = require('moment');

test('"15" gives today and 15', () => {
    res = parser.stringParser(
        "15"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        15
    );
});

test('"13" gives today and 15', () => {
    res = parser.stringParser(
        "13"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        15
    );
});

test('"15m" gives today and 15', () => {
    res = parser.stringParser(
        "15m"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        15
    );
});

test('"15h" gives today and 900', () => {
    res = parser.stringParser(
        "15h"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        900
    );
});

test('"2h" gives today and 120', () => {
    res = parser.stringParser(
        "2h"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        120
    );
});

test('"6h" gives today and 360', () => {
    res = parser.stringParser(
        "6h"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        360
    );
});

test('"2h13m" gives today and 135', () => {
    res = parser.stringParser(
        "2h13m"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        135
    );
});

test('"1,17" gives today and 75', () => {
    res = parser.stringParser(
        "1,17"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        75
    );
});

test('"1,5" gives today and 90', () => {
    res = parser.stringParser(
        "1,5"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        90
    );
});

test('"3.5" gives today and 210', () => {
    res = parser.stringParser(
        "3.5"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        210
    );
});

test('"2.75" gives today and 165', () => {
    res = parser.stringParser(
        "2.75"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        165
    );
});

test('".5" gives today and 30', () => {
    res = parser.stringParser(
        ".5"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        30
    );
});

test('"1:15" gives today and 75', () => {
    res = parser.stringParser(
        "1:15"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        75
    );
});

test('"9-5" gives today and 480', () => {
    res = parser.stringParser(
        "9-5"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        480
    );
});

test('"11-12" gives today and 60', () => {
    res = parser.stringParser(
        "11-12"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        60
    );
});

test('"11-11" gives today and 720', () => {
    res = parser.stringParser(
        "11-11"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        720
    );
});

test('"2pm-4pm" gives today and 120', () => {
    res = parser.stringParser(
        "2pm-4pm"
    )

    expect(res["date"]).toBe(
        moment().format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        120
    );
});

test('"Oct 21, .5" gives last Oct. 21 and 30', () => {
    var date = moment().month("Oct").set("date", 21)

    if (date > moment()) {
        date.subtract(1, "year")
    }

    res = parser.stringParser(
        "Oct 21, .5"
    )

    expect(res["date"]).toBe(
        date.format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        30
    );
});

test('"December 12 2h" gives last Dec. 12 and 120', () => {
    var date = moment().month("Dec").set("date", 12)

    if (date > moment()) {
        date.subtract(1, "year")
    }

    res = parser.stringParser(
        "December 12 2h"
    )

    expect(res["date"]).toBe(
        date.format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        120
    );
});

test('"y 2h" gives last Dec. 12 and 120', () => {
    res = parser.stringParser(
        "y 2h"
    )

    expect(res["date"]).toBe(
        moment().subtract(1, 'days').format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        120
    );
});

test('"y 15" gives yesterday and 15', () => {
    res = parser.stringParser(
        "y 15"
    )

    expect(res["date"]).toBe(
        moment().subtract(1, 'days').format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        15
    );
});

test('"yesterday 14" gives yesterday and 15', () => {
    res = parser.stringParser(
        "yesterday 14"
    )

    expect(res["date"]).toBe(
        moment().subtract(1, 'days').format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        15
    );
});

test('"Thurs 4" gives last Thursday and 240', () => {
    res = parser.stringParser(
        "Thurs 4"
    )

    expect(res["date"]).toBe(
        moment().day("Thu").format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        240
    );
});

test('"Thurs, 2:45" gives last Thursday and 165', () => {
    res = parser.stringParser(
        "Thurs, 2:45"
    )

    expect(res["date"]).toBe(
        moment().day("Thu").format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        165
    );
});

test('"Friday .99" gives last Thursday and 60', () => {
    res = parser.stringParser(
        "Friday .99"
    )

    expect(res["date"]).toBe(
        moment().day("Fri").format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        60
    );
});

test('"2/5, 2pm-4pm" gives last Thursday and 120', () => {
    var date = moment().month("Feb").set("date", 5)

    if (date > moment()) {
        date.subtract(1, "year")
    }

    res = parser.stringParser(
        "2/5, 2pm-4pm"
    )

    expect(res["date"]).toBe(
        date.format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        120
    );
});

test('"1/1/2017, 2h13m" gives last Thursday and 135', () => {
    res = parser.stringParser(
        "1/1/2017, 2h13m"
    )

    expect(res["date"]).toBe(
        moment().month("Jan").set("date", 1).set("year", 2017).format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        135
    );
});

test('"Working on my #homework #mongodb" gives "homework" and "mongodb"', () => {
    res = parser.descriptionParser(
        "Working on my #homework #mongodb"
    )

    expect(res[0]).toBe(
        "#homework"
    );

    expect(res[1]).toBe(
        "#mongodb"
    );
});

test('"12/01/2021" gives Dec. 1 of 2021 and null', () => {
    res = parser.stringParser(
        "12/01/2021"
    )

    expect(res["date"]).toBe(
        "12-01-2021"
    );

    expect(res["time"]).toBe(
        null
    );
});

test('"Mon" gives last Monday and null', () => {
    res = parser.stringParser(
        "Mon"
    )

    expect(res["date"]).toBe(
        moment().day("Mon").format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        null
    );
});

test('"Sep 20" gives last Sep. 21 and null', () => {
    var date = moment().month("Sep").set("date", 20)

    if (date > moment()) {
        date.subtract(1, "year")
    }

    res = parser.stringParser(
        "Sep 20"
    )

    expect(res["date"]).toBe(
        date.format('MM-DD-YYYY')
    );

    expect(res["time"]).toBe(
        null
    );
});