# entry-table
数据录入用表格

使用方法
```javascript
import * as nls from 'vscode-nls';

let localize = nls.config({ locale: 'de-DE' })();

console.log(localize('keyOne', "Hello World"));
console.log(localize('keyTwo', "Current Date {0}", Date.now()));
```