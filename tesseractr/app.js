const Ts =  require("tesseract.js")
Ts.recognize('./tss.jpg','eng',1,{logger: e =>console.log(e)})
    .then(out=> console.log(out))