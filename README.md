# Web Development Project 4 - *CinemaShuffle*

Submitted by: **Shawn**

This web app: **CinemaShuffle is a StumbleUpon-style discovery app for movies and TV shows. Each click on "Next" pulls a random title from The Movie Database (TMDB) and shows its poster, title, release date, rating, language, genres, and overview. Clicking the displayed language or a genre adds it to a ban list so future results skip it, and every title seen during the session is kept in a history panel.**

Time spent: **20** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - The type of attribute displayed for each image should be consistent across API calls (i.e. if you are using a cat API, and display the color, breed, and age in response to an initial API call, subsequent button clicks should also result in the color, breed, and age being displayed)
- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - A single result of an API call is displayed at a time
  - Displayed attributes should match the displayed image (i.e., if showing a picture of a Siamese cat and the attribute breed, the displayed breed should be 'Siamese' not 'Ragdoll' or another breed that doesn't match)
  - There is at least one image per API call
- [x] **API call response results should appear random to the user**
  - Clicking on the API call button should generate a seemingly random new result each time
  - Note: Repeat results are permitted but the API used should have a reasonably large amount of data and repeats should not be frequent
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
  - At least one attribute for each API result should be clickable
  - Clicking on a clickable attribute not on the ban list, should immediately add it to the ban list
  - Clicking on an attribute in the ban list should immediately remove it from the ban list
- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Clicking on the API call button should not result in any image/attributes with attribute values in the ban list being displayed (ex. Using a cat API, if the ban list includes the value 'Siberian' for the breed attribute, clicking on the Discover button should never result in a Siberian cat being displayed)
  - Note: More attribute values on the ban list may result in a higher frequency of repeat results
  - [x] _To ensure an accurate grade, your recording **must** show that when clicked, an attribute in the ban list is immediately removed from the list of banned attributes_

The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list
  - Both the language and the genres of the current result can be banned
- [x] Users can see a stored history of their previously displayed results from this session
  - A dedicated section of the application displays all the previous images/attributes seen before
  - Each time the API call button is clicked, the history updates with the newest API result

The following **additional** features are implemented:

* [x] Switch between discovering movies and TV shows; the genre options update to match the selected type
* [x] A filter panel lists every genre and language, so items can be banned up front, not only from the current result
* [x] Results without a poster are skipped, so every result shows an image
* [x] If a whole page of results is filtered out by the ban list, the app automatically retries with another random page
* [x] Responsive three-column layout (history / current result / ban list) that collapses to a single column on small screens
* [x] Deopoy on GitHub Pages

## Video Walkthrough

Here's a walkthrough of implemented user stories:

[![Video Walkthrough](https://img.youtube.com/vi/U4kQ4dKPIig/hqdefault.jpg)](https://youtu.be/U4kQ4dKPIig)

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Challenges encountered while building the app:

- **Banning languages:** TMDB's discover endpoint can exclude genres with `without_genres`, but it has no parameter for excluding languages. Unknown query parameters are silently ignored, so `without_original_language` appeared to do nothing. Banned languages are instead filtered out on the client after each request.
- **Empty results:** Filtering on the client can remove every item on a page. The app retries with another random page (up to 5 times) and limits later attempts to the pages that actually exist for the current filters.
- **Sets in React state:** Calling `.add()` on the existing `Set` doesn't trigger a re-render because React sees the same object. Every update creates a new `Set` instead.
- **Number vs. string IDs:** TMDB returns `genre_ids` as numbers, while the genre lookup objects produce string keys. IDs are converted with `String(id)` so the same genre isn't treated as two different values.
- **Double fetch in development:** React StrictMode runs effects twice in development, which initially added two items to the history on page load. The effect now ignores the result of the discarded run.
- **Browser globals hiding missing imports:** Forgetting to import components named `History` and `Option` didn't produce a "not defined" error, because browsers already have globals with those names (`window.History`, `window.Option`). This made the resulting crashes harder to trace.
- **Layout overflow:** A `<fieldset>` won't shrink below the width of its content by default, so a single row of language buttons pushed the page wider than the screen until `min-width: 0` and `flex-wrap: wrap` were added.

## License

    Copyright 2026 Shawn

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
