# Calendar-js
[![Testing](https://img.shields.io/badge/Calendar--js-Testing-yellow.svg)](https://github.com/jinliming2/Calendar-js)
[![GitHub license](https://img.shields.io/badge/license-AGPL-blue.svg)](https://raw.githubusercontent.com/jinliming2/Calendar-js/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/jinliming2/Calendar-js.svg)](https://github.com/jinliming2/Calendar-js/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/jinliming2/Calendar-js.svg)](https://github.com/jinliming2/Calendar-js/network)
[![GitHub issues](https://img.shields.io/github/issues/jinliming2/Calendar-js.svg)](https://github.com/jinliming2/Calendar-js/issues)

An Calendar library written in JS, based on Web Components v1, ES6(ES2015+) and CSS3.

一个使用 JS 编写的日历库，遵循 Web Components v1 + ES6(ES2015+) + CSS3 标准

### [Demo 呆萌](https://jinliming2.github.io/Calendar-js/demo.html)

### Before Use 写在前面
This Library is based on ES6 and CSS3, so it just work well in newer browsers.

这个类库的开始就是以 ES6 + CSS3 为基础的，不对旧版本浏览器进行兼容，在新版本的浏览器中可以直接使用。

> <span style="font-size: 22px; font-weight: bold; color: orange;">This Library is based on Web Components v1, so it's can only work on Chrome 54+, Firefox 63+, Opera 41+, Safari 10.1, and if you want to use it on Firefox 50+, you must go to [about:config](about:config) and turn on the switch named *dom.webcomponents.customelements.enabled* and *dom.webcomponents.shadowdom.enabled*.</span>

> <span style="font-size: 22px; font-weight: bold; color: orange;">使用到 Web Components v1 技术，目前 Chrome 54+、Firefox 63+、Opera 41+、Safari 10.1 可以直接使用，FireFox 50+ 需要在 [about:config](about:config) 中开启 *dom.webcomponents.customelements.enabled* 和 *dom.webcomponents.shadowdom.enabled* 开关才可以使用。</span>

***This is the first time I try to write documents in English, please tell me if I have any syntax error, Thanks!***

***第一次完全使用英文注释，如有英语语法错误，请告知，谢谢！***

### Known Problems 已知问题
- ~~Firefox（Nightly 51.0a1 2016-08-09）发现在 Shadow Dom 中控制 Element 的 display: none 样式时，会导致页面**崩溃**~~。

  此问题在使用 Web Components v1 标准重构后不再存在，应该是之前 Firefox 实现 v0 规范时的 Bug。

### Citation 引用说明
农历计算部分相关算法参考自 [zzyss86/LunarCalendar](https://github.com/zzyss86/LunarCalendar)。

## Usage 使用方法
- Download the newest archives in GitHub Release[![GitHub Release](https://img.shields.io/github/release/jinliming2/Calendar-js.svg)](https://github.com/jinliming2/Calendar-js/releases).

> 从 GitHub Release[![GitHub Release](https://img.shields.io/github/release/jinliming2/Calendar-js.svg)](https://github.com/jinliming2/Calendar-js/releases) 下载最新版本类库。

- Import `Calendar.js` Module in your web page. (Notice: If the class library is not under `src`, you should also modify the CSS file import path in the `templates.js` file.)

> 在页面中包含 `Calendar.js` 模块。（注意：如果类库目录不在 `src` 下，应该同时修改 `templates.js` 文件中的 CSS 文件导入路径。）

```html
<!-- Must be imported as module by using the `type="module"` -->
<!-- 必须使用 `type="module"` 模块形式导入 -->
<script type="module" src="./src/Calendar.js"></script>
```

- Use the tag `<demo-calendar id="calendar"></demo-calendar>` directly in your HTML document.

> 直接在你的 HTML 文档中使用标签 `<demo-calendar id="calendar"></demo-calendar>` 即可。

- Can be operated through the API on the DOM node:

> 可以通过 DOM 节点上的 API 进行操作：

```javascript
const calendar = document.getElementById('calendar');  // Or querySelector, getElementsByTagName, etc.
console.log(calendar.year, calendar.month, calendar.date);
calendar.lastYear();
calendar.nextMonth();
// ......
```
