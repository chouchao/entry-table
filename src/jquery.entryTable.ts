import { EntryTable } from './entryTable';
import { IEntryTableOptions } from './entryTableOptions';

// tslint:disable-next-line:only-arrow-functions
(function ($: any) {
    function isString(x: any): x is string {
        return typeof x === 'string';
    }

    $.fn.entryTable = function (options: (IEntryTableOptions | string), param?: any) {
        const j = $(this);
        let result:any;
        j.each(function () {
            if (options) {
                if (isString(options)) {
                    const state = $(this).data('EntryTable') as EntryTable;
                    if (state) {
                        const method = options as string;
                        if (method === 'refreshData') {
                            state.refreshData(param);
                        } else if (method === 'getData') {
                            result = state.getData();
                        }
                    }
                } else {
                    $(this).data('EntryTable',
                    new EntryTable($, $(this), options as IEntryTableOptions));
                }
            }
        });
        return result || j;
    };
})(jQuery);
