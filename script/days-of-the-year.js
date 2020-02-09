var request = require("request");
var fs = require("fs");
var { parse } = require("node-html-parser");

// List of months as formatted on the website, used to convert it back to a number
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Checks all days for a given month an returns a map
 * {
 *     "day/month": ["Day 1", "Day 2"]
 * }
 */
async function getDaysOfTheMonth(month) {
    return new Promise(function(resolve) {
        // ensure it's always 2 characters
        const monthString = month < 10 ? ("0" + month) : month;
        request({
            url: "https://www.daysoftheyear.com/days/2020/" + monthString
        }, function(error, response, body) {

            // parse result to get all dates represented as cards
            const root = parse(body),
                  cards = root.querySelectorAll('.breathe .card-block'),
                  days = {};

            cards.forEach(function(card) {
                const cardDate = card.querySelector(".card-date .date_day"),
                      // exclude extended cards - they represent weeks
                      extendedDate = cardDate.classNames.indexOf("date_day_extended") !== -1,
                      cardMonth = card.querySelector(".card-date .date_month span"),
                      titleLink = card.querySelector(".card-title a");

                if (cardDate && !extendedDate && cardMonth && titleLink) {
                    // extract day (as it's represented as e.g. "1st"
                    const day = parseInt(cardDate.innerHTML),
                          // map month to an index
                          month = MONTHS.indexOf(cardMonth.innerHTML) + 1,
                          title = titleLink.innerHTML;

                    // create key name for the map...
                    const date = day + "/" + month;
                    // ...and initialise as an empty array if it's a new key...
                    days[date] = days[date] || [];
                    // ...and add the new entry
                    days[date].push(title);
                }
            });
            resolve(days);
        });
    });
}

// final result
var daysOfTheYear = {};
var monthsCounter = 12;

/**
 * Download all days and call the callback at the end
 */
function download(callback) {
    MONTHS.forEach(async function(currentMonth, index) {
        const monthIndex = index + 1,
              daysOfTheMonth = await getDaysOfTheMonth(monthIndex);

        // merge results
        Object.assign(daysOfTheYear, daysOfTheMonth);

        // finish if it's the last month
        monthsCounter--;
        if (!monthsCounter) {
            callback(daysOfTheYear);
        }
    });
}
// download...
download(function (daysOfTheYear) {
    // ...and save data
    fs.writeFileSync("../data/days-of-the-year.json", JSON.stringify(daysOfTheYear, null, 2));
});



