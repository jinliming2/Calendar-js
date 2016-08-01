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
        /**
         * 布局容器
         * @type {Container}
         * @private
         */
        this._container = Container(id);
        //初始化
        this._container.addClass("calendar_js");
    }

    /************* 以下是本库提供的公有方法 *************/
    /************* 以上是本库提供的公有方法 *************/

    /**
     * 容器类
     * @param id
     * @returns {Container} 容器对象
     */
    function Container(id) {
        /**
         * 容器类
         * @param {string|HTMLElement} id 容器ID
         * @constructor
         */
        function Container(id) {
            //容器
            if(typeof id === "string") {
                this._container = document.getElementById(id);
            } else {
                this._container = id;
            }
        }

        /**
         * 取元素计算后样式
         * @param {string} property 样式
         * @param {HTMLElement} [_element] 外部元素
         * @returns {string} 值
         */
        Container.prototype._getProperty = function(property, _element) {
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
        };

        /**
         * 是否存在class
         * @param {string} cls 类名
         * @returns {boolean}
         */
        Container.prototype.hasClass = function(cls) {
            return this._container.classList.contains(cls);
        };

        /**
         * 添加class
         * @param {string} cls 类名
         * @returns {Container} 当前链式调用对象
         */
        Container.prototype.addClass = function(cls) {
            this._container.classList.add(cls);
            return this;
        };

        /**
         * 删除class
         * @param {string} cls 类名
         * @returns {Container} 当前链式调用对象
         */
        Container.prototype.removeClass = function(cls) {
            this._container.classList.remove(cls);
            return this;
        };

        /**
         * 取样式
         * @param {string} property 样式
         * @param {HTMLElement} [_element] 外部元素
         * @returns {string} 值
         */
        Container.prototype.css = function(property, _element) {
            if(_element) {
                return this._getProperty(property, _element);
            } else {
                return this._getProperty(property);
            }
        };

        /**
         * 取当前容器对象
         * @returns {HTMLElement} 容器对象
         */
        Container.prototype.getContainer = function() {
            return this._container;
        };

        return new Container(id);
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
