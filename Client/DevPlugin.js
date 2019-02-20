const pluginName = 'DevPlugin';

const path = require('path');
const filecopy = require('filecopy');

var DevPlugin = function() {

}

DevPlugin.prototype.apply = function(compiler) {
    compiler.hooks.compile.tap(pluginName,pram => {
        console.log('\033[2J');
        console.clear();
    })
    compiler.hooks.done.tap(pluginName, stats => {
        if(stats.compilation.errors[0]){ // transpileがエラーを吐くとき
            // do nothing 
        } else {　// 成功したとき
            buildSuccessDone();
        }

        console.log('\n\033[36m' + 'End at ' + new Date().toLocaleTimeString() + '\033[39m');
    })
}

function buildSuccessDone() {
    // copy static files
    const beforePath = path.join(__dirname,'src/static/*');
    const afterPath  = path.join(__dirname,'dist/');
    filecopy(beforePath,afterPath,{}).then(() => {
        staticFilesCopyDone(beforePath,afterPath);
    })
}

function staticFilesCopyDone(beforePath,afterPath){
    console.log('\n*--- FROM '+pluginName+' ---*');
    console.log('\ncopied static files');
    console.log('\n from '+beforePath);
    console.log('\n  to  '+afterPath);

    moveStaticFiles2ServerDir();
}

function moveStaticFiles2ServerDir(){
    const beforePath = path.join(__dirname,'dist/*');
    const afterPath  = path.join(__dirname,'../Server/root/static/root/');

    filecopy(beforePath,afterPath,{}).then(() => {
        console.log('\ncopied static files');
        console.log('\n from '+beforePath);
        console.log('\n  to  '+afterPath);

        moveTemplates();
    })
}

function moveTemplates(){
    const beforePath = path.join(__dirname,'../Server/root/static/root/*.html');
    const afterPath  = path.join(__dirname,'../Server/root/templates/root/');

    filecopy(beforePath,afterPath,{}).then(() => {
        console.log('\ncopied static files');
        console.log('\n from '+beforePath);
        console.log('\n  to  '+afterPath);

        
    })
}

module.exports = DevPlugin;
