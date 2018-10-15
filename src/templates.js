/**
 * template.js - https://github.com/jinliming2/Calendar-js
 * Created by Liming on 2018/10/14.
 */
export const TPL_selector = window.document.createElement('template');
TPL_selector.innerHTML = `
<link rel="stylesheet" href="./src/selector.css">
<button id="left">
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 10L17.32 20V0Z"></path>
  </svg>
</button>
<div>
  <slot></slot>
  <button id="down">
    <svg width="10" height="10" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H20L10 17.32Z"></path>
    </svg>
  </button>
</div>
<button id="right">
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0V20L17.32 10Z"></path>
  </svg>
</button>
`;

export const TPL_calendar = window.document.createElement('template');
TPL_calendar.innerHTML = `
<link rel="stylesheet" href="./src/calendar.css">
<div class="title b_dark">
  <demo-calendar-selector id="year" class="c_light f_light"></demo-calendar-selector>
  <demo-calendar-selector id="month" class="c_light f_light"></demo-calendar-selector>
</div>
<div id="calendar" class="content b_light">
  <div id="week" class="week_row">
    <div class="week_column" data-week="0"></div>
    <div class="week_column" data-week="1"></div>
    <div class="week_column" data-week="2"></div>
    <div class="week_column" data-week="3"></div>
    <div class="week_column" data-week="4"></div>
    <div class="week_column" data-week="5"></div>
    <div class="week_column" data-week="6"></div>
  </div>
  <div class="content_row" data-no="0"></div>
  <div class="content_row" data-no="1"></div>
  <div class="content_row" data-no="2"></div>
  <div class="content_row" data-no="3"></div>
  <div class="content_row" data-no="4"></div>
  <div class="content_row" data-no="5"></div>
</div>
<div id="years" class="years b_light hide"></div>
<div id="months" class="months b_light hide"></div>
`;

export const TPL_calendar_date = window.document.createElement('template');
TPL_calendar_date.innerHTML = `
<div class="content_column">
  <div class="date"></div>
  <div class="lunar"></div>
  <div class="festival"></div>
</div>
`;

export const TPL_calendar_years = window.document.createElement('template');
TPL_calendar_years.innerHTML = `
<div class="years_row">
  <div class="years_column center_text" data-no="0"></div>
  <div class="years_column center_text" data-no="1"></div>
  <div class="years_column center_text" data-no="2"></div>
  <div class="years_column center_text" data-no="3"></div>
  <div class="years_column center_text" data-no="4"></div>
</div>
`;

export const TPL_calendar_month = window.document.createElement('template');
TPL_calendar_month.innerHTML = `
<div class="months_row">
  <div class="months_column center_text" data-no="0"></div>
  <div class="months_column center_text" data-no="1"></div>
  <div class="months_column center_text" data-no="2"></div>
  <div class="months_column center_text" data-no="3"></div>
</div>
`;
