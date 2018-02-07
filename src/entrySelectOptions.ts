export interface IEntrySelectOptions {
    data: any[];
    listWidth: number;
    listHeight: number;
    value: string;
    updateValueOnSetData: boolean;
}

export class DefaultEntrySelectOptions implements IEntrySelectOptions {
    data: any[] = [];
    listWidth: number = undefined;
    listHeight = 200;
    value = '';
    updateValueOnSetData = true;
}
