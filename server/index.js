//uRRpeKcqAbi8rrTd
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const post_term = require('./post_term');

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://192.168.0.161:8080',
  methods: ['GET']
}));

const mongooseDB = require('./mongoose');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', post_term);

app.listen(3000, () => {
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
      
    console.log('Server started on port 3000');
});

