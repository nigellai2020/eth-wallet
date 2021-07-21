module Utils {
    export function sleep(millisecond: number){
        return new Promise(function(resolve){
            setTimeout(function(){
                resolve(null);
            },millisecond);
        });
    };
};
export = Utils;