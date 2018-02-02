/// <reference path="../node_modules/@ryancavanaugh/jquery/index.d.ts" />
import { EntryTable } from './entryTable';
import { EntryTableCell } from './entryTableCell';
import { EntryTableRow } from './entryTableRow';

export class EntryTableEvnets {

    private hasFocus = false;
    private blurRowIndex: number;
    private focusRowIndex: number;

    constructor(public table: EntryTable, inputs: JQuery, btns: JQuery) {
        this.setEvents(inputs);
        this.setDeleteEvents(btns);
        this.setAddEvents();
    }

    setDeleteEvents(btns: JQuery){
        btns.off('click').on('click', function(event: Event) {
            this.onDelete(event.target);
        }.bind(this));
    }

    unsetDeleteEvents(btns: JQuery) {
        btns.off('click');
    }

    setEvents(inputs: JQuery) {
        if (inputs && inputs.length > 0) {
            inputs.on('change', function(event: Event) {
                this.onChange(event.target);
            }.bind(this))
            .on('keydown', function(event: JQueryKeyEventObject) {
                    // Shift + Enter || Tab
                    if (event.shiftKey && (event.which === 13 || event.which === 9)) {
                        this.onShiftEnter(event.target);
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    // Enter || Tab
                    } else if (event.which === 13 || event.which === 9) {
                        this.onEnter(event.target, event.which === 13);
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    }
                }.bind(this))
                .on('focus', function (event: Event) {
                    this.onFocus(event.target);
                }.bind(this))
                .on('blur', function (event: Event) {
                    this.onBlur(event.target);
                }.bind(this))
                .on('click', function (event: Event) {
                    this.onClickCell(event.target);
                }.bind(this));
        }
    }

    unsetEvents(inputs: JQuery) {
        inputs.off('change keydown focus blur');
    }

    setAddEvents() {
        const  btns = this.table.element.find('>thead .is-tool-add');
        btns.off('click').on('click', function(event: Event) {
            this.table.appendRow();
        }.bind(this));
    }

    private onChange(target: any) {
        console.log('onChange');
        if (!$(target).is('.is-dirty')) {
            $(target).addClass('is-dirty');
        }

        if ($(target).val() === '') {
            const field = $(target).attr('name');
            const columns = this.table.options.columns.filter((c) => c.field === field);
            if (columns.length > 0 && columns[0].required) {
                $(target).addClass('is-invalid');
            }
        } else {
            $(target).removeClass('is-invalid');
        }
    }

    private onEnter(target: any, isEnter: boolean) {
        console.log('onEnter');
        // 有错误时回车键不自动跳到下一个
        if (isEnter && $(target).is('.is-invalid')) {
            return;
        }
        const currentTd = $(target).closest('td');
        if (!currentTd) { return; }
        const nextTd = currentTd.next(':not(".is-tool")');
        if (nextTd.length === 0) {
            const currentTr = $(target).closest('tr');
            let nextTr = currentTr.next();
            if (nextTr.length === 0) {
                // add new line
                this.table.appendRow();
                nextTr = currentTr.next();
            }
            this.focusInput(nextTr.find(':input[type!="hidden"]:eq(0)'));
        } else {
            this.focusInput(nextTd.find(':input[type!="hidden"]'));
        }
    }
    private onShiftEnter(target: any) {
        console.log('onShiftEnter');
        const currentTd = $(target).closest('td');
        if (!currentTd) { return; }
        const prevTd = currentTd.prev(':not(".is-tool"):has(:input[type!="hidden"])');
        if (prevTd.length === 0) {
            const currentTr = $(target).closest('tr');
            const prevTr = currentTr.prev();
            if (prevTr.length > 0) {
                console.log('prevTr.length:' + prevTr.length);
                this.focusInput(prevTr.find(':input[type!="hidden"]:last'));
            }
        } else {
            this.focusInput(prevTd.find(':input[type!="hidden"]'));
        }
    }

    private focusInput(target: JQuery) {
        if (!target || target.length === 0) {
            return;
        }

        target[0].focus();
    }

    private onFocus(target: any) {
        console.log('focus:' + $(target).val());
        this.hasFocus = true;
        this.focusRowIndex = $(target).closest('tr').index();
    }

    private onBlur(target: any) {
        console.log('blur:' + $(target).val());
        this.hasFocus = false;
        const currentTr = $(target).closest('tr');
        this.blurRowIndex = currentTr.index();
        setTimeout((() => {
            if (!this.hasFocus || this.blurRowIndex !== this.focusRowIndex) {
                if (currentTr.find('.is-dirty').length > 0 && this.table.options.onSaveRow) {
                    console.log('save row');
                    const rowData = this.table.getRowData(currentTr);
                    console.log(rowData);
                    this.table.options.onSaveRow(rowData, new EntryTableRow(currentTr));
                }
            }
        }).bind(this), 100);
    }

    private onDelete(target: any) {
        if (this.table.options.onDeleteRow) {
            const currentTr = $(target).closest('tr');
            const rowData = this.table.getRowData(currentTr);
            this.table.options.onDeleteRow(rowData, new EntryTableRow(currentTr));
        }
    }

    private onClickCell(target: any) {
        if (this.table.options.onClickCell) {
            const input = $(target);
            this.table.options.onClickCell(input.val(), new EntryTableCell(input));
        }
    }
}
