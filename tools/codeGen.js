module.exports = function(name, abiPath, abi){
    let result = [];
    function addLine(indent, code){
        if (indent)
            result.push(`    `.repeat(indent) + code)
        else
            result.push(code);
    }
    function dataType(item){        
        if (item.type == 'address' || item.type == 'string')
            return 'string'
        else if (item.type == 'address[]' || item.type == 'string[]')
            return 'string[]'
        else if (item.type == 'bool')
            return 'boolean'
        else if (item.type == 'bool[]')
            return 'boolean[]'
        else if (item.type.indexOf('bytes') == 0 && item.type.indexOf('[]') > 0)
            return 'string[]'
        else if (item.type.indexOf('bytes') == 0)
            return 'string'
        else if (item.type.indexOf('uint') == 0 && item.type.indexOf('[]') > 0)
            return 'number[]|BigNumber[]'
        else if (item.type.indexOf('uint') == 0)
            return 'number|BigNumber'
        else
            return 'any'
    }
    function paramName(name, idx){
        if (name)
            return name.replace(/_/g,'')
        else
            return 'param' + (idx + 1)
    }    
    function outputDataType(type){
        if (type == 'address' || type == 'string')
            return 'string'
        else if (type == 'bool')
            return 'boolean'
        else if (type.indexOf('bytes') == 0)
            return 'string'
        else if (type.indexOf('uint') == 0)
            return 'BigNumber'
        else
            return 'any'
    }
    function outputs(item){
        if (item.outputs.length > 1){
            if (item.outputs[0].name){
                let result = '{';
                for (let i = 0; i < item.outputs.length; i ++){
                    if (i > 0)
                        result +=','
                    result += item.outputs[i].name + ':' + outputDataType(item.outputs[i].type);
                }
                result += '}'
                return result;
            }
            else{
                let result = '[';
                for (let i = 0; i < item.outputs.length; i ++){
                    if (i > 0)
                        result +=','
                    result += outputDataType(item.outputs[i].type);
                }
                result += ']'
                return result;
            }
        }
        else if (item.outputs.length == 1){            
            return outputDataType(item.outputs[0].type)
        }
        else if (item.stateMutability != 'view'){
            return 'TransactionReceipt'
        }
        else
            return 'any';
    }
    function inputs(item){
        if (item.inputs.length == 0)
            return ''
        else if (item.inputs.length == 1){
            return `${paramName(item.inputs[0].name,0)}:${dataType(item.inputs[0])}`
        }
        else{
            let result = 'params:{';
            if (item.inputs){
                for (let i = 0; i < item.inputs.length; i ++){
                    if (i > 0)
                        result += ',';
                    result += `${paramName(item.inputs[i].name,i)}:${dataType(item.inputs[i])}`
                }
            }     
            return result+'}';   
        }
    }
    function inputNames(item){
        let result = '';
        if (item.inputs.length == 1){
            return `${paramName(item.inputs[0].name,0)}`
        }
        else{
            for (let i = 0; i < item.inputs.length; i ++){
                if (i > 0)
                    result += ',';
                if (item.inputs[i].type.indexOf('uint') == 0)
                    result += `Utils.toString(params.${paramName(item.inputs[i].name,i)})`
                else if (item.inputs[i].type.indexOf('bytes32') == 0)
                    result += `Utils.stringToBytes32(params.${paramName(item.inputs[i].name,i)})`
                else
                    result += `params.${paramName(item.inputs[i].name,i)}`
            }
        }     
        return result;   
    }
    function addFunction(item){
        if (item.inputs.length > 0){
            addLine(1, `async ${item.name}(${inputs(item)}): Promise<${outputs(item)}>{
        let result = await this.methods('${item.name}',${inputNames(item)});`)
        }
        else{
            addLine(1, `async ${item.name}(${inputs(item)}): Promise<${outputs(item)}>{
        let result = await this.methods('${item.name}');`)
        };
        if (item.outputs.length > 1){
            if (item.outputs[0].name){
                addLine(2, 'return {');
                for (let i = 0; i < item.outputs.length; i ++){
                    let line;
                    if (outputDataType(item.outputs[i].type) == 'BigNumber')
                        line = `${item.outputs[i].name}: new BigNumber(result.${item.outputs[i].name})`                    
                    else
                        line = `${item.outputs[i].name}: result.${item.outputs[i].name}`
                    if (i < item.outputs.length -1)
                        line += ','
                    addLine(3, line);
                }
                addLine(2, '}');
            }
            else{
                addLine(2, 'return [');
                for (let i = 0; i < item.outputs.length; i ++){
                    let line;
                    if (outputDataType(item.outputs[i].type) == 'BigNumber')
                        line = `new BigNumber(result[${i}])`                    
                    else
                        line = `result[${i}]`
                    if (i < item.outputs.length -1)
                        line += ','
                    addLine(3, line);
                }
                addLine(2, ']');
            }
        }
        else if (item.outputs.length == 1){
            if (outputDataType(item.outputs[0].type) == 'BigNumber')
                addLine(2, 'return new BigNumber(result);')                
            else
                addLine(2, 'return result;')
        }
        else
            addLine(2, 'return result;')
        addLine(1, '}');
    }
    function addConstructor(abi){
        for (let i = 0; i < abi.length; i ++){
            if (abi[i].type == 'constructor'){
                return addLine(1, `deploy(${inputs(abi[i])}): Promise<string>{        	
        return this._deploy(${inputNames(abi[i])});
    }`);   
            }
        }; 
        addLine(1, `deploy(): Promise<string>{        	
        return this._deploy();
    }`);       
    }
    function addAbi(item){
        switch (item.type){
            case "function":
                addFunction(item);
                break;
        }
    }
    addLine(0, `import {Wallet, Contract, TransactionReceipt, Utils, BigNumber} from "@ijstech/eth-wallet";`);
    addLine(0, `const Bin = require("${abiPath}/${name}.json");`);
    addLine(0, ``);
    addLine(0, `export class ${name} extends Contract{`);    
    addLine(1, `constructor(wallet: Wallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
    }`)
    addConstructor(abi);
    for (let i = 0; i < abi.length; i ++){
        addAbi(abi[i]);
    }
    addLine(0, `}`);
    return result.join('\n');
}
