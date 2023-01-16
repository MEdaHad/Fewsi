import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
DeviceMotionEvent.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePlicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.json(__dirname, 'public/assets')));

const storage = multer.diskStorage({
     destination:function(req, file, cb) {
        cb(null, "public/assets");
     },
     filename: function(req, file, cb){
        cb(null, file.originalname)
     }
}); 

const upload = multer ({ storage });


const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(()=> {
   app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));
}).catch((erorr) => console.log(`${error} did not connect`));
 




