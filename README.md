# 035 Remove Duplication

[![033 Clean Code Duplication](https://img.youtube.com/vi/-gX14jd9l_0/0.jpg)](https://www.youtube.com/watch?v=-gX14jd9l_0)

```
The CSS properties flex:10% and flex:90% are each duplicated twice. 
Change the CSS and HTML to remove this duplication while preserving the existing look and feel of the webpage.
```

Steps:
- Rename task-form-left to left-side in the CSS and HTML
- Rename task-form-right to right-side in the CSS and HTML
- Add the left-side class to each of the task description elements
- Add the right-side class to each of the task status elements
- Remove flex:10% from the CSS property .task-status
- Remove the CSS property .task-description along with its flex:90% property definition
- Remove the class task-description from all of the task descriptions

Resources:
- https://en.wikipedia.org/wiki/Code_refactoring
