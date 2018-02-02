export class EntryTableCell {
    constructor(private input: JQuery) {

    }

    getValue() {
        return this.input.val();
    }

    isDirty(): boolean {
        return this.input.is('.is-dirty');
    }

    isInvlid(): boolean {
        return this.input.is('.is-invalid');
    }
}
