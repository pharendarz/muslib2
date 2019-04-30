

// ARRAY : remove duplicates by value
export const uniqueAlbums = (arrayWithDuplicates) => [...new Set(arrayWithDuplicates)]; 


export const removeDuplicatesByProperty =(myArr, prop) => {
    //[TODO - LEARN BELOW]
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

// test if something is undefined if no key in object
export const testUndefined = (t, field) => {
    if (t === undefined) {       
        //   console.log(`err undefined - field : ${field}`, t) ;     //call t
    }
    return t;    
}