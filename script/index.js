const createElement = (arr) => {
    //create group of element from the array using map

    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`)  //array er opor map calaile se arekta aarray return kore
    // console.log(htmlElements); //arrayer moddhe 3 ta span tag toiri hoiye gese
    //join kore string e convert korbo
    return htmlElements.join(" ");


}



//======================================================================================//
// সঠিক manageSpinner ফাংশন
const manageSpinner = (status = true) => {  // পরামিটার নাম ঠিক করুন + ডিফল্ট ভ্যালু দিন
    if (status === true) {                  // '===' ব্যবহার করুন
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

//Showing All Levels using API in "Let's Learn Vocabulary Section"
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // step-1: Gives a promiss of response
        .then((res) => res.json())  //step-2: promiss fo json data
        .then((json) => displayLesson(json.data));
}

const displayLesson = (lessons) => {





    const levelContainer = document.getElementById("level-container"); // step-1: Get the container And Empty
    levelContainer.innerHTML = "";

    for (let lesson of lessons) //step-2:Get into Every Lesson using loop
    {
        const btnDiv = document.createElement("div");  //step-3:Create Element
        //added "lesson-btn" a common class to remove active property that works all the buttton at same time
        btnDiv.innerHTML = `

     <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
    
 
    `
        levelContainer.append(btnDiv);    //step-4:append() into Container

    }

}
loadLessons();
//==========================================================================================//

//Load content Dynamically//

const displayLevelWord = (words) => {
    // step-1: Get the container And Empty
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center    col-span-full rounded-xl py-10 space-y-6 font-bangla">  
          <img class="mx-auto" src="./assets/alert-error.png"/>
            <p class="text-xl font-medium text-gray-400" >এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান </h2>
        </div>
       
       `
       manageSpinner(false);
        return;
    }

    //step-2:Get into Every Lesson using loop

    words.forEach(word => {
        console.log(word);

        const card = document.createElement("div");  //step-3:Create Element

        //         "id":82,
        //         "level":1,
        //          "word":"Car",
        //         "meaning":"Gari"
        //         "pronunciation":"kar"

        //for daynamic replace using ${} properties
        card.innerHTML = `
           <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "Word Not Found"}</h2>  
            <p class="font-medium font-bangla">"${word.meaning ? word.meaning : "Word Not Found"}  / ${word.pronunciation ? word.pronunciation : "Word Not Found"}"</p>
          
            <div class="text-2xl font-semibold">"${word.meaning ? word.meaning : "Word Not Found"}"</div>

            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div> 


`
        wordContainer.append(card);   //step-4:append() into Container



    });

manageSpinner(false);
}
//step-1:  new method of fetching  for load data from API

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

// word{

// id: 5
//  level: 1
//  meaning: "আগ্রহী"
//  partsOfSpeech: "adjective"
//  points: 1
//  pronunciation: "ইগার"
//  sentence: "The kids were eager to open their gifts."
//  synonyms: (3) ['enthusiastic', 'excited', 'keen']
//  word: "Eager"
// }



//step-2: display word details

const displayWordDetails = (word) => {
    console.log(word);

    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
     <div>
                <h2 class="text-2xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i>    :${word.pronunciation})</h2>
            </div>

             <div>
                <h2 class="font-bold">${word.meaning}</h2>
                <p>আগ্রহী</p>
            </div>

             <div>
                <h2 class="font-bold">Example</h2>
                <p>${word.sentence}</p>
            </div>
            <div>
                <h2 class="font-bold">Synonym</h2>
               <div class="">${createElement(word.synonyms)} </div>
            </div>
    
    `
    document.getElementById("word_modal").showModal();
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");  //it can achive using for loop
    lessonButtons.forEach(btn => btn.classList.remove("active"));
}


const loadLevelWord = (id) => {
      manageSpinner();
    const url = `https://openapi.programming-hero.com/api/level/${id}`  //for dynamic
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive(); //remove all active class
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            //console.log(clickBtn);
            clickBtn.classList.add("active"); //add active class
            displayLevelWord(data.data)      //need array  and in console we can see data 
        });
}

