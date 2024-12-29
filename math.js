// THIS IS DEFAULT EXPORT

function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}

// module.exports = {
//     add,
//     sub
// };

// can be named too.
module.exports = {
    FnAdd: add,
    FnSub: sub
};

//if i write module.export 2 times for 2 different functions.
//previous function will be overriden, thats y we need to use objects. 
