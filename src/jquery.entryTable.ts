import { EntryCodeName } from './entryCodeName';
import { IEntryCodeNameOptions } from './entryCodeNameOptions';
import { EntrySelect } from './entrySelect';
import { IEntrySelectOptions } from './EntrySelectOptions';
import { EntryTable } from './entryTable';
import { IEntryTableOptions } from './entryTableOptions';

// tslint:disable-next-line:only-arrow-functions
(function($: any) {
    function isString(x: any): x is string {
        return typeof x === 'string';
    }

    $.fn.entryTable = function(options: (IEntryTableOptions | string), param?: any) {
        const j = $(this);
        let result:any;
        j.each(function() {
            if (options) {
                if (isString(options)) {
                    const state = $(this).data('entryTable') as EntryTable;
                    if (state) {
                        const method = options as string;
                        if (method === 'setData') {
                            state.setData(param);
                        } else if (method === 'getData') {
                            result = state.getData();
                        }
                    }
                } else {
                    $(this).data('entryTable',
                    new EntryTable($, $(this), options as IEntryTableOptions));
                }
            }
        });
        return result || j;
    };

    $.fn.entrySelect = function(options: (IEntrySelectOptions | string), param?: any) {
        const j = $(this);
        let result: any;
        j.each(function() {
            if (isString(options)) {
                const state = $(this).data('entrySelect') as EntrySelect;
                if (state) {
                    const method = options as string;
                    if (method === 'setValue') {
                        state.setValue(param);
                    } else if (method === 'getValue') {
                        result = state.getValue();
                    } else if (method === 'setData') {
                        result = state.setData(param);
                    }
                }
            } else {
                $(this).data('entrySelect',
                new EntrySelect($, $(this), options as IEntrySelectOptions));
            }
        });
        return j;
    };

    $.fn.entryCodeName = function(options: (IEntryCodeNameOptions | string), param?: any) {
        const j = $(this);
        let result: any;
        j.each(function() {
            if (isString(options)) {
                const state = $(this).data('entrySelect') as EntryCodeName;
                if (state) {
                    const method = options as string;
                    if (method === 'setValue') {
                        state.setValue(param);
                    } else if (method === 'getValue') {
                        result = state.getValue();
                    } else if (method === 'setData') {
                        result = state.setData(param);
                    }
                }
            } else {
                $(this).data('entrySelect',
                new EntryCodeName($, $(this), options as IEntryCodeNameOptions));
            }
        });
        return j;
    };
})(jQuery);
