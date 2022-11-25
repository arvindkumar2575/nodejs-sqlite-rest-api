const isNull = (s)=>{
    return s!=null
}

const isUndefinedNullEmpty = (s)=>{
    return s!=undefined && s!=null && s!=''
}

module.exports = {isNull,isUndefinedNullEmpty}