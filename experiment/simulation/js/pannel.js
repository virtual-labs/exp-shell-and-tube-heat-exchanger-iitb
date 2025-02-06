//style="margin: 1% 6.5% 1% 2%;" for id=panel
var mypannel = `<div id="panel" style="margin: 1% 6.5% 1% 2%;">
<div class="row">
<div id="leftpannel" style="border: 2px solid black; border-radius: 10px;" class="col-12"></div>

<div id="rightpannel" style="position:absolute;right:0px"></div>
`;
class Pannel {
    constructor(divpannelid) {
        this.divpannel = divpannelid;
        this.redraw();
        this.leftpannel = document.getElementById('leftpannel');
        this.rightpannel = (document.getElementById('rightpannel'));
        this.leftpannel.style.height =
            (window.innerHeight - 5).toString() + 'px';
        //this.rightpannel.style.height = (window.innerHeight - 5).toString() + 'px';
        // this.offcanvasRightLabel1 = <HTMLDivElement> document.getElementById('offcanvasRightLabel1');
    }
    redraw() {
        this.divpannel.innerHTML = mypannel;
    }
    addoffcanvas(id) {
        this.rightpannel.innerHTML += `
        <div class="offcanvas offcanvaselement offcanvas-end" tabindex="-1" id="offcanvasRight${id}"
        aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header" style="display: flex !important; flex-direction: column !important;">

        <button id="hide_panel${id}" type="button" class="btn btn-danger close-btn" data-bs-dismiss="offcanvas" aria-label="Close"> Hide Pane</button>
        <h5 class="offcanvas-title" id="offcanvasRightLabel${id}"></h5>
           
        </div>
        <div id="pannel${id}" class="offcanvas-body">


        </div>
    </div>
    <button class="offcanvasbtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight${id}" aria-controls="offcanvasRight${id}" style="width: 4%;"><i class="bi bi-arrow-bar-left offcanvasicon" style="font-size: calc(1vw + 12px);"></i></button>
      <br>  `;
    }
    addcanvas(canvasid) {
        this.leftpannel.innerHTML += `<canvas id="${canvasid}"></canvas>`;
        this.canvas = document.getElementById(canvasid);
    }
    addtoleftpannel(component) {
        this.leftpannel.innerHTML += component;
    }
    addtorightpannel(component, id) {
        document.getElementById('pannel' + id).innerHTML += component;
    }
    clearleftpannel() {
        this.leftpannel.innerHTML = '';
    }
    clearrightpannel() {
        this.rightpannel.innerHTML = '';
    }
    showdescription(text, id) {
        document.getElementById('pannel' + id).innerHTML = `<div id="description">${text}</div>`;
    }
    showtitle(text, id) {
        document.getElementById('offcanvasRightLabel' + id).innerHTML = text;
    }
    showscore(text, id) {
        document.getElementById('pannel' + id).innerHTML += `<div style="width: 90%;"  id="score">Score: ${text}</div>`;
        // this.rightpannel.innerHTML+=`<div style=""  id="score">Score: ${text}</div>`
    }
}
class Double_Table {
    constructor(heading_column_1, data_1, heading_column_2, data_2) {
        this.template = `
   <div style="height: 40%" class='table-responsive'>
   <table class="table" >

      <thead class="table-dark">
         <tr id="header-1">
         </tr>
      </thead>

      <tbody id="table-body-1">
      
      </tbody>
   </table>
   </div>    


   <br>
   <div style="height: 40%" class='table-responsive'>
   <table class="table" >

      <thead class='table-dark'>
         <tr id="header-2">
         </tr>
      </thead>

      <tbody id="table-body-2">

      </tbody>
      </div>
   </table>
   
   
   `;
        this.heading_column_1 = heading_column_1;
        this.heading_column_2 = heading_column_2;
        this.data_1 = data_1;
        this.data_2 = data_2;
    }
    draw() {
        console.log(this.data_1);
        let row_1 = '';
        let row_2 = '';
        for (let i = 0; i < this.heading_column_1.length; i++) {
            row_1 += `<th>${this.heading_column_1[i]}</th>`;
        }
        for (let i = 0; i < this.heading_column_2.length; i++) {
            row_2 += `<th>${this.heading_column_2[i]}</th>`;
        }
        document.getElementById('header-1').innerHTML = row_1;
        document.getElementById('header-2').innerHTML = row_2;
        document.getElementById('table-body-1').innerHTML = '';
        document.getElementById('table-body-1').innerHTML = '';
        for (let i = 0; i < this.data_1.length; i++) {
            let col_1 = `<tr>`;
            for (let j = 0; j < this.data_1[i].length; j++) {
                col_1 += `<td>${this.data_1[i][j]}</td>`;
            }
            col_1 += `</tr>`;
            document.getElementById('table-body-1').innerHTML += col_1;
        }
        for (let i = 0; i < this.data_2.length; i++) {
            let col_2 = `<tr>`;
            for (let j = 0; j < this.data_2[i].length; j++) {
                col_2 += `<td>${this.data_2[i][j]}</td>`;
            }
            col_2 += `</tr>`;
            document.getElementById('table-body-2').innerHTML += col_2;
        }
    }
}
//# sourceMappingURL=pannel.js.map