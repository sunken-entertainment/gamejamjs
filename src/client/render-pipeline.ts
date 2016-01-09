/// <reference path='../../declarations/node.d.ts' />
/// <reference path='../../declarations/client/three.d.ts' />

class RenderPipeline {
    private THREE: any;

    constructor(THREE: any) {
        this.THREE = THREE;
    }
}

export = RenderPipeline;