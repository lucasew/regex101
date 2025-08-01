#
# Copyright (C) 2020 Adrian Carpenter
#
# This file is part of a regex101.com offline application.
#
# https://github.com/fizzyade/regex101
#
# =====================================================================
# The regex101 web content is owned and used with permission from
# Firas Dib at regex101.com.  This application is an unofficial
# tool to provide an offline application version of the website.
# =====================================================================
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# The follow definitions are available to the compiler preprocessor:
#
# APPLICATION_LONG_NAME             The full application name.
# APPLICATION_SHORT_NAME            The abbreviated application name.
# APPLICATION_VERSION               Version of the application

cmake_minimum_required(VERSION 3.5)

set(APPLICATION_SHORT_NAME "regex101")
set(APPLICATION_LONG_NAME "Regular Expressions 101")
set(APPLICATION_ID "io.github.lucasew.regex101")

project(${APPLICATION_SHORT_NAME} LANGUAGES CXX)

if((APPLE) AND (CMAKE_OSX_ARCHITECTURES MATCHES "arm64"))
    set(APPLICATION_PLATFORM_ARCH "arm64")
else()
    if(CMAKE_SIZEOF_VOID_P EQUAL 8)
        set(APPLICATION_PLATFORM_ARCH "x86_64")
    else()
        set(APPLICATION_PLATFORM_ARCH "x86_32")
    endif()
endif()

set(APPLICATON_SOURCE_ROOT "${CMAKE_CURRENT_LIST_DIR}")

set(APPLICATION_BIN_OUTPUT "${CMAKE_CURRENT_LIST_DIR}/bin/${APPLICATION_PLATFORM_ARCH}/${CMAKE_BUILD_TYPE}")

set(CMAKE_INCLUDE_CURRENT_DIR ON)

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# The list of source files

set(APPLICATION_SOURCES
    assets/regex101.icns
    Info.plist.in
    src/main.cpp
    src/MainWindow.cpp
    src/MainWindow.h
    src/MainWindow.ui
    src/RegExAboutDialog.cpp
    src/RegExAboutDialog.h
    src/RegExApiEndpoint.cpp
    src/RegExApiEndpoint.h
    src/RegExNullWebEnginePage.cpp
    src/RegExNullWebEnginePage.h
    src/RegExSplashScreen.cpp
    src/RegExSplashScreen.h
    src/RegExUrlRequestInterceptor.cpp
    src/RegExUrlRequestInterceptor.h
    src/RegExUrlSchemeHandler.cpp
    src/RegExUrlSchemeHandler.h
    src/RegExWebEnginePage.cpp
    src/RegExWebEnginePage.h
    src/RegExWebEngineProfile.cpp
    src/RegExWebEngineProfile.h
    src/regex101.qrc
    src/opensans.qrc
    src/SettingsDialog.cpp
    src/SettingsDialog.h
    src/TransparentWidget.cpp
    src/TransparentWidget.h
    src/RegExDatabase.cpp
    src/RegExDatabase.h
    src/ISettingsPage.h
    src/DatabaseSettingsPage.cpp
    src/DatabaseSettingsPage.h
    src/DatabaseSettingsPage.ui
    src/GeneralSettingsPage.cpp
    src/GeneralSettingsPage.h
    src/GeneralSettingsPage.ui
    src/Cloner.cpp
    src/Cloner.h
)

# List of Qt libraries used by the application

set(APPLICATION_QT_LIBRARIES
    Core
    Gui
    Sql
    WebEngineWidgets
    WebChannel
    Widgets
)

if(APPLE)
    list(APPEND APPLICATION_SOURCES
        src/MacHelper.mm
        src/MacHelper.h
    )

    list(APPEND APPLICATION_QT_LIBRARIES MacExtras)
endif()

# Check that the Qt libraries are available

find_package(Qt5 COMPONENTS ${APPLICATION_QT_LIBRARIES} REQUIRED)

file(READ VERSION APPLICATION_VERSION)

string(STRIP "${APPLICATION_VERSION}" APPLICATION_VERSION)
message("Project version: ${APPLICATION_VERSION}")

add_definitions("-DAPPLICATION_LONG_NAME=\"${APPLICATION_LONG_NAME}\"")
add_definitions("-DAPPLICATION_SHORT_NAME=\"${APPLICATION_SHORT_NAME}\"")
add_definitions("-DAPPLICATION_VERSION=\"${APPLICATION_VERSION}\"")
add_definitions("-DAPPLICATION_ID=\"${APPLICATION_ID}\"")

# Generate the list of Qt libraries to link into the application

set(APPLICATION_QT_LINK_LIBRARIES "")

foreach(arg IN ITEMS ${APPLICATION_QT_LIBRARIES})
    list(APPEND APPLICATION_QT_LINK_LIBRARIES "Qt5::${arg}")
endforeach()

# Create an application executable (and ensure it's an application bundle under macOS)

add_executable(${APPLICATION_ID} MACOSX_BUNDLE ${APPLICATION_SOURCES})

# Set the target executable name

set_target_properties(${APPLICATION_ID} PROPERTIES OUTPUT_NAME "${APPLICATION_ID}")

# Set the folder where the binary should be placed

set_target_properties(${APPLICATION_ID} PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${APPLICATION_BIN_OUTPUT})

# If macOS build, then ensure the icon is copied to the bundle and set up the Info.plist file

if(APPLE)
    set_source_files_properties("assets/${APPLICATION_SHORT_NAME}.icns" PROPERTIES MACOSX_PACKAGE_LOCATION "Resources")
    set_target_properties(${APPLICATION_SHORT_NAME} PROPERTIES MACOSX_BUNDLE_INFO_PLIST ${APPLICATON_SOURCE_ROOT}/Info.plist.in)

    set(APPLICATION_BUNDLE_NAME "${CMAKE_PROJECT_NAME}")
    set(APPLICATION_BUNDLE_ICONS "${APPLICATION_SHORT_NAME}.icns")
    set(APPLICATION_BUNDLE_IDENTIFIER "${APPLICATION_ID}")
    set(APPLICATION_BUNDLE_SCHEME "${APPLICATION_SHORT_NAME}")
endif()

# nodejs static libration

if(EXISTS ${APPLICATON_SOURCE_ROOT}/libnode)
    target_include_directories(${APPLICATION_SHORT_NAME} PRIVATE "${APPLICATON_SOURCE_ROOT}/libnode/include")
    list(APPEND APPLICATION_QT_LINK_LIBRARIES "-L${APPLICATON_SOURCE_ROOT}/libnode/lib")
    list(APPEND APPLICATION_QT_LINK_LIBRARIES "node")
endif()

# cocoa frameworks

if(APPLE)
    list(APPEND APPLICATION_QT_LINK_LIBRARIES "-framework AppKit")
endif()

# Set the libraries be linked in

target_link_libraries(${APPLICATION_ID} PRIVATE ${APPLICATION_QT_LINK_LIBRARIES})

install(TARGETS ${APPLICATION_ID})

if (UNIX AND NOT APPLE)
    foreach(resolution IN ITEMS 16 32 64 128 256 512)
        install(
            FILES assets/regex101.iconset/icon_${resolution}x${resolution}.png
            DESTINATION ${CMAKE_INSTALL_PREFIX}/share/icons/hicolor/${resolution}x${resolution}/apps
            RENAME ${APPLICATION_ID}.png
        )
    endforeach()
    install(
        FILES ${APPLICATION_ID}.desktop
        DESTINATION ${CMAKE_INSTALL_PREFIX}/share/applications
    )
    install(
        FILES ${APPLICATION_ID}.metainfo.xml
        DESTINATION ${CMAKE_INSTALL_PREFIX}/share/metainfo
    )
endif()
