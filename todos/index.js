const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

//スコープの問題に対処するためにここに宣言するのが一般的らしい
let mainWindow;
let addWindow;
let exist_addWindow = false;

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
    if(exist_addWindow == false){
        exist_addWindow = true;
        addWindow = new BrowserWindow({
            width: 300,
            height: 200,
            title: 'Add New Todo'
            
    });
    addWindow.loadURL(`file://${__dirname}/add.html`);
    }

    addWindow.on('closed', () => {
        addWindow = null;
        exist_addWindow = false;
    });
}


function clearTodoList(){
    //sendする際は宛先を指定する
    mainWindow.webContents.send('todo:clear');
}

//中継してやる
ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();
});

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            { 
                label: 'New Todo',
                accelerator: 'Command+N',
                click(){ createAddWindow(); }
            },
            {
                label: 'Clear Todo List',
                accelerator: 'Ctrl+L',
                click(){ clearTodoList(); }
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
            { role: 'reload' },
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