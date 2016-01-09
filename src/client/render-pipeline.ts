/// <reference path='../../declarations/node.d.ts' />
/// <reference path='../../declarations/client/three.d.ts' />

class RenderPipeline {
    private THREE: any;
    private renderer: any;
    private camera: any;
    private scene: any;

    constructor(THREE: any) {
        this.THREE = THREE;
    }

	init(renderer: THREE.Renderer, camera: THREE.Camera, scene: THREE.Scene, width: number, height: number) {
		this.renderer = renderer;
		this.camera = camera;
		this.scene = scene;
	}

    render() {
		this.renderer.render(this.scene, this.camera);
    }

    availableBuffers(): string[] {
        return [];
    }

    setDisplayedBuffer(identifier: string): void {

    }

    supportedEffects(): string[] {
        return [];
    }

    useEffect(identifier: string, use: boolean): void {

    }
}

export = RenderPipeline;