var answer = new Object();

function displayProblem(problem, problemid) {
    if (problem.type.indexOf("option") !== -1) {
        $(`.display-main`).append(`<p class="display-stem">
            ${problem.stem}
            </p>`);
        for (var choice in problem.option) {
            if (problem.type === "single-option") {
                console.log(answer[problemid]);
                if (answer[problemid] === +choice) {
                    $(`.display-main`).append(`<div class="display-option-chosen" option-id="${choice}" problem-id="${problemid}">
                        ${problem.option[choice]}</div>`);
                } else {
                    $(`.display-main`).append(`<div class="display-option" option-id="${choice}" problem-id="${problemid}">
                        ${problem.option[choice]}</div>`);
                }
            } else {
                if (answer[problemid][+choice] === 1) {
                    $(`.display-main`).append(`<div class="display-option-chosen" option-id="${choice}" problem-id="${problemid}">
                        ${problem.option[choice]}</div>`);
                } else {
                    $(`.display-main`).append(`<div class="display-option" option-id="${choice}" problem-id="${problemid}">
                        ${problem.option[choice]}</div>`);
                }
            }
        }
    }
}

$(document).on('click', `.display-option`, (ev) => {
    var object = $(ev.currentTarget);
    var problem = problems.bank[+object.attr('problem-id')];
    if (problem.type !== "single-option") {
        answer[+object.attr('problem-id')][+object.attr(`option-id`)] = 1;
        object.addClass(`display-option-chosen`);
        object.removeClass(`display-option`);
        return;
    }
    answer[+object.attr(`problem-id`)] = +object.attr(`option-id`);
    $(`.display-option-chosen`).addClass(`display-option`);
    $(`.display-option-chosen`).removeClass(`display-option-chosen`);
    object.addClass(`display-option-chosen`);
    object.removeClass(`display-option`);
})

$(document).on('click', `.display-option-chosen`, (ev) => {
    var object = $(ev.currentTarget);
    var problemid = +object.attr(`problem-id`);
    if (problems.bank[problemid].type !== "single-option") {
        answer[problemid][+object.attr(`option-id`)] = 0;
    } else {
        answer[problemid] = -1;
    }
    object.addClass(`display-option`);
    object.removeClass(`display-option-chosen`);
})

function getResult() {
    var problem = Object.getOwnPropertyNames(problems.bank);
    var single = new Array(), multiple = new Array();
    for (var item of problem) {
        if (problems.bank[item].type === "single-option") {
            single.push(item);
        } else {
            multiple.push(item);
        }
    }
    var result = new String();
    for (var item of single) {
        if (answer[+item] >= 0) {
            result += String.fromCharCode(65 + answer[+item]);
        } else {
            result += " ";
        }
    }
    for (var item of multiple) {
        result += `/`;
        for (var index in answer[+item]) {
            if (answer[+item][index] === 1) {
                result += String.fromCharCode(65 + +index);
            }
        }
    }
    return result;
}

function encode(str) {
    var result = new String();
    for (var i = 0; i <= Math.floor((str.length - 1) / 3); i++) {
        var template = new String();
        for (var j = 0; j < 3 && i * 3 + j < str.length; j++) {
            template = template + str[i * 3 + j].charCodeAt().toString(2).padStart(8, '0');
        }
        for (var j = 0; j < 4; j++) {
            if (i < Math.floor(str.length / 3)) {
                result += dictionary[parseInt(template.substring(j * 6, (j + 1) * 6), 2)];
                continue;
            }
            if (template.length <= j * 6) {
                result += '=';
            } else {
                result += dictionary[parseInt(template.substring(j * 6, (j + 1) * 6).padEnd(6, '0'), 2)];
            }
        }
    }
    return result;
}

function decode(str) {
    var result = new String();
    for (var i = 0; i < str.length / 4; i++) {
        var template = new String();
        for (var j = 0; j < 4; j++) {
            if (str[i * 4 + j] == '=') continue;
            template += dictionary.indexOf(str[i * 4 + j]).toString(2).padStart(6, '0');
        }
        for (var j = 0; j < 3; j++) {
            if (template.length < (j + 1) * 8) break;
            result += String.fromCharCode(parseInt(template.substring(j * 8, (j + 1) * 8), 2));
        }
    }
    return result;
}

$(document).on(`click`, '.tab-encode', (ev) => {
    $(`.showing-encode-text`).html(encode(getResult()));
});

$(document).on(`click`, '.tab-decode', (ev) => {
    $(`.showing-decode-text`).html(decode($(".input-decode").val()));
});

$(document).ready(() => {
    for (var problem in problems.bank) {
        if (problems.bank[problem].type === "single-option") {
            answer[problem] = -1;
        } else {
            answer[problem] = new Array(problems.bank[problem].option.length);
        }
    }
    problems.structure.forEach((major, majorIndex) => {
        $(".control-main").append(
            `<div class="control-major" major-id="${majorIndex}">
                <div style="display: flex;">
                <span class="control-questionNumber">${majorIndex + 1}</span>
                <span class="rightSpace"></span>
                共 ${major.title.length} 小题
                <button class="control-major-click" click-id="${majorIndex}">
                    <i class="fa fa-solid fa-list" style="font-size: 12px;"></i>
                </button>
                </div>
            </div>
            <div class="control-sub" sub-id="${majorIndex}">
            </div>`
        );
        var span = $(`div[sub-id='${majorIndex}']`);
        major.title.forEach((sub, subIndex) => {
            span.append(`<span class="control-chooser" data-id="${majorIndex}-${subIndex}">${subIndex + 1}</span>`);
            $(`[data-id='${majorIndex}-${subIndex}']`).click(() => {
                $(`.display-main`).html(`<span class="display-showing">第 ${majorIndex + 1} 大题</span>
                    <span class="display-showing">第 ${subIndex + 1} 小题</span>`);
                $(`.display-main`).append(`<p class="display-stem display-major-stem">
                    ${major.stem}
                    </p>`);
                displayProblem(problems.bank[sub], sub);
            });
        })
        $(`[click-id='${majorIndex}']`).click(() => {
            span.slideToggle(200);
        });
    });
});