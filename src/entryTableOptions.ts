import { EntryTableCell } from './entryTableCell';
import { EntryTableRow } from './entryTableRow';

export interface IEntryTableOptions {
    showToolColumn: boolean;
    columns: any[];
    data: any[];
    onSaveRow: (data: any, row: EntryTableRow) => void;
    onDeleteRow: (data: any, row: EntryTableRow) => void;
    onClickCell: (value: any, cell: EntryTableCell) => void;
}

export class DefaultEntryTableOptions implements IEntryTableOptions {
    showToolColumn = true;
    columns: any[] = [];
    data: any[] = [];
    onSaveRow: (data: any, row: EntryTableRow) => void;
    onDeleteRow: (data: any, row: EntryTableRow) => void;
    onClickCell: (value: any, cell: EntryTableCell) => void;
}
