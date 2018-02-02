import { EntryTableCell } from './entryTableCell';
import { EntryTableRow } from './entryTableRow';

export interface IEntryTableOptions {
    readonly: boolean;
    showToolColumn: boolean;
    columns: any[];
    data: any[];
    onSaveRow: (data: any, row: EntryTableRow) => void;
    onDeleteRow: (data: any, row: EntryTableRow) => void;
    onClickCell: (value: any, cell: EntryTableCell) => void;
}

export class DefaultEntryTableOptions implements IEntryTableOptions {
    readonly = false;
    showToolColumn = true;
    columns: any[] = [];
    data: any[] = [];
    onSaveRow: (data: any, row: EntryTableRow) => void;
    onDeleteRow: (data: any, row: EntryTableRow) => void;
    onClickCell: (value: any, cell: EntryTableCell) => void;
}
