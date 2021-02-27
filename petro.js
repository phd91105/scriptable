// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: magic;
let widget = new ListWidget();
widget.setPadding(16, 16, 16, 16);
//let fm = FileManager.iCloud();
//let path = fm.documentsDirectory() + `/BG/image1.jpg`;
widget.backgroundColor = new Color("212121");
//widget.backgroundImage = fm.readImage(path);
const spc = 5;

//Title text
let titleTxt = widget.addText(`Petrolimex`);
titleTxt.font = Font.semiboldSystemFont(14);
titleTxt.leftAlignText();
// widget.addSpacer(spc);

//Value text
let vlFnt = Font.semiboldSystemFont(13);

//Subtitle text
let ptFnt = Font.systemFont(9);
// let ptCol;// 
titleTxt.textColor = new Color("03fcec");
ptCol = Color.lightGray();

await loadSite();

if (!config.runsInWidget) widget.presentSmall();
Script.setWidget(widget);
Script.complete();

async function loadSite() {
  let url = "https://www.pvoil.com.vn/truyen-thong/tin-gia-xang-dau";
  let wbv = new WebView();
  await wbv.loadURL(url);
  //javasript to grab data from the website
  let jsc = `
  var arr = new Array()

var obj1 = document
      .getElementsByClassName('table')[0]
      .getElementsByTagName('td')[6]
      .innerText
  arr.push(obj1)
var p1 = document
      .getElementsByClassName('table')[0]
      .getElementsByTagName('td')[7]
      .innerText
  arr.push(p1)
  
var obj2 = document
      .getElementsByClassName('table')[0]
      .getElementsByTagName('td')[10]
      .innerText
  arr.push(obj2)
var p2 = document
      .getElementsByClassName('table')[0]
      .getElementsByTagName('td')[11]
      .innerText
  arr.push(p2)
  
var obj3 = document
      .getElementsByClassName('table')[0]
      .getElementsByTagName('td')[14]
      .innerText
  arr.push(obj3)
var p3 = document
      .getElementsByClassName('table')[0]
      .getElementsByTagName('td')[15]
      .innerText
  arr.push(p3)

var time = document
      .getElementsByClassName('select-form')[0]
      .getElementsByTagName('option')[0]
      .innerText
  arr.push(time)
  
  JSON.stringify(arr)
  `;
  //Run the javascript
  let jsn = await wbv.evaluateJavaScript(jsc);
  //Parse the grabbed values into a variable
  let val = JSON.parse(jsn);

  function addPlus(x) {
    if (parseInt(val[x]) > 0) {
      return `▲${parseInt(val[x])}`;
    } else if (parseInt(val[x]) == 0) return ``;
    else return `▼${Math.abs(parseInt(val[x]))}`;
  }
  //Assign the parts to single variables
  let obj1 = val[0];
  let p1 = addPlus(1);
  let obj2 = val[2];
  let p2 = addPlus(3);
  let obj3 = val[4];
  let p3 = addPlus(5);
  let time = val[6];

  function setCol(x, y) {
    if (parseFloat(x) < 0) y.textColor = new Color("1db954");
    else y.textColor = new Color("f35c58");
  }
  
  let tx = widget.addText(`change: ${time}`);
  tx.textColor = Color.white();
  tx.font = Font.systemFont(11);
  tx.leftAlignText();
  widget.addSpacer(spc);
  //R-Value text
  if (obj1 != null) {
    let tx2 = widget.addText(`${obj1} Đ [${p1}]`);
    tx2.leftAlignText();
    tx2.font = vlFnt;
    setCol(p1, tx2);
  }
  //R-Value subtiltle
  let tx1 = widget.addText(`RON95-III`);
  tx1.textColor = ptCol;
  tx1.font = ptFnt;
  tx1.leftAlignText();
  widget.addSpacer(spc);

  //Incidence text
  if (obj2 != null) {
    let tx4 = widget.addText(`${obj2} Đ [${p2}]`);
    tx4.leftAlignText();
    tx4.font = vlFnt;
    setCol(p2, tx4);
    // tx4.textColor = new Color(cc2)
  }
  //Incidence subtiltle
  let tx3 = widget.addText(`E5 RON92-II`);
  tx3.textColor = ptCol;
  tx3.font = ptFnt;
  tx3.leftAlignText();
  widget.addSpacer(spc);

  //Intensive-care-beds text
  if (obj3 != null) {
    let tx6 = widget.addText(`${obj3} Đ [${p3}]`);
    tx6.leftAlignText();
    tx6.font = vlFnt;
    setCol(p3, tx6);
    // tx6.textColor = new Color(cc3)
  }
  //Intensive-care-beds subtitle
  let tx5 = widget.addText(`DO 0,05S-II`);
  tx5.textColor = ptCol;
  tx5.font = ptFnt;
  tx5.leftAlignText();
}
