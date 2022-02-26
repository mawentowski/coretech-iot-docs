# Conceptual Site Functionality

## Header

The header is always present (except when sm). The header contains tab links that load components within the `.main-row` (everything below header) that are specific to that tab:

- `.left-nav`
- `.main-content`
- `right-nav`

## Home Section

By default, the `Home` tab is selected has formatting applied indicating that.

`.home-section` that contains the div `.home-content` is the first "page" loaded and does not have a side or right nav.

> The `menu-icon-row` needs to be set to `display: none` when the Home tab is displayed by default when the page loads or when it is selected later. There is a display utility class that can be applied.

## Tabs and the Main Row

When you click a tab other than Home, components to that tab are displayed (.main-row with .left-nav, main-content, and right-nav).

> The Header should never reload because it is always present (except small sizes).

Need an event listener that does the following:

- When a tab is clicked is clicked for the first time when the site is loaded, it remembers that tab.
- When you click another tab, it removes the formatting of the first tab and applies it to the new tab.

> Currently `tabs.js` is not applying formatting to other tabs than Home.

## Icon Row

Earlier, the tab that is currently selected is saved to memory.

When you reach a certain sm breakpoint, the navigation collapses and is simplified to just a hamburger menu that opens the currently selected left-nav.

The selected tab Name needs to display next to the hamburger menu. When another tab is selected, it needs display the name associated with that tab.

### Left Nav

Currently left nav generates automatically when the page loads and there is only one nav.

The left nav should only display when you click a tab, and the left-nav associated tab should be displayed.

The navs (both left and right) should already be loaded when the page loads (build time instead of runtime?) to improve performance.

#### Styling Left Nav

In `generate-left-nav.js`, the following should apply:

##### Create elements

1. Creates `<div>`, as now.
2. Create an `<a>` element, not a `<span>`, and don't apply any classes yet.
3. Pass in a URL to be added to `<a>` element.

##### Apply Styles

1. If a `MenuItemModel` is not the child of another `MenuItemModel`, then add the style `text-black` to it.
2. If a `MenuItemModel` has a parent, then add the class `.text-gray` to it.
3. If you click a child, apply the class `.child-active` to the parent, which increases its font-weight to indicate where you are located in the nav.
4. If you click another child:
   1. check to see if the child belongs to the same parent. If it does, no nothing. If it does not, remove the class `.child-active` from the old parent and apply it to the parent of new child.

### Main Content

The `.main-content` container contains different pages.

When a tab is selected, it loads the "first page" related to the tab in `.main-content`.

When you click an item in the left nav after first selecting a tab, load a different page in `.main-content`.

> Preferably some kind of loading animation (see strype).

The source content for a page is a markdown file that needs to be converted to HTML.

### Right Nav

The right-nav contains links to H2s in .main-content and has scrollspy implemented. When you click a link, it scrolls to that place in .main-content.

The Right Nav needs to do the following using javascript:

- locate all H2s chronology in `.main-content`, save them, and assign IDs to them like `#heading-1`, incrementing the ID for each one.
- underneath `<div id=right'>` (the right nav element) generate the following elements for each H2 with styles applied. The ID is added when the element is created.

```HTML
<a class="list-group-item list-group-item-action right-nav-link" href="#heading-1">Heading 2</a>
```

# API Reference

## Left nav scrollspy

You need to two level scrollspy:
<https://getbootstrap.com/docs/4.0/components/scrollspy/>

- `a.nav-link.active` is the parent
- `.nav.nav-pills` is the container that contains the children. It's `display:none;` by default.

When `a.nav-link.active`, set display of `.nav.nav-pills` to display:flex;

The children will then expand, and also will disappear when the parent
is no longer active.

## Programming Bullets

Need to check if an `<ul>` has a parent. If it does not, apply the bullets class that gives standard bullet. If it does have a parent right before it, apply the sub-bullets class.

```CSS
    ul.bulleted-list.bullets > li:before {
      content: "";
      position: absolute;
      width: 6px;
      height: 6px;
      left: -22px;
      top: 10px;
      border-radius: 50%;
      background: #83c9d2;
    }
    ul.bulleted-list.sub-bullets > li:before {
      content: "";
      position: absolute;
      width: 6px;
      height: 6px;
      left: -22px;
      top: 10px;
      border-radius: 50%;
      border: 1.5px solid #83c9d2;
    }
```

## Viewport Height Issue

Viewport 100vh is cutting off bottom because its taking into account the top bar.

Need to set height of #content equal to Window.innerHeight.
<https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight>

## Minor Tweaks

Add you email newsletter from techwritex, then configure it properly with the input field for label for.
Make the drop-down links to API reference, not version. Think of other things to link to.
Move version selector to left nav
Add that PDF row at bottom at all times
Add more to left nav, turn on overflow y.

# Issues

## Overflow: COMPLETED

I am having an issue with `overflow`. Here is a link to the output on Github pages: <https://mawentowski.github.io/tripane/>

My website consists of a top navigation and a div underneath called `main-row` that consists of 3 divs (columns) in 1 row: `left-nav-col` , `main-content` , and a `right-nav-col`. There are anchor tags in the `right-nav-col` that link to bookmarks in `main-content`.

My issue is that I do not want the entire page to be scrollable, only the `main-row`. But, when I set the body element to `overflow-y: hidden` to remove the outer scrollbar, and I click an a link in the `right-nav-col`, the `main-row` moves to the top and the top navigation becomes hidden when it should always be visible. Because the `body` element is not scrollable, you cannot scroll back up to see the top navigation. I want the top navigation to be visible at all times...

Here is the type of setup I am trying to imitate: <https://stripe.com/docs/radar/reviews#best-practices>
