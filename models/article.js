//New packages: marked - converts markdown into HTML, slugify - converts title into URL friendly slug
const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')



const articleSchema = new mongoose.Schema({ //Schema is what makes the model that is passed to mongoDB. The rest is just dictionaries outlining the model. 
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now //Specifying default will give it current date as 'created at' time.
    },
    slug: {
        type: String,
        required: true,
        unique: true
    } //This is put in the database so it doesn't need to calculate a slug every time the URL is visited. 
})

articleSchema.pre('validate', function(next)
{
    if (this.title){
        this.slug = slugify(this.title, {lower: true, strict: true })   
     }

    next()
})

module.exports = mongoose.model('Article', articleSchema) //This exports the created model to the database so it can be accessed. First arg is name of mode, second is the schema created above. 