const _0x489388 = {};
_0x489388.isActive = false;
_0x489388.wordsSeen = [];
_0x489388.wordsAmount = 0;
_0x489388.correct = 0;
let wordGame = _0x489388;
var wordsList = [
  "jabłko",
  "samochód",
  "dom",
  "książka",
  "stół",
  "krzesło",
  "kot",
  "pies",
  "okno",
  "drzewo",
  "słońce",
  // "deszcz",
  // "wiatr",
  // "miasto",
  // "rzeka",
  // "góry",
  // "morze",
  // "rower",
  // "telefon",
  // "komputer",
  // "chleb",
  // "ser",
  // "mleko",
  // "woda",
  // "kawa",
  // "herbata",
  // "czekolada",
  // "ciasto",
  // "owoce",
  // "warzywa",
  // "tabela",
  // "kran",
  // "telewizor",
  // "radio",
  // "samolot",
  // "pociąg",
  // "autobus",
  // "tramwaj",
  // "hotel",
  // "restauracja",
  // "szkoła",
  // "przyjaciel",
  // "nauczyciel",
  // "sport",
  // "muzyka",
  // "film",
  // "teatr",
  // "zdjęcie",
  // "paint",
  // "filmik",
  // "park",
  // "plaża",
  // "basen",
  // "las",
  // "podróż",
  // "wakacje",
  // "narty",
  // "rower",
  // "spacer",
  // "gra",
];
const StartWords = async (data) => {
  wordGame.wordsSeen = [];
  wordGame.correct = 0;

  data.wordsAmount = data.wordsAmount || 5;
  data.readyTime = data.readyTime || 3500;
  data.gameTime = data.gameTime || 7500;
  wordGame.wordsAmount = data.wordsAmount;

  $(".words-wrapper").html(
    '<div class="get-ready-wrapper"><span>' +
      locales.get_ready +
      '</span></div><div class="loading-bar"><div class="loading-fill"></div></div>'
  );
  $(".words-wrapper").css("display", "flex");
  $(".words-wrapper .loading-fill").css("width", "100%");
  $(".words-wrapper .loading-fill").animate({ width: "0%" }, data.readyTime);

  await sleep(data.readyTime);

  wordGame.isActive = true;

  $(".words-wrapper").html(
    "\n    <span>" +
      locales.word_instruction +
      '</span>\n    <div class="game-wrapper">\n        <div class="word-wrapper">\n            <span id="words-count">0/' +
      data.wordsAmount +
      '</span>\n            <div class="word-box"></div>\n        </div>\n        <div class="word-buttons">\n            <div class="word-btn" id="word-seen-btn">' +
      locales.word_seen +
      '</div>\n            <div class="word-btn" id="word-new-btn">' +
      locales.word_new +
      '</div>\n        </div>\n    </div>\n    <div class="loading-bar">\n        <div class="loading-fill"></div>\n    </div>'
  );

  $(".words-wrapper .loading-fill").css("width", "100%");
  $(".words-wrapper .loading-fill").animate(
    { width: "0%" },
    data.gameTime,
    () => {
      if (wordGame.isActive) {
        wordGame.isActive = false;
        FinishGame("words-wrapper", false);
      }
    }
  );

  GenerateWord();
};

GenerateWord = () => {
  if (!wordGame.isActive) {
    return;
  }
  let word = wordsList[getRandomInt(0, wordsList.length - 1)];
  $(".word-box").text(word);
  $("#word-seen-btn, #word-new-btn").unbind();
  $("#word-seen-btn").on("click", () => {
    if (wordGame.wordsSeen.includes(word)) {
      wordGame.correct++;
      $("#words-count").text(wordGame.correct + "/" + wordGame.wordsAmount);
      if (wordGame.correct >= wordGame.wordsAmount) {
        $(".words-wrapper .loading-fill").stop();
        wordGame.isActive = false;
        FinishGame("words-wrapper", true);
      } else {
        GenerateWord();
      }
    } else {
      (wordGame.isActive = false), FinishGame("words-wrapper", false);
    }
  });
  $("#word-new-btn").on("click", () => {
    if (!wordGame.wordsSeen.includes(word)) {
      wordGame.wordsSeen.push(word);
      wordGame.correct++;
      $("#words-count").text(wordGame.correct + "/" + wordGame.wordsAmount);
      if (wordGame.correct >= wordGame.wordsAmount) {
        $(".words-wrapper .loading-fill").stop();
        wordGame.isActive = false;
        FinishGame("words-wrapper", true);
      } else {
        GenerateWord();
      }
    } else {
      $(".words-wrapper .loading-fill").stop();
      wordGame.isActive = false;
      FinishGame("words-wrapper", false);
    }
  });
};
