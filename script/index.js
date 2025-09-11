function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}



const createElement = (arr) => {
    //create group of element from the array using map

    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`)  //array er opor map calaile se arekta aarray return kore
    // console.log(htmlElements); //arrayer moddhe 3 ta span tag toiri hoiye gese
    //join kore string e convert korbo
    return (htmlElements.join(" "));

}
const synonyms = ["hello", "hi", "who"];
createElement(synonyms);



// ==Lets learn Vocabulary section==//

//--Load All Level works here--//
//STEP-1: At first Fetching Data From API
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")  //step-1 : it gives a promiss of response
        .then((res) => res.json())  //step-2: promiss for json data
        .then((json) => displayLesson(json.data)); // Level Show korar jonno api er moddhe data property er moddhe array format a ase
};

//STEP-2: Showing Level Dynamically Through API

const displayLesson = (lessons) => //By default its recives a array of object of lessons 
{
    //console.log(lessons);
    //step-1: Get the container
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    //step-2: Get into every container using loop

    for (let lesson of lessons) {
        //step-3:Create Element
        //console.log(lesson); console korle api er moddhe lesson gulo kon obostay ase dekha jbe 
        const btnDiv = document.createElement("div")

        //to add active class on a button for identifiying which button user clicked ,we need to add a "id dynamically" inside button also added a "lesson-btn" class for all to remove active class==//
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `

        //step-4: Append the child into container
        levelContainer.append(btnDiv);
    }





}

//===loadLevelWord() for loading all level Data/word//
const loadLevelWord = (id) => {
    manageSpinner(true);
    //console.log(id); check assign buttons id for individual button
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    //console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then(data => {
            removeActive(); //remove all active class
            const clickBtn = document.getElementById(`lesson-btn-${id}`) // dynamically set korte hobe cz ei function ta recive kortese dynamically using id on this function
            // console.log(clickBtn);
            clickBtn.classList.add("active"); // add active class
            displayLevelWord(data.data)    // array of object exists in data inside API 
            manageSpinner(false);
        }
        );
}


//===display level word

const displayLevelWord = (words) => //This functrion will receive a array of object
{
    //console.log(words) // it will show words in array format

    //step-1: Get the container
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = ""; // it handles when someone click a lesson then previous lesson will be empty or wash

    if (words.length == 0)  //I added this or this work was done by after the completion of wordContainer() work
    {
        wordContainer.innerHTML = `
      <div class="text-center  col-span-full rounded-xl py-10 space-y-6 font-bangla">
        <img class="mx-auto" src="./assets/alert-error.png"/>
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
     `;
        return;
    }
    //step-2: Get into every container using loop
    words.forEach(word => {
        //console.log(word)  it will show all words 

        //step-3:Create Element
        const card = document.createElement("div");
        card.innerHTML = `
       <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
    <h2 class="font-bold text-2xl">${word.word ? word.word : "word Not Found"}</h2>
    <p class="font-semibold">Meaning /Pronounciation</p>
    <p class="font-medium font-bangla">${word.meaning ? word.meaning : "Meaning Not Found"} / ${word.pronunciation ? word.pronunciation : "Pronunciation Not Found"}</p>
    
    <div class="flex justify-between items-center mt-6">
        <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
        </button>
        <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
        </button>
    </div>
</div>
`

        //step-4: Append the child into container
        wordContainer.append(card);
    }
    )



}

// Hightlight Active button & remove Active class function 
//added removeActive() in upward function

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");

    lessonButtons.forEach(btn => btn.classList.remove("active"))

}


// const removeActive = () => {
//     const lessonButtons = document.querySelectorAll("#level-container button");
//     for(let i = 0; i < lessonButtons.length; i++) {
//         lessonButtons[i].classList.remove("active");
//     }
// }


//================loadWordDetail() MODAL=======//
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}


const displayWordDetails = (word) =>  // this function returns a object . we can see in concole inside data
{
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    

 <div class="">
            <h2 class="text-2xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i>    :${word.pronunciation})</h2>
        </div>

         <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
        </div>

        <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
        </div>

        <div class="">
            <h2 class="font-bold">Synonyms</h2>
           <div class=" ">${createElement(word.synonyms)}</div>
        </div>

    
    `
    document.getElementById("word_modal").showModal();
}


//============manageSpinner()===========//
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}


//====================//
loadLessons();


//search button//

document.getElementById("btn-search").addEventListener("click",()=>{
    removeActive();
    const input=document.getElementById("input-search");
    // const searchValue=input.value;
    const searchValue=input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res=>res.json())
    .then(data=>{;

        const allWords=data.data;
        console.log(allWords);
        const filterWords=allWords.filter(word=>word.word.toLowerCase().includes(searchValue)
    );
    //console.log(filterWords);
    displayLevelWord(filterWords);
    });
})