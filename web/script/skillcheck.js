let activeSkillCheck = false,
  activeSkillCheckKey = 0;
const SkillCheck = (_0x104c23) => {
    activeSkillCheckKey = 0;
    let _0x48452c =
        _0x104c23 && _0x104c23.letters
          ? _0x104c23.letters
          : ["A", "B", "C", "D", "1", "2", "3", "4"],
      _0x140573 = _0x104c23 && _0x104c23.amount ? _0x104c23.amount : 5,
      _0x2dfef4 = _0x104c23 && _0x104c23.time ? _0x104c23.time : 7000;
    $(".skill-check-wrapper").empty();
    for (let _0xa42eb3 = 0; _0xa42eb3 < _0x140573; _0xa42eb3++) {
      let _0x2dfc23 = Math.floor(Math.random() * 500),
        _0x4db6d6 = _0x48452c[Math.floor(Math.random() * _0x48452c.length)],
        _0x139b60 = $(
          '<div style="margin-left: ' +
            (_0x2dfc23 >= 100
              ? _0x2dfc23 / 100 + "rem"
              : "." + _0x2dfc23 + "rem") +
            '" class="skill-check-key">' +
            _0x4db6d6 +
            "</div>"
        );
      $(".skill-check-wrapper").append(_0x139b60);
    }
    let _0x407ddb = $(
      '<div class="skill-check-line" id="skill-check-line"></div>'
    );
    $(".skill-check-wrapper").append(_0x407ddb);
    $(".skill-check-wrapper").css("display", "flex");
    activeSkillCheck = true;
    setTimeout(() => {
      _0x407ddb.animate({ left: "100%" }, _0x2dfef4, () => {
        activeSkillCheck = false;
        FinishGame("skill-check-wrapper", false);
      });
    }, 100);
  },
  SkillCheckClick = (_0x1b6435) => {
    let _0x2a20df = document.querySelectorAll(".skill-check-key"),
      _0x8d692 = document
        .getElementById("skill-check-line")
        .getBoundingClientRect(),
      _0x101f2c = false,
      _0x55845e = _0x2a20df[activeSkillCheckKey];
    _0x55845e &&
      _0x55845e.innerText &&
      (isCollide(_0x8d692, _0x55845e.getBoundingClientRect())
        ? ((_0x101f2c = false),
          _0x1b6435.key.toUpperCase() == _0x55845e.innerText.toUpperCase()
            ? (activeSkillCheckKey++,
              $(_0x55845e).addClass("good"),
              !_0x2a20df[activeSkillCheckKey] &&
                ((activeSkillCheck = false),
                $("#skill-check-line").stop(),
                FinishGame("skill-check-wrapper", true)))
            : ((activeSkillCheck = false),
              $("#skill-check-line").stop(),
              $(_0x55845e).addClass("wrong"),
              setTimeout(() => {
                FinishGame("skill-check-wrapper", false);
              }, 150)))
        : (_0x101f2c = true));
    _0x101f2c &&
      ((activeSkillCheck = false),
      $("#skill-check-line").stop(),
      FinishGame("skill-check-wrapper", false));
  };
function isCollide(_0x54fbc9, _0x5bc5ab) {
  return !(
    _0x54fbc9.y + _0x54fbc9.height < _0x5bc5ab.y ||
    _0x54fbc9.y > _0x5bc5ab.y + _0x5bc5ab.height ||
    _0x54fbc9.x + _0x54fbc9.width < _0x5bc5ab.x ||
    _0x54fbc9.x > _0x5bc5ab.x + _0x5bc5ab.width
  );
}
