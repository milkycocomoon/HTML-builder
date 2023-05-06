const fs = require('fs');
const path = require('path');
const folderStyle = path.join(__dirname, 'styles');
const folderProject = path.join(__dirname, 'project-dist');

fs.writeFile(path.join(folderProject, 'bundle.css'), '', (error) => {
    if (error) throw error;
    console.log('bundle.css was created in project-dist folder');
})

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
                    if (extname === 'css'){
                        let file = path.join(folderStyle, files[i]);
                        let content = fs.readFile(file, 'utf-8', (error, content) => {
                            if (error) {
                                throw error;
                            } else {
                                fs.appendFile(path.join(folderProject, 'bundle.css'), `${content.toString()}`, (error) => {
                                    if (error) throw error;
                                })
                            }
                        })
                    }
                }
            })
        }
    }
})

// node 05-merge-styles