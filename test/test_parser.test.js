const parser = require('../src/parser');

test('"15" gives today and 15', () => {
    date = new Date()
    date.setHours(0, 0, 0, 0)

    res = parser.stringParser(
        "15"
    )

    expect(res["date"]).toBe(
        date
    );

    expect(res["time"]).toBe(
        15
    );
});

test('"13" gives today and 15', () => {
    date = new Date()
    date.setHours(0, 0, 0, 0)

    res = parser.stringParser(
        "13"
    )

    expect(res["date"]).toBe(
        date
    );

    expect(res["time"]).toBe(
        15
    );
});

test('"15m" gives today and 15', () => {
    date = new Date()
    date.setHours(0, 0, 0, 0)

    res = parser.stringParser(
        "15m"
    )

    expect(res["date"]).toBe(
        date
    );

    expect(res["time"]).toBe(
        15
    );
});

test('"15h" gives today and 900', () => {
    date = new Date()
    date.setHours(0, 0, 0, 0)

    res = parser.stringParser(
        "15h"
    )

    expect(res["date"]).toBe(
        date
    );

    expect(res["time"]).toBe(
        900
    );
});

test('"2h" gives today and 120', () => {
    date = new Date()
    date.setHours(0, 0, 0, 0)

    res = parser.stringParser(
        "2h"
    )

    expect(res["date"]).toBe(
        date
    );

    expect(res["time"]).toBe(
        120
    );
});

test('"6h" gives today and 360', () => {
    date = new Date()
    date.setHours(0, 0, 0, 0)

    res = parser.stringParser(
        "6h"
    )

    expect(res["date"]).toBe(
        date
    );

    expect(res["time"]).toBe(
        360
    );
});

test('"2h13m" gives today and 135', () => {
    date = new Date()
    date.setHours(0, 0, 0, 0)

    res = parser.stringParser(
        "2h13m"
    )

    expect(res["date"]).toBe(
        date
    );

    expect(res["time"]).toBe(
        135
    );
});