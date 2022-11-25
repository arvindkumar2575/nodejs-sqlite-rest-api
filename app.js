const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const { insertAll, selectAll } = require('./db/db')
const { isUndefinedNullEmpty } = require('./helpers/common')
const url = require('url').URL

const port = process.env.PORT || 3000

//configure body-parser for express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//css,js,images files assets
app.use('/assets', express.static('assets'))

//ejs view
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    selectAll("settings").then(e => {
        // console.log(e)
        res.render('index', {
            page: 'home',
            title: 'OSN Services',
        })
    }).catch((err) => {
        alert(err);
        res.redirect('/')
    });

})
app.get('/about-us', (req, res) => {
    res.render('about-us', {
        page: 'about-us',
        title: 'About Us | OSN Services',
    })
})
app.get('/contact-us', (req, res) => {
    res.render('contact-us', {
        page: 'contact-us',
        title: 'Contact Us | OSN Services',
    })
})


// form submit post 
app.post('/form-submit', (req, res) => {
    let date = new Date();
    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_id: req.body.email_id,
        mobile_no: req.body.mobile_no,
        reason_options: req.body.reason_options,
        default_message: req.body.default_message,
        itr_options: req.body.itr_options,
        created_at: date.toString()
    }
    if(isUndefinedNullEmpty(data.first_name)&&isUndefinedNullEmpty(data.mobile_no)&&isUndefinedNullEmpty(data.email_id)&&isUndefinedNullEmpty(data.reason_options)){
        insertAll("contact_form", data)
        res.json({ status: true, message: 'Inserted Successfully!' })
    }else{
        res.json({ status: false, message: 'Please fill all field!' })
    }
})

app.get('*', (req, res) => {
    res.render('notfound', {
        page: 'notfound',
        title: 'Not Found | OSN Services'
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})