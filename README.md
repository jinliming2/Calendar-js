# Calendar-js
[![Developing](https://img.shields.io/badge/Calendar--js-Developing-yellow.svg)](https://github.com/772807886/Calendar-js)
[![GitHub license](https://img.shields.io/badge/license-AGPL-blue.svg)](https://raw.githubusercontent.com/772807886/Calendar-js/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/772807886/Calendar-js.svg)](https://github.com/772807886/Calendar-js/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/772807886/Calendar-js.svg)](https://github.com/772807886/Calendar-js/network)
[![GitHub issues](https://img.shields.io/github/issues/772807886/Calendar-js.svg)](https://github.com/772807886/Calendar-js/issues)

一个使用JS编写的日历库，遵循ES2015+CSS3标准

### [Demo](http://772807886.github.io/Calendar-js/demo.html)

### 写在前面
这个类库的开始就是以ES6+CSS3为基础的，不对旧版本浏览器进行兼容，在新版本的Chrome和Firefox均可以直接使用。

如果需要对旧版浏览器进行兼容，可以自行使用[Babel](https://babeljs.io/repl/)转换为ES5后使用。

## Usage 使用方法
1. 从GitHub Release[![GitHub Release](https://img.shields.io/github/release/772807886/Calendar-js.svg)](https://github.com/772807886/Calendar-js/releases)下载最新版本类库，包含压缩版的calendar.min.css、calendar.min.js与未压缩版的calendar.css、calendar.js。
2. 在页面中包含calendar.min.css（开发环境下包含未压缩版：calendar.css）和calendar.min.js（开发环境下包含未压缩版：calendar.js）。
```html
<link rel="stylesheet" href="./css/calendar.min.css" />
<script src="./js/calendar.min.js"></script>
```
3. 定义一个div容器，并指定id、宽度和高度。
```html
<div id="calendar" style="width: 600px; height: 400px;"></div>
```
4. 使用div容器的id构造Calendar对象。
```javascript
let obj = Calendar("calendar");
```
