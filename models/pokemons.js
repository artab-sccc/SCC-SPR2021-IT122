import mongoose from 'mongoose';
const { Schema } = mongoose;
import { connectionString } from '../credentials.js';

mongoose.connect(connectionString, {
    dbName: 'characters',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const pokeSchema = new Schema({
 name: String,
 type: String,
 species: String,
 region: String
});

export const Pokemon = mongoose.model('Pokemon', pokeSchema);