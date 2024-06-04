import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  title = '';
  description = '';
  caption = '';
  images: string[] = [];
  hasText = false;
  imageUploaded = false;
  isPreviewMode = false;

  @ViewChild('editableDiv', { static: false })
  editableDiv!: ElementRef<HTMLDivElement>;

  constructor(public dialog: MatDialog) {}

  onContentInput(event: Event) {
    const div = event.target as HTMLDivElement;
    this.description = div.innerHTML;
    this.hasText = !!div.textContent?.trim();
    this.updateDescription();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const container = document.createElement('div');
        container.classList.add('image-caption-container');

        const img = document.createElement('img');
        img.src = reader.result as string;
        img.style.maxWidth = '25%';
        img.style.height = 'auto';
        img.draggable = true;
        img.ondragstart = (ev) => {
          ev.dataTransfer?.setData(
            'text/plain',
            (ev.target as HTMLImageElement).outerHTML
          );
          (ev.target as HTMLImageElement).style.opacity = '0.5';
        };
        img.ondragend = (ev) => {
          (ev.target as HTMLImageElement).style.opacity = '';
        };

        const captionInput = document.createElement('input');
        captionInput.placeholder = 'Enter caption';
        captionInput.style.border = 'none';
        captionInput.classList.add('caption-input');
        captionInput.addEventListener('input', (e) => {
          this.caption = (e.target as HTMLInputElement).value;
          this.updateDescription();
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        if (!this.isPreviewMode) {
          buttonContainer.style.display = 'none';
        }

        const button100 = document.createElement('button');
        button100.textContent = '75%';
        button100.addEventListener('click', () => {
          img.style.maxWidth = '75%';
          img.style.height = 'auto';
        });

        const button50 = document.createElement('button');
        button50.textContent = '50%';
        button50.addEventListener('click', () => {
          img.style.maxWidth = '50%';
          img.style.height = 'auto';
        });

        const buttonAuto = document.createElement('button');
        buttonAuto.textContent = 'Auto';
        buttonAuto.addEventListener('click', () => {
          img.style.maxWidth = 'initial';
          img.style.height = 'auto';
        });

        buttonContainer.appendChild(button100);
        buttonContainer.appendChild(button50);
        buttonContainer.appendChild(buttonAuto);

        container.appendChild(img);
        container.appendChild(buttonContainer);
        container.appendChild(captionInput);

        if (!this.isPreviewMode) {
          container.addEventListener('mouseenter', () => {
            buttonContainer.style.display = 'block';
          });

          container.addEventListener('mouseleave', () => {
            buttonContainer.style.display = 'none';
          });
        }

        this.editableDiv.nativeElement.appendChild(container);

        this.imageUploaded = true;
        this.hasText = !!this.editableDiv.nativeElement.textContent?.trim();
        this.updateDescription();
      };
      reader.readAsDataURL(file);
    }
  }

  updateDescription() {
    this.description = this.editableDiv.nativeElement.innerHTML;
  }

  openDialog() {
    const buttonContainer = this.editableDiv.nativeElement.querySelector(
      '.button-container'
    ) as HTMLElement;
    let buttonContainerElement: HTMLElement | null = null;
    let buttonContainerParent: HTMLElement | null = null;
    let buttonContainerNextSibling: Node | null = null;

    if (buttonContainer) {
      buttonContainerElement = buttonContainer;
      buttonContainerParent = buttonContainer.parentElement;
      buttonContainerNextSibling = buttonContainer.nextSibling;
      buttonContainer.remove();
    }

    const contentWidth = this.editableDiv.nativeElement.offsetWidth || 90;

    setTimeout(() => {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: contentWidth + 'px',
        height: '90vh',
        data: {
          title: this.title,
          description: this.description,
          caption: this.caption,
          images: this.images,
          htmlContent: this.editableDiv.nativeElement.innerHTML,
        },
      });

      dialogRef.afterClosed().subscribe(() => {
        if (buttonContainerElement && buttonContainerParent) {
          buttonContainerParent.insertBefore(
            buttonContainerElement,
            buttonContainerNextSibling
          );
        }
      });
    }, 100);
  }
}
