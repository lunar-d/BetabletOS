const path = require('path') //pour determiner l'OS maitre (windows,Linux,OSX)
const { app, BrowserWindow } = require('electron')

// Gardez une reference globale de l'objet window, si vous ne le faites pas, la fenetre sera
// fermee automatiquement quand l'objet JavaScript sera garbage collected.
let mainWindow = null

//création
function initialize () {
    //ajoute la fonction qui evite plusieur lancement (voir plus bas)
    makeSingleInstance()
  
    //fonction de création de la fenetre
    function createWindow () {

        //parametre de la fenetre
      const windowOptions = {
        width: 1024, //longeur 
        height: 600, //et largeur de l'écran
        title: "BetabletOS", //nom de la fenetre
        frame: false //désactive les bords
      }
      
      // icon de la fenetre
      //si l'os est linux
      if (process.platform === 'linux') {
        windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/ico-512.png')
      }
  
      //cration de la fenetre avec les parametres "windowOptions"
      mainWindow = new BrowserWindow(windowOptions)
      //et on la fait lire le fichier Index.html
      mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))
  
      // Émit lorsque la fenêtre est fermée.
      mainWindow.on('closed', () => {
        // Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
        // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
        // où vous devez supprimer l'élément correspondant.
        mainWindow = null
      })
    }
    //fin de la création de la fenétre
  

    //si l'app est pret a lancer
    app.on('ready', () => {
      //lance la fonction de création de fenetre
      createWindow()
    })
  
    // Quitte l'application quand toutes les fenêtres sont fermées.
    app.on('window-all-closed', () => {
        // Sur macOS, il est commun pour une application et leur barre de menu
        // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
  
    app.on('activate', () => {
        // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
        // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
      if (mainWindow === null) {
        createWindow()
      }
    })
  }

// la fonction qui evite plusieur lancement
function makeSingleInstance () {
    if (process.mas) return
  
    app.requestSingleInstanceLock()
  
    app.on('second-instance', () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
    })
  }

//tout est pret on lance!
initialize()