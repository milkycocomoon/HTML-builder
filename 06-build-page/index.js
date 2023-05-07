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

const folderComponents = path.join(__dirname, 'components');

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

// idk how to make this part with template...

// fs.mkdir(folderProject, { recursive: true }, (error) => {
//     if (error) throw error;
//     fs.writeFile(path.join(folderComponents, 'index.html'), '', (error) => {
//         if (error) throw error;
//     });
// });

// node 06-build-page