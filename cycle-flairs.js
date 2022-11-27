// ==UserScript==
// @name         Cycle-Flairs
// @namespace    none
// @version      1.0
// @description  Lets you create a custom pattern for your flair to cycle through.
// @author       Walnut
// @match        *://emeraldchat.com/app
// @icon         https://www.google.com/s2/favicons?sz=64&domain=emeraldchat.com
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

/*
=== Before advertising/publishing ===
- Create an accessible UI.
- Fix profile edits not always saving properly.
- Include a small documentation.
- Isolate profile editing to a custom menu to avoid Emerald bugs.
*/

(function() {
    'use strict';
    window.addEventListener('load', function(event) {
        const colors = ['red', 'orange', 'yellow', 'lime', 'cyan', 'hotpink', 'magenta'];
        const interval = 7;
        const max_color = colors.length;
        var color = 0;
        const original_color = App.user.flair.color
        let sample_holder = document.querySelector("body > div > nav");
        let color_sample = document.createElement("h1");
        color_sample.innerHTML = original_color;
        color_sample.style = `color: ${original_color};`;
        color_sample.id = "walnut-color-sample";
        let color_sample_location = document.querySelector("body > div:nth-child(1) > nav");
        color_sample_location.appendChild(color_sample);
        let color_sample_element = document.querySelector("#walnut-color-sample");
        const style = document.createElement("style");
        style.innerHTML = "#walnut-color-sample {text-transform: uppercase; font-size: 16px; position: absolute; margin-top: 19px;}";
        document.head.appendChild(style);

        function cycle() {
            if (document.querySelector("#ui-menu-micro")) {
                return;
            };
            var display_name = App.user.display_name;
            var bio = App.user.bio;
            var gender = App.user.gender;
            color += 1;
            if (color >= max_color) {
                color = 0;
            };
            var new_color = colors[color];
            fetch(`https://emeraldchat.com/update_profile?display_name=${display_name}&bio=${bio}&flair%5Bcolor%5D=${new_color}&gender=f`);
            color_sample_element.style = `color: ${new_color};`;
            color_sample_element.innerHTML = new_color;
            console.log(`> ${new_color} <`)
        };

        var cycle_loop = setInterval(cycle, interval * 1000);

        window.addEventListener('focus', function() {
            cycle_loop = setInterval(cycle, interval * 1000);
            console.log("> Cycle started >");
        });

        window.addEventListener('blur', function() {
            clearInterval(cycle_loop);
            console.log("< Cycle paused <");
        });
        
        const observer = new MutationObserver(function() {
        });

        observer.observe(document.body, {attributes: true, subtree: true, childList: true});
    });
})();
