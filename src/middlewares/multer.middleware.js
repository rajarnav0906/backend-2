import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb){ //used to give the destination where u want to store
        cb(null, "./public/temp");  //cb is callback
    },
    filename: function(req, file, cb) { //used to give the filemame 
        cb(null, file.originalname);
    }
})

export const upload = multer({storage});