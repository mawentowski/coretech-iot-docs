# Grid

## Grid Basics for Understanding
1. Set up grid on parent element contain 'items':
   
   `display: grid;`
2. Add 'inner' gap between child elements:
   
   `gap: 1.5rem;`
3. Set up columns using `fr` units to make equal columns with the `repeat` function:
    ```CSS
    .grid {
        grid-template-columns: 100px 100px 100px;
        grid-template-columns: 25% 25% 25%;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-columns: repeat(4, 1fr);
    }
    ```

4. In Firefox, ensure the following options are selected to see line numberes:
   
   - main.testionial-grid
   - Display line numbers
5. **General Approach (Default)**: Use a utility class to span elements across multiple columns. 
   ```CSS
    .grid-col-span-2 {
        grid-column: span 2;
    }
   ```
6. **Specific Approach**: Make particular elements start and end in specific locations using line numbers (referring to firefox):
    ```CSS
    .grid:last-child {
        grid-column-start: 4;
        grid-row-start: 1;
        grid-row-end: 3;
        grid-row-end: span 2;
        grid-row: 1 / 2 span;
        grid-row: 1 / 3;
    }
    ```
   
## Real World Use: Responsive Grid
1. Add `display: grid;` and `gap` as before.
2. Create grid areas that will soon have a specific child assigned to each. 
    ```CSS
    .grid {
        grid-template-areas:
            'one'
            'two'
            'three'
            'four'
            'five';
        }
    ```
   - This represents the smallest breakpoint setup, where 1 grid area in each row. Then the future media queries will handle the other sizes.
3. Assign a grid area to each child that is where the child will live.
    ```CSS
    .testimonial:nth-child(1) {
        grid-area: one;
    }
    .testimonial:nth-child(2) {
        grid-area: two;
    }
    .testimonial:nth-child(3) {
        grid-area: three;
    }
    .testimonial:nth-child(4) {
        grid-area: four;
    }
    .testimonial:nth-child(5) {
        grid-area: five;
    }
    ```
4. In Firefox, ensure the following options are selected to see line numberes:
   - Display Area Names to see each grid area labeled.
5. Create media queries that set the configuration of the grid areas.
   - number of rows (each line)
   - grid area names assigned to child elements (separated by spaces)
    ```CSS
    @media screen and (min-width: 33em) {
        .grid {
            grid-template-areas:
            "one one"
            "two three"
            "five five"
            "four four";
        }
    }

    @media screen and (min-width: 38em) {
        .grid {
            grid-template-areas:
            'one one'
            'two five'
            'three five'
            'four four';
        }
    }

    @media screen and (min-width: 54em) {
        .grid {
            grid-template-areas:
            "one one two"
            "five five five"
            "three four four";
        }
    }


    @media screen and (min-width: 75em) {
        .grid {
            grid-template-areas:
            "one one two five"
            "three four four five";
        }
    }
    ```

6. Notice that the `five` column in the 75 em breakpoint spans 2 rows. 
7. If you want the grid to have equal width columns. `Fr` is fraction of the screen. In this case, all columns take up the same amount of space03.
    ```CSS
    .grid {
        grid-auto-columns: 1fr;
    }
    ```

8. 

