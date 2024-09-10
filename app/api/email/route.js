import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import EmailModel from "@/lib/models/EmailModel";

export async function POST(request) {
    try {
        await ConnectDB();

        const formData = await request.formData();
        const emailData = {
            email: formData.get('email'),
            date: new Date() // Imposta manualmente la data
        };

        if (emailData.email === 'alex.bennett@gmail.com') {
            // Verifica se l'email esiste già
            const existingEmail = await EmailModel.findOne({ email: emailData.email });
            if (!existingEmail) {
                // Se l'email non esiste, creala
                await EmailModel.create(emailData);
            }
            // Restituisci l'URL di reindirizzamento
            return NextResponse.json({ success: true, redirect: 'http://localhost:3000/admin' });
        }

        // Gestisci le email normali
        try {
            await EmailModel.create(emailData);
            return NextResponse.json({ success: true, msg: "Email Subscribed" });
        } catch (err) {
            // Gestione dell'errore di duplicazione
            if (err.code === 11000) {
                return NextResponse.json({ success: false, msg: "Email già registrata" }, { status: 400 });
            }
            throw err;
        }
    } catch (error) {
        console.error('Error processing request:', error.message);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await ConnectDB();
        // Recupera tutte le email tranne 'alex.bennett@gmail.com'
        const emails = await EmailModel.find({ email: { $ne: 'alex.bennett@gmail.com' } });
        return NextResponse.json({ emails });
    } catch (error) {
        console.error('Error fetching emails:', error);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await ConnectDB();
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        // Verifica se l'ID è un ObjectId valido
        if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
            return NextResponse.json({ success: false, msg: "Invalid ID format" }, { status: 400 });
        }

        const result = await EmailModel.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json({ success: false, msg: "Email not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, msg: "Email Deleted" });
    } catch (error) {
        console.error('Error deleting email:', error);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
    }
}
