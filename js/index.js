// export const str = `The Tao gave birth to machine language.  Machine language gave birth
// to the assembler.
// The assembler gave birth to the compiler.  Now there are ten thousand
// languages.
// Each language has its purpose, however humble.  Each language
// expresses the Yin and Yang of software.  Each language has its place within
// the Tao.
// But do not program in COBOL if you can avoid it.
// -- Geoffrey James, "The Tao of Programming"`;

// const str = `C makes it easy for you to shoot yourself in the foot. C++ makes that harder, but when you do, it blows away your whole leg. (с) Bjarne Stroustrup`;

const form = document.querySelector(".form");
const resetBtn = document.querySelector('[type="reset"]');
const timerTextEl = document.querySelector(".timer__text");
const timerValueEl = document.querySelector(".timer__value");

let timeoutId = null;

form.addEventListener("submit", handleSubmit);
resetBtn.addEventListener("click", handleReset);

// Аналіз введеного тексту після сабміту
export function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { text },
  } = event.currentTarget;

  if (text.value === "") {
    return alert("Please fill in all the fields!");
  }

  // console.log(`Text: ${text.value}`);
  // console.log(findFirstUniqueLetter(text.value));
  timerTextEl.innerHTML = "Let me guess...";

  // Виводимо результат на екран
  timeoutId = setTimeout(() => {
    timerTextEl.innerHTML = "Am I right?";
    timerValueEl.textContent = findFirstUniqueLetter(text.value);
  }, 750);

  return findFirstUniqueLetter(text.value);
}

function handleReset() {
  form.reset();
  timerTextEl.innerHTML = "";
  timerValueEl.textContent = "";
}

// Функція для пошуку першої унікальної букви
const findFirstUniqueLetter = (str) => {
  //Прибираємо зайві символи і збираємо результат в масив
  // Залишаємо \w [a-zA-Z0-9_]
  const wordsArr = str.replace(/\W/g, " ").toLowerCase().trim().split(" ");
  // Залишаємо тільки латинські літери [a-zA-Z]
  // const wordsArr = str
  //   .replace(/[^a-z]/gi, " ")
  //   .toLowerCase()
  //   .trim()
  //   .split(" ");
  // Враховуємо кириличні символи
  // const wordsArr = str
  //   .replace(/[^a-zа-я]/gi, " ")
  //   .toLowerCase()
  //   .trim()
  //   .split(" ");
  // Використовуємо багатомовний аналог \w
  // const wordsArr = str
  //   .replace(/[^\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/giu, " ")
  //   .toLowerCase()
  //   .trim()
  //   .split(" ");

  // Прибираємо з нього пусті рядки, отримаємо кінцевий масив слів
  const newWordsArr = wordsArr.filter((word) => word !== "");

  // Прибираємо повтори, залишаємо лише унікальні слова
  const uniqueWords = new Set(newWordsArr);

  // Шукаємо першу унікальну літеру в кожному слові, додаємо в масив літер
  const lettersArr = [];
  let lettersInEachWordArr = [];
  for (const word of uniqueWords) {
    lettersInEachWordArr = word
      .split("")
      .filter((letter, index, array) => array.indexOf(letter) === index);
    lettersArr.push(lettersInEachWordArr[0]);
  }

  // Шукаємо першу унікальну літеру в масиві літер
  const uniqueLettersArr = lettersArr.filter(
    (el, i, arr) => arr.indexOf(el) === arr.lastIndexOf(el)
  );
  // console.log(uniqueLettersArr[0]);

  return uniqueLettersArr[0];
};
