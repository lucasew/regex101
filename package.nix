{ stdenv
, qtbase
, qtwebengine
, wrapQtAppsHook
, cmake
, gitMinimal
}:

stdenv.mkDerivation {
  pname = "regex101";
  version = "0-unstable-2020-11-24";

  src = ./.;

  buildInputs = [ qtbase qtwebengine ];
  nativeBuildInputs = [ wrapQtAppsHook cmake gitMinimal ];

  installPhase = ''
    runHook preInstall
    mkdir -p $out/bin

    install -m755 "../bin/x86_64/Release/regex101" $out/bin
    runHook postInstall
  '';
}
