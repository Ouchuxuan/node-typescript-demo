"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
// 日志根目录
var baseLogPath = path_1.default.resolve(__dirname, '../../log');
// 错误日志目录
var errorPath = '/error';
// 错误日志文件名
var errorFileName = 'error';
// 错误日志输出完成路径
var errorLogPath = baseLogPath + errorPath + '/' + errorFileName;
// 请求日志目录
var reqPath = '/request';
// 请求日志文件名
var reqFileName = 'request';
// 请求日志输出完整路径
var reqLogPath = baseLogPath + reqPath + '/' + reqFileName;
// 响应日志目录
var responsePath = '/response';
// 响应日志文件名
var responseFileName = 'response';
// 响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + '/' + responseFileName;
exports.default = {
    // 日志格式等设置
    appenders: {
        stdout: {
            type: 'console'
        },
        console: {
            type: 'console'
        },
        errorLogger: {
            type: 'dateFile',
            filename: errorLogPath,
            pattern: '-yyyy-MM-dd-hh.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            maxLogSize: 1000,
            numBackups: 3,
            path: errorPath,
            layout: {
                type: 'basic'
            }
        },
        http: {
            type: 'dateFile',
            filename: reqLogPath,
            pattern: '-yyyy-MM-dd-hh.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            maxLogSize: 1000,
            numBackups: 3,
            path: reqPath,
            layout: {
                type: 'basic' // 'messagePassThrough'
            }
        },
        resLogger: {
            type: 'dateFile',
            filename: responseLogPath,
            pattern: '-yyyy-MM-dd-hh.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            maxLogSize: 1000,
            numBackups: 3,
            path: responsePath,
            layout: {
                type: 'basic'
            }
        }
    },
    // 供外部调用的名称和对应设置定义
    categories: {
        default: {
            appenders: ['console'], level: 'all'
        },
        resLogger: {
            appenders: ['resLogger'], level: 'info'
        },
        errorLogger: {
            appenders: ['errorLogger'], level: 'error'
        },
        http: {
            appenders: ['http'], level: 'info'
        }
    },
    baseLogPath: baseLogPath,
    replaceConsole: true
};
