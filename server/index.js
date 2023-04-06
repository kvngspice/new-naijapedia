//uRRpeKcqAbi8rrTd
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const post_term = require('./post_term');
const get_terms = require('./get_terms');
const get_term = require('./get_term');
const get_term_byname = require('./get_term_byname');
const post_term_vet = require('./post_term_vet');

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://192.168.8.102:8080',
  methods: ['GET']
}));

const mongooseDB = require('./mongoose');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', post_term);
app.use('/api', get_terms);
app.use('/api', get_term);
app.use('/api', get_term_byname);
app.use('/api', post_term_vet);

app.listen(8000, () => {
    mongooseDB.connect('mongodb+srv://sampelumibiz:uRRpeKcqAbi8rrTd@cluster0.ot6j04n.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       /* useCreateIndex: true,
        useFindAndModify: false*/
    }).then(() => {
     console.log('Connected to MongoDB database');
    }).catch((err) => {
    console.error('Error connecting to MongoDB database', err);
    });
      
    console.log('Server started on port 8000');
});

