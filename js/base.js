// Player
var Player = function () {
  var _this = this,
    $playerAll = $("[data-player]"),
    $playerCurrent = null,
    $displayArtistName = null,
    $displayAlbumName = null,
    $displaySongName = null,
    $controlPrev = $("[data-player-prev]"),
    $controlPlay = $("[data-player-play]"),
    $controlNext = $("[data-player-next]"),
    index = 0,
    path = {
      audio: "http://lab.islegend.com/challenge/music-player/assets/audio/",
    },
    playing = false,
    playlist = null,
    audio = null;

  _this.methods = {
    init: function () {
      _this.methods.bindUserEvents();
    },
    bindUserEvents: function () {
      console.log("clicked");
      $playerAll.on("click", function () {
        if (!$(this).hasClass("player--open")) {
          // pause the current player
          if (audio !== null) {
            audio.pause();
            $playerCurrent.removeClass("player--open player--playing");
          }

          // get new player
          $playerCurrent = $(this);
          index = $playerCurrent.data("track");

          // retrieve display elements
          $displayArtistName = $playerCurrent.find(
            "[data-player-album-artist]"
          );
          ($displayAlbumName = $playerCurrent.find("[data-player-album-name]")),
            ($displaySongName = $playerCurrent.find(
              "[data-player-album-song]"
            ));

          // Audio
          playlist = playlists[$playerCurrent.data("playlist")];
          audio = $playerCurrent.find("audio").get(0);
          audio.addEventListener("ended", function () {
            _this.methods.nextTrack();
          });
          if (!audio.src) {
            _this.methods.loadTrack(0);
          }
          _this.methods.playTrack();

          $playerCurrent.toggleClass("player--open");
        }
      });

      $controlPlay.on("click", function () {
        if ($playerCurrent.hasClass("player--playing")) {
          _this.methods.pauseTrack();
        } else {
          _this.methods.playTrack();
        }
      });

      $controlNext.on("click", function () {
        _this.methods.nextTrack();
      });

      $controlPrev.on("click", function () {
        _this.methods.prevTrack();
      });
    },
    loadTrack: function () {
      audio.src =
        path.audio + playlist.slug + "/" + playlist.tracks[index].file;
      $displayArtistName.text(playlist.tracks[index].artist);
      $displayAlbumName.text(playlist.tracks[index].album);
      $displaySongName.text(playlist.tracks[index].song);
      $playerCurrent.data("track", index);
    },
    playTrack: function () {
      $playerCurrent.addClass("player--playing");
      playing = true;
      audio.play();
    },
    pauseTrack: function () {
      $playerCurrent.removeClass("player--playing");
      playing = false;
      audio.pause();
    },
    nextTrack: function () {
      if (index + 1 < playlist.trackCount) {
        index++;
      } else {
        index = 0;
      }

      _this.methods.loadTrack(index);

      if (playing) {
        audio.play();
      }
    },
    prevTrack: function () {
      if (index - 1 > -1) {
        index--;
      } else {
        index = playlist.trackCount - 1;
      }

      _this.methods.loadTrack(index);

      if (playing) {
        audio.play();
      }
    },
  };

  return _this.methods;
};

// Load
$(function () {
  player = new Player();
  player.init();
});

// Data
var playlists = {
  fuckthatflower: {
    slug: "fuck-that-flower",
    trackCount: 1,
    tracks: [
      {
        track: 1,
        artist: "Sik-K",
        album: "FXCK.THAT.FLOWER",
        song: "FXCK.THAT.FLOWER",
        file: "another-monster-drop-it-low.mp3",
      },
    ],
  },
  heyThama: {
    slug: "hey-thama",
    trackCount: 1,
    tracks: [
      {
        track: 1,
        artist: "Thama",
        album: "HEY",
        song: "HEY",
        file: "commence.mp3",
      },
    ],
  },
  safeLand: {
    slug: "safe-land",
    trackCount: 1,
    tracks: [
      {
        track: 1,
        artist: "LeeHi",
        album: "안전지대",
        song: "안전지대",
        file: "null.mp3",
      },
    ],
  },
  redemptionDrake: {
    slug: "redemption-drake",
    trackCount: 1,
    tracks: [
      {
        track: 1,
        artist: "Drake",
        album: "Redemption",
        song: "Redemption",
        file: "null.mp3",
      },
    ],
  },
  ShuShuShu: {
    slug: "shu-shu-shu",
    trackCount: 1,
    tracks: [
      {
        track: 1,
        artist: "Qim Isle",
        album: "Shu-Shu-Shu",
        song: "Shu-Shu-Shu",
        file: "null.mp3",
      },
    ],
  },
};
