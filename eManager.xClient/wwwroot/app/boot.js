"use strict";
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
var browser_1 = require('angular2/platform/browser');
var app_component_1 = require('./app.component');
var core_1 = require('angular2/core');
var core_2 = require('angular2/core');
core_2.enableProdMode();
var router_1 = require('angular2/router');
browser_1.bootstrap(app_component_1.AppComponent, [router_1.ROUTER_PROVIDERS, core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })]);
