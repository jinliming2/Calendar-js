/**
 * Calendar.js - https://github.com/772807886/Calendar-js
 * Created by Liming on 2016/8/1.
 */
"use strict";
(function(window) {
    /************* Begin of Constants Definition *************/
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
     * Selector - Part of The Calendar to Select Month or Year
     */
    class Selector {
        /**
         * @param {HTMLElement} obj Container
         */
        constructor(obj) {
            this._root = obj.createShadowRoot();
            let style = document.createElement("style");
            style.innerHTML = SELECTOR_STYLE;
            let leftButton = document.createElement("div");
            leftButton.innerHTML = SELECTOR_LEFT_BUTTON;
            let mainDisplay = document.createElement("div");
            let content = document.createElement("content");
            let downButton = document.createElement("div");
            downButton.innerHTML = SELECTOR_DOWN_BUTTON;
            mainDisplay.appendChild(content);
            mainDisplay.appendChild(downButton);
            let rightButton = document.createElement("div");
            rightButton.innerHTML = SELECTOR_RIGHT_BUTTON;
            this._root.appendChild(style);
            this._root.appendChild(leftButton);
            this._root.appendChild(mainDisplay);
            this._root.appendChild(rightButton);
            console.log(this._root);
        }

        setLeftButtonEvent(eventName, event) {
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
            if(_element) {
                if(_element.currentStyle) {
                    return _element.currentStyle.getAttribute(property);
                } else {
                    return getComputedStyle(_element, null).getPropertyValue(property);
                }
            } else {
                if(this._container.currentStyle) {
                    return this._container.currentStyle.getAttribute(property);
                } else {
                    return getComputedStyle(this._container, null).getPropertyValue(property);
                }
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
             * 布局容器
             * @type {Container}
             * @private
             */
            this._container = new Container(id);
            //初始化
            this._container.addClass("calendar");
            new Selector(document.getElementById("years_select"));
            new Selector(document.getElementById("months_select"));
        }

        /************* Begin of Public Functions *************/
        /************* End of Public Functions *************/
        /************* Begin of Private Functions *************/
        /************* End of Private Functions *************/
    }

    //Set up
    if(typeof window.Calendar === 'undefined') {
        window.Calendar = Calendar;
    }
})(window);
