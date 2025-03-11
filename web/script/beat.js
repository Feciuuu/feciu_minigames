var beatGame = {
  keys: [],
  isActive: false,
  correct: 0,
  failed: 0,
  maxFails: 3,
  keysAmount: 0,
  keysRemoved: 0,
};
const StartBeat = async (data) => {
    beatGame.correct = 0;
    beatGame.failed = 0;
    beatGame.keysAmount = data.keysAmount || 10;
    beatGame.keysRemoved = 0;
    data.keys = data.keys || ["W", "S", "A", "D"];
    beatGame.keys = data.keys;
    beatGame.maxFails = data.maxFails || 3;
    data.readyTime = data.readyTime || 3500;
    $(".beat-wrapper").html(
      '<div class="get-ready-wrapper"><span>' +
        locales.get_ready +
        '</span></div><div class="loading-bar"><div class="loading-fill"></div></div>'
    );
    $(".beat-wrapper").css("display", "flex");
    $(".beat-wrapper .loading-fill").animate({ width: "0%" }, data.readyTime);
    await sleep(data.readyTime);
    $(".beat-wrapper").html(
      "\n    <span>" +
        locales.beat_instruction +
        '</span>\n    <div class="game-wrapper"></div>'
    );
    for (let key in data.keys) {
      $(".beat-wrapper .game-wrapper").append(
        '\n        <div class="beat-keys-column" id="beat-column-' +
          data.keys[key] +
          '">\n            <div class="beat-key" id="beat-key-' +
          data.keys[key] +
          '">' +
          data.keys[key] +
          "</div>\n        </div>"
      );
    }
    beatGame.isActive = true;
    for (let i = 0; i < beatGame.keysAmount; i++) {
      if (!beatGame.isActive) {
        break;
      }
      await sleep(getRandomInt(350, 750));
      let randik = beatGame.keys[getRandomInt(0, beatGame.keys.length - 1)],
        key = $('<div data-key="' + randik + '" class="game-key"></div>');
      $("#beat-column-" + randik).prepend(key);
      setTimeout(() => {
        key.animate({ top: "100%" }, 5000, "linear", () => {
          if (beatGame.isActive) {
            key.stop();
            key.remove();
            beatGame.failed++;
            beatGame.keysRemoved++;
            let sound = new Audio("./sounds/beat_invalid.mp3");
            sound.play();
            if (beatGame.failed >= beatGame.maxFails) {
              beatGame.isActive = false;
              FinishGame("beat-wrapper", false);
            } else {
              beatGame.keysRemoved >= beatGame.keysAmount &&
                ((beatGame.isActive = false), FinishGame("beat-wrapper", true));
            }
          }
        });
      }, 100);
    }
  },
  BeatClick = async (data) => {
    let key = data.key.toUpperCase(),
      game = beatGame.keys.indexOf(key);
    if (game == -1) {
      return;
    }
    $("#beat-key-" + key).css("border", ".0625rem inset #c2f4f9c3");
    setTimeout(() => {
      $("#beat-key-" + key).css("border", ".0625rem solid #c2f4f9c3");
    }, 100);
    const keys = document.querySelectorAll(
        "#beat-column-" + key + " .game-key"
      ),
      elements = document
        .getElementById("beat-key-" + key)
        .getBoundingClientRect();
    keys.forEach((element) => {
      if (isCollide(elements, element.getBoundingClientRect())) {
        $(element).stop();
        $(element).remove();
        beatGame.keysRemoved++;
        beatGame.correct++;
        let randi = getRandomInt(1, 5),
          sound = new Audio("./sounds/beat_" + randi + ".mp3");
        sound.play();
        beatGame.keysRemoved >= beatGame.keysAmount &&
          ((beatGame.isActive = false), FinishGame("beat-wrapper", true));
        return;
      }
    });
  };
