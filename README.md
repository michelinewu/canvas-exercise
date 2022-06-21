# Instructions

To load this page, run a local server. In VS Code, this can be simply accomplished using the Live Server extension.

**VS Code Live Server Extension**

1. Install the Live Server extension in VS Code (extension id: [ritwickdey.LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).
2. Start the server by clicking the "Go Live" button in the status bar.
3. View the application at http://127.0.0.1:5500/.

# Answers

How long did it take you to complete this assignment?
- This version took about 2.5 hours. I spent probably about 4 hours working on a react app version before starting again. This is because I realized that in the instructions it stated the project should be an "HTML page", which I missed.

What about this assignment did you find most challenging?
- Originally, I set the aspect ratio of the canvas with CSS, before I realized that the properties should be set directly. It completely messed with the mouse event positioning and I spent a while debugging my calculations before I realized that the solution was that simple. Additionally, figuring out how to juggle the image elements took some time since they were not added to the DOM when painted onto the canvas.

What about this assignment did you find unclear?
- I previously mentioned that it stated the project should be an HTML page. I was confused because of the discussion of using Typescript and libraries, which led me to create a react app.

Do you feel like this assignment has an appropriate level of difficulty?
- Yes.

Briefly explain the technical decisions you made in this project, i.e. architecture, code-splitting, libraries, or other decisions and tradeoffs.
- The code is structured in a pretty standard division of an imported javascript file and linked stylesheet, as well as a directory for the images. I used jQuery to import the images so that they do not have to be hard-coded. I was able to use vanilla javascript to execute the core functionality. I additionally added reordering of the z positions of each layer.
- For the improvements: I would use local storage to persist state on refresh, I would use a form and the File API to add images, custom objects can be drawn with different functions in the Canvas API and I would add an object with relevant data to the array current called images, for resizing/cropping I would add properties to the objects in the images array to track the size and crop, and for undo/redo I would have an array of actions.
- If I were creating a react app, I would create a stateless component Canvas. To persist state, I would create a redux store and use redux-persist, I would additionally use a form to add images and save them in the store, for resizing/cropping I would also add properties to the existing objects, and for undo/redo an array of actions.
