export interface IEntryCodeNameOptions {
    data: any[];
    listWidth: number;
    listHeight: number;
    value: string;
    updateValueOnSetData: boolean;
    url: string;
    ajaxMethod: string;
    onBeforeLoadData: (target: JQuery, options: IEntryCodeNameOptions, param: any) => boolean;
    onLoadDataSuccess: (target: JQuery, options: IEntryCodeNameOptions) => void;
    onLoadDataError: (target: JQuery, options: IEntryCodeNameOptions, errMessage: string) => void;
    onConvertData: (data: any) => any[];
}

export class DefaultEntryCodeNameOptions implements IEntryCodeNameOptions {
    data: any[] = [];
    listWidth: number = undefined;
    listHeight = 200;
    value = '';
    updateValueOnSetData = true;
    url = '';
    ajaxMethod = 'POST';
    onBeforeLoadData: (target: JQuery, options: IEntryCodeNameOptions, param: any) => true;
    onLoadDataSuccess: (target: JQuery, options: IEntryCodeNameOptions) => void;
    onLoadDataError: (target: JQuery, options: IEntryCodeNameOptions, errMessage: string) => void;
    onConvertData: (data: any) => any[];
}
