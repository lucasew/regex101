/*
 * Copyright (C) 2020 Adrian Carpenter
 *
 * This file is part of a regex101.com offline application.
 *
 * https://github.com/fizzyade/regex101
 *
 * =====================================================================
 * The regex101 web content is owned and used with permission from
 * Firas Dib at regex101.com.  This application is an unofficial
 * tool to provide an offline application version of the website.
 * =====================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

#include "RegExUrlRequestInterceptor.h"
#include "RegExUrlSchemeHandler.h"
#include <QDebug>

void Nedrysoft::RegExUrlRequestInterceptor::interceptRequest(QWebEngineUrlRequestInfo &info)
{
    if (info.requestUrl().scheme()!=Nedrysoft::RegExUrlSchemeHandler::name()) {
        auto redirectUrl(info.requestUrl());

        redirectUrl.setScheme(Nedrysoft::RegExUrlSchemeHandler::name());

        if (info.requestMethod()==QByteArrayLiteral("POST")) {
            info.block(true);

            return;
        }

        info.redirect(redirectUrl);
    }
}
