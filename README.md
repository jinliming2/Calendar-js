# Calendar-js
[![Testing](https://img.shields.io/badge/Calendar--js-Testing-yellow.svg)](https://github.com/772807886/Calendar-js)
[![GitHub license](https://img.shields.io/badge/license-AGPL-blue.svg)](https://raw.githubusercontent.com/772807886/Calendar-js/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/772807886/Calendar-js.svg)](https://github.com/772807886/Calendar-js/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/772807886/Calendar-js.svg)](https://github.com/772807886/Calendar-js/network)
[![GitHub issues](https://img.shields.io/github/issues/772807886/Calendar-js.svg)](https://github.com/772807886/Calendar-js/issues)

An Calendar library written in JS, based on ES2015 and CSS3.

一个使用 JS 编写的日历库，遵循 ES2015 + CSS3 标准

### [Demo 呆萌](https://772807886.github.io/Calendar-js/demo.html)

### Before Use 写在前面
This Library is based on ES6 and CSS3, so it just work well in newer browsers.

这个类库的开始就是以 ES6 + CSS3 为基础的，不对旧版本浏览器进行兼容，在新版本的浏览器中可以直接使用。

If you need older browsers support, try [Babel](https://babeljs.io/repl/) please!

如果需要对旧版浏览器进行兼容，可以自行使用 [Babel](https://babeljs.io/repl/) 转换为 ES5 后使用。

> <span style="font-size: 22px; font-weight: bold; color: orange;">This Library is based on Shadow Dom, so it's can only work on Chrome 35+, Opera 22+, Safari 10, and if you want to use it on Firefox 29+, you must go to [about:config](about:config) and turn on the switch named *dom.webcomponents.enabled*.</span>

> <span style="font-size: 22px; font-weight: bold; color: orange;">使用到 Shadow Dom 技术，目前 Chrome 35+、Opera 22+、Safari 10 可以直接使用，FireFox 29+ 需要在 [about:config](about:config) 中开启 *dom.webcomponents.enabled* 开关才可以使用。</span>

***This is the first time I try to write documents in English, please tell me if I have any syntax error, Thanks!***

***第一次完全使用英文注释，如有英语语法错误，请告知，谢谢！***

### Known Problems 已知问题
- Firefox（Nightly 51.0a1 2016-08-09）发现在 Shadow Dom 中控制 Element 的 display: none 样式时，会导致页面**崩溃**。

### Citation 引用说明
农历计算部分相关算法参考自 [zzyss86/LunarCalendar](https://github.com/zzyss86/LunarCalendar)。

## Usage 使用方法
- Download the newest archives in GitHub Release[![GitHub Release](https://img.shields.io/github/release/772807886/Calendar-js.svg)](https://github.com/772807886/Calendar-js/releases), includes calendar.js and it's compressed version: calendar.min.js.

> 从 GitHub Release[![GitHub Release](https://img.shields.io/github/release/772807886/Calendar-js.svg)](https://github.com/772807886/Calendar-js/releases) 下载最新版本类库，包含压缩版的 calendar.min.js 与未压缩版的 calendar.js。

- Import calendar.min.js in your web page. (If you want to debug it, you can also import calendar.js.)

> 在页面中包含 calendar.min.js（开发环境下包含未压缩版：calendar.js）。

```html
<script src="./js/calendar.min.js"></script>
```

- Now, create a div element with id, and you can also set up it's width, height and other properties.

> 定义一个 div 容器，并指定 id，可选指定宽度和高度及其它属性。

```html
<div id="calendar" style="width: 600px; height: 400px;"></div>
```

**注意：宽度与高度设置过小可能影响显示效果！**

- Create an object with div element's id.

> 使用 div 容器的 id 构造 Calendar 对象。

```javascript
let obj = new Calendar("calendar");
```
