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
var entryTable_1 = __webpack_require__(1);
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
                    var state = $(this).data('EntryTable');
                    if (state) {
                        var method = options;
                        if (method === 'refreshData') {
                            state.refreshData(param);
                        }
                        else if (method === 'getData') {
                            result = state.getData();
                        }
                    }
                }
                else {
                    $(this).data('EntryTable', new entryTable_1.EntryTable($, $(this), options));
                }
            }
        });
        return result || j;
    };
})(jQuery);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var entryTableEvnets_1 = __webpack_require__(2);
var entryTableOptions_1 = __webpack_require__(5);
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
    };
    EntryTable.prototype.refreshData = function (data) {
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
        }
    };
    return EntryTable;
}());
exports.EntryTable = EntryTable;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var entryTableCell_1 = __webpack_require__(3);
var entryTableRow_1 = __webpack_require__(4);
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
        var btns = this.table.element.find('>thead .is-tool-add');
        btns.off('click').on('click', function (event) {
            this.table.appendRow();
        }.bind(this));
    };
    EntryTableEvnets.prototype.onChange = function (target) {
        console.log('onChange');
        if (!$(target).is('.is-dirty')) {
            $(target).addClass('is-dirty');
        }
        if ($(target).val() === '') {
            var field_1 = $(target).attr('name');
            var columns = this.table.options.columns.filter(function (c) { return c.field === field_1; });
            if (columns.length > 0 && columns[0].required) {
                $(target).addClass('is-invalid');
            }
        }
        else {
            $(target).removeClass('is-invalid');
        }
    };
    EntryTableEvnets.prototype.onEnter = function (target, isEnter) {
        console.log('onEnter');
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
        console.log('onShiftEnter');
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
        console.log('focus:' + $(target).val());
        this.hasFocus = true;
        this.focusRowIndex = $(target).closest('tr').index();
    };
    EntryTableEvnets.prototype.onBlur = function (target) {
        var _this = this;
        console.log('blur:' + $(target).val());
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
/* 3 */
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
/* 4 */
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
/* 5 */
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