# Photo Gallery

This repo contains the source code for the Photo Gallery project.

## Table of Contents

[Description](#description)  
[Installation](#installation)  
[How it works](#how-it-works)  
[Usage](#usage)  
[Utilizes](#utilizes)  
[Contact](#contact)  
[License](#license)

## Description

![main screenshot](./photo-gallery.png)

Photo gallery allows users to login/signup and upload photos to their own personal gallery.

## Installation

No installation required. Simply follow the link below to use the app.

https://photo-gallery-client-rrich.herokuapp.com/login

## How it works

The frontend utilizes React, and React Router DOM allows users to navigate among the pages. In its current build, this only includes login/signup pages for unauthenticated users, and a dashboard page for authenticated users. JSON web tokens are used to for authentication.

Files are uploaded to a single directory within the server using the fileUpload middleware. Images and Users and kept in seperate Sequelize tables and are linked via a foreign keys.

## Usage

Users can simply signup/login to navigate to their dashboard and view/upload image files. Files can be uploaded by selecting the "Create a Post" item in the dropdown menu available in the user's dashboard page.

## Utilizes

- React.js
- HTML
- CSS
- JavaScript
- Express.js

## Contact

Email: rrich.kray.93@gmail.com

GitHub: https://github.com/rrich-kray/

Portfolio: https://portfolio-rho-six-93.vercel.app/

## License

Copyright (c) 2022, Ryan Kray
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE file in the root directory of this source tree and reproduced below.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
3. All advertising materials mentioning features or use of this software must display the following acknowledgement: This product includes software developed by Ryan Kray.
4. Neither the name of this application's developer nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER ''AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
