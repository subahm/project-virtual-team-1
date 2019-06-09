import { Component } from "@angular/core";
import { FooterComponent } from "../footer/footer.component";
import { TextEditorComponent } from "../textEditor/text.editor.component";

@Component({
  selector: "diff-panel",
  templateUrl: 'app/components/diffPanel/diff.panel.component.html'
})

export class DiffPanelComponent{
  // Creating instances for the classes so that their functions can be used
  private footerInstance: FooterComponent = new FooterComponent();
  private textEditorInstance: TextEditorComponent = new TextEditorComponent();


  /*
    This function is called when the Rename File button is pressed in the diff panel.
    It renames the file currently open in the diff panel in the file editor
  */
  renameFileFromDiff():void {
    // Grabs the name of the file that is currently open in the diff panel
    let currentFilename = document.getElementById("currentFilename").innerHTML;
    let renameFilename = document.getElementById("renameFilename").value;

    moveFile(currentFilename,renameFilename);
    $('#rename-file-modal').modal('hide');

  }

  /*
  This function is called when the Move File button is pressed in the diff panel.
  It moves the file currently open in the diff panel in the file editor
*/
  moveFileFromDiff(event?: Event):void {
    // Grabs the name of the file that is currently open in the diff panel
    let currentFilename = document.getElementById("currentFilename").innerHTML;
    let moveFileToFolder
    if(event){
      moveFileToFolder = event.target.files[0].path
    }else{
      moveFileToFolder = document.getElementById("moveFileToFolder").value;
    }

    moveFile(currentFilename,moveFileToFolder);
    $('#move-file-modal').modal('hide');
  }


  /*
  This function opens the browse directory dialog that allows the user to select a target directory for a file move
*/
  selectBrowseTargetFolder(): void {
    document.getElementById("dirTargetFolder").click();
    document.getElementById("moveFileToFolder").value = document.getElementById("dirTargetFolder").files[0].path;
  }



  /*
    This function is called when the Open in Editor button is pressed in the diff panel. 
    It opens the file currently open in the diff panel in the file editor
  */
  openFromDiff(): void {
    // Displays the file editor
    this.footerInstance.displayFileEditor();

    // Grabs the name of the file that is currently open in the diff panel
    let doc = document.getElementById("diff-panel");
    let fileName = doc.getElementsByTagName("P")[0].innerHTML;

    // Gets the full path of the file by adding it to the repo path
    let fileLocation = repoFullPath + '/' + fileName;

    // If the file exists, opens it in the file editor
    if (readFile.exists(fileLocation)) {
      let readme = fs.readFileSync(fileLocation, 'utf8');
      this.textEditorInstance.openDiffFile(fileName, fileLocation, readme);
    }
  }
}
