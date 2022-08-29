const { src, dest, series } = require('gulp');
const clean = require("gulp-clean");
const zip = require('gulp-zip');


const config = {
    srcPath: './',
    buildPath: './dist/module/',
    rootPath: './dist/',
    moduleName: 'faq',
    mod_package_name: 'mod_faq_v1.0.2.zip',
    moduleExts: ['xml','php','js','css','jpg','png','gif','ttf','otf','woff','woff2','svg','eot']
}

const tasks = {
    manifest: {
        src: [config.srcPath + 'modules/mod_' + config.moduleName + '/' + config.moduleName + '.xml', config.srcPath + 'modules/mod_' + config.moduleName + '/script.php'],
        dest: config.buildPath
    },
    modules: [
        {
            name: 'faq',
            exts: config.moduleExts
        }
    ],
}

// clean rootpath
function cleanDist() {
    return src("./build", { read: false, allowEmpty: true }).pipe(clean());
}

// manifest task
function manifest() {
    return src(tasks.manifest.src, {allowEmpty: true})
    .pipe(dest(tasks.manifest.dest));
}

// modules tasks
function modules(callback) {
    let modules = typeof (tasks.modules) == 'object' && tasks.modules instanceof Array && tasks.modules.length > 0 ? tasks.modules : false;
    let module_tasks = [];

    if (modules) {
        modules.map(module => {
            let mod_task =  (taskDone) => {
                src([ config.srcPath + 'modules/mod_' + module.name + '/**/*.{' + module.exts.join(',') + '}', config.srcPath + 'language/en-GB/en-GB.mod_' + module.name + '*.ini'], {allowEmpty: true})
                .pipe(dest(config.buildPath + '/modules/mod_' + module.name + '/'));
                taskDone();
            }
            module_tasks.push(mod_task);
        });
    }
    return series(...module_tasks, seriesDone => {
        seriesDone();
        callback();
    })();
}

// modules language
function moduleLanguages(callback) {
    let modules = typeof (tasks.modules) == 'object' && tasks.modules instanceof Array && tasks.modules.length > 0 ? tasks.modules : false;
    let module_language_tasks = [];
    if (modules) {
        modules.map(module => {
            let mod_task =  (taskDone) => {
                src([ config.srcPath + 'language/en-GB/en-GB.mod_' + module.name + '.ini', config.srcPath + 'language/en-GB/en-GB.mod_' + module.name + '.sys.ini'], {allowEmpty: true})
                .pipe(dest(config.buildPath + '/modules/mod_' + module.name + '/language'));
                taskDone();
            }
            module_language_tasks.push(mod_task);
        });
    }
    return series(...module_language_tasks, seriesDone => {
        seriesDone();
        callback();
    })();
}

// make module package
function modulePackage(callback) {
    return src(config.buildPath + '/**')
    .pipe(zip(config.mod_package_name))
    .pipe(dest(config.buildPath));
}

exports.default = series(
    cleanDist, modules, manifest, moduleLanguages, modulePackage
)