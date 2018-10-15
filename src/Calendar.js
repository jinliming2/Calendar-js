/**
 * Calendar.js - https://github.com/jinliming2/Calendar-js
 * Created by Liming on 2018/10/14.
 */
import Selector from './Selector.js';
import Lunar from './Lunar.js';
import { TPL_calendar, TPL_calendar_date, TPL_calendar_years, TPL_calendar_month } from './templates.js';

const {
  FIRST_DAY_OF_WEEK = 0,
  DAY_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  MONTH_OF_YEAR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  DATE_IN_CHINA = [
    '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '卅一'
  ],
} = window.Calendar_Config || {};

class Calendar extends HTMLElement {
  /************* Begin of Constructor *************/
  constructor() {
    super();
    const body = window.document.importNode(TPL_calendar.content, true);
    this._initBody(body);

    this._date = new Date(0);

    const now = new Date();
    this.year = this.getAttribute('year') || now.getFullYear();
    this.month = this.getAttribute('month') ? this.getAttribute('month') : now.getMonth() + 1;
    this.date = this.getAttribute('date') || now.getDate();

    this._date.setFullYear(this.year, this.month - 1, this.date);
    this._reloadMonth();

    this._root = this.attachShadow({ mode: 'open' });
    this._initEvents();
    this._root.appendChild(body);
  }
  /************* End of Constructor *************/
  /************* Begin of Static Public Fields *************/
  static get observedAttributes() {
    return ['year', 'month', 'date'];
  }
  /************* End of Static Public Fields *************/
  /************* Begin of Static Public Fields *************/
  static getInformation(year, month, date) {
    const lunar = Lunar.getLunar(year, month - 1, date);
    return {
      solar: {
        year: year,
        month: month,
        date: date,
        week: DAY_OF_WEEK[new Date(year, month - 1, date).getDay()],
        zodiac: Lunar.getYearZodiac(year + 1),
      },
      lunar: {
        year: lunar.year,
        month: lunar.lunarMonthName,
        date: lunar.lunarDayName,
        yearName: lunar.ganZhiYear,
        monthName: lunar.ganZhiMonth,
        dayName: lunar.ganZhiDay,
        zodiac: lunar.zodiac,
        term: lunar.term,
      },
    };
  }

  static format(format = "", datetime = new Date()) {
    const [
      year, month, date, day,
      hour, minute, second, millisecond,
    ] = [
      datetime.getFullYear(), datetime.getMonth() + 1,
      datetime.getDate(), DAY_OF_WEEK[datetime.getDay()],
      datetime.getHours(), datetime.getMinutes(),
      datetime.getSeconds(), datetime.getMilliseconds(),
    ];
    const lunar = Lunar.getLunar(year, month - 1, date);
    return format
      .replace(/\{YEAR\}/g, year.toString())
      .replace(/\{year\}/g, year.toString().substr(-2))
      .replace(/\{MONTH\}/g, month.toString().padStart(2, '0'))
      .replace(/\{month\}/g, month.toString())
      .replace(/\{DATE\}/g, date.toString().padStart(2, '0'))
      .replace(/\{date\}/g, date.toString())
      .replace(/\{WEEKDAY\}/g, day)
      .replace(/\{HOUR\}/g, hour.toString().padStart(2, '0'))
      .replace(/\{hour\}/g, hour.toString())
      .replace(/\{MINUTE\}/g, minute.toString().padStart(2, '0'))
      .replace(/\{minute\}/g, minute.toString())
      .replace(/\{SECOND\}/g, second.toString().padStart(2, '0'))
      .replace(/\{second\}/g, second.toString())
      .replace(/\{MILLISECOND\}/g, millisecond.toString().padStart(3, '0'))
      .replace(/\{millisecond\}/g, millisecond.toString())
      .replace(/\{GANZHIYEAR\}/gi, lunar.ganZhiYear)
      .replace(/\{GANZHIMONTH\}/gi, lunar.ganZhiMonth)
      .replace(/\{GANZHIDAY\}/gi, lunar.ganZhiDay)
      .replace(/\{ZODIAC\}/gi, lunar.zodiac)
      .replace(/\{LUNARMONTH\}/gi, lunar.lunarMonthName)
      .replace(/\{LUNARDATE\}/gi, lunar.lunarDayName)
      .replace(/\{TERM\}/gi, lunar.term || "");
  }
  /************* End of Static Public Fields *************/
  /************* Begin of Public Fields *************/
  get year() {
    return this._date.getFullYear();
  }

  set year(val) {
    val = Number(val);
    if (this.year === val) {
      return;
    }
    if (!Number.isSafeInteger(val)) {
      throw new TypeError('Parameter Error: Year Must Be An Integer!');
    }
    if (val < 1970 || val >= 2090) {
      throw new RangeError('Range Error: Year Must in [1970, 2090)!');
    }
    const beforeYearChange = new CustomEvent('before-year-change', {
      detail: { year: val },
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    if (!this.dispatchEvent(beforeYearChange)) {
      return;
    }
    this.setAttribute('year', val);
    this._date.setFullYear(val);
    this._dom.selector.year.innerHTML = val;
    this._reloadMonth();

    const eventInfo = {
      detail: { year: this.year, month: this.month, date: this.date },
      bubbles: true,
      cancelable: false,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('year-changed', eventInfo));
    this.dispatchEvent(new CustomEvent('date-changed', eventInfo));
  }

  get month() {
    return this._date.getMonth() + 1;
  }

  set month(val) {
    val = Number(val);
    let m = this.month;
    if (m === val) {
      return;
    }
    if (!Number.isSafeInteger(val)) {
      throw new TypeError('Parameter Error: Month Must Be An Integer!');
    }
    if (val < 1 || val > 12) {
      throw new RangeError('Range Error: Month Must in [1, 12]!');
    }

    const beforeMonthChange = new CustomEvent('before-month-change', {
      detail: { month: val },
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    if (!this.dispatchEvent(beforeMonthChange)) {
      return;
    }

    --m;
    let current = this._dom.months.children[Math.floor(m / 4)][m % 4];
    // Reset Highlight
    current.classList.remove('b_dark');
    current.classList.remove('c_light');

    const setterMaxDate = this._getMaxDate(this.year, val);
    if (this.date > setterMaxDate) {
      this.date = setterMaxDate;
    }
    this.setAttribute('month', val);
    --val;
    this._date.setMonth(val);
    this._dom.selector.month.innerHTML = MONTH_OF_YEAR[val];
    this._reloadMonth();

    current = this._dom.months.children[Math.floor(val / 4)][val % 4];
    // Highlight
    current.classList.add('b_dark');
    current.classList.add('c_light');

    const eventInfo = {
      detail: { year: this.year, month: this.month, date: this.date },
      bubbles: true,
      cancelable: false,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('month-changed', eventInfo));
    this.dispatchEvent(new CustomEvent('date-changed', eventInfo));
  }

  get date() {
    return this._date.getDate();
  }

  set date(val) {
    val = Number(val);
    if (this.year === val) {
      return;
    }
    if (!Number.isSafeInteger(val)) {
      throw new TypeError('Parameter Error: Date Must Be An Integer!');
    }
    const max = this._getMaxDate();
    if (val < 1 || val > max) {
      throw new RangeError(`Range Error: Date Must in [1, ${max}] This Month!`);
    }
    const beforeDateChange = new CustomEvent('before-date-change', {
      detail: { date: val },
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    if (!this.dispatchEvent(beforeDateChange)) {
      return;
    }
    this.setAttribute('date', val);
    this._date.setDate(val);
    // Highlight
    const current = this._dom.calendar.querySelector('.b_dark');
    current.classList.remove('b_dark');
    current.classList.remove('c_light');
    const month = this.month;
    for (let i = 0; i < this._dom.rows.length; ++i) {
      let j = 0;
      for (; j < this._dom.rows[i].length; ++j) {
        const target = this._dom.rows[i][j].dom;
        if (target.dataset.month == month && target.dataset.date == val) {
          target.classList.add('b_dark');
          target.classList.add('c_light');
          break;
        }
      }
      if (j < this._dom.rows[i].length) {
        break;
      }
    }

    const eventInfo = {
      detail: { year: this.year, month: this.month, date: this.date },
      bubbles: true,
      cancelable: false,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('date-changed', eventInfo));
  }

  get day() {
    return this._date.getDay();
  }

  get information() {
    return Calendar.getInformation(this.year, this.month, this.date);
  }
  /************* End of Public Fields *************/
  /************* Begin of Public Methods *************/
  lastYear() {
    if (this.year > 1970) {
      --this.year;
    }
  }

  nextYear() {
    if (this.year < 2089) {
      ++this.year;
    }
  }

  lastMonth() {
    if (this.month > 1) {
      --this.month;
    } else if (this.year > 1970) {
      --this.year;
      this.month = 12;
    }
  }

  nextMonth() {
    if (this.month < 12) {
      ++this.month;
    } else if (this.year < 2089) {
      ++this.year;
      this.month = 1;
    }
  }

  format(format) {
    return Calendar.format(format, this._date);
  }

  selectYear() {
    const beforeSelectYear = new CustomEvent('before-select-year', {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    if (!this.dispatchEvent(beforeSelectYear)) {
      return;
    }

    let [row, column] = [0, 0];
    for (let year = this.year - 12; year <= this.year + 12; ++year) {
      this._dom.years.children[row][column].dataset.year = year;
      this._dom.years.children[row][column].innerHTML = year;
      if (++column > 4) {
        ++row;
        column = 0;
      }
    }

    // Highlight
    this._dom.years.children[2][2].classList.add('b_dark', 'c_light');

    this._dom.months.root.classList.add('hide');
    if (this._dom.years.root.classList.toggle('hide')) {
      this._dom.calendar.classList.remove('hide');
    } else {
      this._dom.calendar.classList.add('hide');
    }

    const selectYear = new CustomEvent('select-year', {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.dispatchEvent(selectYear);
  }

  selectMonth() {
    const beforeSelectMonth = new CustomEvent('before-select-month', {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    if (!this.dispatchEvent(beforeSelectMonth)) {
      return;
    }

    this._dom.years.root.classList.add('hide');
    if (this._dom.months.root.classList.toggle('hide')) {
      this._dom.calendar.classList.remove('hide');
    } else {
      this._dom.calendar.classList.add('hide');
    }

    const selectMonth = new CustomEvent('select-month', {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.dispatchEvent(selectMonth);
  }
  /************* End of Public Methods *************/
  /************* Begin of Private Methods *************/
  _initBody(body) {
    this._dom = {
      selector: {
        year: body.getElementById('year'),
        month: body.getElementById('month'),
      },
      calendar: body.getElementById('calendar'),
      rows: [],
      years: {
        children: [],
      },
      months: {
        children: [],
      },
    };
    const week = body.getElementById('week').childNodes;
    for (const weekDom of week) {
      if (!(weekDom instanceof HTMLElement)) {
        continue;
      }
      const i = Number(weekDom.dataset.week);
      weekDom.innerHTML = DAY_OF_WEEK[(FIRST_DAY_OF_WEEK + i) % 7];
    }
    const dateList = body.querySelectorAll('.content_row');
    for (const dateListItem of dateList) {
      const row = Number(dateListItem.dataset.no);
      this._dom.rows[row] = [];
      for (let column = 0; column < 7; ++column) {
        const dom = window.document.importNode(TPL_calendar_date.content, true);
        this._dom.rows[row][column] = {
          dom: dom.firstElementChild,
          date: dom.querySelector('.date'),
          lunar: dom.querySelector('.lunar'),
          festival: dom.querySelector('.festival'),
        };
        dateListItem.appendChild(dom);
      }
    }
    const years = body.getElementById('years');
    this._dom.years.root = years;
    for (let row = 0; row < 5; ++row) {
      this._dom.years.children[row] = [];
      const dom = window.document.importNode(TPL_calendar_years.content, true);
      const items = dom.querySelectorAll('.years_column');
      for (const item of items) {
        if (!(item instanceof HTMLElement)) {
          continue;
        }
        const column = Number(item.dataset.no);
        this._dom.years.children[row][column] = item;
      }
      years.appendChild(dom);
    }
    const months = body.getElementById('months');
    this._dom.months.root = months;
    for (let row = 0; row < 3; ++row) {
      this._dom.months.children[row] = [];
      const dom = window.document.importNode(TPL_calendar_month.content, true);
      const items = dom.querySelectorAll('.months_column');
      for (const item of items) {
        if (!(item instanceof HTMLElement)) {
          continue;
        }
        const column = Number(item.dataset.no);
        this._dom.months.children[row][column] = item;
        item.innerHTML = MONTH_OF_YEAR[row * 4 + column];
        item.dataset.month = row * 4 + column + 1;
      }
      months.appendChild(dom);
    }
  }

  _initEvents() {
    this._dom.selector.year.addEventListener('left', this.lastYear.bind(this));
    this._dom.selector.year.addEventListener('down', this.selectYear.bind(this));
    this._dom.selector.year.addEventListener('right', this.nextYear.bind(this));

    this._dom.selector.month.addEventListener('left', this.lastMonth.bind(this));
    this._dom.selector.month.addEventListener('down', this.selectMonth.bind(this));
    this._dom.selector.month.addEventListener('right', this.nextMonth.bind(this));

    this._dom.calendar.addEventListener('click', e => {
      const loop = target => {
        if (target == this._root) {
          return;
        }
        if (target.classList.contains('content_column')) {
          const { year, month, date } = target.dataset;
          this.year = year;
          this.month = month;
          this.date = date;
        } else {
          loop(target.parentNode);
        }
      };
      loop(e.target);
    });

    this._dom.years.root.addEventListener('click', e => {
      this.year = e.target.dataset.year;
      this.selectYear();
    });

    this._dom.months.root.addEventListener('click', e => {
      this.month = e.target.dataset.month;
      this.selectMonth();
    });
  }

  _reloadMonth() {
    const d = new Date(this.year, this.month - 1, 1);
    d.setDate(-(d.getDay() - FIRST_DAY_OF_WEEK + 6) % 7);
    for (let row = 0; row < this._dom.rows.length; ++row) {
      for (let column = 0; column < this._dom.rows[row].length; ++column) {
        let [year, month, date] = [d.getFullYear(), d.getMonth(), d.getDate()];
        const arr = this._dom.rows[row][column];
        // Save Dataset
        arr.dom.dataset.year = year;
        arr.dom.dataset.month = month + 1;
        arr.dom.dataset.date = date;

        // Set Value
        const lunar = Lunar.getLunar(year, month, date);
        arr.date.innerHTML = date;
        if (lunar.term) {
          arr.lunar.innerHTML = lunar.term;
        } else if (lunar.lunarDayName == DATE_IN_CHINA[0]) {
          arr.lunar.innerHTML = lunar.lunarMonthName;
        } else {
          arr.lunar.innerHTML = lunar.lunarDayName;
        }
        arr.festival.innerHTML = '';  // TODO: Festival

        // Add Class
        if (month + 1 < this.month) {
          // Last Month
          arr.dom.classList.remove('o_normal');
          arr.dom.classList.remove('b_dark');
          arr.dom.classList.remove('c_light');
          arr.dom.classList.add('o_light');
          arr.date.classList.add('lastMonth');
          arr.date.classList.remove('nextMonth');
          arr.lunar.classList.add('lastMonth');
          arr.lunar.classList.remove('nextMonth');
          arr.festival.classList.add('lastMonth');
          arr.festival.classList.remove('nextMonth');
        } else if (month + 1 == this.month) {
          // This Month
          arr.dom.classList.remove('o_light');
          arr.dom.classList.add('o_normal');
          if (date == this.date) {
            arr.dom.classList.add('b_dark');
            arr.dom.classList.add('c_light');
          } else {
            arr.dom.classList.remove('b_dark');
            arr.dom.classList.remove('c_light');
          }
          arr.date.classList.remove('lastMonth');
          arr.date.classList.remove('nextMonth');
          arr.lunar.classList.remove('lastMonth');
          arr.lunar.classList.remove('nextMonth');
          arr.festival.classList.remove('lastMonth');
          arr.festival.classList.remove('nextMonth');
        } else {
          // Next Month
          arr.dom.classList.remove('o_normal');
          arr.dom.classList.remove('b_dark');
          arr.dom.classList.remove('c_light');
          arr.dom.classList.add('o_light');
          arr.date.classList.remove('lastMonth');
          arr.date.classList.add('nextMonth');
          arr.lunar.classList.remove('lastMonth');
          arr.lunar.classList.add('nextMonth');
          arr.festival.classList.remove('lastMonth');
          arr.festival.classList.add('nextMonth');
        }
        d.setDate(date + 1);
      }
    }
  }

  _getMaxDate(year = this.year, month = this.month) {
    return new Date(year, month, 0).getDate();
  }
  /************* End of Private Methods *************/
}

window.customElements.define('demo-calendar-selector', Selector);
window.customElements.define('demo-calendar', Calendar);
