/**
 * Calendar.js - https://github.com/772807886/Calendar-js
 * Created by Liming on 2016/8/1.
 */
"use strict";
(function(window) {
    /**
     * 日历类
     * @param {string|HTMLElement} id 容器ID
     * @constructor
     */
    function Calendar(id) {
    }

    //实例化
    if(typeof window.Calendar === 'undefined') {
        //只有当未初始化时才实例化
        /**
         * 日历类
         * @param {string|HTMLElement} id 容器ID
         * @returns {Calendar} 相册对象
         * @constructor
         */
        window.Calendar = function(id) {
            return new Calendar(id);
        };
    }
})(window);
