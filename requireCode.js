// use it for whatever you need it ;)
// 
// https://github.com/WolfgangKluge/node-helpers
// Copyright (c) 2012 Wolfgang Kluge (klugesoftware.de, gehirnwindung.de)

(function () {
    "use strict";
    
    /**
     *  Compiles code as if it were required from pathToCode. require.extensions is ignored.
     *  @param {String} code        Code to compile.
     *  @param {String} pathToCode  The file path to assume (relative or absolute).
     *                              There's no need for a physical file, but you should use a distinct filename in pathToCode if there is no.
     *  @return {Object}            Returns the exports - object of the loaded module
    **/
    function requireCode(code, pathToCode) {
        var vm = require("vm");
        var path = require("path");
        var Module = require("module").Module;
        
        var filepath = path.resolve(process.cwd(), pathToCode);
        var filename = path.basename(filepath);
        var dirname = path.dirname(filepath);
        
        var cachedModule = Module._cache[filepath];
        if (cachedModule) {
            return cachedModule.exports;
        }
        
        var mod = new Module(filepath, module);
        Module._cache[filepath] = mod;
        
        mod.filename = filepath;
        mod.paths = Module._nodeModulePaths(dirname);
        
        mod._compile(code, filepath);
        mod.loaded = true;
        
        return mod.exports;
    }
    
    module.exports = requireCode;
}());