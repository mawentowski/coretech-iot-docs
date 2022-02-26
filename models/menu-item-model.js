export class MenuItemModel {
    name;
    children;

    constructor(name, ...children) {
        this.name = name;
        this.children = children;
    }
}