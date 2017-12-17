export class SettingsModel {
    sideMargin: number;
    singleHover: boolean;
    minNodeSize: number;
    maxNodeSize: number;
    drawLabels: boolean;
    defaultEdgeType: string;

    constructor() {
        this.sideMargin = 1;
        this.singleHover = true;
        this.minNodeSize = 0.5;
        this.maxNodeSize = 15;
        this.drawLabels = false;
        this.defaultEdgeType = 'arrow';
    }

}
