const loadLessons = () => (


    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
        .then((res) => res.json())// promise of json data
        .then((json) => displayLesson(json.data)) // display class used


);

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");

    // console.log(lessonButtons);
    lessonButtons.forEach(btn => btn.classList.remove("active"))
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();// removve all active class
            const clickBtn = document.getElementById
                (`lesson-btn-${id}`);

            clickBtn.classList.add("active");
            displayLevelWord(data.data);
        });
};
const loadWordDetall = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const datails = await res.json();
    displayWordDetails(datails.data);

};

const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
              <div class="">
                    <h2 class="text-2xl font-bold">${word.word} 
                    (  <i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation}</h2>
                    <div class="">
                    <h2 class="font-bold">Meanning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>

                <div class="">
                    <h2 class="font-bold">synonym</h2>
                    <span class="btn">Syn1</span>
                    <span class="btn">Syn1</span>
                    <span class="btn">Syn1</span>
                </div>
                   </div>
           
    `;
    document.getElementById("word_modal").showModal();
};
const displayLevelWord = (words) => {
    const wordcontainer = document.getElementById("word-container")
    wordcontainer.innerHTML = `
    `;

    if (words.length == 0) {
        wordcontainer.innerHTML = `
                <div class="text-center col-span-full rounded-xl py-10 font-bangla  bg-sky-400">
                <img class="mx-auto" src="./assets/alert-error.png">
            <p class="text-xl font-medium text-gray-400 space-y-6">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
        
        `;
        return;
    }
    //     {
    //     "id": 63,
    //     "level": 3,
    //     "word": "Meager",
    //     "meaning": "অত্যল্প / নগণ্য",
    //     "pronunciation": "মীগার"
    // }

    words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
       <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায় না"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-medium text-2xl font-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation  পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetall(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10]  hover:bg-[#1A91FF80]"><i
                        class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordcontainer.append(card);
    });
};

const displayLesson = (lessons) => { /// display data

    //    1 get the container & ampty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    //    2 get into evrru lessons
    for (let lesson of lessons) {
        //    3 create Element
        console.log(lessons)

        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
       <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
       <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
       </button>

    `;
        //    4 append into container
        levelContainer.append(btnDiv)
    }


};


loadLessons(); // function call 




