
let btnSend = document.getElementById('btnSend');



async function postKeyCaeser(key) {
    let url = 'http://localhost:5001/keyCaeser';
    let response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({keyCaeser:key})
          });
        let result = await response.json();
        return result;
}
async function postFile(formData) {
    let url = 'http://localhost:5001/uploader';
    let response = await fetch(url, {
        method: 'post',
        // headers: {'Content-Type': 'multipart/form-data; boundary=l3iPy71otz'}, //'application/json;charset=utf-8'
        body: formData
          });

        let result = await response.json();
        return result;
}
function gettingKey() {
    let keyCaeser = document.getElementById('keyCaeser').value.trim();
    console.log(keyCaeser);
    return keyCaeser;
}
function readyFile(file) {
    let formData = new FormData();
    console.log(file);
    formData.append('file', file);
    console.log(formData);
    console.log(formData.get('file'));
    return formData;
}
function checkerSendToServer(fileToUplaod,filename) {
    document.getElementById('styleBtn').addEventListener('click', () => {
              if(gettingKey()){
                  console.log(gettingKey());
                  this.postKeyCaeser(gettingKey())
               .then((data) => {
                   console.log(data);
                   if(data.message === 'done'){
                       this.postFile(readyFile(fileToUplaod))
                           .then((data) => {
                               console.log(data);
                               if(data.message == 'File wurde erfolgreich verschlüsselt'){
                                   document.getElementById('feedbackFlask').innerHTML = data.message;
                                   console.log(filename);
                                   this.downloadFile(filename);
                               }else { document.getElementById('feedbackFlask').innerHTML = data.message;}
                           })
                           .catch((err) => {
                               console.error('Error', err);
                           })
                   }else {document.getElementById('keyError').innerHTML = data.message;}
               })
               .catch((err) => {
                   console.error('Error', err);
               })
              }else {document.getElementById('keyError').innerHTML = 'Geben Sie ein Key für die Verschlüssung ein';}
             });
}
function downloadFile(filename) {
    let dwFile = document.getElementById('downloadFile');
    dwFile.style.display = 'block';
    dwFile.innerHTML = '<a href="uploads/"'+filename+'-caeserEncryption'+ '  download=""'+filename+' >Download your File</a>';
}

function catchEvent() {
    const realFilebtn = document.getElementById('real-file');
    const customBtn = document.getElementById('custom-button');
    customBtn.addEventListener('click', () => {
      realFilebtn.click();
    });
    realFilebtn.addEventListener('change', () => {
     this.catchFile(event);
    });
  }
function catchFile(event) {
    let lastTestFile;
    lastTestFile = event.target.files[0];
    console.log(lastTestFile);
    btnSend.style.display = 'none';
    if (lastTestFile &&  lastTestFile.size > 0 && lastTestFile.size < 1024*1024) {
      document.getElementById('fileName').innerHTML = lastTestFile.name;
      btnSend.style.display = 'block';
      this.checkerSendToServer(lastTestFile);

    } else {
      document.getElementById('fileName').innerHTML = 'wählen Sie nochmal eine Datei kleiner als 1 MB';
    }
  }

function dropHandler(e) {
    let btwfileDragDrog = e.dataTransfer.items;
    let fileDragDrog;
   e.preventDefault();
   btnSend.style.display = 'none';
   if(btwfileDragDrog[0]) {
       if(btwfileDragDrog[0].kind === 'file' && (btwfileDragDrog[0].type === 'text/plain' || btwfileDragDrog[0].type === 'application/pdf') ) {
           fileDragDrog = btwfileDragDrog[0].getAsFile();
           if(fileDragDrog.size > 0 &&fileDragDrog.size < 1024*1024){
               document.getElementById('fileName').innerHTML = fileDragDrog.name;
               btnSend.style.display = 'block';
               this.checkerSendToServer(fileDragDrog,fileDragDrog.name);
           }else {
               document.getElementById('fileName').innerHTML = 'Datei muss kleiner als 1 MB';
           }

       } else {
           document.getElementById('fileName').innerHTML = 'Wählen Sie nochmal eine Datei (txt oder pdf Dateien) kleiner als 1 MB';
       }
   } else {
       let fileDragDrog2 = e.dataTransfer.files[0];
       btnSend.style.display = 'none';
       if(fileDragDrog2 && fileDragDrog2.size > 0 && fileDragDrog2.size < 1024*1024) {
           document.getElementById('fileName').innerHTML = fileDragDrog2.name;
           btnSend.style.display = 'block';
           this.checkerSendToServer(lastTestFile);
       } else {
           document.getElementById('fileName').innerHTML = 'Wählen Sie nochmal eine Datei (txt oder pdf Dateien)  kleiner als 1 MB';
       }
   }
}
function dragOverHandler(e) {
    e.preventDefault();
}
document.addEventListener("DOMContentLoaded",()=>{
    this.catchEvent();
});
