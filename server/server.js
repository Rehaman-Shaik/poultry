import dotenv from 'dotenv';
import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import cors from "cors"


dotenv.config();
const app = express();
const port = process.env.PORT
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static("public"))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../client/dist')));


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
//   });
  


app.listen(port, () => {
    console.log('Server is started running on', process.env.DOMAIN)
})


app.get("/", (req, res)=>{
    res.json({"hello":"Rehaman"})
})
