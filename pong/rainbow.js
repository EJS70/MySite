let r = 0
let g = 0
let b = 0
        
function rgb(r, g, b){
    return "rgb("+r+","+g+","+b+")"
}
        
function myTimer () {
    if (r < 255 && g == 0 && b == 0) {
        r++
    } else if (r == 255 && g < 255 && b == 0) {
        g++
    } else if (r > 0 && g == 255 && b == 0) {
        r--
    } else if (r == 0 && g == 255 && b < 175) {
        b++
    } else if (r == 0 && g > 0 && b == 175) {
        g--
    } else if (r < 255 && g == 0 && b == 175) {
        r++
    } else if (r == 255 && g== 0 && b > 0) {
        b--
    }
}