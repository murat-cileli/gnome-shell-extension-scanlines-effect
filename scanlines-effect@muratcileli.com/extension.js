'use strict';

const {Clutter, GObject, St} = imports.gi;
const Main = imports.ui.main;
const Cairo = imports.cairo;

const clBlack = new Clutter.Color({
    red: 0,
    blue: 0,
    green: 0,
    alpha: 100
});

var ScanlinesEffect = GObject.registerClass({
    Properties: {},
}, class ScanlinesEffect extends St.DrawingArea {
    _init() {
        super._init({
            width: global.screen_width,
            height: global.screen_height,
            opacity: 255,
            visible: true,
            can_focus: false,
            reactive: false,
        });
    }

    vfunc_repaint() {
        let cr = this.get_context();
        for (let i = 0; i < global.screen_height; i = i + 4) {
            cr.moveTo(0, i);
            cr.lineTo(global.screen_width, i);
            cr.closePath();
        }
        cr.setLineWidth(1);
        Clutter.cairo_set_source_color(cr, clBlack);
        cr.stroke();
        cr.$dispose();
    }
});

var scanlinesEffect = null;

function init() {
}

function enable() {
    scanlinesEffect = new ScanlinesEffect();
    Main.uiGroup.add_actor(scanlinesEffect);
}

function disable() {
    if (scanlinesEffect !== null) {
        scanlinesEffect.destroy();
        scanlinesEffect = null;
    }
}