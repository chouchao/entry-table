/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var entrySelect_1 = __webpack_require__(1);
var entryTable_1 = __webpack_require__(3);
(function ($) {
    function isString(x) {
        return typeof x === 'string';
    }
    $.fn.entryTable = function (options, param) {
        var j = $(this);
        var result;
        j.each(function () {
            if (options) {
                if (isString(options)) {
                    var state = $(this).data('entryTable');
                    if (state) {
                        var method = options;
                        if (method === 'setData') {
                            state.setData(param);
                        }
                        else if (method === 'getData') {
                            result = state.getData();
                        }
                    }
                }
                else {
                    $(this).data('entryTable', new entryTable_1.EntryTable($, $(this), options));
                }
            }
        });
        return result || j;
    };
    $.fn.entrySelect = function (options, param) {
        var j = $(this);
        var result;
        j.each(function () {
            if (isString(options)) {
                var state = $(this).data('entrySelect');
                if (state) {
                    var method = options;
                    if (method === 'setValue') {
                        state.setValue(param);
                    }
                    else if (method === 'getValue') {
                        result = state.getValue();
                    }
                    else if (method === 'setData') {
                        result = state.setData(param);
                    }
                }
            }
            else {
                $(this).data('entrySelect', new entrySelect_1.EntrySelect($, $(this), options));
            }
        });
        return j;
    };
})(jQuery);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var EntrySelectOptions_1 = __webpack_require__(2);
var EntrySelect = (function () {
    function EntrySelect($, element, options) {
        this.$ = $;
        this.element = element;
        this.listItemSelectedClass = 'list-item-selected';
        this.options = $.extend({}, new EntrySelectOptions_1.DefaultEntrySelectOptions(), options);
        this.options.value = this.options.value || this.element.val();
        this.initList();
        this.initEvents();
        this.resetButtonCss();
    }
    EntrySelect.prototype.initList = function () {
        var name = this.element.attr('name');
        this.valueElement = $("<input type=\"hidden\" name=\"" + name + "\">");
        this.buttonElement = $("<i class=\"fa fa-caret-down\"></i>");
        this.listElement = $("<div class=\"entry-select-list\"></div>");
        this.listElement.hide();
        this.element.attr('name', name + '_text')
            .after(this.valueElement)
            .after(this.listElement)
            .after(this.buttonElement);
        this.setValue(this.options.value);
    };
    EntrySelect.prototype.isCharWhich = function (which) {
        return which === 8
            || (which >= 48 && which <= 57)
            || (which >= 96 && which <= 105)
            || (which >= 65 && which <= 90);
    };
    EntrySelect.prototype.initEvents = function () {
        var _this = this;
        this.element.on('change', function (event) {
        })
            .on('keydown', function (event) {
            if (event.which === 13) {
                if (_this.listIsVisible() && _this.hasSelectedItem()) {
                    _this.applySelectedItem(_this.getSelectedItem());
                }
            }
            else if (event.which === 40) {
                if (_this.listIsVisible()) {
                    _this.selectNextListItem();
                }
                else {
                    _this.showList(_this.options.data);
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
            }
            else if (event.which === 38) {
                if (_this.listIsVisible()) {
                    _this.selectPrevListItem();
                }
            }
        })
            .on('keyup', function (event) {
            if (_this.isCharWhich(event.which)) {
                var v_1 = _this.element.val();
                console.log("element value:" + v_1);
                if (v_1 !== '') {
                    var data = _this.options.data
                        .filter(function (item) { return item.value.indexOf(v_1) >= 0 || item.text.indexOf(v_1) >= 0; });
                    _this.showList(data);
                }
            }
        })
            .on('blur', function (event) {
            _this.hideList();
            _this.resetButtonCss();
        });
        this.listElement.off('mouseleave').on('mouseleave', function (event) {
            _this.isListMouseOver = false;
            _this.hideList();
        }).off('mouseover').on('mouseover', function (event) {
            _this.isListMouseOver = true;
        });
        this.buttonElement.off('mouseleave').on('mouseleave', function (event) {
            _this.isListMouseOver = false;
            _this.hideList();
        }).off('mouseover').on('mouseover', function (event) {
            _this.isListMouseOver = true;
        }).on('click', function (event) {
            if (_this.listIsVisible()) {
                _this.hideList(true);
            }
            else {
                _this.showList(_this.options.data);
                if (!_this.element.is(':focus')) {
                    _this.element[0].focus();
                }
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        });
        $(window).off('resize', this.resetButtonCss).on('resize', this.resetButtonCss);
    };
    EntrySelect.prototype.resetButtonCss = function () {
        var elementPosition = this.element.position();
        this.buttonElement.css({
            'position': 'absolute',
            'left': elementPosition.left + this.element.width() - this.buttonElement.width(),
            'top': elementPosition.top + ((this.element.outerHeight() - this.buttonElement.height()) / 2),
            'z-index': 1,
            'cursor': 'pointer'
        });
    };
    EntrySelect.prototype.hideList = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (force) {
            this.listElement.hide();
        }
        else {
            setTimeout(function () {
                if (!_this.isListMouseOver) {
                    _this.listElement.hide();
                }
            }, 500);
        }
    };
    EntrySelect.prototype.showList = function (data) {
        var _this = this;
        var html = new Array();
        var selected = false;
        var selectedClass;
        var elementValue = this.element.val();
        data.forEach(function (item) {
            if (!selected && (item.value == elementValue || item.text == elementValue)) {
                selectedClass = " class=\"" + _this.listItemSelectedClass + "\" ";
                selected = true;
            }
            else {
                selectedClass = '';
            }
            html.push('<tr data-text="' + item.text
                + '" data-value="' + item.value + '"' + selectedClass + '><td>' + item.value
                + '</td><td>' + item.text + '</td></tr>');
        });
        this.listElement.html('<table><tbody>' + html.join('') + '</tbody></table>');
        var elementPosition = this.element.position();
        var listWidth = (this.options.listWidth || this.element.outerWidth()) + 'px';
        var listheight = (this.options.listHeight || 200) + 'px';
        this.resetShowListCss();
        this.listElement.find('>table>tbody>tr>td').off('click')
            .on('click', function (event) {
            console.log('td click');
            var tr = $(event.target).parent();
            _this.applySelectedItem(tr);
        });
    };
    EntrySelect.prototype.resetShowListCss = function () {
        var elementPosition = this.element.position();
        var listWidth = (this.options.listWidth || this.element.outerWidth()) + 'px';
        var listheight = (this.options.listHeight || 200) + 'px';
        this.listElement.css({
            'display': 'block',
            'position': 'absolute',
            'left': elementPosition.left,
            'top': elementPosition.top + this.element.outerHeight() + 1,
            'z-index': 11,
            'width': listWidth,
            'height': 'auto'
        });
    };
    EntrySelect.prototype.listIsVisible = function () {
        return this.listElement.is(':visible');
    };
    EntrySelect.prototype.selectNextListItem = function () {
        if (this.listIsVisible()) {
            var item = this.listElement.find('.' + this.listItemSelectedClass);
            var nextItem = void 0;
            if (item.length > 0) {
                nextItem = item.next();
            }
            else {
                nextItem = this.listElement.find('>table>tbody>tr:first');
            }
            if (nextItem.length > 0) {
                item.removeClass(this.listItemSelectedClass);
                nextItem.addClass(this.listItemSelectedClass);
                this.scrollToListItem(nextItem);
            }
        }
    };
    EntrySelect.prototype.selectPrevListItem = function () {
        if (this.listIsVisible()) {
            var item = this.listElement.find('.' + this.listItemSelectedClass);
            var prevItem = void 0;
            if (item.length > 0) {
                prevItem = item.prev();
                if (prevItem.length > 0) {
                    item.removeClass(this.listItemSelectedClass);
                    prevItem.addClass(this.listItemSelectedClass);
                    this.scrollToListItem(prevItem);
                }
            }
        }
    };
    EntrySelect.prototype.scrollToListItem = function (targetItem) {
        var listbottom = this.listElement.offset().top + this.listElement.height();
        var nextbottom = targetItem.offset().top + targetItem.outerHeight();
        if (nextbottom > listbottom) {
            this.listElement.scrollTop(nextbottom - listbottom + this.listElement.scrollTop());
        }
        var listtop = this.listElement.offset().top;
        var prevtop = targetItem.offset().top;
        if (prevtop < listtop) {
            this.listElement.scrollTop(this.listElement.scrollTop() - (listtop - prevtop));
        }
    };
    EntrySelect.prototype.getSelectedItem = function () {
        return this.listElement.find('.' + this.listItemSelectedClass);
    };
    EntrySelect.prototype.hasSelectedItem = function () {
        return this.getSelectedItem().length > 0;
    };
    EntrySelect.prototype.applySelectedItem = function (item) {
        this.element[0].focus();
        this.element.val(item.attr('data-text'));
        this.valueElement.val(item.attr('data-value'));
        this.element.trigger('change');
        this.hideList(true);
        this.resetButtonCss();
    };
    EntrySelect.prototype.getValue = function () {
        this.valueElement.val();
    };
    EntrySelect.prototype.setValue = function (value) {
        var data = this.options.data;
        var opt = data.filter(function (item) { return item.value === value; });
        if (opt.length > 0) {
            this.element.val(opt[0].text);
            this.valueElement.val(opt[0].value);
        }
        else {
            this.element.val('');
            this.valueElement.val('');
        }
        this.element.trigger('change');
    };
    EntrySelect.prototype.setData = function (data) {
        this.options.data = data;
        if (this.options.updateValueOnSetData) {
            this.setValue(this.valueElement.val());
        }
    };
    return EntrySelect;
}());
exports.EntrySelect = EntrySelect;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var DefaultEntrySelectOptions = (function () {
    function DefaultEntrySelectOptions() {
        this.data = [];
        this.listWidth = undefined;
        this.listHeight = 200;
        this.value = '';
        this.updateValueOnSetData = true;
    }
    return DefaultEntrySelectOptions;
}());
exports.DefaultEntrySelectOptions = DefaultEntrySelectOptions;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var entryTableEvnets_1 = __webpack_require__(4);
var entryTableOptions_1 = __webpack_require__(7);
var EntryTable = (function () {
    function EntryTable($, element, options) {
        this.$ = $;
        this.element = element;
        this.options = $.extend({}, new entryTableOptions_1.DefaultEntryTableOptions(), options);
        this.initColumns();
        this.initTable();
        this.initEvents();
    }
    EntryTable.prototype.initTable = function () {
        this.initHeader();
        this.initBody();
    };
    EntryTable.prototype.initHeader = function () {
        var html = [];
        this.header = this.element.find('>thead');
        if (!this.header.length) {
            this.header = $('<thead></thead>').appendTo(this.element);
        }
        else {
            var columns_1 = new Array();
            this.header.find('th').each(function () {
                if (typeof $(this).data('field') !== 'undefined') {
                    $(this).data('field', $(this).data('field') + '');
                }
                columns_1.push($.extend({}, {
                    title: $(this).html()
                }, $(this).data()));
            });
            this.options.columns = $.extend(true, [], columns_1, this.options.columns);
        }
        html.push('<tr>');
        if (!this.options.readonly && this.options.showToolColumn) {
            html.push('<th class="is-tool"><i class="fa fa-plus is-tool-add" aria-hidden="true"></i></th>');
        }
        for (var _i = 0, _a = this.options.columns; _i < _a.length; _i++) {
            var col = _a[_i];
            html.push('<th');
            if (col.width) {
                html.push(' style="width:' + col.width + ';"');
            }
            html.push('>');
            html.push(col.title);
            html.push('</th>');
        }
        html.push('</tr>');
        this.header.html(html.join(''));
    };
    EntryTable.prototype.initBody = function () {
        var html = [];
        this.body = this.element.find('>tbody');
        if (!this.body.length) {
            this.body = $('<tbody></tbody>').appendTo(this.element);
        }
        for (var r in this.options.data) {
            if (this.options.data.hasOwnProperty(r)) {
                var row = this.options.data[r];
                html.push(this.getRowHtml(row, r));
            }
        }
        this.body.html(html.join(''));
        this.onLoadRows(this.body.find('>tr'));
    };
    EntryTable.prototype.setData = function (data) {
        this.initEvents(false);
        this.options.data = data;
        this.initBody();
        this.initEvents();
    };
    EntryTable.prototype.getRowHtml = function (row, r) {
        var html = [];
        html.push('<tr data-id="' + (row ? row.id : '0') + '">');
        if (!this.options.readonly && this.options.showToolColumn) {
            html.push('<td class="is-tool"><i class="fa fa-times is-tool-delete" aria-hidden="true"></i></td>');
        }
        var _loop_1 = function (col) {
            html.push('<td' + (col.isTool ? ' class="is-tool" ' : '') + '>');
            var value;
            if (row) {
                value = col.field ? row[col.field] : '';
            }
            else {
                value = '';
            }
            if (col.formatter) {
                html.push(col.formatter(value, row, r, col.field));
            }
            else {
                var editorContainer = $('<div></div>');
                var editor_1;
                if (col.control === 'select') {
                    editor_1 = $('<select></select>');
                    editor_1.append('<option value=""></option>');
                    if (col.options) {
                        col.options.forEach(function (opt) {
                            var o = $('<option value="' + opt.value
                                + '">' + opt.text + '</option>');
                            if (row) {
                                if (opt.value === value) {
                                    o.attr('selected', 'selected');
                                }
                            }
                            editor_1.append(o);
                        });
                    }
                    if (this_1.options.readonly) {
                        editor_1.attr('disabled', 'disabled');
                    }
                }
                else {
                    if (col.control === 'number') {
                        editor_1 = $('<input type="text">');
                        editor_1.attr('onkeypress', 'return event.charCode >= 48 && event.charCode <= 57');
                    }
                    else if (col.control === 'entry-select') {
                        editor_1 = $('<input type="' + col.control + '" class="entry-select">');
                    }
                    else {
                        editor_1 = $('<input type="' + col.control + '">');
                    }
                    if (row) {
                        editor_1.attr('value', value);
                    }
                    if (col.maxlength) {
                        editor_1.attr('maxlength', col.maxlength);
                    }
                    if (this_1.options.readonly) {
                        editor_1.attr('readonly', 'readonly');
                    }
                }
                editor_1.attr('name', col.field);
                if (col.controlClasses) {
                    var controlClasses = col.controlClasses;
                    controlClasses.forEach(function (item) {
                        editor_1.addClass(item);
                    });
                }
                if (col.required) {
                    editor_1.attr('required', 'required');
                }
                html.push(editorContainer.append(editor_1).html());
            }
            html.push('</td>');
        };
        var this_1 = this;
        for (var _i = 0, _a = this.options.columns; _i < _a.length; _i++) {
            var col = _a[_i];
            _loop_1(col);
        }
        html.push('</tr>');
        return html.join('');
    };
    EntryTable.prototype.initColumns = function () {
        var columns = this.options.columns;
        for (var i = 0; i < columns.length; i++) {
            if (!columns[i].control) {
                columns[i].control = 'text';
            }
            if (!columns[i].isTool) {
                columns[i].isTool = false;
            }
            columns[i].fieldIndex = i;
        }
    };
    EntryTable.prototype.initEvents = function (isOn) {
        if (isOn === void 0) { isOn = true; }
        var inputs = this.element.find('>tbody :input');
        var btns = this.element.find('>tbody .is-tool-delete');
        if (isOn) {
            this.inputEvents = new entryTableEvnets_1.EntryTableEvnets(this, inputs, btns);
        }
        else {
            this.inputEvents.unsetEvents(inputs);
            this.inputEvents.unsetDeleteEvents(btns);
        }
    };
    EntryTable.prototype.getAddButton = function () {
        return this.element.find('>thead .is-tool-add');
    };
    EntryTable.prototype.getData = function () {
        var _this = this;
        var data = new Array();
        this.element.find('>tbody>tr').each(function (index, elem) {
            data.push(_this.getRowData($(elem)));
        });
        return data;
    };
    EntryTable.prototype.getRowData = function (currentTr) {
        var inputs = currentTr.find(':input');
        var rowData = this.serializeObject(inputs);
        rowData.id = currentTr.attr('data-id');
        return rowData;
    };
    EntryTable.prototype.serializeObject = function (target) {
        var o = {};
        var a = target.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            }
            else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    EntryTable.prototype.appendRow = function () {
        if (!this.options.readonly) {
            this.body.append(this.getRowHtml());
            this.inputEvents.setEvents(this.body.find('>tr:last :input'));
            this.inputEvents.setDeleteEvents(this.body.find('>tr:last .is-tool-delete'));
            this.changeIsInvalid(this.body.find('>tr:last :input'));
            this.onLoadRows(this.body.find('>tr:last'));
        }
    };
    EntryTable.prototype.changeIsInvalid = function (inputs) {
        var _this = this;
        inputs.each(function (index, elem) {
            if ($(elem).val() === '') {
                var field_1 = $(elem).attr('name');
                var columns = _this.options.columns.filter(function (c) { return c.field === field_1; });
                if (columns.length > 0 && columns[0].required) {
                    $(elem).addClass('is-invalid');
                }
            }
            else {
                $(elem).removeClass('is-invalid');
            }
        });
    };
    EntryTable.prototype.onLoadRows = function (trs) {
        var _this = this;
        trs.find('.entry-select').each(function (index, elem) {
            var field = $(elem).attr('name');
            var columns = _this.options.columns.filter(function (c) { return c.field === field; });
            if (columns.length > 0) {
                $(elem).entrySelect(columns[0].entrySelectOptions);
            }
        });
        if (this.options.onLoadRows) {
            var rowIndexs_1 = new Array();
            trs.each(function (index, elem) { return rowIndexs_1.push($(elem).index()); });
            this.options.onLoadRows(rowIndexs_1);
        }
    };
    return EntryTable;
}());
exports.EntryTable = EntryTable;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var entryTableCell_1 = __webpack_require__(5);
var entryTableRow_1 = __webpack_require__(6);
var EntryTableEvnets = (function () {
    function EntryTableEvnets(table, inputs, btns) {
        this.table = table;
        this.hasFocus = false;
        this.setEvents(inputs);
        this.setDeleteEvents(btns);
        this.setAddEvents();
    }
    EntryTableEvnets.prototype.setDeleteEvents = function (btns) {
        btns.off('click').on('click', function (event) {
            this.onDelete(event.target);
        }.bind(this));
    };
    EntryTableEvnets.prototype.unsetDeleteEvents = function (btns) {
        btns.off('click');
    };
    EntryTableEvnets.prototype.setEvents = function (inputs) {
        if (inputs && inputs.length > 0) {
            inputs.on('change', function (event) {
                this.onChange(event.target);
            }.bind(this))
                .on('keydown', function (event) {
                if (event.shiftKey && (event.which === 13 || event.which === 9)) {
                    this.onShiftEnter(event.target);
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
                else if (event.which === 13 || event.which === 9) {
                    this.onEnter(event.target, event.which === 13);
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
            }.bind(this))
                .on('focus', function (event) {
                this.onFocus(event.target);
            }.bind(this))
                .on('blur', function (event) {
                this.onBlur(event.target);
            }.bind(this))
                .on('click', function (event) {
                this.onClickCell(event.target);
            }.bind(this));
        }
    };
    EntryTableEvnets.prototype.unsetEvents = function (inputs) {
        inputs.off('change keydown focus blur');
    };
    EntryTableEvnets.prototype.setAddEvents = function () {
        var btns = this.table.getAddButton();
        btns.off('click').on('click', function (event) {
            this.table.appendRow();
        }.bind(this));
    };
    EntryTableEvnets.prototype.onChange = function (target) {
        console.log('onChange');
        if (!$(target).is('.is-dirty')) {
            $(target).addClass('is-dirty');
        }
        this.table.changeIsInvalid($(target));
    };
    EntryTableEvnets.prototype.onEnter = function (target, isEnter) {
        if (isEnter && $(target).is('.is-invalid')) {
            return;
        }
        var currentTd = $(target).closest('td');
        if (!currentTd) {
            return;
        }
        var nextTd = currentTd.next(':not(".is-tool")');
        if (nextTd.length === 0) {
            var currentTr = $(target).closest('tr');
            var nextTr = currentTr.next();
            if (nextTr.length === 0) {
                this.table.appendRow();
                nextTr = currentTr.next();
            }
            this.focusInput(nextTr.find(':input[type!="hidden"]:eq(0)'));
        }
        else {
            this.focusInput(nextTd.find(':input[type!="hidden"]'));
        }
    };
    EntryTableEvnets.prototype.onShiftEnter = function (target) {
        var currentTd = $(target).closest('td');
        if (!currentTd) {
            return;
        }
        var prevTd = currentTd.prev(':not(".is-tool"):has(:input[type!="hidden"])');
        if (prevTd.length === 0) {
            var currentTr = $(target).closest('tr');
            var prevTr = currentTr.prev();
            if (prevTr.length > 0) {
                console.log('prevTr.length:' + prevTr.length);
                this.focusInput(prevTr.find(':input[type!="hidden"]:last'));
            }
        }
        else {
            this.focusInput(prevTd.find(':input[type!="hidden"]'));
        }
    };
    EntryTableEvnets.prototype.focusInput = function (target) {
        if (!target || target.length === 0) {
            return;
        }
        target[0].focus();
    };
    EntryTableEvnets.prototype.onFocus = function (target) {
        this.hasFocus = true;
        this.focusRowIndex = $(target).closest('tr').index();
    };
    EntryTableEvnets.prototype.onBlur = function (target) {
        var _this = this;
        this.hasFocus = false;
        var currentTr = $(target).closest('tr');
        this.blurRowIndex = currentTr.index();
        if (!this.table.options.readonly) {
            setTimeout((function () {
                if (!_this.hasFocus || _this.blurRowIndex !== _this.focusRowIndex) {
                    if (currentTr.find('.is-dirty').length > 0 && _this.table.options.onSaveRow) {
                        console.log('save row');
                        var rowData = _this.table.getRowData(currentTr);
                        console.log(rowData);
                        _this.table.options.onSaveRow(rowData, new entryTableRow_1.EntryTableRow(currentTr));
                    }
                }
            }).bind(this), 100);
        }
    };
    EntryTableEvnets.prototype.onDelete = function (target) {
        if (!this.table.options.readonly && this.table.options.onDeleteRow) {
            var currentTr = $(target).closest('tr');
            var rowData = this.table.getRowData(currentTr);
            this.table.options.onDeleteRow(rowData, new entryTableRow_1.EntryTableRow(currentTr));
        }
    };
    EntryTableEvnets.prototype.onClickCell = function (target) {
        if (this.table.options.onClickCell) {
            var input = $(target);
            this.table.options.onClickCell(input.val(), new entryTableCell_1.EntryTableCell(input));
        }
    };
    return EntryTableEvnets;
}());
exports.EntryTableEvnets = EntryTableEvnets;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var EntryTableCell = (function () {
    function EntryTableCell(input) {
        this.input = input;
    }
    EntryTableCell.prototype.getValue = function () {
        return this.input.val();
    };
    EntryTableCell.prototype.isDirty = function () {
        return this.input.is('.is-dirty');
    };
    EntryTableCell.prototype.isInvlid = function () {
        return this.input.is('.is-invalid');
    };
    return EntryTableCell;
}());
exports.EntryTableCell = EntryTableCell;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var EntryTableRow = (function () {
    function EntryTableRow(tr, lastInput) {
        this.tr = tr;
        this.lastInput = lastInput;
    }
    EntryTableRow.prototype.setId = function (id) {
        this.tr.attr('data-id', id);
        this.tr.find('.is-dirty').removeClass('is-dirty');
    };
    EntryTableRow.prototype["delete"] = function () {
        this.tr.remove();
    };
    EntryTableRow.prototype.isInvalid = function () {
        return this.tr.find('.is-invalid').length > 0;
    };
    EntryTableRow.prototype.focusInvalid = function () {
        if (this.lastInput && this.lastInput.is('.is-invalid')) {
            this.lastInput[0].focus();
        }
        else if (this.tr.find('.is-invalid').length > 0) {
            this.tr.find('.is-invalid')[0].focus();
        }
    };
    return EntryTableRow;
}());
exports.EntryTableRow = EntryTableRow;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var DefaultEntryTableOptions = (function () {
    function DefaultEntryTableOptions() {
        this.readonly = false;
        this.showToolColumn = true;
        this.columns = [];
        this.data = [];
    }
    return DefaultEntryTableOptions;
}());
exports.DefaultEntryTableOptions = DefaultEntryTableOptions;


/***/ })
/******/ ]);
//# sourceMappingURL=jquery.entryTable.js.map