/// <reference path="../node_modules/@ryancavanaugh/jquery/index.d.ts" />
import { DefaultEntryCodeNameOptions, IEntryCodeNameOptions } from './EntryCodeNameOptions';

export class EntryCodeName {
    private listItemSelectedClass = 'list-item-selected';
    private isListMouseOver: boolean;
    private listElement: JQuery;
    private buttonElement: JQuery;
    public options: IEntryCodeNameOptions;

    constructor(
        private $: JQuery,
        private element: JQuery,
        options?: IEntryCodeNameOptions,
    ) {
        this.options = $.extend({}, new DefaultEntryCodeNameOptions(), options);
        this.options.value = this.options.value || this.element.val();
        this.initList();
        this.initEvents();
        this.resetButtonCss();
        // console.log('EntrySelect inited');

        this.loadData(true);
    }

    private initList() {
        const name = this.element.attr('name');
        this.buttonElement = $(`<i class="fa fa-caret-down"></i>`);
        this.listElement = $(`<div class="entry-select-list"></div>`);
        this.listElement.hide();
        this.element
        .after(this.listElement)
        .after(this.buttonElement);
    }

    private isCharWhich(which: number): boolean {
        return which === 8  // Backspace键
        || (which >= 48 && which <= 57) // 对应按键 0 - 9(非小键盘)
        || (which >= 96 && which <= 105) // 对应按键 0 - 9(小键盘)
        || (which >= 65 && which <= 90); // 对应按键 A - Z
    }

    private initEvents() {
        this.element.on('change', (event: Event) => {
            // this.onChange();
        })
        .on('keydown', (event) => {
            // Shift + Enter || Tab
            if (event.which === 13) {
                if (this.listIsVisible() && this.hasSelectedItem()) {
                    this.applySelectedItem(this.getSelectedItem());
                }
            // Down
            } else if (event.which === 40) {
                if (this.listIsVisible()) {
                    this.selectNextListItem();
                } else {
                    this.showList(this.options.data);
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
            // Up
            } else if (event.which === 38) {
                if (this.listIsVisible()) {
                    this.selectPrevListItem();
                }
            }
        })
        .on('keyup', (event) => {
            // Shift + Enter || Tab
            if (this.isCharWhich(event.which)) {
                const v = this.element.val();
                this.element.attr('title', '');
                console.log(`element value:${v}`);
                if (v !== '') {
                    const data = this.options.data
                    .filter((item) => item.value.indexOf(v) >= 0 || item.text.indexOf(v) >= 0);
                    if (data.length > 0) {
                        this.showList(data);
                    } else {
                        this.hideList(true);
                    }
                }
            }
        })
        .on('blur', (event) => {
            this.hideList();
            this.resetButtonCss();
        });

        this.listElement.off('mouseleave').on('mouseleave', (event) => {
            this.isListMouseOver = false;
            this.hideList();
        }).off('mouseover').on('mouseover', (event) => {
            this.isListMouseOver = true;
        });

        this.buttonElement.off('mouseleave').on('mouseleave', (event) => {
            this.isListMouseOver = false;
            this.hideList();
        }).off('mouseover').on('mouseover', (event) => {
            this.isListMouseOver = true;
        }).on('click', (event) => {
            if (this.listIsVisible()) {
                this.hideList(true);
            } else {
                this.showList(this.options.data);
                if (!this.element.is(':focus')) {
                    this.element[0].focus();
                }
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        });

        $(window).off('resize', this.resetButtonCss).on('resize', this.resetButtonCss);
    }

    private resetButtonCss() {
        if (this.element && typeof this.element.position === 'function') {
            const elementPosition = this.element.position();
            this.buttonElement.css({
                'position': 'absolute',
                'left': elementPosition.left + this.element.width() - this.buttonElement.width(),
                'top': elementPosition.top + ((this.element.outerHeight() - this.buttonElement.height()) / 2),
                'z-index': 1,
                'cursor': 'pointer',
            });
        }
    }

    private hideList(force = false) {
        console.log('hide list');
        if (force) {
            this.listElement.hide();
        } else {
            setTimeout(() => {
                if (!this.isListMouseOver) {
                    this.listElement.hide();
                }
            }, 500);
        }
    }

    /** 显示列表
     * @param data 显示列表的数据([{text:"text",value:"value"}])
     * @param value 选中值，可空
     */
    private showList(data: any[]) {
        // this.element.position().left
        console.log('show list');

        const html = new Array();
        let selected = false;
        let selectedClass: string;
        const elementValue = this.element.val();
        data.forEach((item) => {
            // tslint:disable-next-line:triple-equals
            if (!selected && (item.value == elementValue || item.text == elementValue)) {
                selectedClass = ` class="${this.listItemSelectedClass}" `;
                selected = true;
            } else {
                selectedClass = '';
            }
            html.push('<tr data-text="' + item.text
            + '" data-value="' + item.value + '"' + selectedClass + '><td>' + item.value
            + '</td><td>' + item.text + '</td></tr>');
        });

        this.listElement.html('<table><tbody>' + html.join('') + '</tbody></table>');
        const elementPosition = this.element.position();
        const listWidth = (this.options.listWidth || this.element.outerWidth()) + 'px';
        const listheight = (this.options.listHeight || 200) + 'px';
        this.resetShowListCss();
        this.listElement.find('>table>tbody>tr>td').off('click')
        .on('click', (event) => {
            // console.log('td click');
            const tr = $(event.target).parent();
            this.applySelectedItem(tr);
        });
        // console.log('EntrySelect show List');
    }

    private resetShowListCss() {
        const elementPosition = this.element.position();
        const listWidth = (this.options.listWidth || this.element.outerWidth()) + 'px';
        const listheight = (this.options.listHeight || 200) + 'px';
        this.listElement.css({
            'display': 'block',
            'position': 'absolute',
            'left': elementPosition.left,
            'top': elementPosition.top + this.element.outerHeight() + 1,
            'z-index': 11,
            'width': listWidth,
            'height': 'auto',
        });
    }

    private listIsVisible(): boolean {
        return this.listElement.is(':visible');
    }

    /** 选中下一项，如果当前没有选中项则选中第一项. */
    private selectNextListItem() {
        if (this.listIsVisible()) {
            const item = this.listElement.find('.' + this.listItemSelectedClass);
            let nextItem: JQuery;
            if (item.length > 0) {
                nextItem = item.next();
            } else {
                nextItem = this.listElement.find('>table>tbody>tr:first');
            }

            if (nextItem.length > 0) {
                item.removeClass(this.listItemSelectedClass);
                nextItem.addClass(this.listItemSelectedClass);
                this.scrollToListItem(nextItem);
            }
        }
    }

    /** 选中上一项 */
    private selectPrevListItem() {
        if (this.listIsVisible()) {
            const item = this.listElement.find('.' + this.listItemSelectedClass);
            let prevItem: JQuery;
            if (item.length > 0) {
                prevItem = item.prev();
                if (prevItem.length > 0) {
                    item.removeClass(this.listItemSelectedClass);
                    prevItem.addClass(this.listItemSelectedClass);
                    this.scrollToListItem(prevItem);
                }
            }
        }
    }

    private scrollToListItem(targetItem: JQuery) {
        const listbottom = this.listElement.offset().top + this.listElement.height();
        const nextbottom = targetItem.offset().top + targetItem.outerHeight();
        if (nextbottom > listbottom) {
            this.listElement.scrollTop(nextbottom - listbottom + this.listElement.scrollTop());
        }

        const listtop = this.listElement.offset().top;
        const prevtop = targetItem.offset().top;
        if (prevtop < listtop) {
            this.listElement.scrollTop(this.listElement.scrollTop() - (listtop - prevtop));
        }
    }

    private getSelectedItem(): JQuery {
        return this.listElement.find('.' + this.listItemSelectedClass);
    }

    private hasSelectedItem(): boolean {
        return this.getSelectedItem().length > 0;
    }

    private applySelectedItem(item: JQuery) {
        this.element[0].focus();
        this.setValue(item.attr('data-value'));

        this.hideList(true);
        this.resetButtonCss();
    }

    getValue() {
        this.element.val();
    }

    setValue(value: string) {
        // 设置值
        this.element.val(value);
        this.element.trigger('change');

        // 查找并设置title
        const data = this.options.data as any[];
        const opt = data.filter((item) => item.value === value);
        if (opt.length > 0) {
            this.element.attr('title', opt[0].text);
        } else {
            this.element.attr('title', '');
        }
    }

    setData(data?: any[]) {
        if (data) {
            this.options.data = data;
            if (this.options.updateValueOnSetData) {
                this.setValue(this.element.val());
            }
        } else {
            this.loadData(this.options.updateValueOnSetData);
        }
    }

    private loadData(canUpdateValue = true) {
        if (this.options.url && typeof this.options.url === 'string') {
            const param = {};
            if (typeof this.options.onBeforeLoadData === 'function') {
                if (this.options.onBeforeLoadData(this.element, this.options, param) === false) {
                    return;
                }
            }
            $.ajax({
                url: this.options.url,
                method: this.options.ajaxMethod,
                data: JSON.stringify(param),
                contentType : 'application/json',
                dataType: 'json',
                cache: false,
                success: (data) => {
                    if (Array.isArray(data)) {
                        if (typeof this.options.onConvertData === 'function') {
                            this.options.data = this.options.onConvertData(data);
                        } else {
                            this.options.data = data;
                        }
                        if (canUpdateValue) {
                            this.setValue(this.options.value);
                        }
                        if (typeof this.options.onLoadDataSuccess === 'function') {
                            this.options.onLoadDataSuccess(this.element, this.options);
                        }
                    } else {
                        if (typeof this.options.onLoadDataError === 'function') {
                            this.options.onLoadDataError(this.element, this.options, 'Data type not a array');
                        }
                    }
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    if (typeof this.options.onLoadDataError === 'function') {
                        this.options.onLoadDataError(this.element, this.options, errorThrown);
                    }
                },
            });
        } else {
            if (Array.isArray(this.options.data)) {
                if (canUpdateValue) {
                    this.setValue(this.options.value);
                }
                if (typeof this.options.onLoadDataSuccess === 'function') {
                    this.options.onLoadDataSuccess(this.element, this.options);
                }
            } else {
                if (typeof this.options.onLoadDataError === 'function') {
                    this.options.onLoadDataError(this.element, this.options, 'Data type not a array');
                }
            }
        }
    }
}
