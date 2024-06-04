
# Article-Editor

## Overview

This project is an Angular-based rich text editor with image upload functionality. It allows users to enter text, upload photos, add captions, and preview the content in a dialog before publishing.


## Features

-	Rich Text Editing: Users can enter and format text within an editable div.
-	Image Upload: Users can upload images directly from their devices.
-	Image Resizing: Images can be resized to 75%, 50%, or their original size.
-	Image Captions: Users can add captions to images.
-	Drag and Drop: Images can be dragged and repositioned within the editor.
-	Preview Mode: Users can preview the entire content in a dialog before publishing.
-	Dynamic Content Update: The description updates dynamically as users type or modify content.


## Usage
-	Enter Title: Enter a title in the provided input field.
-	Add Text: Click inside the editable div to start typing your content.
-	Upload Image: Click the add icon to select and upload an image from your device. The image will be displayed within the editor.
-	Add Caption: Enter a caption for the uploaded image in the provided input field.
-	Resize Image: Use the buttons (75%, 50%, Auto) to resize the uploaded image.
-	Preview: Click the "Publish" button to open the preview dialog and review your content.
-	Close Preview: In the preview dialog, click the "Close" button to return to the editor.
Packages Used
-	@angular/core: Essential Angular core functionality.
-	@angular/material: Angular Material components for UI elements such as form fields, buttons, and dialogs.
-	@angular/forms: Angular forms module for handling input and form validation.
-	@angular/platform-browser: Platform-specific services for DOM rendering.
-	@angular/animations: Angular animations module for UI animations.
-	@angular/common: Commonly needed services and pipes.
Code Structure
Editor Component (editor.component.ts)
-	title: The title of the content.
-	description: The HTML content of the editor.
-	caption: The caption for the uploaded image.
-	images: Array to store image URLs.
-	has text: Boolean indicating if the editor contains the text
-	imageUploaded: Boolean indicating if an image has been uploaded.
-	isPreviewMode: Boolean indicating if the preview mode is active.

## Methods
``
onContentInput(event): Updates the description and hasText based on user input.
onFileSelected(event): Handles image upload, sets up drag-and-drop functionality, and adds the image to the editor.
updateDescription(): Updates the description based on the editor's current content.
openDialog(): Opens the preview dialog with the current content.
Dialog Component (dialog.component.ts)
data: Injected data containing the title, description, caption, images, and HTML content for the preview.
``

 ### Installation

1. Clone the repository

```bash
git clone https://github.com/Ironmandeveloper/Article-Editor.git
cd Article-Editor
```
 Install the dependencies
```bash
npm install
```
 Run the application
```bash
ng serve
```


**Access the application**: Open a browser and navigate to http://localhost:4200.
