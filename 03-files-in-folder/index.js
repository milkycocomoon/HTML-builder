const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');

const readableFolder = fs.readdir(folder, { withFileTypes: true },
    (error, arr) => {
        if (error) {
            throw error;
        } else {
            const files = arr.filter(file => file.isFile()).map(file => file.name);

            for (let i = 0; i < files.length; i++) {
                const stats = fs.stat(path.join(folder, files[i]),
                (error, stats) => {
                    if (error) {
                        throw error
                    } else {
                        let basename = '';
                        let extname = '';
                        let size = '';

                        basename = path.basename(files[i], path.extname(files[i]));
                        extname = path.extname(files[i]).toString().slice(1);
                        size = (stats.size / 1024).toFixed(1).toString() + ' KB';

                        console.log(basename + ' - ' + extname + ' - ' + size);
                    }
                })
            }

        }
    }
)

// node 03-files-in-folder