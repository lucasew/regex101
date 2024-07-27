{ stdenv
, qtbase
, qtwebengine
, wrapQtAppsHook
, cmake
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
  ];

  meta.mainProgram = "io.github.lucasew.regex101";
}
