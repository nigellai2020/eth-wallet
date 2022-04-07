module.exports = function(name, abiPath, abi){
    if (abi.length) {
    let result = [];
    let events = {};
    function addLine(indent, code){
        if (indent)
            result.push(`    `.repeat(indent) + code)
        else
            result.push(code);
    }
    function inputDataType(item){
        let type = item.type;
        if (type == 'address' || type == 'string')
            return 'string';
        else if (/^(address|string)(\[\d*\])+$/.test(type))
            return type.replace("address","string").replace(/\d*/g,"");
        else if (type == 'bool')
            return 'boolean';
        else if (/^bool(\[\d*\])+$/.test(type))
            return type.replace("bool","boolean").replace(/\d*/g,"");
        else if (/^bytes\d*(\[\d*\])+$/.test(type))
            return type.replace(/bytes\d*/,"string").replace(/\d*/g,"");
        else if (/^bytes\d*$/.test(type))
            return 'string';
        else if (/^u?int\d*(\[\d*\])+$/.test(type))
            return type.replace(/^u?int\d*/,"(number|BigNumber)").replace(/\d*/g,"");
        else if (/^u?int\d*$/.test(type))
            return 'number|BigNumber'
        else if (type == 'tuple')
            return '{' + item.components.map((e,i)=>`${paramName(e.name,i)}:${inputDataType(e)}`).join(',') + '}';
        else if (/^tuple(\[\d*\])+$/.test(type))
            return '{' + item.components.map((e,i)=>`${paramName(e.name,i)}:${inputDataType(e)}`).join(',') + '}' + type.replace("tuple","").replace(/\d*/g,"");
        else
            return 'any'
    }
    function paramName(name, idx){
        if (name)
            return name.replace(/_/g,'')
        else
            return 'param' + (idx + 1)
    }
    function outputDataType(item){
        let type = item.type;
        if (type == 'address' || type == 'string')
            return 'string'
        else if (/^(address|string)(\[\d*\])+$/.test(type))
            return type.replace("address","string").replace(/\d*/g,"");
        else if (type == 'bool')
            return 'boolean';
        else if (/^bool(\[\d*\])+$/.test(type))
            return type.replace("bool","boolean").replace(/\d*/g,"");
        else if (/^bytes\d*(\[\d*\])+$/.test(type))
            return type.replace(/bytes\d*/,"string").replace(/\d*/g,"");
        else if (/^bytes\d*$/.test(type))
            return 'string';
        else if (/^u?int\d*(\[\d*\])+$/.test(type))
            return type.replace(/^u?int\d*/,"BigNumber").replace(/\d*/g,"");
        else if (/^u?int\d*$/.test(type))
            return 'BigNumber'
        else if (type == 'tuple')
            return '{' + item.components.map((e,i)=>`${paramName(e.name,i)}:${outputDataType(e)}`).join(',') + '}';
        else if (/^tuple(\[\d*\])+$/.test(type))
            return '{' + item.components.map((e,i)=>`${paramName(e.name,i)}:${outputDataType(e)}`).join(',') + '}' + type.replace("tuple","").replace(/\d*/g,"");
        else
            return 'any'
    }


    function viewFunctionOutputType(items, isEvent){
        if (items.length > 1 || (isEvent && items.length >= 1)){
            let result = '{';
            for (let i = 0; i < items.length; i ++){
                if (i > 0)
                    result +=','
                result += ((items[i].name ||`param${i+1}`)) + ':' + outputDataType(items[i]);
            }
            if (isEvent) {
                if (items.length > 0)
                    result +=','
                result += "_event:Event"
            }
            result += '}'
            return result;
        }
        else if (items.length == 1){
            return outputDataType(items[0])
        }
        else
            return isEvent ? '{}' : 'any';
    }
    function outputs(item){
        if (item.stateMutability != 'view' && item.stateMutability != 'pure'){
            return 'TransactionReceipt'
        }
        else {
            return viewFunctionOutputType(item.outputs);
        }
    }
    function inputs(item){
        if (item.inputs.length == 0)
            return ''
        else if (item.inputs.length == 1){
            return `${paramName(item.inputs[0].name,0)}:${inputDataType(item.inputs[0])}`
        }
        else{
            let result = 'params:{';
            if (item.inputs){
                for (let i = 0; i < item.inputs.length; i ++){
                    if (i > 0)
                        result += ',';
                    result += `${paramName(item.inputs[i].name,i)}:${inputDataType(item.inputs[i])}`
                }
            }
            return result+'}';
        }
    }
    function toType(prefix,inputs){
        let result = "";
        for (let i = 0 ; i < inputs.length ; i++) {
            if (i > 0)
                result += ',';
            if (/^u?int\d*(\[\d*\])*$/.test(inputs[i].type))
                result += `Utils.toString(${prefix}${paramName(inputs[i].name,i)})`
            else if (inputs[i].type == 'tuple')
                result += expendTuple(`${prefix}${paramName(inputs[i].name,i)}.`, inputs[i]);
            else if (/^tuple(\[\d*\])+$/.test(inputs[i].type))
                result += `${prefix}${paramName(inputs[i].name,i)}` +
                inputs[i].type.match(/(\[\d*\])/g).map((e,i,a)=>i==a.length-1 ? `.map(e=>(` : `.map(a${i}=>a${i}`).join("") +
                `${expendTuple("e.", inputs[i])}`+
                inputs[i].type.match(/(\[\d*\])/g).map((e,i)=>i==0?"))":")").join("");
            else if (/^bytes32(\[\d*\])*$/.test(inputs[i].type))
                result += `Utils.stringToBytes32(${prefix}${paramName(inputs[i].name,i)})`
            else
                result += `${prefix}${paramName(inputs[i].name,i)}`
        }
        return result;
    }
    function expendTuple(parent,tuple){
        let result = '[' + toType(parent, tuple.components) + ']';
        return result;
    }
    function inputNames(item){
        let prefix = item.inputs.length > 1 ? "params." : "";
        let result = toType(prefix, item.inputs);
        return result;
    }
    function payable(item) {
        if (item.stateMutability=='payable') {
            return (item.inputs.length == 0 ? '':',') + '_value:number|BigNumber';
        } else {
            return '';
        }
    }

    function returnOutputs(items, addReturn, isEvent, parent, indent) {
        parent = parent || "result";
        indent = indent || 0;
        let lines = []
        if (items.length > 1 || (isEvent)){
            lines.push({indent:indent, text:addReturn?"return {":"{"});
            for (let i = 0; i < items.length; i ++){
                let objPath = parent + (items[i].name ? `.${items[i].name}` : `[${i}]`);
                if (items[i].type == 'tuple') {
                    lines = [...lines,
                            {indent:indent+1, text:items[i].name +':'},
                            ...returnOutputs(items[i].components, false, isEvent, objPath, indent+1)
                            ];
                    if ((addReturn && isEvent) || i < items.length -1)
                        lines[lines.length-1].text+=','
                }
                else if (/^tuple(\[\d*\])+$/.test(items[i].type)){
                    lines = [...lines,
                            {indent:indent+1, text:items[i].name +': ' + `${objPath}`+ items[i].type.match(/(\[\d*\])/g).map((e,i,a)=>i==a.length-1 ? `.map(e=>(` :`.map(a${i}=>a${i}`).join("")},
                            ...returnOutputs(items[i].components, false, isEvent, "e", indent+2),
                            {indent:indent+1, text:items[i].type.match(/(\[\d*\])/g).map((e,i)=>i==0?"))":")").join("")}
                            ];
                    if ((addReturn && isEvent) || i < items.length -1)
                        lines[lines.length-1].text+=','
                }
                else{
                    let line;
                    let objPath = parent + (items[i].name ? `.${items[i].name}` : `[${i}]`);
                    if (outputDataType(items[i]) == 'BigNumber')
                        line = (items[i].name || `param${i + 1}`) + ": " + `new BigNumber(${objPath})`;
                    else if (/^BigNumber(\[\d*\])+$/.test(outputDataType(items[i])))
                        line = (items[i].name || `param${i + 1}`) + ": " + `${objPath}`+ items[i].type.match(/(\[\d*\])/g).map((e,i,a)=>i==a.length-1 ? `.map(e=>` :`.map(a${i}=>a${i}`).join("") + `new BigNumber(e)` + items[i].type.match(/(\[\d*\])/g).map((e,i)=>")").join("");
                    else
                        line = (items[i].name || `param${i + 1}`) + ": " + `${objPath}`;
                    if ((addReturn && isEvent) || i < items.length -1)
                        line += ','
                    lines.push({indent:indent+1, text:line});
                }
            }
            if (addReturn && isEvent)
                lines.push({indent:indent+1, text:"_event: event"});
            lines.push({indent:indent, text:addReturn?"};":"}"});
        }
        else if (items.length == 1){
            if (items[0].type == 'tuple'){
                let objPath = parent + (indent ? (isEvent ? "[0]" : (items[0].name ? `.${items[0].name}` : `[0]`)) : "");
                if (addReturn)
                    lines.push({indent:indent, text: 'return ('});
                else {
                    lines.push({indent:indent, text: "{"});
                    lines.push({indent:indent+1, text: (items[0].name ? `${items[0].name}:` : `[0]:`)});
                }
                lines = [...lines, 
                        ...returnOutputs(items[0].components, false, isEvent, objPath, indent+1)
                        ];
                if (addReturn)
                    lines.push({indent:indent, text: ');'});
                else
                    lines.push({indent:indent, text: '}'});
            }else if (/^tuple(\[\d*\])+$/.test(items[0].type)){
                lines = [
                        {indent:indent, text: (addReturn?"return ":"")+parent+ (items[0].type.match(/(\[\d*\])/g).map((e,i,a)=>i==a.length-1 ? `.map(e=>(` :`.map(a${i}=>a${i}`).join(""))},
                        ...returnOutputs(items[0].components, false, isEvent, "e", indent+1),
                        {indent:indent, text: (items[0].type.match(/(\[\d*\])/g).map((e,i)=>i==0?"))":")").join(""))+(addReturn?";":"")}
                        ];
            } else {
                let objPath = parent + (isEvent ? "[0]" : "");
                if (outputDataType(items[0]) == 'BigNumber')
                    lines.push({indent:indent, text: (addReturn?"return ":"")+`new BigNumber(${objPath})`+(addReturn?";":"")});
                else if (/^BigNumber(\[\d*\])+$/.test(outputDataType(items[0])))
                    lines.push({indent:indent, text: (addReturn?"return ":"")+`${objPath}`+ items[0].type.match(/(\[\d*\])/g).map((e,i,a)=>i==a.length-1 ? `.map(e=>` :`.map(a${i}=>a${i}`).join("") + `new BigNumber(e)` + items[0].type.match(/(\[\d*\])/g).map((e,i)=>")").join("")+(addReturn?";":"")});
                else
                    lines.push({indent:indent, text: (addReturn?"return ":"")+`${objPath}`+(addReturn?";":"")});
            }
        }
        else
            lines.push({indent:indent, text:(addReturn?"return ":"")+'{}'+(addReturn?";":"")});
        return lines;
    }
        // if (item.stateMutability=='payable') {
        //     result += ',value';
        // }
    let functionNames = {};
    function addFunction(item){
        let name = item.name;
        let counter = 1;
        while(functionNames[name]){
            name = name + "_" + counter;
            counter++;
        }
        functionNames[name] = true;
        if (item.inputs.length > 0){
            addLine(1, `async ${name}(${inputs(item)}${payable(item)}): Promise<${outputs(item)}>{
        let result = await this.methods('${item.name}',${inputNames(item)}${item.stateMutability=='payable'?',_value':''});`)
        }
        else{
            addLine(1, `async ${name}(${inputs(item)}${payable(item)}): Promise<${outputs(item)}>{
        let result = await this.methods('${item.name}'${item.stateMutability=='payable'?',_value':''});`)
        }
        if (item.stateMutability == 'view' || item.stateMutability == 'pure') {
            returnOutputs(item.outputs, true).forEach((e,i,a)=>addLine(e.indent+2, e.text));
        }
        else
            addLine(2, 'return result;')
        addLine(1, '}');
    }
    function addEvent(item){
        let eventItems = item.inputs;
        events[item.name] = viewFunctionOutputType(eventItems, true);
        addLine(1, `parse${item.name}Event(receipt: TransactionReceipt): ${name}.${item.name}Event[]{`);
        addLine(2, `return this.parseEvents(receipt, "${item.name}").map(e=>this.decode${item.name}Event(e));`);
        addLine(1, '}');
        addLine(1, `decode${item.name}Event(event: Event): ${name}.${item.name}Event{`);
        // addLine(2, `let events = this.decodeEvent(log, "${item.name}");`);
        // addLine(2, `return events.map(event => {`);
        addLine(2, `let result = event.data;`);
        returnOutputs(eventItems, true, true).forEach((e,i,a)=>addLine(e.indent+2, e.text));
        // addLine(2, '});');
        addLine(1, '}');
    }
    function addConstructor(abi){
        for (let i = 0; i < abi.length; i ++){
            if (abi[i].type == 'constructor'){
                addLine(1, `deploy(${inputs(abi[i])}): Promise<string>{`);
                addLine(2, `return this._deploy(${inputNames(abi[i])});`);
                addLine(1, `}`);
                return;
            }
        };
        addLine(1, `deploy(): Promise<string>{`);
        addLine(2, `return this._deploy();`);
        addLine(1, `}`);
    }
    function addAbi(item){
        switch (item.type){
            case "function":
                addFunction(item);
                break;
            case "event":
                addEvent(item);
                break;
        }
    }
    addLine(0, `import {IWallet, Contract, TransactionReceipt, Utils, BigNumber, Event} from "@ijstech/eth-wallet";`);
    addLine(0, `const Bin = require("${abiPath}/${name}.json");`);
    addLine(0, ``);
    addLine(0, `export class ${name} extends Contract{`);
    addLine(1, `constructor(wallet: IWallet, address?: string){`);
    addLine(2, `super(wallet, address, Bin.abi, Bin.bytecode);`);
    addLine(1, `}`);
    addConstructor(abi);
    for (let i = 0; i < abi.length; i ++){
        addAbi(abi[i]);
    }
    addLine(0, `}`);
    if (Object.keys(events).length) {
        addLine(0, `export module ${name}{`);
        for (let e in events)
            addLine(1, `export interface ${e}Event ${events[e]}`);
        addLine(0, `}`);
    }
    return result.join('\n');
    }
}
