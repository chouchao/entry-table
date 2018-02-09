export interface IEntrySelectOptions {
    data: any[];
    listWidth: number;
    listHeight: number;
    value: string;
    updateValueOnSetData: boolean;
    url: string;
    ajaxMethod: string;
    onBeforeLoadData: (target: JQuery, options: IEntrySelectOptions, param: any) => boolean;
    onLoadDataSuccess: (target: JQuery, options: IEntrySelectOptions) => void;
    onLoadDataError: (target: JQuery, options: IEntrySelectOptions, errMessage: string) => void;
    onConvertData: (data: any) => any[];
}

export class DefaultEntrySelectOptions implements IEntrySelectOptions {
    data: any[] = [];
    listWidth: number = undefined;
    listHeight = 200;
    value = '';
    updateValueOnSetData = true;
    url = '';
    ajaxMethod = 'POST';
    onBeforeLoadData: (target: JQuery, options: IEntrySelectOptions, param: any) => true;
    onLoadDataSuccess: (target: JQuery, options: IEntrySelectOptions) => void;
    onLoadDataError: (target: JQuery, options: IEntrySelectOptions, errMessage: string) => void;
    onConvertData: (data: any) => any[];
}

export interface IPositionElement {
    position(): JQueryCoordinates;
}
