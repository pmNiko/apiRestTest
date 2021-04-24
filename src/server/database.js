import mongoose from 'mongoose';
import dotenv from 'dotenv';

const { NODE_ENV } = process.env;

const { parsed } = dotenv.config();

const { DB_DATABASE, DB_DATABASE_DEV, DB_DATABASE_TEST } = parsed;

let environment = '';

if (NODE_ENV === 'prod') environment = `${DB_DATABASE}`;
if (NODE_ENV === 'dev') environment = `${DB_DATABASE_DEV}`;
if (NODE_ENV === 'test') environment = `${DB_DATABASE_TEST}`;

// fn conexion a la BD
export async function connect() {
	await mongoose
		.connect(`${environment}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
			useCreateIndex: true,
		})
		.then(() =>
			console.log('>>>> db is connected! :sunglasses:', environment)
		)
		.catch((err) => console.log('Error: ', err));
}
