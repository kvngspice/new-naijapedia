//uRRpeKcqAbi8rrTd
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const post_term = require('./post_term');
const get_terms = require('./get_terms');
const get_term = require('./get_term');
const search_term = require('./search_term');
const post_term_vet = require('./post_term_vet');

app.use(bodyParser.json());
app.use(cors({
  origin: 'https://naijapedia.net',
  methods: ['GET', 'POST']
}));

const mongooseDB = require('./mongoose');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', post_term);
app.use('/api', get_terms);
app.use('/api', get_term);
app.use('/api', search_term);
app.use('/api', post_term_vet);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
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
    
    console.log(`Server started on port ${3000}`);
});

