{ stdenv
, qtbase
, qtwebengine
, wrapQtAppsHook
, cmake
, gitMinimal
, copyDesktopItems
, makeDesktopItem
}:

stdenv.mkDerivation {
  pname = "regex101";
  version = "0-unstable-2020-11-24";

  src = ./.;

  buildInputs = [
    qtbase
    qtwebengine
  ];

  nativeBuildInputs = [
    wrapQtAppsHook
    cmake
    gitMinimal
    copyDesktopItems
  ];

  postInstall = ''
    # copy icons
    for res in 16 32 64 128 256 512 1024; do
      res="${"$"}{res}x${"$"}{res}"
      install -D ../assets/*.iconset/icon_$res.png $out/share/icons/hicolor/$res/apps/regex101.png
    done
  '';

  desktopItems = [
    (makeDesktopItem {
      name = "regex101.desktop";
      desktopName = "Regex 101";
      icon = "regex101";
      exec = "regex101";
    })
  ];

}
