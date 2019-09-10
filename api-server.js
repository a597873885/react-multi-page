/*
 * dev-server.js
 * Copyright (C) 2016 tristan <tristan@tristan-VirtualBox>
 *
 * Distributed under terms of the MIT license.
 */

"use strict";

var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var jsonFileBase = './mock';
function isFunction(obj) {
    return Object.prototype.toString.call(obj) == '[object Function]';
}
function route(fileName) {
    return function(req, res) {
        console.log(req.body);
        var fn = fileName;
        var args = process.argv;
        if (isFunction(fn)) fn = fn(req);
        setTimeout(function() {
            jsonFromFile(res, fn);
        }, 500);
    };
}

function jsonFromFile(res, fileName) {
    fs.readFile(fileName, {encoding:'utf8'}, function(err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(JSON.parse(data));
    });
}
function convertUrl (r){
    var p = path.join(jsonFileBase, r.replace(/\/:[^\/]+(?=[\/$])/g, ''));
    if (p[p.length - 1] == '/') p = p.substr(0, p.length - 1);
    p += '.json';
    return p;
}

function gets(router, routes) {
    routes.forEach(function(r) {
        var p = convertUrl(r);
        router.use(r, route(p));
    });
}


app.use(function(req, res, next) {
	console.log(req.originalUrl);
	next();
});
app.use(cors({
    origin: '*',
    exposedHeaders: 'access-token'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var router = express.Router();
app.use('/', router);
/**
 * get 方法
 */
//验证身份证是否是本人  	手机号是否被占用
gets(router, [
    '/superapp/rest/selfcard',
]);
router.post('/baidase/test', function(req, res) {
  console.log(req.body);
  
    let path = '/Users/jeffery/Downloads/灵感家居图/艺术漆/艺术漆';
    let files = fs.readdirSync(path);
    for(let i = 0; i < files.length; i++){
        // if (i !== 0) continue;
        fs.readFile(`${path}/${files[i]}`,function(){
            let newName =files[i].replace(/[0-9a-zA-Z\-]{1,8}( ?[，,] ?)?/g, " ").
                                    replace(/[0-9a-zA-Z\-]{1,8}\./g, ".").
                                    replace(/ ?， ?/g, " ").
                                    replace("、", "").
                                    replace(" .", ".").
                                    replace(/ {1,5}/g, " ")
            // console.log(newName)
            // console.log(`${path}/${files[i]}`)
            newName = newName.split(".")[0] + ".jpg"
            console.log(`${path}/${newName}`)
            fs.rename(`${path}/${files[i]}`,`${path}/${newName}`, function(){})
        })
    }
    setTimeout(function() {
        var readDir = fs.readdirSync(path);
        res.json({
            status: 0,
            msg: "",
            data: readDir
          });
    }, 5000)
  
});

router.post('/baidase/seka', function(req, res) {
      var resArray = []
      let path = '/Users/jeffery/Downloads/灵感家居图/艺术漆/艺术漆色卡2';
      let files = fs.readdirSync(path);
      for(let i = 0; i < files.length; i++){
          // if (i !== 0) continue;
          var nameReg = /[\u4e00-\u9fa5]+/g
          var numberReg = /[0-9a-zA-Z\-]{1,20}( ?[，,] ?)?/g
          fs.readFile(`${path}/${files[i]}`,function(){
              var newName = files[i].match(nameReg)
              var newNumber = files[i].match(numberReg)
              var obj = {
                  name: newName ? newName[0] : "",
                  number: newNumber[0]
              }
              resArray.push(obj)
              // console.log(newName)
              // console.log(`${path}/${files[i]}`)
            //   newName = newName.split(".")[0] + ".jpg"
            //   console.log(`${path}/${newName}`)
            //   fs.rename(`${path}/${files[i]}`,`${path}/${newName}`, function(){})
          })
      }
      setTimeout(function() {
          res.json({
              status: 0,
              msg: "",
              data: resArray
            });
      }, 5000)
    
  });


router.post('/baidase/muqituijian', function(req, res) {
    var resArray = []
    let path = '/Users/jeffery/Downloads/立邦百搭色-木漆/FA';
    let files = fs.readdirSync(path);
    for(let i = 0; i < files.length; i++){
        if (files[i] === ".DS_Store") continue
        let path2 = path + "/" + files[i]
        let files2 = fs.readdirSync(path2);
        var obj = {}
        for(let j = 0; j < files2.length; j++){
            if (files2[j] === ".DS_Store") continue
            if (!obj[files[i] + "/" + files2[j]]) {
                obj[files[i] + "/" + files2[j]] = []
            } 
            let path3 = path2 + "/" + files2[j]
            let files3 = fs.readdirSync(path3);
            for(let m = 0; m < files3.length; m++){
                if (files3[m] === ".DS_Store") continue
                obj[files[i] + "/" + files2[j]].push(files3[m])
            }
        }
        resArray.push(obj)
    }
    console.log(resArray)
});
var server = app.listen(9191, function() {
	var address = server.address();
	console.log('api server is running at:' + address.port);
});


