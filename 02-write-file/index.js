const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

fs.writeFile(
    path.join(__dirname, 'text.txt'),
    '',
    (error) => {
        if (error) throw error;
        stdout.write('File created. You can input text. /// To exit press: CTRL + C or input: .exit\n');
    });

stdin.on('data', data => {
    if (data.toString().trim() === '.exit') {
        stdout.write('Bye');
        process.exit();
    } else {
        fs.appendFile(
            path.join(__dirname, 'text.txt'),
            data,
            (error) => {
                if (error) throw error;
            }
        );
        stdout.write('Your text successfully saved. Do you wish to add more? /// To exit press: CTRL + C or input: .exit\nCurrently saved text: ' + `${data.toString().trim()}\n`);
    }
    process.on('SIGINT', () => {
        stdout.write('Bye');
        process.exit();
    })
})

// node 02-write-file