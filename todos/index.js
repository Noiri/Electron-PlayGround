const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

//スコープの問題に対処するためにここに宣言するのが一般的らしい
let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,});
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add New Todo'
    });
    addWindow.loadURL(`file://${__dirname}/add.html`);
}


const menuTemplate = [
    {
        label: 'File',
        submenu: [
            { 
                label: 'New Todo' ,
                click(){ createAddWindow(); }
            },
            {
                label:  'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q': 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];



if(process.platform === 'darwin'){
    menuTemplate.unshift({
        label: app.getName()
    });
}

if(process.env.NODE_ENV !== 'production'){
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            {
                label: 'Toggle Develiper Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}