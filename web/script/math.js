const _0x6fbe08 = {};
_0x6fbe08.isActive = false;
_0x6fbe08.usedQuestions = [];
_0x6fbe08.questionsAmount = 0;
_0x6fbe08.maxFails = 3;
_0x6fbe08.correct = 0;
_0x6fbe08.failed = 0;
_0x6fbe08.breakLoop = false;
var mathGame = _0x6fbe08,
  mathTimeouts = [];
const StartMath = async (_0xeab476) => {
    _0xeab476.questionsAmount = _0xeab476.questionsAmount || 10;
    mathGame.preset = _0xeab476.preset || "easy";
    mathGame.maxFails = _0xeab476.maxFails;
    mathGame.failed = 0;
    mathGame.correct = 0;
    mathGame.questionsAmount = _0xeab476.questionsAmount;
    _0xeab476.readyTime = _0xeab476.readyTime || 2000;
    $(".math-wrapper").html(
      '<div class="get-ready-wrapper"><span>' +
        locales.get_ready +
        '</span></div><div class="loading-bar"><div class="loading-fill"></div></div>'
    );
    $(".math-wrapper").css("display", "flex");
    $(".math-wrapper .loading-fill").css("width", "100%");
    $(".math-wrapper .loading-fill").animate(
      { width: "0%" },
      _0xeab476.readyTime
    );
    await sleep(_0xeab476.readyTime);
    mathTimeouts = [];
    mathGame.breakLoop = false;
    mathGame.isActive = true;
    $(".math-wrapper").html(
      "\n    <span>" +
        locales.math_instruction +
        ' <font><i class="fa-solid fa-arrow-left"></i> / <i class="fa-solid fa-arrow-right"></i></font></span>\n    <div class="game-wrapper"></div>'
    );
    for (
      let _0x428875 = 0;
      _0x428875 < _0xeab476.questionsAmount;
      _0x428875++
    ) {
      if (mathGame.breakLoop || !mathGame.isActive) {
        mathTimeouts.forEach((_0x530b65) => {
          clearTimeout(_0x530b65);
        });
        break;
      }
      await sleep(getRandomInt(1000, 2000));
      if (mathGame.breakLoop || !mathGame.isActive) {
        mathTimeouts.forEach((_0x529afc) => {
          clearTimeout(_0x529afc);
        });
        break;
      }
      let _0x457e4c = getRandomInt(
        0,
        mathQuestions[mathGame.preset].length - 1
      );
      do {
        _0x457e4c = getRandomInt(0, mathQuestions[mathGame.preset].length - 1);
      } while (mathGame.usedQuestions.includes(_0x457e4c));
      let _0x124680 = mathQuestions[mathGame.preset][_0x457e4c],
        _0x1647a0 = getRandomInt(0, 1),
        _0x3e807d = $(
          '\n        <div class="math-task-wrapper not-answered">\n            <div class="math-answer left-answer" data-correct="' +
            _0x124680.answers[_0x1647a0].correct +
            '">' +
            _0x124680.answers[_0x1647a0].text +
            '</div>\n            <div class="math-question">' +
            _0x124680.question +
            '</div>\n            <div class="math-answer right-answer" data-correct="' +
            _0x124680.answers[_0x1647a0 == 0 ? 1 : 0].correct +
            '">' +
            _0x124680.answers[_0x1647a0 == 0 ? 1 : 0].text +
            "</div>\n        </div>"
        );
      $(".math-wrapper .game-wrapper").prepend(_0x3e807d);
      let _0x8b3314 = setTimeout(() => {
        const _0x57ccc6 = { top: "110%" };
        _0x3e807d.animate(
          _0x57ccc6,
          _0xeab476.fallTime || 5000,
          "linear",
          () => {
            if (mathGame.isActive && !mathGame.breakLoop) {
              if (
                _0x428875 == mathGame.questionsAmount - 1 &&
                mathGame.failed + mathGame.correct >= mathGame.questionsAmount
              ) {
                mathGame.isActive = false;
                mathGame.breakLoop = true;
                FinishGame("math-wrapper", true);
                return;
              }
              if (!_0x3e807d.hasClass("answered")) {
                _0x3e807d.remove();
                mathGame.failed++;
                let _0x296973 = new Audio("./sounds/catch_bad.mp3");
                _0x296973.play();
                if (mathGame.failed >= mathGame.maxFails) {
                  mathGame.breakLoop = true;
                  mathGame.isActive = false;
                  FinishGame("math-wrapper", false);
                  return;
                }
              }
            }
          }
        );
      }, 100);
      mathTimeouts.push(_0x8b3314);
    }
  },
  MathSelect = (_0x3ae8db) => {
    let _0x5b8544 =
      _0x3ae8db.key == "ArrowLeft"
        ? "left"
        : _0x3ae8db.key == "ArrowRight"
        ? "right"
        : null;
    if (!_0x5b8544) {
      return;
    }
    let _0x28a75a = getLastAnswer();
    if (_0x28a75a.length > 0 && !_0x28a75a.hasClass("answered")) {
      let _0x50e2cf = $(_0x28a75a).children("." + _0x5b8544 + "-answer"),
        _0x2bf781 = _0x50e2cf.attr("data-correct");
      if (_0x2bf781 == 1) {
        mathGame.correct++;
        _0x50e2cf.addClass("good");
        let _0x4ba9b5 = new Audio("./sounds/catch_good.mp3");
        _0x4ba9b5.play();
      } else {
        mathGame.failed++;
        _0x50e2cf.addClass("wrong");
        let _0xc9c316 = new Audio("./sounds/catch_bad.mp3");
        _0xc9c316.play();
        if (mathGame.failed >= mathGame.maxFails) {
          mathGame.breakLoop = true;
          mathGame.isActive = false;
          FinishGame("math-wrapper", false);
          return;
        }
      }
      _0x28a75a.removeClass("not-answered");
      _0x28a75a.addClass("answered");
    }
  },
  getLastAnswer = () => {
    var _0x3c6b9a = $(".not-answered").filter(function () {
      return $(this).is(".not-answered");
    });
    return _0x3c6b9a.last();
  };
