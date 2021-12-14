const dependencies = require('./package.json').dependencies || {};
const packageName = require('./package.json').name;

const Fs = require('fs');

async function readFile(fileName){
    return new Promise((resolve, reject)=>{
        Fs.readFile(fileName, 'utf8', function (err,data) {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

async function build(){
    let result = await require('esbuild').build({
        entryPoints: ['src/index.ts'],
        outdir: 'dist',
        bundle: true,
        minify: false,
        format: 'cjs',
        external: [...Object.keys(dependencies)],
        plugins: [],
      }).catch(() => process.exit(1));      
    let content = await readFile('dist/index.js');
    content = `window["${packageName}"] = window["${packageName}"] || {};
((exports) => {
` + content + `})(window["${packageName}"]);`;
    Fs.writeFileSync('dist/index.js', content);
};
build();