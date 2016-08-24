/**
 * Calendar.js - https://github.com/772807886/Calendar-js
 * Created by Liming on 2016/8/1.
 */
"use strict";
(function(window) {
    /************* Begin of Constants Definition *************/
    //load Config
    if(typeof window.Calendar_Config == "undefined") {
        window.Calendar_Config = {};
    }
    const {
        FIRST_DAY_OF_WEEK = 0,
        DAY_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        MONTH_OF_YEAR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
        EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
        ZODIAC = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
        SOLAR_TERM = [
            "小寒", "大寒",
            "立春", "雨水", "惊蛰", "春分", "清明", "谷雨",
            "立夏", "小满", "芒种", "夏至", "小暑", "大暑",
            "立秋", "处暑", "白露", "秋分", "寒露", "霜降",
            "立冬", "小雪", "大雪", "冬至"
        ],
        MONTH_IN_CHINA = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"],
        DATE_IN_CHINA = [
            "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
            "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
            "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十", "卅一"
        ]
    } = window.Calendar_Config;
    /**
     * Selector's Style, Use ":host" For The Root's Style
     * @type {string}
     */
    const SELECTOR_STYLE = `
:host {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
}

* {
    margin: 0 5px;
    cursor: pointer;
}

div {
    margin: 0;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    cursor: default;
}
`;
    /**
     * SVG Button For Selector's Left Button
     * @type {string}
     */
    const SELECTOR_LEFT_BUTTON = `
<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 10L17.32 20V0Z"></path>
</svg>
`;
    /**
     * SVG Button For Selector's Down Button
     * @type {string}
     */
    const SELECTOR_DOWN_BUTTON = `
<svg width="10" height="10" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H20L10 17.32Z"></path>
</svg>
`;
    /**
     * SVG Button For Selector's Right Button
     * @type {string}
     */
    const SELECTOR_RIGHT_BUTTON = `
<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0V20L17.32 10Z"></path>
</svg>
`;
    const CALENDAR_COLOUR = `
.b_dark {
    background: black;
}

.b_light {
    background: #EEE;
}

.c_light {
    color: white;
}

.f_light {
    fill: white;
}

.o_normal {
    outline-color: #888!important;
}

.o_light {
    outline-color: lightgray!important;
}
`;
    const CALENDAR_STYLE = `
:host {
    outline: 3px double black;
}

* {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.hide {
    display: none;
}

.title {
    width: 100%;
    height: 15%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
}

.content, .years, .months {
    width: 100%;
    height: 85%;
}

.week_row {
    width: 100%;
    height: 4%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: stretch;
}

.week_column {
    width: 14.285%;
    flex-grow: 1;
    flex-shrink: 0;
    outline: 1px solid;
    text-align: center;
    word-wrap: break-word;
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.content_row {
    width: 100%;
    height: 16%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: stretch;
}

.content_column {
    width: 14.285%;
    flex-grow: 1;
    flex-shrink: 0;
    outline: 1px solid;
    text-align: center;
    word-wrap: break-word;
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.date {
    font-size: 24px;
    font-weight: bold;
    font-family: serif;
}

.lunar {
    font-size: 12px;
    min-height: 14px;
}

.festival {
    font-size: 12px;
    min-height: 14px;
}

.lastMonth {
    opacity: 0.3;
}

.nextMonth {
    opacity: 0.5;
}

.center_text {
    font-size: 24px;
    text-align: center;
    word-wrap: break-word;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.months_row, .years_row {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: stretch;
}

.months_row {
    height: 33.333%;
}

.months_column {
    width: 25%;
    flex-grow: 1;
    flex-shrink: 0;
    outline: 1px solid;
    cursor: pointer;
}

.years_row {
    height: 20%;
}

.years_column {
    width: 20%;
    flex-grow: 1;
    flex-shrink: 0;
    outline: 1px solid;
    cursor: pointer;
}
`;
    /************* End of Constants Definition *************/
    /************* Begin of Tool Classes Definition *************/
    /**
     * Lunar Date Calculator
     */
    class Lunar {
        /**
         * @return {number}
         * @private
         */
        static _minYear() {
            return 1890;
        }

        /**
         * @return {number}
         * @private
         */
        static _maxYear() {
            return 2100;
        }

        /**
         * Lunar Data From 1890 to 2100
         * @return {number[][]}
         * @private
         */
        static _lunarInfo() {
            return [
                [2, 1, 21, 22184], [0, 2, 9, 21936], [6, 1, 30, 9656], [0, 2, 17, 9584], [0, 2, 6, 21168],
                [5, 1, 26, 43344], [0, 2, 13, 59728], [0, 2, 2, 27296], [3, 1, 22, 44368], [0, 2, 10, 43856],
                [8, 1, 30, 19304], [0, 2, 19, 19168], [0, 2, 8, 42352], [5, 1, 29, 21096], [0, 2, 16, 53856],
                [0, 2, 4, 55632], [4, 1, 25, 27304], [0, 2, 13, 22176], [0, 2, 2, 39632], [2, 1, 22, 19176],
                [0, 2, 10, 19168], [6, 1, 30, 42200], [0, 2, 18, 42192], [0, 2, 6, 53840], [5, 1, 26, 54568],
                [0, 2, 14, 46400], [0, 2, 3, 54944], [2, 1, 23, 38608], [0, 2, 11, 38320], [7, 2, 1, 18872],
                [0, 2, 20, 18800], [0, 2, 8, 42160], [5, 1, 28, 45656], [0, 2, 16, 27216], [0, 2, 5, 27968],
                [4, 1, 24, 44456], [0, 2, 13, 11104], [0, 2, 2, 38256], [2, 1, 23, 18808], [0, 2, 10, 18800],
                [6, 1, 30, 25776], [0, 2, 17, 54432], [0, 2, 6, 59984], [5, 1, 26, 27976], [0, 2, 14, 23248],
                [0, 2, 4, 11104], [3, 1, 24, 37744], [0, 2, 11, 37600], [7, 1, 31, 51560], [0, 2, 19, 51536],
                [0, 2, 8, 54432], [6, 1, 27, 55888], [0, 2, 15, 46416], [0, 2, 5, 22176], [4, 1, 25, 43736],
                [0, 2, 13, 9680], [0, 2, 2, 37584], [2, 1, 22, 51544], [0, 2, 10, 43344], [7, 1, 29, 46248],
                [0, 2, 17, 27808], [0, 2, 6, 46416], [5, 1, 27, 21928], [0, 2, 14, 19872], [0, 2, 3, 42416],
                [3, 1, 24, 21176], [0, 2, 12, 21168], [8, 1, 31, 43344], [0, 2, 18, 59728], [0, 2, 8, 27296],
                [6, 1, 28, 44368], [0, 2, 15, 43856], [0, 2, 5, 19296], [4, 1, 25, 42352], [0, 2, 13, 42352],
                [0, 2, 2, 21088], [3, 1, 21, 59696], [0, 2, 9, 55632], [7, 1, 30, 23208], [0, 2, 17, 22176],
                [0, 2, 6, 38608], [5, 1, 27, 19176], [0, 2, 15, 19152], [0, 2, 3, 42192], [4, 1, 23, 53864],
                [0, 2, 11, 53840], [8, 1, 31, 54568], [0, 2, 18, 46400], [0, 2, 7, 46752], [6, 1, 28, 38608],
                [0, 2, 16, 38320], [0, 2, 5, 18864], [4, 1, 25, 42168], [0, 2, 13, 42160], [10, 2, 2, 45656],
                [0, 2, 20, 27216], [0, 2, 9, 27968], [6, 1, 29, 44448], [0, 2, 17, 43872], [0, 2, 6, 38256],
                [5, 1, 27, 18808], [0, 2, 15, 18800], [0, 2, 4, 25776], [3, 1, 23, 27216], [0, 2, 10, 59984],
                [8, 1, 31, 27432], [0, 2, 19, 23232], [0, 2, 7, 43872], [5, 1, 28, 37736], [0, 2, 16, 37600],
                [0, 2, 5, 51552], [4, 1, 24, 54440], [0, 2, 12, 54432], [0, 2, 1, 55888], [2, 1, 22, 23208],
                [0, 2, 9, 22176], [7, 1, 29, 43736], [0, 2, 18, 9680], [0, 2, 7, 37584], [5, 1, 26, 51544],
                [0, 2, 14, 43344], [0, 2, 3, 46240], [4, 1, 23, 46416], [0, 2, 10, 44368], [9, 1, 31, 21928],
                [0, 2, 19, 19360], [0, 2, 8, 42416], [6, 1, 28, 21176], [0, 2, 16, 21168], [0, 2, 5, 43312],
                [4, 1, 25, 29864], [0, 2, 12, 27296], [0, 2, 1, 44368], [2, 1, 22, 19880], [0, 2, 10, 19296],
                [6, 1, 29, 42352], [0, 2, 17, 42208], [0, 2, 6, 53856], [5, 1, 26, 59696], [0, 2, 13, 54576],
                [0, 2, 3, 23200], [3, 1, 23, 27472], [0, 2, 11, 38608], [11, 1, 31, 19176], [0, 2, 19, 19152],
                [0, 2, 8, 42192], [6, 1, 28, 53848], [0, 2, 15, 53840], [0, 2, 4, 54560], [5, 1, 24, 55968],
                [0, 2, 12, 46496], [0, 2, 1, 22224], [2, 1, 22, 19160], [0, 2, 10, 18864], [7, 1, 30, 42168],
                [0, 2, 17, 42160], [0, 2, 6, 43600], [5, 1, 26, 46376], [0, 2, 14, 27936], [0, 2, 2, 44448],
                [3, 1, 23, 21936], [0, 2, 11, 37744], [8, 2, 1, 18808], [0, 2, 19, 18800], [0, 2, 8, 25776],
                [6, 1, 28, 27216], [0, 2, 15, 59984], [0, 2, 4, 27424], [4, 1, 24, 43872], [0, 2, 12, 43744],
                [0, 2, 2, 37600], [3, 1, 21, 51568], [0, 2, 9, 51552], [7, 1, 29, 54440], [0, 2, 17, 54432],
                [0, 2, 5, 55888], [5, 1, 26, 23208], [0, 2, 14, 22176], [0, 2, 3, 42704], [4, 1, 23, 21224],
                [0, 2, 11, 21200], [8, 1, 31, 43352], [0, 2, 19, 43344], [0, 2, 7, 46240], [6, 1, 27, 46416],
                [0, 2, 15, 44368], [0, 2, 5, 21920], [4, 1, 24, 42448], [0, 2, 12, 42416], [0, 2, 2, 21168],
                [3, 1, 22, 43320], [0, 2, 9, 26928], [7, 1, 29, 29336], [0, 2, 17, 27296], [0, 2, 6, 44368],
                [5, 1, 26, 19880], [0, 2, 14, 19296], [0, 2, 3, 42352], [4, 1, 24, 21104], [0, 2, 10, 53856],
                [8, 1, 30, 59696], [0, 2, 18, 54560], [0, 2, 7, 55968], [6, 1, 27, 27472], [0, 2, 15, 22224],
                [0, 2, 5, 19168], [4, 1, 25, 42216], [0, 2, 12, 42192], [0, 2, 1, 53584], [2, 1, 21, 55592],
                [0, 2, 9, 54560]
            ];
        }

        /**
         * Solar Term Data, Minutes
         * @return {number[]}
         * @private
         */
        static _termInfo() {
            return [
                0, 21208,
                42467, 63836, 85337, 107014, 128867, 150921,
                173149, 195551, 218072, 240693, 263343, 285989,
                308563, 331033, 353350, 375494, 397447, 419210,
                440795, 462224, 483532, 504758
            ];
        }

        /**
         * @param {number} year
         * @return {number} Month Based on 1, Zero For No Leap Month
         * @private
         */
        static _getLunarLeapYear(year) {
            return this._lunarInfo()[year - this._minYear()][0];
        }

        /**
         * Get The Number of Days Per Month And The Number of Days in a Year
         * @param {number} year
         * @return {{yearDays: number, monthDays: Array}}
         * @private
         */
        static _getLunarYearDays(year) {
            let yearData = this._lunarInfo()[year - this._minYear()];
            let leapMonth = yearData[0];
            let monthData = yearData[3].toString(2);
            let monthDataArr = monthData.split('');

            for(let i = 0; i < 16 - monthDataArr.length; i++) {
                monthDataArr.unshift(0);
            }

            let len = leapMonth ? 13 : 12;
            let yearDays = 0;
            let monthDays = [];
            for(let i = 0; i < len; i++) {
                if(monthDataArr[i] == 0) {
                    yearDays += 29;
                    monthDays.push(29);
                } else {
                    yearDays += 30;
                    monthDays.push(30);
                }
            }

            return {
                yearDays: yearDays,
                monthDays: monthDays
            };
        }

        /**
         * Get Lunar Date By Days Between Target and The First Day of Year
         * @param {number} year
         * @param {number} between
         * @return {{year: number, month: number, day: number}}
         * @private
         */
        static _getLunarDateByBetween(year, between) {
            let lunarYearDays = this._getLunarYearDays(year);
            let end = between > 0 ? between : lunarYearDays.yearDays - Math.abs(between);
            let monthDays = lunarYearDays.monthDays;
            let tempDays = 0;
            let month = 0;
            for(let i = 0; i < monthDays.length; i++) {
                tempDays += monthDays[i];
                if(tempDays > end) {
                    month = i;
                    tempDays = tempDays - monthDays[i];
                    break;
                }
            }

            return {
                year: year,
                month: month,
                day: end - tempDays + 1
            };
        }

        /**
         * Get The Number Of Days Between Two Dates
         * @param {number} year
         * @param {number} month
         * @param {number} day
         * @param {number} year1
         * @param {number} month1
         * @param {number} day1
         * @return {number}
         * @private
         */
        static _getDaysBetweenSolar(year, month, day, year1, month1, day1) {
            return (new Date(year1, month1, day1).getTime() - new Date(year, month, day).getTime()) / 86400000;
        }

        /**
         * Get Lunar Date By Date
         * @param {number} year
         * @param {number} month
         * @param {number} day
         * @return {{year: number, month: number, day: number}}
         * @private
         */
        static _getLunarByBetween(year, month, day) {
            let yearData = this._lunarInfo()[year - this._minYear()];
            let between = this._getDaysBetweenSolar(year, yearData[1] - 1, yearData[2], year, month, day);
            if(between == 0) { //正月初一
                return {
                    year: year,
                    month: 0,
                    day: 1
                };
            } else {
                return this._getLunarDateByBetween(between > 0 ? year : year - 1, between);
            }
        }

        /**
         * Get The Number of Days Between The Date and The First Day of Lunar in a Year
         * @param {number} year
         * @param {number} month 0-12, Include Leap Month
         * @param {number} day
         * @return {number}
         * @private
         */
        static _getDaysBetweenZheng(year, month, day) {
            let lunarYearDays = this._getLunarYearDays(year);
            let monthDays = lunarYearDays.monthDays;
            let days = 0;
            for(let i = 0; i < monthDays.length; i++) {
                if(i < month) {
                    days += monthDays[i];
                } else {
                    break;
                }
            }
            return days + day - 1;
        }

        /**
         * Witch Date is The Term
         * @param {number} year
         * @param {number|string} term
         * @return {number}
         * @private
         */
        static _getTerm(year, term) {
            if(typeof term == "string") {
                term = SOLAR_TERM.indexOf(term);
            }
            return new Date(
                (31556925974.7 * (year - 1890) + this._termInfo()[term] * 60000) +
                Date.UTC(1890, 0, 5, 16, 2, 31)
            ).getUTCDate();
        }

        /**
         * Every Term in A Year
         * @param {number} year
         * @return {Array}
         * @private
         */
        static _getYearTerm(year) {
            let res = [];
            let month = -1;
            for(let i = 0; i < 24; i++) {
                let day = this._getTerm(year, i);
                if(i % 2 == 0) {
                    month++;
                    res[month] = [];
                }
                res[month][day] = SOLAR_TERM[i];
            }
            return res;
        }

        /**
         * Get The Heavenly Stems and The Earthly Branches
         * @param {number} index
         * @return {string}
         * @private
         */
        static _cyclical(index) {
            return HEAVENLY_STEMS[index % 10] + EARTHLY_BRANCHES[index % 12];
        }

        /**
         * Set Current Year - Cache System
         * @param {number} year
         * @private
         */
        static __cacheSetYear(year) {
            if(this.__currentYear != year) {
                this.__currentYear = year;
                this.__cache = {};
            }
        }

        /**
         * Set Value - Cache System
         * @param {string} key
         * @param {*} value
         * @return {*}
         * @private
         */
        static __cacheSet(key, value) {
            this.__cache[key] = value;
            return this.__cacheGet(key);
        }

        /**
         * Get Value - Cache System
         * @param {string} key
         * @return {*}
         * @private
         */
        static __cacheGet(key) {
            return this.__cache[key];
        }

        /**
         * Get Lunar Date
         * @param {number} year
         * @param {number} month Based on 0
         * @param {number} date
         * @return {{zodiac: string, ganZhiYear: string, ganZhiMonth: string, ganZhiDay: string, term: string, lunarYear: number, lunarMonth: number, lunarDay: number, lunarMonthName: string, lunarDayName: string, lunarLeapMonth: number}}
         */
        static getLunar(year, month, date) {
            this.__cacheSetYear(year);
            let term2 = this.__cacheGet("term2") || this.__cacheSet("term2", this._getTerm(year, 2));
            let termList = this.__cacheGet("termList") || this.__cacheSet("termList", this._getYearTerm(year));
            let firstTerm = this._getTerm(year, month * 2);
            let ganZhiYear = (month > 1 || month == 1 && date >= term2) ? year + 1 : year;
            let ganZhiMonth = date >= firstTerm ? month + 1 : month;

            let lunarDate = this._getLunarByBetween(year, month, date);
            let lunarLeapMonth = this._getLunarLeapYear(lunarDate.year);
            let lunarMonthName;
            if(lunarLeapMonth > 0 && lunarLeapMonth == lunarDate.month) {
                lunarMonthName = "闰" + MONTH_IN_CHINA[lunarDate.month - 1] + "月";
            } else if(lunarLeapMonth > 0 && lunarLeapMonth < lunarDate.month) {
                lunarMonthName = MONTH_IN_CHINA[lunarDate.month - 1] + "月";
            } else {
                lunarMonthName = MONTH_IN_CHINA[lunarDate.month] + "月";
            }

            return {
                zodiac: this.getYearZodiac(ganZhiYear),
                ganZhiYear: this.getLunarYearName(ganZhiYear),
                ganZhiMonth: this.getLunarMonthName(year, ganZhiMonth),
                ganZhiDay: this.getLunarDayName(year, month, date),
                term: termList[month][date],
                lunarYear: lunarDate.year,
                lunarMonth: lunarDate.month,
                lunarDay: lunarDate.day,
                lunarMonthName: lunarMonthName,
                lunarDayName: DATE_IN_CHINA[lunarDate.day - 1],
                lunarLeapMonth: lunarLeapMonth
            };
        }

        /**
         * Get Zodiac
         * @param {number} year
         * @return {string}
         */
        static getYearZodiac(year) {
            return ZODIAC[(year - 1890 + 25) % 12];
        }

        /**
         * Get Lunar Year Name
         * @param {number} year
         * @param {number} [offset]
         * @return {string}
         */
        static getLunarYearName(year, offset) {
            offset = offset || 0;
            return this._cyclical(year - 1890 + 25 + offset);
        }

        /**
         * Get Lunar Month Name
         * @param {number} year
         * @param {number} month
         * @param {number} [offset]
         * @return {string}
         */
        static getLunarMonthName(year, month, offset) {
            offset = offset || 0;
            return this._cyclical((year - 1890) * 12 + month + 12 + offset);
        }

        /**
         * Get Lunar Day Name
         * @param {number} year
         * @param {number} month
         * @param {number} day
         * @return {string}
         */
        static getLunarDayName(year, month, day) {
            return this._cyclical(Date.UTC(year, month, day) / 86400000 + 29219 + 18);
        }
    }
    /**
     * Cache System
     * @type {{}}
     * @private
     */
    Lunar.__cache = {};
    /**
     * Current Year - Cache System
     * @type {number|null}
     * @private
     */
    Lunar.__currentYear = null;
    /**
     * Selector - Part of The Calendar to Select Month or Year
     */
    class Selector {
        /**
         * @param {HTMLElement|Container} obj Container
         */
        constructor(obj) {
            if(obj instanceof Container) {
                obj = obj.getContainer();
            }
            //noinspection JSUnresolvedFunction
            this._root = obj.createShadowRoot();
            //Style Sheet
            let style = document.createElement("style");
            style.innerHTML = SELECTOR_STYLE;
            //Left Button
            this.leftButton = document.createElement("div");
            this.leftButton.innerHTML = SELECTOR_LEFT_BUTTON;
            //Main Block
            let mainDisplay = document.createElement("div");
            let content = document.createElement("content");
            //Down Button
            this.downButton = document.createElement("div");
            this.downButton.innerHTML = SELECTOR_DOWN_BUTTON;
            mainDisplay.appendChild(content);
            mainDisplay.appendChild(this.downButton);
            //Right Button
            this.rightButton = document.createElement("div");
            this.rightButton.innerHTML = SELECTOR_RIGHT_BUTTON;
            this._root.appendChild(style);
            this._root.appendChild(this.leftButton);
            this._root.appendChild(mainDisplay);
            this._root.appendChild(this.rightButton);
        }
    }
    /**
     * Container - A Tool To Control Html Elements
     */
    class Container {
        /**
         * @param {string|HTMLElement} [id] Container's ID
         */
        constructor(id) {
            if(!id) {
                this._container = document.createElement("div");
            } else if(typeof id === "string") {
                this._container = document.getElementById(id);
            } else {
                this._container = id;
            }
        }

        /**
         * Get Calculated Style
         * @param {string} property
         * @param {HTMLElement} [_element]
         * @return {string} Style String
         * @private
         */
        _getProperty(property, _element) {
            let target = _element || this._container;
            if(target.currentStyle) {
                return target.currentStyle.getAttribute(property);
            } else {
                return getComputedStyle(target, null).getPropertyValue(property);
            }
        }

        /**
         * Test If Class is Exists
         * @param {string} cls Class Name
         * @return {boolean}
         */
        hasClass(cls) {
            return this._container.classList.contains(cls);
        }

        /**
         * Add Class to The Container
         * @param {string} cls Class Name
         * @returns {Container} This
         */
        addClass(cls) {
            this._container.classList.add(cls);
            return this;
        }

        /**
         * Remove a Class From The Container
         * @param {string} cls Class Name
         * @return {Container} This
         */
        removeClass(cls) {
            this._container.classList.remove(cls);
            return this;
        }

        /**
         * Get or Set Style String
         * @param {string} property
         * @param {string} [value]
         * @return {string} Style String
         */
        css(property, value) {
            if(value) {
                this._container.style[property] = value;
            } else {
                return this._getProperty(property);
            }
        }

        /**
         * Get Style String
         * @param {HTMLElement} _element
         * @param {string} property
         * @return {string} Style String
         */
        static css(_element, property) {
            if(_element) {
                return this._getProperty(property, _element);
            } else {
                return this._getProperty(property);
            }
        }

        /**
         * @param {Node|Container} child
         */
        appendChild(child) {
            if(child instanceof Container) {
                child = child.getContainer();
            }
            this._container.appendChild(child);
        }

        /**
         * Get This Html Element
         * @return {HTMLElement|*}
         */
        getContainer() {
            return this._container;
        }

        /**
         * @param {string} innerHTML
         * @return {string}
         */
        html(innerHTML) {
            if(innerHTML) {
                this._container.innerHTML = innerHTML;
            }
            return this._container.innerHTML;
        }
    }
    /**
     * Event - Events Manager
     */
    class Event {
        constructor() {
            /**
             * @type {{handler: function, args: *}[]|null}
             * @private
             */
            this._events = [];
        }

        /**
         * @param {function} handler
         * @param {*} [args]
         */
        add(handler, args) {
            this._events[this._events.length] = {
                handler: handler,
                args: args
            };
        }

        /**
         * @param {function} handler
         */
        remove(handler) {
            for(let event in this._events) {
                if(this._events.hasOwnProperty(event) && this._events[event].handler == handler) {
                    this._events[event] = null;
                }
            }
        }

        /**
         * @param {Object} caller
         * @return {boolean}
         */
        call(caller) {
            let flag = true;
            for(let event of this._events) {
                if(event == null) {
                    continue;
                }
                flag = event.handler.call(caller, event.args) && flag;
            }
            return flag;
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * List All of Events By Console.log
         */
        list() {
            for(let event of this._events) {
                if(event == null) {
                    continue;
                }
                console.log(event);
            }
        }
    }
    /************* End of Tool Classes Definition *************/
    /**
     * Calendar Library
     */
    class Calendar {
        /**
         * @param {string|HTMLElement} id
         */
        constructor(id) {
            /**
             * Debug Message Flag
             * @type {boolean}
             * @private
             */
            this.___debug = true;
            /**
             * Event Ended Flag
             * @type {Symbol}
             * @private
             */
            this.___ENDED = Symbol("ENDED");
            /**
             * @type {Date}
             * @private
             */
            this._date = new Date();
            this._date.setHours(0, 0, 0, 0);
            /**
             * @type {Container}
             * @private
             */
            this._container = new Container(id);
            //Initialize
            this._initialize();
            this._reloadMonth();
            /**
             * @type {Selector}
             * @private
             */
            this._years_select = new Selector(this.__years_selector);
            /**
             * @type {Selector}
             * @private
             */
            this._months_select = new Selector(this.__months_selector);
            //Add Event Listener
            this._years_select.leftButton.addEventListener("click", () => {
                this.lastYear();
            });
            this._years_select.rightButton.addEventListener("click", () => {
                this.nextYear();
            });
            this._years_select.downButton.addEventListener("click", () => {
                this.selectYear();
            });
            this._months_select.leftButton.addEventListener("click", () => {
                this.lastMonth();
            });
            this._months_select.rightButton.addEventListener("click", () => {
                this.nextMonth();
            });
            this._months_select.downButton.addEventListener("click", () => {
                this.selectMonth();
            });
            //Event Handler
            /**
             * @type {Event}
             */
            this.BeforYearChangeEvent = new Event();
            /**
             * @type {Event}
             */
            this.BeforMonthChangeEvent = new Event();
            /**
             * @type {Event}
             */
            this.BeforDayChangeEvent = new Event();
            /**
             * @type {Event}
             */
            this.BeforSelectYearEvent = new Event();
            /**
             * @type {Event}
             */
            this.BeforSelectMonthEvent = new Event();
            /**
             * @type {Event}
             */
            this.YearChangedEvent = new Event();
            /**
             * @type {Event}
             */
            this.MonthChangedEvent = new Event();
            /**
             * @type {Event}
             */
            this.DayChangedEvent = new Event();
            /**
             * @type {Event}
             */
            this.DateChangedEvent = new Event();
            /**
             * @type {Event}
             */
            this.SelectYearEvent = new Event();
            /**
             * @type {Event}
             */
            this.SelectMonthEvent = new Event();
        }

        /************* Begin of Public Functions *************/
        /**
         * Set Last Year
         */
        lastYear() {
            let now = this._date.getFullYear();
            if(now <= 1970) {
                return;
            }
            this.setYear(now - 1);
        }

        /**
         * Set Next Year
         */
        nextYear() {
            let now = this._date.getFullYear();
            if(now >= 2089) {
                return;
            }
            this.setYear(now + 1);
        }

        /**
         * Set Last Month
         */
        lastMonth() {
            let now = this._date.getMonth() + 1;
            if(now > 1) {
                this.setMonth(now - 1);
            } else if(this._date.getFullYear() > 1970) {
                this.lastYear();
                this.setMonth(12);
            }
        }

        /**
         * Set Next Month
         */
        nextMonth() {
            let now = this._date.getMonth() + 1;
            if(now < 12) {
                this.setMonth(now + 1);
            } else if(this._date.getFullYear() < 2089) {
                this.nextYear();
                this.setMonth(1);
            }
        }

        /**
         * Set Year
         * @param {number} year A Number Between 1970 and 2089, It Must Great Than or Equal To 1970 And Less Than 2090
         */
        setYear(year) {
            if(!Number.isSafeInteger(year)) {
                throw "Parameter Error: Year Must Be An Integer!";
            }
            if(year < 1970 || year >= 2090) {
                throw "Range Error: Year Must in [1970, 2090)!";
            }

            if(!this.BeforYearChangeEvent.call(this)) {
                if(this.___debug) {
                    console.warn("Set Year Ended By Event Returned False!");
                }
                return this.___ENDED;
            }

            this._date.setFullYear(year);
            this.__years_selector.html(year.toString());
            this._reloadMonth();

            this.YearChangedEvent.call(this);
            this.DateChangedEvent.call(this);
        }

        /**
         * Set Month
         * @param {number} month A Number Between 1 and 12, It Must Great Than or Equal to 1 And Less Than or Equal to 12
         */
        setMonth(month) {
            if(!Number.isSafeInteger(month)) {
                throw "Parameter Error: Month Must Be An Integer!";
            }
            if(month <= 0 || month > 12) {
                throw "Range Error: Month Must in [1, 12]!";
            }

            if(!this.BeforMonthChangeEvent.call(this)) {
                if(this.___debug) {
                    console.warn("Set Month Ended By Event Returned False!");
                }
                return this.___ENDED;
            }

            let m = this.getMonth() - 1;
            let current = this.__months_rows[Math.floor(m / 4)].columns[m % 4];
            //Reset Highlight
            current.removeClass("b_dark");
            current.removeClass("c_light");

            this._date.setMonth(month - 1);
            this.__months_selector.html(month.toString());
            this._reloadMonth();

            month--;
            current = this.__months_rows[Math.floor(month / 4)].columns[month % 4];
            //Highlight
            current.addClass("b_dark");
            current.addClass("c_light");

            this.MonthChangedEvent.call(this);
            this.DateChangedEvent.call(this);
        }

        /**
         * Set Date
         * @param {number} date A Number Must Great Than or Equal to 1 And Less Than or Equal to The Maximum Date in This Month
         */
        setDate(date) {
            if(!Number.isSafeInteger(date)) {
                throw "Parameter Error: Date Must Be An Integer!";
            }
            let max = this._getMaxDate();
            if(date < 1 || date > max) {
                throw "Range Error: Date Must in [1, " + max + "] This Month!";
            }

            if(!this.BeforDayChangeEvent.call(this)) {
                if(this.___debug) {
                    console.warn("Set Date Ended By Event Returned False!");
                }
                return this.___ENDED;
            }

            this._date.setDate(date);
            //Highlight
            let current = this.__content.getContainer().querySelector(".b_dark");
            current.classList.remove("b_dark");
            current.classList.remove("c_light");
            let month = this.getMonth();
            for(let i = 0; i < this.__content_rows.length; i++) {
                let j = 0;
                for(; j < this.__content_rows[i].columns.length; j++) {
                    let target = this.__content_rows[i].columns[j].column.getContainer();
                    if(target.dataset.month == month && target.dataset.date == date) {
                        target.classList.add("b_dark");
                        target.classList.add("c_light");
                        break;
                    }
                }
                if(j < this.__content_rows.length) {
                    break;
                }
            }

            this.DayChangedEvent.call(this);
            this.DateChangedEvent.call(this);
        }

        getYear() {
            return this._date.getFullYear();
        }

        getMonth() {
            return this._date.getMonth() + 1;
        }

        getDate() {
            return this._date.getDate();
        }

        getDay() {
            return this._date.getDay();
        }

        selectYear() {
            if(!this.BeforSelectYearEvent.call(this)) {
                if(this.___debug) {
                    console.warn("Select Year Ended By Event Returned False!");
                }
                return this.___ENDED;
            }

            this.__months.addClass("hide");
            if(this.__years.hasClass("hide")) {
                this.__content.addClass("hide");
                this.__years.removeClass("hide");
            } else {
                this.__content.removeClass("hide");
                this.__years.addClass("hide");
            }
            let row = 0, column = 0;
            for(let year = this.getYear() - 12; year <= this.getYear() + 12; year++) {
                this.__years_rows[row].columns[column].getContainer().dataset.year = year;
                this.__years_rows[row].columns[column++].html(year.toString());
                if(column >= 5) {
                    row++;
                    column = 0;
                }
            }
            let current = this.__years_rows[2].columns[2];
            //Highlight
            current.addClass("b_dark");
            current.addClass("c_light");

            this.SelectYearEvent.call(this);
        }

        selectMonth() {
            if(!this.BeforSelectMonthEvent.call(this)) {
                if(this.___debug) {
                    console.warn("Select Month Ended By Event Returned False!");
                }
                return this.___ENDED;
            }

            this.__years.addClass("hide");
            if(this.__months.hasClass("hide")) {
                this.__content.addClass("hide");
                this.__months.removeClass("hide");
            } else {
                this.__content.removeClass("hide");
                this.__months.addClass("hide");
            }

            this.SelectMonthEvent.call(this);
        }

        getInformation() {
            return Calendar.getInformation(this.getYear(), this.getMonth(), this.getDate());
        }

        /**
         * @param {int} year
         * @param {int} month
         * @param {int} date
         */
        static getInformation(year, month, date) {
            let lunar = Lunar.getLunar(year, month, date);
            return {
                solar: {
                    year: year,
                    month: month,
                    date: date,
                    zodiac: Lunar.getYearZodiac(year + 1)
                },
                lunar: {
                    year: lunar.year,
                    month: lunar.lunarMonthName,
                    date: lunar.lunarDayName,
                    yearName: lunar.ganZhiYear,
                    monthName: lunar.ganZhiMonth,
                    dayName: lunar.ganZhiDay,
                    zodiac: lunar.zodiac,
                    term: lunar.term
                }
            };
        }

        /**
         * Format Datetime
         * @param {string} format
         * @return {string}
         */
        format(format) {
            return Calendar.format(format, this._date);
        }

        /**
         * Format Datetime
         * @param {string} format
         * @param {Date} datetime
         * @return {string}
         */
        static format(format, datetime) {
            format = format || "";
            datetime = datetime || new Date();
            let year = datetime.getFullYear(),
                month = (datetime.getMonth() + 1),
                date = datetime.getDate(),
                day = DAY_OF_WEEK[datetime.getDay()],
                hour = datetime.getHours(),
                minute = datetime.getMinutes(),
                second = datetime.getSeconds(),
                millisecond = datetime.getMilliseconds();
            let lunar = Lunar.getLunar(year, month - 1, date);
            return format.replace("{YEAR}", year.toString())
                .replace("{year}", year.toString().substr(-2))
                .replace("{MONTH}", ("0" + month.toString()).substr(-2))
                .replace("{month}", month.toString())
                .replace("{DATE}", ("0" + date.toString()).substr(-2))
                .replace("{date}", date.toString())
                .replace("{WEEKDAY}", day)
                .replace("{HOUR}", ("0" + hour.toString()).substr(-2))
                .replace("{hour}", hour.toString())
                .replace("{MINUTE}", ("0" + minute.toString()).substr(-2))
                .replace("{minute}", minute.toString())
                .replace("{SECOND}", ("0" + second.toString()).substr(-2))
                .replace("{second}", second.toString())
                .replace("{MILLISECOND}", ("00" + millisecond.toString()).substr(-3))
                .replace("{millisecond}", millisecond.toString())
                .replace("{GANZHIYEAR}", lunar.ganZhiYear)
                .replace("{GANZHIMONTH}", lunar.ganZhiMonth)
                .replace("{GANZHIDAY}", lunar.ganZhiDay)
                .replace("{ZODIAC}", lunar.zodiac)
                .replace("{LUNARMONTH}", lunar.lunarMonthName)
                .replace("{LUNARDATE}", lunar.lunarDayName)
                .replace("{TERM}", lunar.term || "");
        }

        /**
         * @param {boolean} status
         */
        setDebug(status) {
            this.___debug = !!status;
        }

        /************* End of Public Functions *************/
        /************* Begin of Private Functions *************/
        /**
         * @private
         */
        _initialize() {
            //noinspection JSUnresolvedFunction
            this.__root = this._container.getContainer().createShadowRoot();
            //Style Sheet
            let colour = document.createElement("style");
            colour.innerHTML = CALENDAR_COLOUR;
            let style = document.createElement("style");
            style.innerHTML = CALENDAR_STYLE;
            this.__root.appendChild(colour);
            this.__root.appendChild(style);
            //title
            {
                this.__title = new Container();
                this.__title.addClass("title");
                this.__title.addClass("b_dark");
                //years selector
                {
                    this.__years_selector = new Container();
                    this.__years_selector.addClass("c_light");
                    this.__years_selector.addClass("f_light");
                    this.__years_selector.html(this.getYear());
                }
                this.__title.appendChild(this.__years_selector);
                //months selector
                {
                    this.__months_selector = new Container();
                    this.__months_selector.addClass("c_light");
                    this.__months_selector.addClass("f_light");
                    this.__months_selector.html(this.getMonth());
                }
                this.__title.appendChild(this.__months_selector);
            }
            this.__root.appendChild(this.__title.getContainer());
            //content
            {
                this.__content = new Container();
                this.__content.addClass("content");
                this.__content.addClass("b_light");
                //weeks
                {
                    this.__content_weeks = {};
                    this.__content_weeks.week = [];
                    this.__content_weeks.row = new Container();
                    this.__content_weeks.row.addClass("week_row");
                    let index = 0;
                    for(let i = 0; i < 7; i++) {
                        this.__content_weeks.week[i] = new Container();
                        this.__content_weeks.week[i].addClass("week_column");
                        this.__content_weeks.week[i].html(DAY_OF_WEEK[(FIRST_DAY_OF_WEEK + index++) % 7]);
                        this.__content_weeks.row.appendChild(this.__content_weeks.week[i]);
                    }
                }
                this.__content.appendChild(this.__content_weeks.row);
                //rows
                /**
                 * @type {{row: Container, columns: {column: Container, content: {date: Container, lunar: Container, festival: Container}}[]}[]}
                 * @private
                 */
                this.__content_rows = [];
                for(let row = 0; row < 6; row++) {
                    this.__content_rows[row] = {};
                    this.__content_rows[row].row = new Container();
                    this.__content_rows[row].row.addClass("content_row");
                    //columns
                    this.__content_rows[row].columns = [];
                    for(let column = 0; column < 7; column++) {
                        this.__content_rows[row].columns[column] = {};
                        this.__content_rows[row].columns[column].column = new Container();
                        this.__content_rows[row].columns[column].column.addClass("content_column");
                        {
                            this.__content_rows[row].columns[column].content = {};
                            this.__content_rows[row].columns[column].content.date = new Container();
                            this.__content_rows[row].columns[column].content.date.addClass("date");
                            this.__content_rows[row].columns[column].content.lunar = new Container();
                            this.__content_rows[row].columns[column].content.lunar.addClass("lunar");
                            this.__content_rows[row].columns[column].content.festival = new Container();
                            this.__content_rows[row].columns[column].content.festival.addClass("festival");
                        }
                        this.__content_rows[row].columns[column].column.appendChild(this.__content_rows[row].columns[column].content.date);
                        this.__content_rows[row].columns[column].column.appendChild(this.__content_rows[row].columns[column].content.lunar);
                        this.__content_rows[row].columns[column].column.appendChild(this.__content_rows[row].columns[column].content.festival);
                        this.__content_rows[row].row.appendChild(this.__content_rows[row].columns[column].column);
                    }
                    this.__content.appendChild(this.__content_rows[row].row);
                }
                //Events
                this.__content.getContainer().addEventListener("click", (e) => {
                    let event = (target) => {
                        let y = target.dataset.year,
                            m = target.dataset.month,
                            d = target.dataset.date;
                        if(y != this.getYear()) {
                            this.setYear(parseInt(y));
                        }
                        if(m != this.getMonth()) {
                            this.setMonth(parseInt(m));
                        }
                        if(d != this.getDate()) {
                            this.setDate(parseInt(d));
                        }
                    };
                    //noinspection JSUnresolvedVariable
                    if(e.path) {  //For Chrome
                        //noinspection JSUnresolvedVariable
                        for(let target of e.path) {
                            if(target.classList && target.classList.contains("content_column")) {
                                event(target);
                                break;
                            }
                        }
                    } else {
                        let loop = (target) => {
                            if(target == this.__content.getContainer()) {
                                return;
                            }
                            if(target.classList.contains("content_column")) {
                                event(target);
                            } else {
                                loop(target.parentNode);
                            }
                        };
                        loop(e.target);
                    }
                }, false);
            }
            this.__root.appendChild(this.__content.getContainer());
            //years
            {
                this.__years = new Container();
                this.__years.addClass("years");
                this.__years.addClass("b_light");
                this.__years.addClass("hide");
                //rows
                /**
                 * @type {{row: Container, columns: Container[]}[]}
                 * @private
                 */
                this.__years_rows = [];
                for(let row = 0; row < 5; row++) {
                    this.__years_rows[row] = {};
                    this.__years_rows[row].row = new Container();
                    this.__years_rows[row].row.addClass("years_row");
                    //columns
                    this.__years_rows[row].columns = [];
                    for(let column = 0; column < 5; column++) {
                        this.__years_rows[row].columns[column] = new Container();
                        this.__years_rows[row].columns[column].addClass("years_column");
                        this.__years_rows[row].columns[column].addClass("center_text");
                        this.__years_rows[row].columns[column].addClass("o_normal");
                        this.__years_rows[row].row.appendChild(this.__years_rows[row].columns[column]);
                    }
                    this.__years.appendChild(this.__years_rows[row].row);
                }
                //Events
                this.__years.getContainer().addEventListener("click", (e) => {
                    this.setYear(parseInt(e.target.dataset.year));
                    this.selectYear();
                }, false);
            }
            this.__root.appendChild(this.__years.getContainer());
            //months
            {
                this.__months = new Container();
                this.__months.addClass("months");
                this.__months.addClass("b_light");
                this.__months.addClass("hide");
                let index = 0;
                //rows
                /**
                 * @type {{row: Container, columns: Container[]}[]}
                 * @private
                 */
                this.__months_rows = [];
                for(let row = 0; row < 3; row++) {
                    this.__months_rows[row] = {};
                    this.__months_rows[row].row = new Container();
                    this.__months_rows[row].row.addClass("months_row");
                    //columns
                    this.__months_rows[row].columns = [];
                    for(let column = 0; column < 4; column++) {
                        this.__months_rows[row].columns[column] = new Container();
                        this.__months_rows[row].columns[column].addClass("months_column");
                        this.__months_rows[row].columns[column].addClass("center_text");
                        this.__months_rows[row].columns[column].addClass("o_normal");
                        this.__months_rows[row].columns[column].getContainer().dataset.month = index + 1;
                        this.__months_rows[row].columns[column].html(MONTH_OF_YEAR[index++]);
                        if(index == this.getMonth()) {
                            this.__months_rows[row].columns[column].addClass("b_dark");
                            this.__months_rows[row].columns[column].addClass("c_light");
                        }
                        this.__months_rows[row].row.appendChild(this.__months_rows[row].columns[column]);
                    }
                    this.__months.appendChild(this.__months_rows[row].row);
                }
                //Events
                this.__months.getContainer().addEventListener("click", (e) => {
                    this.setMonth(parseInt(e.target.dataset.month));
                    this.selectMonth();
                }, false);
            }
            this.__root.appendChild(this.__months.getContainer());
        }

        /**
         * @private
         */
        _reloadMonth() {
            let d = new Date(this._date.getFullYear(), this._date.getMonth(), 1);
            d.setDate(-(d.getDay() - FIRST_DAY_OF_WEEK + 6) % 7);
            let [year, month, date] = [d.getFullYear(), d.getMonth(), d.getDate()];
            for(let row = 0; row < 6; row++) {
                for(let column = 0; column < 7; column++) {
                    //Remove Class
                    this.__content_rows[row].columns[column].column.removeClass("o_light");
                    this.__content_rows[row].columns[column].column.removeClass("o_normal");
                    this.__content_rows[row].columns[column].content.date.removeClass("lastMonth");
                    this.__content_rows[row].columns[column].content.date.removeClass("nextMonth");
                    this.__content_rows[row].columns[column].content.lunar.removeClass("lastMonth");
                    this.__content_rows[row].columns[column].content.lunar.removeClass("nextMonth");
                    this.__content_rows[row].columns[column].content.festival.removeClass("lastMonth");
                    this.__content_rows[row].columns[column].content.festival.removeClass("nextMonth");
                    //Set Value
                    let lunar = Lunar.getLunar(year, month, date);
                    this.__content_rows[row].columns[column].content.date.html(d.getDate().toString());
                    this.__content_rows[row].columns[column].content.lunar.html(lunar.term ? lunar.term : lunar.lunarDayName == DATE_IN_CHINA[0] ? lunar.lunarMonthName : lunar.lunarDayName);
                    this.__content_rows[row].columns[column].content.festival.html("");
                    //Save Data Set
                    this.__content_rows[row].columns[column].column.getContainer().dataset.year = year;
                    this.__content_rows[row].columns[column].column.getContainer().dataset.month = month + 1;
                    this.__content_rows[row].columns[column].column.getContainer().dataset.date = date;
                    //Add Class
                    this.__content_rows[row].columns[column].column.removeClass("b_dark");
                    this.__content_rows[row].columns[column].column.removeClass("c_light");
                    if(month + 1 < this.getMonth()) {
                        this.__content_rows[row].columns[column].column.addClass("o_light");
                        this.__content_rows[row].columns[column].content.date.addClass("lastMonth");
                        this.__content_rows[row].columns[column].content.lunar.addClass("lastMonth");
                        this.__content_rows[row].columns[column].content.festival.addClass("lastMonth");
                    } else if(month + 1 == this.getMonth()) {
                        this.__content_rows[row].columns[column].column.addClass("o_normal");
                        if(date == this.getDate()) {
                            this.__content_rows[row].columns[column].column.addClass("b_dark");
                            this.__content_rows[row].columns[column].column.addClass("c_light");
                        }
                    } else {
                        this.__content_rows[row].columns[column].column.addClass("o_light");
                        this.__content_rows[row].columns[column].content.date.addClass("nextMonth");
                        this.__content_rows[row].columns[column].content.lunar.addClass("nextMonth");
                        this.__content_rows[row].columns[column].content.festival.addClass("nextMonth");
                    }
                    //Next Day
                    d.setDate(date + 1);
                    [year, month, date] = [d.getFullYear(), d.getMonth(), d.getDate()];
                }
            }
        }

        /**
         * @return {number}
         * @private
         */
        _getMaxDate() {
            return new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0).getDate();
        }

        /************* End of Private Functions *************/
    }

    //Set up
    if(typeof window.Calendar === 'undefined') {
        window.Calendar = Calendar;
    } else {
        throw "window.Calendar Namespace Conflict!";
    }
})(window);
