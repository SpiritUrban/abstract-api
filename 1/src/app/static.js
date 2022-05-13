import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default function (app) {
    app.use(express.static(__dirname + '/public'))
        .use(express.static(__dirname + '/uploads'), function (res, path, stat, next) {
            res.header('Cache-Control', 'no-cache, no-store, must-revalidate, private, max-age=1');
            next();
        })
        .use(express.static(__dirname + '/uploads-msg'), function (res, path, stat, next) {
            res.header('Cache-Control', 'no-cache, no-store, must-revalidate, private, max-age=1');
            next();
        })
        .use(express.static(__dirname + '/uploads-ads'), function (res, path, stat, next) {
            res.header('Cache-Control', 'no-cache, no-store, must-revalidate, private, max-age=1');
            next();
        })
        .use(express.static(__dirname + '/uploads-alarm'), function (res, path, stat, next) {
            res.header('Cache-Control', 'no-cache, no-store, must-revalidate, private, max-age=1');
            next();
        })
        .use(express.static(__dirname + '/uploads-app'), function (res, path, stat, next) {
            res.header('Cache-Control', 'no-cache, no-store, must-revalidate, private, max-age=1');
            next();
        })
        .use(express.static(__dirname + '/uploads-speaker-audio-msgs'), function (res, path, stat, next) {
            res.header('Cache-Control', 'no-cache, no-store, must-revalidate, private, max-age=1');
            next();
        });
};