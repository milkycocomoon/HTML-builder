const fs = require('fs');
const path = require('path');
const folderProject = path.join(__dirname, 'project-dist');
const folderStyle = path.join(__dirname, 'styles');

const folderFonts = path.join(__dirname, 'assets', 'fonts');
const folderImg = path.join(__dirname, 'assets', 'img');
const folderSvg = path.join(__dirname, 'assets', 'svg');
const folderFontsCopy = path.join(folderProject, 'assets', 'fonts');
const folderImgCopy = path.join(folderProject, 'assets', 'img');
const folderSvgCopy = path.join(folderProject, 'assets', 'svg');
copyAssets(folderFonts, folderFontsCopy);
copyAssets(folderImg, folderImgCopy);
copyAssets(folderSvg, folderSvgCopy);

const fsPromises = fs.promises;
const folderComponents = path.join(__dirname, 'components');
const template = path.join(__dirname, 'template.html');
const index = path.join(__dirname, 'project-dist', 'index.html');

fs.mkdir(folderProject, { recursive: true }, (error) => {
    if (error) throw error;
    fs.writeFile(path.join(folderStyle, 'style.css'), '', (error) => {
        if (error) throw error;
    });
});

fs.readdir(folderStyle, { withFileTypes: true }, (error, arr) => {
    if (error) {
        throw error;
    } else {
        const files = arr.filter(file => file.isFile())
                         .map(file => file.name);

        for (let i = 0; i < files.length; i++) {
            fs.stat(path.join(folderStyle, files[i]), (error) => {
                if (error) {
                    throw error;
                } else {
                    let extname = '';
                    extname = path.extname(files[i]).slice(1);
                    if (extname === 'css') {
                        let file = path.join(folderStyle, files[i]);
                        let content = fs.readFile(file, 'utf-8', (error, content) => {
                            if (error) {
                                throw error;
                            } else {
                                fs.appendFile(path.join(folderProject, 'style.css'), `${content.toString()}`, (error) => {
                                    if (error) throw error;
                                    fs.unlink(path.join(folderStyle, 'style.css'), (error) => {
                                        if (error) return;
                                    })
                            })
                        }
                    })
                    }
                }
            })
        }
    }
});

function copyAssets(folder, folderCopy) {
    fs.mkdir(folderCopy, { recursive: true }, (error) => {
    if (error) throw error;
    fs.readdir(folderCopy, { withFileTypes: true }, (error, arr) => {
        if (error) {
            throw error;
        } else {
            const files = arr.filter(file => file.isFile())
                             .map(file => file.name);

            for ( let i = 0; i < files.length; i++ ) {
                const fileRemove = path.join(folderCopy, files[i]);
                        fs.unlink(fileRemove, (error) => {
                            if (error) throw error;
                        })
            }
        }

        fs.readdir(folder, { withFileTypes: true }, (error, arr) => {
            if (error) {
                throw error;
            } else {
                const files = arr.filter(file => file.isFile())
                                 .map(file => file.name);

                for (let i = 0; i < files.length; i++) {
                    const file = path.join(folder, files[i]);
                    const fileCopy = path.join(folderCopy, files[i]);
                    fs.copyFile(file, fileCopy, (error) => {
                        if (error) throw error;
                    })
                }
            }
        })

    })
    })
}

createHtml();
async function createHtml() {
    let data = await fsPromises.readFile(template, 'utf-8');
    const files = await fsPromises.readdir(folderComponents);

    for (let i = 0; i < files.length; i++) {
        const file = path.join(folderComponents, files[i]);
        if (path.parse(file).ext === '.html') {
            const fileName = path.parse(file).name;
            const fileData = await fsPromises.readFile(file, 'utf-8');
            data = data.replace(`{{${fileName}}}`, fileData);

            fs.writeFile(index, data, (error) => {
                if (error) throw error;
            })
        }
    }
}

// node 06-build-page