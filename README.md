# Calendar-js
[![Developing](https://img.shields.io/badge/Calendar--js-Developing-yellow.svg)](https://github.com/772807886/Calendar-js)
[![GitHub license](https://img.shields.io/badge/license-AGPL-blue.svg)](https://raw.githubusercontent.com/772807886/Calendar-js/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/772807886/Calendar-js.svg)](https://github.com/772807886/Calendar-js/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/772807886/Calendar-js.svg)](https://github.com/772807886/Calendar-js/network)
[![GitHub issues](https://img.shields.io/github/issues/772807886/Calendar-js.svg)](https://github.com/772807886/Calendar-js/issues)

一个使用 JS 编写的日历库，遵循 ES2015 + CSS3 标准

### [Demo](http://772807886.github.io/Calendar-js/demo.html)

### 写在前面
这个类库的开始就是以 ES6 + CSS3 为基础的，不对旧版本浏览器进行兼容，在新版本的 Chrome 和 Firefox 均可以直接使用。

如果需要对旧版浏览器进行兼容，可以自行使用 [Babel](https://babeljs.io/repl/) 转换为 ES5 后使用。

> <span style="font-size: 22px; font-weight: bold; color: orange;">使用到 Shadow Dom 技术，目前 Chrome 35+、Opera 22+、Safari 10 可以直接使用，FireFox 29+ 需要在 [about:config](about:config) 中开启 dom.webcomponents.enabled 开关才可以使用。</span>

***第一次完全使用英文注释，如有英语语法错误，请告知，谢谢！***

### 已知问题
- Firefox（Nightly 51.0a1）发现在 Shadow Dom 中控制 Element 的 display: none 样式时，会导致页面**崩溃**。

### 引用说明
农历计算部分相关算法参考自 [zzyss86/LunarCalendar](https://github.com/zzyss86/LunarCalendar)。

## Usage 使用方法
1. 从 GitHub Release[![GitHub Release](https://img.shields.io/github/release/772807886/Calendar-js.svg)](https://github.com/772807886/Calendar-js/releases) 下载最新版本类库，包含压缩版的 calendar.min.js 与未压缩版的 calendar.js。
2. 在页面中包含 calendar.min.js（开发环境下包含未压缩版：calendar.js）。
```html
<script src="./js/calendar.min.js"></script>
```
3. 定义一个 div 容器，并指定 id、宽度和高度。
```html
<div id="calendar" style="width: 600px; height: 400px;"></div>
```
> 注意：宽度与高度设置过小可能影响显示效果！

4. 使用 div 容器的 id 构造 Calendar 对象。
```javascript
let obj = new Calendar("calendar");
```
