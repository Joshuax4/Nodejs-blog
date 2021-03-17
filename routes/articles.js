//everything included here is included in /articles route in server.js
//doesn't need to be included here 
const express = require('express')
const Article = require('./../models/article')
const router = express.Router() //used to create views

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
}) //must tell application to use router by exporting

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug })
    //above line is what finds the newly created article. Request.parameters.id<of obejct>
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
    //this code will query our database for the most recent article created
})
router.post('/', async (req, res) => {
    let article = new Article({
        //Need to tell express how to access models. Do this in server.js app.use
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        article = await article.save() //check out async await
        res.redirect(`/articles/${article.slug}`) //this redirects to the page containing our articles ID. backticks used to allow for formattion
    } 
    catch (e) {
        res.render('articles/new', { article: article })
    }
})

//To call .delete version of router, we need an action of our method
//method="DELETE" //NOT WORKING
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router