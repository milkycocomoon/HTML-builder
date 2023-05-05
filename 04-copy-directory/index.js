const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'files');
const folderCopy = path.join(__dirname, 'files-copy');

fs.mkdir(folderCopy, { recursive: true }, (error) => {
        if (error) throw error;
        fs.readdir(folderCopy, { withFileTypes: true }, (error, arr) => {
                if (error) {
                    throw error;
                } else {
                    const files = arr.filter(file => file.isFile())
                                     .map(file => file.name);

                    for (let i = 0; i < files.length; i++) {
                        const fileRemove = path.join(folderCopy, files[i]);
                        fs.unlink(fileRemove, (error) => {
                            if (error) throw error;
                            console.log(`REMOVE ${path.basename(fileRemove)}`);
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
                                console.log(`COPY ${path.basename(fileCopy)}`);
                            })
                        }
                    }
                })

            })

})

// node 04-copy-directory