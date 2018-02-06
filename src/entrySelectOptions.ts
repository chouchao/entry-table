export interface IEntrySelectOptions {
    data: any[];
    listWidth: number;
    listHeight: number;
    value: string;
}

export class DefaultEntrySelectOptions implements IEntrySelectOptions {
    data: any[] = [];
    listWidth: number = undefined;
    listHeight = 200;
    value = '';
}
