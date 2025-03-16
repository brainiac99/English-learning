let lessons = document.querySelector(".lessons");
let wordList = document.querySelector(".wordlist");
let lessonsArr;
let temp = "";

try {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      lessonsArr = data.data;
      console.log(lessonsArr);
      updateButtons();
    });
} catch (error) {
  console.error("There was an error!", error);
}

function updateButtons() {
  lessonsArr.forEach((e) => {
    temp =
      temp +
      `<button id="${e.id}" level=${e.level_no} class="btn btn-outline btn-primary mr-2">
              <i class="fa-solid fa-book-open" style="color: #4400ff"></i>Lesson-${e.level_no}
            </button>`;
  });
  lessons.innerHTML = temp;
  let buttons = lessons.querySelectorAll("button");
  let level;
  console.log(buttons);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((e) => {
        e.classList.remove("btn-active");
        e.classList.add("btn-outine");
      });
      button.classList.add("btn-active");
      level = button.attributes.level.value;
      getWords(level);
    });
  });
}

function getWords(id) {
  try {
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let temp = "";
        let wordsArr = data.data;
        console.log(wordsArr);
        if (wordsArr.length === 0) {
          wordList.classList.remove("grid-cols-3");
          temp = `<div class="flex flex-col items-center justify-center gap-2">
          <img src="./assets/alert-error.png" alt="alert error" />
          <p class="text-xs text-gray-500">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <p class="text-md">নেক্সট Lesson এ যান</p>
        </div>`;
        } else {
          wordList.classList.add("grid-cols-3");
          for (let i = 0; i < 6; i++) {
            temp =
              temp +
              ` <div class="bg-white rounded text-center px-4 py-8">
          <div class="mb-8">
            <p class="mb-2">${wordsArr[i].word}</p>
            <p class="text-sm mb-2">Meaning/Pronunciation</p>
            <p class="text-slate-500">"${wordsArr[i].meaning}/${wordsArr[i].pronunciation}"</p>
          </div>
          <div class="flex justify-between px-12">
            <button
              class="bg-gray-200 rounded px-2 py-1"
              onclick="my_modal_${wordsArr[i].id}.showModal()"
            >
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <dialog id="my_modal_${wordsArr[i].id}" class="modal">
              <div class="modal-box text-left">
                <h2>Eager</h2>
                <p>meaning</p>
                <p>meaning</p>
                <p>Example</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis, explicabo.
                </p>
                <p>similar</p>
                <p class="bg-blue-100 rounded px-2 py-1 text-sm w-max">
                  egdajf
                </p>
                <div class="modal-action">
                  <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
            <button class="bg-gray-200 rounded px-2 py-1">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>`;
          }
        }
        wordList.innerHTML = temp;
      });
  } catch (error) {
    console.error("There was an error!", error);
  }
}
