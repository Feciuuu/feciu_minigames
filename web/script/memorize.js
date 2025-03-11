let usedIcons = {},
  memorizePattern = [];
let activeAnswer = 0,
  iconsById = {},
  activeMemorize = false;
const _0xb05df8 = {};
_0xb05df8.iconAmount = 0;
_0xb05df8.iconCorrect = 0;
_0xb05df8.gameData = null;
let memorizeGame = _0xb05df8;

const CreateMemorizePattern = (_0x37f439) => {
  for (let _0x35b33d = 0; _0x35b33d < _0x37f439; _0x35b33d++) {
    memorizePattern.push(_0x35b33d);
  }
  for (let _0x322947 = memorizePattern.length - 1; _0x322947 > 0; _0x322947--) {
    const _0x2c05e9 = Math.floor(Math.random() * (_0x322947 + 1));
    [memorizePattern[_0x322947], memorizePattern[_0x2c05e9]] = [
      memorizePattern[_0x2c05e9],
      memorizePattern[_0x322947],
    ];
  }
};
async function StartMemorize(_0x82ad97) {
  memorizeGame.iconAmount = 0;
  memorizeGame.iconCorrect = 0;
  memorizeGame.gameData = _0x82ad97;
  _0x82ad97.readyTime = _0x82ad97.readyTime || 2000;
  _0x82ad97.amount = _0x82ad97.amount || 3;
  _0x82ad97.rememberTime = _0x82ad97.rememberTime || 3500;
  $(".memorize-wrapper").html(
    '<div class="get-ready-wrapper"><span>' +
      locales.get_ready +
      '</span></div><div class="loading-bar"><div class="loading-fill"></div></div>'
  );
  $(".memorize-wrapper").css("display", "flex");
  await sleep(100);
  $(".loading-fill").css("width", "100%");
  $(".loading-fill").animate({ width: "0%" }, _0x82ad97.readyTime || 2500);
  await sleep(_0x82ad97.readyTime || 2500);
  $(".memorize-wrapper").html(
    '\n        <div class="game-wrapper">\n            <span>' +
      locales.memorize_instruction +
      '</span>\n            <div class="memorize-icons"></div>\n        </div>\n        <div class="loading-bar"><div class="loading-fill"></div></div>'
  );
  let _0x5ad9cd = _0x82ad97 && _0x82ad97.amount ? _0x82ad97.amount : 4;
  memorizeGame.iconAmount = _0x82ad97.amount;
  for (let _0x58bf2f = 0; _0x58bf2f < _0x5ad9cd; _0x58bf2f++) {
    let _0x48ef2c =
      memorizeIcons[Math.floor(Math.random() * memorizeIcons.length)];
    if (usedIcons[_0x48ef2c]) {
      while (usedIcons[_0x48ef2c]) {
        await sleep(1);
        _0x48ef2c =
          memorizeIcons[Math.floor(Math.random() * memorizeIcons.length)];
      }
    }
    let _0x1d3c05 =
        randomColors[Math.floor(Math.random() * randomColors.length)],
      _0x31262e = $(
        '<i style="color: ' + _0x1d3c05 + '" class="' + _0x48ef2c + '"></i>'
      );
    $(".memorize-icons").append(_0x31262e);
    usedIcons[_0x48ef2c] = _0x1d3c05;
    iconsById[_0x58bf2f] = _0x48ef2c;
  }
  CreateMemorizePattern(_0x5ad9cd);
  setTimeout(() => {
    $(".loading-fill").css("width", "100%");
    $(".loading-fill").animate({ width: "0%" }, _0x82ad97.rememberTime, () => {
      MemorizeIcon(_0x82ad97);
    });
  }, 500);
}
function MemorizeIcon(_0x509976) {
  _0x509976.answerTime = _0x509976.answerTime || 5000;
  let _0x3ae6fb = iconsById[memorizePattern[activeAnswer]];
  $(".memorize-wrapper").empty();
  $(".memorize-wrapper").html(
    '\n    <div class="game-wrapper" id="memorize-answer">\n        <span>' +
      locales.memorize_instruction_2 +
      '</span>\n        <div class="memorize-icons">\n            <i style="color: #fff" data-color="' +
      usedIcons[_0x3ae6fb] +
      '" class="' +
      _0x3ae6fb +
      '"></i>\n        </div>\n        <input id="memorize-input" type="text" placeholder="' +
      locales.memorize_placeholder +
      '">\n    </div>\n    <div class="loading-bar">\n        <div class="loading-fill"></div>\n    </div>'
  );
  $("#memorize-input").show();
  activeMemorize = true;
  $(".loading-fill").css("width", "100%");
  $(".loading-fill").animate({ width: "0%" }, _0x509976.answerTime, () => {
    FinishGame("memorize-wrapper", false);
  });
}
const memorizeConfirm = () => {
  let _0x45b9e2 = memorizeColors[$("#memorize-input").val().toLowerCase()];
  if (!_0x45b9e2) {
    FinishGame("memorize-wrapper", false);
    return;
  }
  let _0x411bcb = $(".memorize-icons > i").attr("data-color");
  if (_0x411bcb == _0x45b9e2) {
    memorizeGame.iconCorrect++;
    if (memorizeGame.iconCorrect >= memorizeGame.iconAmount) {
      FinishGame("memorize-wrapper", true);
    } else {
      activeAnswer++;
      activeMemorize = false;
      $(".memorize-icons > i").css("color", _0x411bcb);
      $(".loading-fill").stop();
      $("#memorize-input").fadeOut(250);
      setTimeout(() => {
        MemorizeIcon(memorizeGame.gameData);
      }, 1000);
    }
  } else {
    FinishGame("memorize-wrapper", false);
  }
};
