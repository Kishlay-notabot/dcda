const Ts =  require("tesseract.js")
Ts.recognize('./tss.jpg','eng',{logger: e =>console.log(e)},1)
    .then(out=> console.log(out))