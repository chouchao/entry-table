export class EntryTableRow {
    constructor(private tr: JQuery, private lastInput?: JQuery) {

    }

    setId(id: string) {
        this.tr.attr('data-id', id);
        this.tr.find('.is-dirty').removeClass('is-dirty');
    }

    delete() {
        this.tr.remove();
    }

    isInvalid(): boolean {
        return this.tr.find('.is-invalid').length > 0;
    }

    focusInvalid() {
        if (this.lastInput && this.lastInput.is('.is-invalid')) {
            this.lastInput[0].focus();
        } else if (this.tr.find('.is-invalid').length > 0) {
            this.tr.find('.is-invalid')[0].focus();
        }
    }
}
