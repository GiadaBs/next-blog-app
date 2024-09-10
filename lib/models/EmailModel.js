import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Garantisce che l'email sia unica nel database
        match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Valida il formato dell'email
    },
    date: {
        type: Date,
        default: Date.now // Imposta la data corrente come valore predefinito
    }
});

const EmailModel = mongoose.models.email || mongoose.model('email', Schema);

export default EmailModel;
