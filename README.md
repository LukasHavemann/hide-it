# hide-it

**hide-it** is a simple fast and pure JavaScript / CSS 3 Splashscreen for modern Webbrowsers.

## Features

 * multi language support
 * ultra fast
 * no dependencies
 * adaptable
 * easy to theme

## How to use it

**don't link the file! include the content of the files as ```<script>```and ```<style></style>``` to achieve the best user experience**

 * add the content off ```dist/hide-it.js``` at the end of yout ```ìndex.html``` file inside a ```<script>```-Tag.
 * put the following html-snippet somewhere in your ```index.html```.
    <pre><code>
    <div id="hide-it">
        <a href="#">Close</a>
        
        <div class="hide-wrapper">
          <h1 class="hide-title">The Title</h1>
          
          <div id="hide-loading-indicator">
            Loading...
          </div>

          <p class="hide-content">Content</p>

          <button class="hide-accept">Accept</button>
        </div>
      </div>
    </pre></code>
 * compile sass with your colors and include the resulting css in your index.html


For a working example have a look at the ```example.html``` file.

## History

This micro framework was written during a SAP UI 5 assignment during a VPN breakdown. 


## Development

  * run ```npm install``
  * run ```gulp server``` to run webserver at [localhost:8080](http://localhost:8080) to test cookie functionality
  * run ```gulp deploy``` to regenerate all sass und js minfied files
  * run ```gulp watch```to automatically regenerate and lint all sources


## Acknowledgment

  * Cookie Code modified from [rivero/jsCookies.js](https://gist.github.com/jrivero/949141)
  * TODO CSS animation

## License

The MIT License (MIT)
Copyright (c) 2016 Lukas Havemann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.