{ pkgs ? import <nixpkgs> {}}:

pkgs.libsForQt5.callPackage ./package.nix { }
