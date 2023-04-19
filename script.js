const translate = {
    "hex_to_ascii": (text)=>{
        let c = 0
        let str = ""
        let bit = 0
        text += " "
        for (let i = 0;i < text.length; i++)
        {
            let char = text.substring(i,i+1).toLowerCase().charCodeAt()
            let is_number = (char >= 48 && char <= 57)
            let is_valid = (char >= 97 && char <= 102) || is_number
            if (is_valid && c <= 1) {
                bit += ((is_number ? (char-48) : (char-87))<<(!c)*4)
                c += 1
            } else {
                c = 0
                str += String.fromCodePoint(bit)
                bit = 0
            }
        }
        return str
    },
    "ascii_to_hex": (text)=>{
        let str = ""
        for (let i = 0;i<text.length;i++)
        {
            let char = text.substring(i,i+1).charCodeAt()
            let hex_string = char.toString(16)
            str += hex_string+" "
        }
        return str
    },
    "ascii_to_binary": (text)=>{
        let str = ""
        for (let i = 0;i<text.length;i++)
        {
            let char = text.substring(i,i+1).charCodeAt()
            let hex_string = char.toString(2)
            if (hex_string.length <= 7) {
                let repeat = 8-hex_string.length
                hex_string = ("0".repeat(repeat))+hex_string
            }
            str += hex_string+" "
        }
        return str
    },
    "binary_to_ascii": (text)=>{
        let c = 0
        let str = ""
        let bit = 0
        text += " "
        for (let i = 0;i < text.length; i++)
        {
            let char = text.substring(i,i+1).charCodeAt()
            let is_valid = (char == 48 || char == 49)
            if (is_valid && c < 8) {
                bit += ((char-48)<<(7-c))
                c += 1
            } else {
                c = 0
                str += String.fromCodePoint(bit)
                bit = 0
            }
        }
        return str
    }
}
const input = document.querySelector(".input")
const output = document.querySelector(".output")
const selector = document.querySelector("#selector")
//func is short for function
const translate_func = (e)=>{
    let text = input.value
    let translated_text = translate[selector.value](text)
    output.innerHTML = translated_text
}
input.oninput = translate_func
selector.onchange = translate_func
