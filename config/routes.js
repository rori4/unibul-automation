const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', restrictedPages.isAuthed, controllers.home.index);
    // app.get('/register', restrictedPages.isAnonymous, controllers.user.registerGet);
    // app.post('/register',restrictedPages.isAnonymous, controllers.user.registerPost);
    app.post('/logout', restrictedPages.isAuthed, controllers.user.logout);
    app.get('/login', restrictedPages.isAnonymous, controllers.user.loginGet);
    app.post('/login',restrictedPages.isAnonymous, controllers.user.loginPost);

    //books routes
    app.get('/books/add', restrictedPages.isAuthed, controllers.books.addGet);
    app.post('/books/add', restrictedPages.isAuthed, controllers.books.addPost);
    app.get('/books/list', restrictedPages.isAuthed, controllers.books.listGet);
    app.post('/books/list', restrictedPages.isAuthed, controllers.books.listPost);
    app.get('/books/promotions/list', restrictedPages.isAuthed, controllers.books.promotionsAllListGet);
    app.post('/books/promotions/list', restrictedPages.isAuthed, controllers.books.promotionsAllListPost);
    app.get('/books/promotions/add', restrictedPages.isAuthed, controllers.books.promotionAddGet);
    app.post('/books/promotions/add', restrictedPages.isAuthed, controllers.books.promotionAddPost);

    // app.get('/test', controllers.books.submitTest);
    
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};