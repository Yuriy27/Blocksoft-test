var app = function() {
    let content = $('#template').html().trim();
    let parameters = getParameters(content);
    let obj = buildObject(parameters);
    console.log(obj);
    let domElement = $('#visualized-div')[0];
    buildObjectDOM(obj, domElement);
}

function buildObjectDOM(obj, domElem) {
    let props = Object.keys(obj);
    let ul = document.createElement('ul');
    props.forEach(prop => {
        let li = document.createElement('li');
        li.innerHTML = `${prop}: `;
        ul.appendChild(li);
        if (typeof obj[prop] === 'object') {
            buildObjectDOM(obj[prop], li);
        } else {
            li.innerHTML += obj[prop];
        }
    });
    domElem.appendChild(ul);
}

function getParameters(content) {
    let result = [];
    content.split('<br>').forEach(curr => {
        result.push(curr.trim());
    });

    return result;
}

function buildObject(parameters) {
    var obj = {};
    parameters.forEach(param => {
        addParam(obj, param);
    })

    return obj;
}

function addParam(obj, param) {
    let keyValuePair = param.split('=');
    if (keyValuePair.length !== 2) {
        console.error(`Invalid parameter: ${keyValuePair}`);
        return;
    }
    let key = keyValuePair[0];
    let value = keyValuePair[1];
    insertIntoObject(obj, key, value);
}

function insertIntoObject(obj, key, value) {
    let tokens = key.split('.');
    let currentNode = obj;
    let len = tokens.length;
    for (let i = 0; i < len - 1; i++) {
        let token = tokens[i];
        if (currentNode[token] === undefined) {
            currentNode[token] = {};
        }
        currentNode = currentNode[token];
    };
    currentNode[tokens[len - 1]] = validateDataType(value);
}

function validateDataType(value) {
    if (value[0] === '\"' && value[value.length - 1] === '\"') {
        return value.substring(1, value.length - 1);
    }
    return isNaN(value) ? value : +value;
}

$(window).on('load', function() {
    app();
})