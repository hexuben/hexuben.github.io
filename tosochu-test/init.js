/*
type:
single-option multiple-option indenifite-option
*/
window.problems = {
    bank: {
        1: {
            type: "single-option",
            stem: "1+1=?",
            option: ["2",
                "3",
                "4",
                "5"],
        }, 2: {
            type: "single-option",
            stem: "1+2=?",
            option: ["2",
                "3",
                "4",
                "5"],
        }, 3: {
            type: "multiple-option",
            stem: "1,3,?",
            option: ["4",
                "5",
                "6",
                "7"],
        }
    },
    structure: [
        { stem: "major 1", breif: "单选题", title: [1, 2] },
        { stem: "major 2", breif: "多选题", title: [3] }
    ]
}

const dictionary = new Array();

function generateDictionary(){
    for(var i = ('A').charCodeAt(); i <= ('Z').charCodeAt(); i++){
        dictionary.push(String.fromCharCode(i));
    }
    for(var i = ('a').charCodeAt(); i <= ('z').charCodeAt(); i++){
        dictionary.push(String.fromCharCode(i));
    }
    for(var i = 0; i <= 9; i++){
        dictionary.push(String(i));
    }
    dictionary.push('+');
    dictionary.push('/');
}

$(document).ready(() => {
    generateDictionary();
});