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
  version = builtins.replaceStrings ["\n"] [""] (builtins.readFile ./VERSION);

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
      install -D ../assets/*.iconset/icon_$res.png $out/share/icons/hicolor/$res/apps/io.github.lucasew.regex101.png
    done
  '';

  desktopItems = [
    (makeDesktopItem {
      name = "regex101.desktop";
      desktopName = "Regex 101";
      icon = "io.github.lucasew.regex101";
      exec = "io.github.lucasew.regex101";
    })
  ];

  meta.mainProgram = "io.github.lucasew.regex101";
}
