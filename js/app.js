var app = function() {
    let content = $('#template').html().trim();
    console.log(content);
    let parameters = getParameters(content);
    console.log(parameters);
    let obj = buildObject(parameters);
    console.log(obj);
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
    console.log(param);
    let keyValuePair = param.split('=');
    console.log(keyValuePair);
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
    if (value[0] === '\"' && value[value.length - 1]) {
        return value.substring(1, value.length - 1);
    }
    return isNaN(value) ? value : +value;
}

$(window).on('load', function() {
    app();
})