let activeCatch = false,
  catchGame = {
    handPos: 0,
    time: 0,
    itemsLeft: 0,
    catched: 0,
  };
const StartCatch = async (_0x527002) => {
    catchGame.handPos = 0;
    catchGame.time = 0;
    catchGame.itemsLeft = 0;
    catchGame.catched = 0;
    let _0x2a4847 = {
      title: _0x527002.title,
      readyTime: _0x527002.readyTime,
      amount: _0x527002.amount,
      spawnTime: _0x527002.spawnTime || [2000, 2500],
      fallTime: {
        bad: _0x527002.fallTime ? _0x527002.fallTime.bad : [3500, 4000],
        good: _0x527002.fallTime ? _0x527002.fallTime.good : [3500, 4000],
      },
      trashTimeout: _0x527002.trashTimeout || 1000,
      images: {
        good:
          _0x527002.images && _0x527002.images.good
            ? _0x527002.images.good
            : ["bag"],
        bad:
          _0x527002.images && _0x527002.images.bad
            ? _0x527002.images.bad
            : ["trash_paper"],
      },
    };
    $(".catch-wrapper").html(
      '<div class="get-ready-wrapper"><span>' +
        locales.get_ready +
        '</span></div><div class="loading-bar"><div class="loading-fill"></div></div>'
    );
    $(".catch-wrapper").show();
    await sleep(100);
    $(".catch-wrapper .loading-fill").animate(
      { width: "0%" },
      _0x2a4847.readyTime
    );
    await sleep(_0x2a4847.readyTime);
    $(".catch-wrapper").html(
      "\n    <span>" +
        _0x2a4847.title +
        '</span>\n    <div class="catch-items"></div>\n    <div id="catch-hand-wrapper" class="catch-hand">' +
        (_0x527002.hand
          ? _0x527002.hand.includes("fa-")
            ? '<i id="catch-hand" class="' + _0x527002.hand + '"></i>'
            : "<img " +
              (_0x527002.handSize
                ? 'style="width: ' + _0x527002.handSize + 'rem"'
                : "") +
              ' id="catch-hand" src="' +
              _0x527002.hand +
              '">'
          : '<i id="catch-hand" class="fa-solid fa-hands-holding"></i>') +
        '</div>\n    <div class="loading-bar">\n        <span>' +
        locales.catch_instruction +
        ' <i class="fa-solid fa-arrow-left"></i> / <i class="fa-solid fa-arrow-right"></i></span>\n        <div class="loading-fill"></div>\n    </div>'
    );
    await sleep(100);
    activeCatch = true;
    for (let _0x74df30 = 0; _0x74df30 < _0x2a4847.amount; _0x74df30++) {
      await sleep(getRandomInt(_0x2a4847.spawnTime[0], _0x2a4847.spawnTime[1]));
      let _0x2bcde1 = getRandomInt(1, 90),
        _0xf0da43 =
          _0x2a4847.images.good[
            getRandomInt(0, _0x2a4847.images.good.length - 1)
          ],
        _0x1a993f = $(
          '<img style="top: 0%; left: ' +
            _0x2bcde1 +
            '%" src="./img/' +
            _0xf0da43 +
            '.png" alt="" class="catch-item">'
        );
      $(".catch-items").append(_0x1a993f);
      let _0x129164 = getRandomInt(
        _0x2a4847.fallTime.good[0],
        _0x2a4847.fallTime.good[1]
      );
      catchGame.itemsLeft++;
      setTimeout(() => {
        let _0x58c8b6 = getRandomInt(1, 3);
        if (_0x58c8b6 <= 2) {
          let _0x40a379 = getRandomInt(1, 90),
            _0x5e29bd =
              _0x2a4847.images.bad[
                getRandomInt(0, _0x2a4847.images.bad.length - 1)
              ],
            _0xc83168 = $(
              '<img style="top: 0%; left: ' +
                _0x40a379 +
                '%" src="./img/' +
                _0x5e29bd +
                '.png" alt="" class="catch-item">'
            );
          $(".catch-items").append(_0xc83168);
          let _0x44af75 = getRandomInt(
            _0x2a4847.fallTime.bad[0],
            _0x2a4847.fallTime.bad[1]
          );
          catchGame.itemsLeft++;
          _0xc83168.animate({ top: "90%" }, _0x44af75, "linear", () => {
            if (isHandClose(_0x40a379)) {
              let _0x45c124 = new Audio("./sounds/catch_bad.mp3");
              _0x45c124.play();
              catchGame.catched--;
            }
            catchGame.itemsLeft--;
            _0xc83168.remove();
            catchGame.itemsLeft < 1 &&
              ((activeCatch = false),
              FinishGame("catch-wrapper", catchGame.catched));
          });
        }
      }, 1000);
      setTimeout(() => {
        _0x1a993f.animate({ top: "90%" }, _0x129164, "linear", () => {
          if (isHandClose(_0x2bcde1)) {
            let _0x4bf095 = new Audio("./sounds/catch_good.mp3");
            _0x4bf095.play();
            catchGame.catched++;
          }
          catchGame.itemsLeft--;
          _0x1a993f.remove();
          catchGame.itemsLeft < 1 &&
            ((activeCatch = false),
            FinishGame("catch-wrapper", catchGame.catched));
        });
      }, 100);
    }
  },
  isHandClose = (_0x4ba959) => {
    let _0x138e23 = catchGame.handPos - _0x4ba959;
    if (_0x138e23 < 5 && _0x138e23 > -5) {
      return true;
    }
    return false;
  },
  MoveCatchHand = (_0x4eef1d) => {
    const _0x35f6e3 = $("#catch-hand"),
      _0x4d1d1d =
        _0x4eef1d == "ArrowLeft"
          ? catchGame.handPos - 1 < 0
            ? 0
            : catchGame.handPos - 1
          : _0x4eef1d == "ArrowRight"
          ? catchGame.handPos + 1 > 93
            ? 93
            : catchGame.handPos + 1
          : 0;
    catchGame.handPos = _0x4d1d1d;
    _0x35f6e3.css("left", _0x4d1d1d + "%");
  };
