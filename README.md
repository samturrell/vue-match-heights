# vue-match-heights

[![npm](https://img.shields.io/npm/v/vue-match-heights.svg)](https://www.npmjs.com/package/vue-match-heights)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Quick and easy method of setting element heights to be the same. You can provide an array of selectors that will be calculated in sequence, and an array of sizes where the plugin should not run.

[Demo](https://samturrell.github.io/vue-match-heights/example)

## Using this plugin

Adding vue-match-heights to your application is as simple as any other plugin:

```js
import Vue from 'vue';

import VueMatchHeights from 'vue-match-heights';

Vue.use(VueMatchHeights, {
  disabled: [768], // Optional: default viewports widths to disabled resizing on. Can be overridden per usage
});

new Vue({
  el: '#app',
});
```

The `v-match-heights` directive is now available to your app. This directive should be used on a wrapper element around the elements you wish to set the heights of.

```html
<div
  class="row"
  v-match-heights="{
    el: ['h3', '.content', '.caption'],  // Array of selectors to fix
    disabled: [ // Array of heights where the plugin will not set the heights
      767, // If a string is provided this will be used as a max bound
      [920, 1200], // If an array is provided it will be used as min-max bounds in that order
    ]
  }"
>
  <div class="col-sm-6">
    <div class="thumbnail">
      <img src="http://lorempixel.com/600/400/?1">
      <div class="caption">
        <div class="title">
          <h3>...</h3>
        </div>
        <div class="content">
          ...
        </div>
      </div>
      <div class="buttons">
        ...
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="thumbnail">
      <img src="http://lorempixel.com/600/400/?2">
      <div class="caption">
        <div class="title">
          <h3>...</h3>
        </div>
        <div class="content">
          ...
        </div>
      </div>
      <div class="buttons">
        ...
      </div>
    </div>
  </div>
</div>
```


## :scroll: Changelog
Details changes for each release are documented in the [CHANGELOG.md](https://github.com/samturrell/vue-match-heights/blob/dev/CHANGELOG.md).




## :copyright: License

[MIT](http://opensource.org/licenses/MIT)
