var locales = {};
window.onload = () => {
  $.post(`https://${GetParentResourceName()}/NUILoaded`).then((locale) => {
    locales = JSON.parse(locale);
  });
};
window.addEventListener("message", (event) => {
  let data = event.data;
  switch (data.action) {
    case "SkillCheck":
      setTimeout(() => {
        SkillCheck(data.data);
      }, 500);
      break;
    case "MemorizeGame":
      StartMemorize(data.data);
      break;
    case "CodeGame":
      StartCode(data.data);
      break;
    case "CatchGame":
      StartCatch(data.data);
      break;
    case "BeatGame":
      StartBeat(data.data);
      break;
    case "MathGame":
      StartMath(data.data);
      break;
    case "WordsGame":
      StartWords(data.data, data.words);
      break;
  }
});
function sleep(_0x1225bc) {
  return new Promise((_0x451009) => setTimeout(_0x451009, _0x1225bc));
}
function getRandomInt(_0x7fb5eb, _0x1c6c47) {
  return (
    (_0x7fb5eb = Math.ceil(_0x7fb5eb)),
    (_0x1c6c47 = Math.floor(_0x1c6c47)),
    Math.floor(Math.random() * (_0x1c6c47 - _0x7fb5eb + 1)) + _0x7fb5eb
  );
}
document.onkeydown = (_0x48f7b9) => {
  if (activeSkillCheck) {
    SkillCheckClick(_0x48f7b9);
    return;
  }
  if (activeMemorize && _0x48f7b9.key == "Enter") {
    memorizeConfirm();
    return;
  }
  if (activeCatch) {
    if (_0x48f7b9.key == "ArrowLeft" || _0x48f7b9.key == "ArrowRight") {
      MoveCatchHand(_0x48f7b9.key);
      return;
    }
  }
  if (beatGame.isActive) {
    BeatClick(_0x48f7b9);
    return;
  }
  if (mathGame.isActive) {
    MathSelect(_0x48f7b9);
    return;
  }
};
const FinishGame = (_0x21797e, _0x1cc58c) => {
  $(".loading-fill").stop();
  if (typeof _0x1cc58c == "number" || _0x21797e == "skill-check-wrapper") {
    setTimeout(() => {
      $("." + _0x21797e).fadeOut(250);
      var _0x4fc03c = {
        result: _0x1cc58c,
        element: _0x21797e,
      };
      $.post(
        `https://${GetParentResourceName()}/FinishGame`,
        JSON.stringify(_0x4fc03c)
      );
    }, 250);
  } else {
    $("." + _0x21797e).html(
      '<div class="game-wrapper"><div class="end-game-text"><span>' +
        locales[_0x1cc58c ? "you_won" : "you_lose"] +
        '</span></div></div><div class="loading-bar"><div class="loading-fill"></div></div>'
    );
    $(".loading-fill").css("width", "100%");
    setTimeout(() => {
      $(".loading-fill").animate({ width: "0%" }, 1500, () => {
        setTimeout(() => {
          $("." + _0x21797e).empty();
        }, 250);
        $("." + _0x21797e).fadeOut(250);
        var _0x525210 = {
          result: _0x1cc58c,
          element: _0x21797e,
        };
        $.post(
          `https://${GetParentResourceName()}/FinishGame`,
          JSON.stringify(_0x525210)
        );
      });
    }, 10);
  }
};
