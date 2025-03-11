const obj = {};
obj.correctCode = "356755";
let codeGame = obj;
function StartCode(cfg) {
  $(".code-wrapper").html(
    "\n    <span>" +
      locales.code_instruction +
      '</span>\n    <div class="select-code-wrapper"></div>\n    <div class="loading-bar">\n        <div class="loading-fill"></div>\n    </div>'
  );
  codeGame.correctCode = cfg.correctCode;
  $(".select-code-wrapper").empty();
  for (
    let _0x44a2cd = 0;
    _0x44a2cd < codeGame.correctCode.length;
    _0x44a2cd++
  ) {
    $(".select-code-wrapper").append(
      '\n        <div class="select-code-box">\n            <i class="fa-regular fa-chevron-up"></i>\n            <div class="code-input">0</div>\n            <i class="fa-regular fa-chevron-down"></i>\n        </div>'
    );
  }
  const _0x54edb4 = document.querySelectorAll(".select-code-box .code-input");
  let _0x18f500 = 0;
  _0x54edb4.forEach((_0xd4806) => {
    $(_0xd4806).attr("data-index", _0x18f500);
    _0x18f500++;
  });
  const _0x4b5b1d = document.querySelectorAll(".select-code-box i");
  _0x4b5b1d.forEach((_0xe77919, _0x3e7e6f) => {
    $(_0xe77919).on("click", () => {
      let _0x46d7b0 = $(_0xe77919).hasClass("fa-chevron-up") ? "up" : "down",
        _0xafde44 = $(_0xe77919).siblings(".code-input"),
        _0x4d5ae8 = parseInt($(_0xafde44).text());
      _0x4d5ae8 =
        _0x46d7b0 == "up"
          ? _0x4d5ae8 >= 9
            ? 0
            : _0x4d5ae8 + 1
          : _0x46d7b0 == "down"
          ? _0x4d5ae8 < 1
            ? 9
            : _0x4d5ae8 - 1
          : 0;
      let _0x2178f5 = codeGame.correctCode.charAt(_0xafde44.attr("data-index"));
      if (_0x2178f5 == _0x4d5ae8.toString()) {
        _0xafde44.removeClass("close-code");
        _0xafde44.addClass("good-code");
      } else {
        let _0x1ab111 = false;
        for (
          let _0x7f927c = 0;
          _0x7f927c < codeGame.correctCode.length;
          _0x7f927c++
        ) {
          let _0xbbc293 = codeGame.correctCode.charAt(_0x7f927c);
          _0xbbc293 == _0x4d5ae8.toString() &&
            (_0xafde44.removeClass("good-code"),
            _0xafde44.addClass("close-code"),
            (_0x1ab111 = true));
        }
        if (!_0x1ab111) {
          _0xafde44.removeClass("good-code");
          _0xafde44.removeClass("close-code");
        }
      }
      $(_0xafde44).text(_0x4d5ae8);
      canFinishCode() && FinishGame("code-wrapper", true);
    });
  });
  $(".code-wrapper").css("display", "flex");
  setTimeout(() => {
    $(".code-wrapper .loading-fill").css("width", "100%");
    $(".code-wrapper .loading-fill").animate({ width: "0%" }, cfg.time, () => {
      FinishGame("code-wrapper", false);
    });
  }, 500);
}
function canFinishCode() {
  const elements = document.querySelectorAll(".select-code-box .code-input");
  let bool = true;
  elements.forEach((element) => {
    let smth = codeGame.correctCode.charAt($(element).attr("data-index"));
    if ($(element).text() !== smth) {
      bool = false;
    }
  });
  return bool;
}
