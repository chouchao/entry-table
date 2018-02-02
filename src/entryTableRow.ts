export class EntryTableRow {
    constructor(private tr: JQuery) {

    }

    setId(id: string) {
        this.tr.attr('data-id', id);
    }

    delete() {
        this.tr.remove();
    }
}
