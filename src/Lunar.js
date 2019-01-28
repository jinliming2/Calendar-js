/**
 * Lunar.js - https://github.com/jinliming2/Calendar-js
 * Created by Liming on 2018/10/14.
 */
const {
  HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
  EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
  ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
  SOLAR_TERM = [
    '小寒', '大寒',
    '立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
    '立夏', '小满', '芒种', '夏至', '小暑', '大暑',
    '立秋', '处暑', '白露', '秋分', '寒露', '霜降',
    '立冬', '小雪', '大雪', '冬至'
  ],
  MONTH_IN_CHINA = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'],
  DATE_IN_CHINA = [
    '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '卅一'
  ],
} = window.Calendar_Config || {};

export default class {
  /************* Begin of Static Private Fields *************/
  static get _minYear() {
    return 1890;
  }

  static get _maxYear() {
    return 2100;
  }

  /**
   * Lunar Data From 1890 to 2100
   */
  static get _lunarInfo() {
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
   */
  static get _termInfo() {
    return [
      0, 21208,
      42467, 63836, 85337, 107014, 128867, 150921,
      173149, 195551, 218072, 240693, 263343, 285989,
      308563, 331033, 353350, 375494, 397447, 419210,
      440795, 462224, 483532, 504758
    ];
  }

  /**
   * Cache System
   */
  static get __cache() {
    if (!this.___cache) {
      this.___cache = {};
    }
    return this.___cache;
  }
  /************* End of Static Private Fields *************/
  /************* Begin of Static Private Functions *************/
  /**
   * @param {number} year
   * @returns {number} Month Based on 1, Zero For No Leap Month
   */
  static _getLunarLeapYear(year) {
    return this._lunarInfo[year - this._minYear][0];
  }

  /**
   * Get The Number of Days Per Month And The Number of Days in a Year
   * @param {number} year
   * @returns {{yearDays: number, monthDays: number[]}}
   */
  static _getLunarYearDays(year) {
    const yearData = this._lunarInfo[year - this._minYear];
    const leapMonth = yearData[0];
    const monthData = yearData[3].toString(2).split('');
    for (let i = 0; i < 16 - monthData.length; ++i) {
      monthData.unshift(0);
    }
    const len = leapMonth ? 13 : 12;
    let yearDays = 0;
    const monthDays = [];
    for (let i = 0; i < len; ++i) {
      if (monthData[i]) {
        yearDays += 30;
        monthDays.push(30);
      } else {
        yearDays += 29;
        monthDays.push(29);
      }
    }
    return { yearDays, monthDays };
  }

  /**
   * Get Lunar Date By Days Between Target and The First Day of Year
   * @param {number} year
   * @param {number} between
   * @returns {{year: number, month: number, date: number}}
   */
  static _getLunarDateByBetween(year, between) {
    const { yearDays, monthDays } = this._getLunarYearDays(year);
    const end = between > 0 ? between : yearDays + between;
    let tempDays = 0;
    let month = 0;
    for (let i = 0; i < monthDays.length; ++i) {
      tempDays += monthDays[i];
      if (tempDays > end) {
        month = i;
        tempDays = tempDays - monthDays[i];
        break;
      }
    }
    return { year, month, date: end - tempDays + 1 };
  }

  /**
   * Get The Number Of Days Between Two Dates
   * @param {number} year
   * @param {number} month
   * @param {number} date
   * @param {number} year1
   * @param {number} month1
   * @param {number} date1
   * @returns {number}
   */
  static _getDaysBetweenSolar(year, month, date, year1, month1, date1) {
    return (new Date(year1, month1, date1).getTime() - new Date(year, month, date).getTime()) / 8.64e7;
  }

  /**
   * Get Lunar Date By Date
   * @param {number} year
   * @param {number} month
   * @param {number} date
   * @returns {{year: number, month: number, date: number}}
   */
  static _getLunarByBetween(year, month, date) {
    const yearData = this._lunarInfo[year - this._minYear];
    const between = this._getDaysBetweenSolar(year, yearData[1] - 1, yearData[2], year, month, date);
    if (between) {
      return this._getLunarDateByBetween(between > 0 ? year : year - 1, between);
    } else {
      // 正月初一
      return { year, month: 0, date: 1 };
    }
  }

  /**
   * Get The Number of Days Between The Date and The First Day of Lunar in a Year
   * @param {number} year
   * @param {number} month
   * @param {number} date
   * @returns {number}
   */
  static _getDaysBetweenZheng(year, month, date) {
    const { monthDays } = this._getLunarYearDays(year);
    let days = 0;
    for (let i = 0; i < monthDays.length; ++i) {
      if (i >= month) {
        break;
      }
      days += monthDays[i];
    }
    return days + date - 1;
  }

  /**
   * Witch Date is The Term
   * @param {number} year
   * @param {number|string} term
   * @returns {number}
   */
  static _getTerm(year, term) {
    if (typeof term == 'string') {
      term = SOLAR_TERM.indexOf(term);
    }
    return new Date(
      (31556925974.7 * (year - 1890) + this._termInfo[term] * 60000) +
      Date.UTC(1890, 0, 5, 16, 2, 31)
    ).getUTCDate();
  }

  /**
   * Every Term in A Year
   * @param {number} year
   * @returns {[[string]]}
   */
  static _getYearTerm(year) {
    const res = [];
    let month = -1;
    for (let i = 0; i < 24; ++i) {
      const date = this._getTerm(year, i);
      if (i % 2 == 0) {
        res[++month] = [];
      }
      res[month][date] = SOLAR_TERM[i];
    }
    return res;
  }

  /**
   * Get The Heavenly Stems and The Earthly Branches
   * @param {number} index
   * @returns {string}
   */
  static _cyclical(index) {
    return HEAVENLY_STEMS[index % 10] + EARTHLY_BRANCHES[index % 12];
  }

  /**
   * Set Current Year - Cache System
   * @param {number} year
   * @returns {number}
   */
  static __cacheSetYear(year) {
    if (this.__cacheYear != year) {
      this.__cacheYear = year;
      if (!this.__cache[year]) {
        this.__cache[year] = {};
      }
    }
    return year;
  }

  /**
   * Get Value from Cache - Cache System
   * @param {string} key
   * @param {Function} originFunction
   * @param  {...any} originArguments
   * @returns {any}
   */
  static __cacheGet(key, originFunction, ...originArguments) {
    if (!this.__cache[this.__cacheYear][key]) {
      this.__cache[this.__cacheYear][key] = originFunction.call(this, ...originArguments);
    }
    return this.__cache[this.__cacheYear][key];
  }
  /************* End of Static Private Functions *************/
  /************* Begin of Static Public Functions *************/
  /**
   * Get Lunar Date
   * @param {number} year
   * @param {number} month
   * @param {number} date
   * @returns {{zodiac: string, ganZhiYear: string, ganZhiMonth: string, ganZhiDay: string, term: string, lunarYear: number, lunarMonth: number, lunarDay: number, lunarMonthName: string, lunarDayName: string, lunarLeapMonth: number}}
   */
  static getLunar(year, month, date) {
    this.__cacheSetYear(year);
    const term2 = this.__cacheGet('term2', this._getTerm, year, 2);
    const termList = this.__cacheGet('termList', this._getYearTerm, year);
    const firstTerm = this.__cacheGet(`firstTerm[${month}]`, this._getTerm, year, month * 2);
    const ganZhiYear = (month > 1 || month == 1 && date >= term2) ? year + 1 : year;
    const ganZhiMonth = date >= firstTerm ? month + 1 : month;

    const lunarDate = this._getLunarByBetween(year, month, date);
    const lunarLeapMonth = this.__cacheGet(`lunarLeapMonth[${lunarDate.year}]`, this._getLunarLeapYear, lunarDate.year);
    let lunarMonthName;
    if (lunarLeapMonth > 0 && lunarLeapMonth == lunarDate.month) {
      lunarMonthName = `闰${MONTH_IN_CHINA[lunarDate.month - 1]}月`;
    } else if (lunarLeapMonth > 0 && lunarLeapMonth < lunarDate.month) {
      lunarMonthName = `${MONTH_IN_CHINA[lunarDate.month - 1]}月`;
    } else {
      lunarMonthName = `${MONTH_IN_CHINA[lunarDate.month]}月`;
    }

    return {
      zodiac: this.__cacheGet(`zodiac[${ganZhiYear}]`, this.getYearZodiac, ganZhiYear),
      ganZhiYear: this.__cacheGet(`ganZhiYearName[${ganZhiYear}]`, this.getLunarYearName, ganZhiYear),
      ganZhiMonth: this.__cacheGet(`ganZhiMonth[${ganZhiMonth}]`, this.getLunarMonthName, year, ganZhiMonth),
      ganZhiDay: this.getLunarDayName(year, month, date),  // Too much, no need to store
      term: termList[month][date],
      lunarYear: lunarDate.year,
      lunarMonth: lunarDate.month,
      lunarDay: lunarDate.date,
      lunarMonthName: lunarMonthName,
      lunarDayName: DATE_IN_CHINA[lunarDate.date - 1],
      lunarLeapMonth: lunarLeapMonth,
    };
  }

  /**
   * Get Zodiac
   * @param {number} year
   * @returns {string}
   */
  static getYearZodiac(year) {
    return ZODIAC[(year - 1890 + 25) % 12];
  }

  /**
   * Get Lunar Year Name
   * @param {number} year
   * @param {number} offset
   * @returns {string}
   */
  static getLunarYearName(year, offset) {
    offset = offset || 0;
    return this._cyclical(year - 1890 + 25 + offset);
  }

  /**
   * Get Lunar Month Name
   * @param {number} year
   * @param {number} month
   * @param {number} offset
   * @returns {string}
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
   * @returns {string}
   */
  static getLunarDayName(year, month, day) {
    return this._cyclical(Date.UTC(year, month, day) / 86400000 + 29219 + 18);
  }
  /************* End of Static Public Functions *************/
}
