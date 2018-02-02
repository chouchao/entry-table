/// <reference path="../node_modules/@ryancavanaugh/jquery/index.d.ts" />
import { EntryTableEvnets } from './entryTableEvnets';
import { DefaultEntryTableOptions, IEntryTableOptions } from './entryTableOptions';

export class EntryTable {

    public options: IEntryTableOptions;
    private header: JQuery;
    private body: JQuery;
    private inputEvents: EntryTableEvnets;

    constructor(
        public $: JQuery,
        public element: JQuery,
        options?: IEntryTableOptions,
    ) {
        this.options = $.extend({}, new DefaultEntryTableOptions(), options);

        this.initColumns();
        this.initTable();
        this.initEvents();
    }

    private initTable() {
        this.initHeader();
        this.initBody();
    }

    private initHeader() {
        const html = [];
        this.header = this.element.find('>thead');
        if (!this.header.length) {
            this.header = $('<thead></thead>').appendTo(this.element);
        } else {
            const columns = new Array();

            this.header.find('th').each(function () {
                // Fix #2014 - getFieldIndex and elsewhere assume this is string, causes issues if not
                if (typeof $(this).data('field') !== 'undefined') {
                    $(this).data('field', $(this).data('field') + '');
                }
                columns.push($.extend({}, {
                    title: $(this).html(),
                }, $(this).data()));
            });
            this.options.columns = $.extend(true, [], columns, this.options.columns);
        }

        html.push('<tr>');
        if (!this.options.readonly && this.options.showToolColumn) {
            html.push('<th class="is-tool"><i class="fa fa-plus is-tool-add" aria-hidden="true"></i></th>');
        }
        for (const col of this.options.columns) {
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
    }

    private initBody() {
        const html = [];

        this.body = this.element.find('>tbody');
        if (!this.body.length) {
            this.body = $('<tbody></tbody>').appendTo(this.element);
        }

        for (const r in this.options.data) {
            if (this.options.data.hasOwnProperty(r)) {
                const row = this.options.data[r];
                html.push(this.getRowHtml(row, r));
            }
        }
        this.body.html(html.join(''));
    }

    refreshData(data: any) {
        this.initEvents(false);
        this.options.data = data;
        this.initBody();
        this.initEvents();
    }

    private getRowHtml(row?: any, r?: string): string {
        const html = [];
        html.push('<tr data-id="' + (row ? row.id : '0') + '">');
        if (!this.options.readonly && this.options.showToolColumn) {
            html.push('<td class="is-tool"><i class="fa fa-times is-tool-delete" aria-hidden="true"></i></td>');
        }
        for (const col of this.options.columns) {
            html.push('<td' + (col.isTool ? ' class="is-tool" ' : '') + '>');
            let value: string;
            if (row) {
                value = col.field ? row[col.field] : '';
            } else {
                value = '';
            }
            if (col.formatter) {
                html.push(col.formatter(value, row, r, col.field));
            } else {
                const editorContainer = $('<div></div>');
                let editor: JQuery;
                if (col.control === 'select') {
                    editor = $('<select></select>');
                    editor.append('<option value=""></option>');
                    if (col.options) {
                        col.options.forEach((opt: any) => {
                            const o = $('<option value="' + opt.value
                                + '">' + opt.text + '</option>');
                            if (row) {
                                if (opt.value === value) {
                                    o.attr('selected', 'selected');
                                }
                            }
                            editor.append(o);
                        });
                    }
                    if (this.options.readonly) {
                        editor.attr('disabled', 'disabled');
                    }
                } else {
                    if (col.control === 'number') {
                        editor = $('<input type="text">');
                        editor.attr('onkeypress',
                        'return event.charCode >= 48 && event.charCode <= 57');
                    } else {
                        editor = $('<input type="' + col.control + '">');
                    }
                    if (row) {
                        editor.attr('value', value);
                    }
                    if (col.maxlength) {
                        editor.attr('maxlength', col.maxlength);
                    }
                    if (this.options.readonly) {
                        editor.attr('readonly', 'readonly');
                    }
                }
                editor.attr('name', col.field);
                if (col.required) {
                    editor.attr('required', 'required');
                }
                // editor.attr('row', r);
                html.push(editorContainer.append(editor).html());
            }
            html.push('</td>');
        }
        html.push('</tr>');
        return html.join('');
    }

    private initColumns() {
        const columns = this.options.columns;
        for (let i = 0; i < columns.length; i++) {
            if (!columns[i].control) {
                columns[i].control = 'text';
            }
            if (!columns[i].isTool) {
                columns[i].isTool = false;
            }
            columns[i].fieldIndex = i;
        }
    }

    private initEvents(isOn = true) {
        const inputs = this.element.find('>tbody :input');
        const btns = this.element.find('>tbody .is-tool-delete');
        if (isOn) {
            this.inputEvents = new EntryTableEvnets(this, inputs, btns);
        } else {
            this.inputEvents.unsetEvents(inputs);
            this.inputEvents.unsetDeleteEvents(btns);
        }
    }

    getData(): any[] {
        const data = new Array();
        this.element.find('>tbody>tr').each((index, elem) => {
            data.push(this.getRowData($(elem)));
        });
        return data;
    }

    getRowData(currentTr: JQuery) {
        const inputs = currentTr.find(':input');
        const rowData = this.serializeObject(inputs);
        rowData.id = currentTr.attr('data-id');
        return rowData;
    }

    private serializeObject(target: JQuery) {
        const o: { [k: string]: any } = {};
        const a = target.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }

    appendRow() {
        if (!this.options.readonly) {
            this.body.append(this.getRowHtml());
            this.inputEvents.setEvents(this.body.find('>tr:last :input'));
            this.inputEvents.setDeleteEvents(this.body.find('>tr:last .is-tool-delete'));
        }
    }
}
