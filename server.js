const express = require("express")
const mongoose = require('mongoose') //This is what connects to database 
const Article = require('./models/article')
const methodOverride = require('method-override')
const articleRouter = require('./routes/articles') //./ is RELATIVE path for router 
const app = express()

mongoose.connect('mongodb://localhost/nodeblog', 
{useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true}) //This is the code that allows to connect to database

app.set('view engine', 'ejs') //setting the format of views to ejs
app.use(express.urlencoded({extended: false}))
//This says we can access parameters in article form WITHIN the article route by using req.body.<name of property> --- THIS NEEDS TO COME FIRST
app.use(methodOverride('_method'))

app.get('/', async (req, res) => { //req & res = requirement and response
    const articles = await Article.find().sort({ createdAt: 'desc' }) //Uses line 3 Article const to display articles stored in models/articles. These are stored using MongoDB. .find() displays them all, .sort() sorts by date created
    
    res.render('articles/index', { articles: articles }) //{} passed to index.ejs
    //render takes file as argument and renders it based on link in app.get
})

app.use('/articles', articleRouter) //Necessary to use the article router
// /articles is the URL containing all article related links

app.listen(1000)