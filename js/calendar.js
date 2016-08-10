/**
 * Calendar.js - https://github.com/772807886/Calendar-js
 * Created by Liming on 2016/8/1.
 */
"use strict";
(function(window) {
    /************* Begin of Constants Definition *************/
    /**
     * Day Of A Week
     * @type {string[]}
     */
    const DAY_OF_WEEK = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    /**
     * Month Of A Year
     * @type {string[]}
     */
    const MONTH_OF_YEAR = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
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
    /************* End of Constants Definition *************/
    /************* Begin of Tool Classes Definition *************/
    /**
     * Lunar Date Calculator
     */
    class Lunar {
        /**
         * Get Lunar Date
         * @param year
         * @param month
         * @param date
         */
        static getLunar(year, month, date) {
        }
    }
    /**
     * Selector - Part of The Calendar to Select Month or Year
     */
    class Selector {
        /**
         * @param {HTMLElement} obj Container
         */
        constructor(obj) {
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
         * @param {string|HTMLElement} id Container's ID
         */
        constructor(id) {
            if(typeof id === "string") {
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
         * Get Style String
         * @param {string} property
         * @param {HTMLElement} [_element]
         * @return {string} Style String
         */
        css(property, _element) {
            if(_element) {
                return this._getProperty(property, _element);
            } else {
                return this._getProperty(property);
            }
        }

        /**
         * Get This Html Element
         * @return {HTMLElement|*}
         */
        getContainer() {
            return this._container;
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
             * @type {Date}
             * @private
             */
            this._date = new Date();
            /**
             * @type {Container}
             * @private
             */
            this._container = new Container(id);
            /**
             * @type {Selector}
             * @private
             */
            this._years_select = new Selector(document.getElementById("years_select"));
            /**
             * @type {Selector}
             * @private
             */
            this._months_select = new Selector(document.getElementById("months_select"));
            //Initialize
            this._container.addClass("calendar");
        }

        /************* Begin of Public Functions *************/
        /**
         * Set Year
         * @param {number} year A Number Between 1970 and 2104, It Must Great Than or Equal To 1970 And Less Than 2105
         */
        setYear(year) {
            if(!Number.isSafeInteger(year)) {
                throw "Parameter Error: Year Must Be An Integer!";
            }
            if(year < 1970 || year >= 2105) {
                throw "Range Error: Year Must in [1970, 2105)!";
            }
            this._date.setFullYear(year);
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
            this._date.setMonth(month - 1);
        }

        /**
         * Set Date
         * @param {number} date A Number Must Great Than or Equal to 1 And Less Than or Equal to The Maximum Date in This Month
         */
        setDate(date) {
            if(!Number.isSafeInteger(date)) {
                throw "Parameter Error: Date Must Be An Integer!";
            }
            let max = new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0).getDate();
            if(date < 1 || date > max) {
                throw "Range Error: Date Must in [1, " + max + "] This Month!";
            }
            this._date.setDate(date);
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

        /************* End of Public Functions *************/
        /************* Begin of Private Functions *************/
        /************* End of Private Functions *************/
    }

    //Set up
    if(typeof window.Calendar === 'undefined') {
        window.Calendar = Calendar;
    } else {
        throw "window.Calendar Namespace Conflict!";
    }
})(window);
