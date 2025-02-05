const fs = require('fs')
const path = require('path')


const config = {
    distProject: path.join(__dirname, '../dist'), 
    replacePaths: path.join(__dirname, '../../nui/'),
}


class AutoBuild {
    constructor(path=null, replacePaths=null) {
        this._path = path   
        this._replace = replacePaths
    }

    getFolder(cb=null) {        
        const interval = setInterval(() => {
            if ((fs.existsSync(this._path) && fs.existsSync(path.join(this._path, './index.html'))) == true) {
                cb()
                clearInterval(interval)
            }
        }, 500)
    }

    getFileHtmlAndUpdate(cb=null) {
        const filePath = path.join(this._path, 'index.html'); 
        
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error("Erreur lors de la lecture du fichier :", err);
            }

            const updatedData = data.replace(/(src|href)="(?!\.\/|http)(.*?)"/g, '$1=".$2"');
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) {
                    console.error("Erreur lors de l'écriture du fichier :", err);
                }else {
                    cb()
                }
            });

        });
    }
    copyFolder(src, dest) {
        fs.mkdirSync(dest, { recursive: true });

        fs.readdirSync(src).forEach((file) => {
            const currentPath = path.join(src, file);
            const newPath = path.join(dest, file);
            const stats = fs.statSync(currentPath);

            if (stats.isDirectory()) {
                this.copyFolder(currentPath, newPath);
            } else {
                fs.copyFileSync(currentPath, newPath);
            }
        });
    }


    deleteFolderContents(folderPath) {
        if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath);
            files.forEach((file) => {
                const currentPath = path.join(folderPath, file);
                const stats = fs.statSync(currentPath);
                if (stats.isDirectory()) {
                    this.deleteFolderContents(currentPath);
                    fs.rmdirSync(currentPath);
                } else {
                    fs.unlinkSync(currentPath);
                }
            });
        }
    }

    copyAndDeleteFolder(cb = null) {
        const src = this._path;
        const dest = this._replace;

        if (!fs.existsSync(src)) {
            return;
        }

        this.deleteFolderContents(dest)
        this.copyFolder(src, dest)

        fs.rmSync(src, { recursive: true, force: true });
        cb()
    }    
}


const build = new AutoBuild(config.distProject, config.replacePaths)

build.getFolder(() => {
    build.getFileHtmlAndUpdate(() => {
        build.copyAndDeleteFolder(() => {
            console.log('build fivem effectué avec succès!')
        })
    })
})