/// <reference path='../../declarations/node.d.ts' />
/// <reference path='../../declarations/client/three.d.ts' />
/// <reference path='../../declarations/client/jquery.d.ts' />

// dependencies
var Stats = require('stats-js'),
    THREE = require('three');

// modules
import RenderPipeline = require('render-pipeline');

// global vars
var renderer, renderPipeline, scene, camera, light, stats, controls;

// ---------------------------------- exports ----------------------------------

export function clearScene() {
    scene = new THREE.Scene();
    scene.add(camera);
    scene.add(light);

    initEffects();
}

export function getAvailableBuffers() {
    return renderPipeline.getAvailableBuffers();
}

export function setDisplayedBuffer(identifier) {
    renderPipeline.setDisplayedBuffer(identifier);
}

export function getSupportedEffects() {
    return renderPipeline.supportedEffects();
}

export function useEffect(identifier, use) {
    renderPipeline.useEffect(identifier, use);
}

export function resize() {
    var dim = getCanvasDimensions();
    camera.aspect = dim[0] / dim[1];
    camera.updateProjectionMatrix();
    renderer.setSize(dim[0], dim[1]);

    initEffects(dim[0], dim[1]);
}

// ---------------------------------- internals ----------------------------------

init();
render();

function render() {
    requestAnimationFrame(render);
    controls.update();
    stats.update();

    renderPipeline.render();
}

function init() {
    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.sortObjects = false;
    renderer.setClearColor(0xeeeeee, 1);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    renderer.shadowMapCullFace = THREE.CullFaceBack;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    canvasParent().appendChild(renderer.domElement);

    // camera
    camera = new THREE.PerspectiveCamera(45, 800 / 400, 1, 50000);
    //camera = new THREE.OrthographicCamera( 800 / - 2, 800 / 2, 400 / 2, 400 / - 2, 1, 50000 );
    camera.position.z = 25000;
    camera.up = new THREE.Vector3(0, 0, 1);
    camera.lookAt(new THREE.Vector3());

    // directional light
    light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(0, -0.5, 0.5);
    light.target = new THREE.Object3D(); // target is used to determine look at of shadow camera

    // stats
    stats = new Stats();
    stats.domElement.setAttribute("id", "stats");
    stats.domElement.style.display = "none";
    canvasParent().appendChild(stats.domElement);

    // render pipeline
    renderPipeline = new RenderPipeline();

    // scene
    clearScene();

    // events
    window.addEventListener('resize', resize, false);
    resize();
}

function initEffects(width?, height?) {
    if (typeof width === 'undefined' || typeof height === 'undefined') {
        var dim = getCanvasDimensions();
        width = dim[0];
        height = dim[1];
    }

    renderPipeline.init(renderer, camera, scene, width, height);
}

function canvasParent() {
    return document.getElementById('canvas');
}

function getCanvasDimensions() {
    var ele = $(canvasParent());
    return [ele.width(), Math.max(window.innerHeight - ele.offset().top - 30, 500)];
}