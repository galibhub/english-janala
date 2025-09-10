const createElement=(arr)=>{
    //create group of element from the array using map

    const htmlElements=arr.map(el=>`<span class="btn">${el}</span>`)  //array er opor map calaile se arekta aarray return kore
    // console.log(htmlElements); //arrayer moddhe 3 ta span tag toiri hoiye gese
    //join kore string e convert korbo
    console.log(htmlElements.join(" "));


}








const synonyms=["hello","hi","who"];
createElement(synonyms);