// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: magic;
const token = "";

//let fm = FileManager.iCloud();
const bgCircleColor = new Color("4d4d4d");
const widgetBGColor = new Color("212121");
const circleTextColor = new Color("fff");
const pkgCol = new Color("f35c58");
const blCol = new Color("03fcec");
//const path = fm.documentsDirectory() + `/BG/image.jpg`;

const canvSize = 282;
const canvTextSize = 40;
const canvas = new DrawContext();
canvas.opaque = false;
const canvWidth = 24;
const canvRadius = 160;
canvas.size = new Size(canvSize, canvSize);
canvas.respectScreenScale = true;

let RadiusOffset = 60;

function makeCircle(radiusOffset, bgCircleColor, fgCircleColor, degree) {
  let ctr = new Point(canvSize / 2, canvSize / 2);
  CoordOffset = 0;
  RadiusOffset = 0;
  bgx = ctr.x - (canvRadius - radiusOffset);
  bgy = ctr.y - (canvRadius - radiusOffset);
  bgd = 2 * (canvRadius - radiusOffset);
  bgr = new Rect(bgx + CoordOffset, bgy + CoordOffset + 20, bgd, bgd);

  canvas.setStrokeColor(bgCircleColor);
  canvas.setLineWidth(canvWidth);
  canvas.strokeEllipse(bgr);

  // Inner circle
  canvas.setFillColor(fgCircleColor);
  for (t = 0; t < degree; t++) {
    rect_x = ctr.x + (canvRadius - radiusOffset) * sinDeg(t) - canvWidth / 2;
    rect_y = ctr.y - (canvRadius - radiusOffset) * cosDeg(t) - canvWidth / 2;
    rect_r = new Rect(rect_x, rect_y + 20, canvWidth, canvWidth);
    canvas.fillEllipse(rect_r);
  }
}

function drawText(txt, txtColor, txtOffset, fontSize) {
  const txtRect = new Rect(
    canvTextSize / 2 - 20,
    txtOffset - canvTextSize / 2,
    canvSize,
    canvTextSize
  );
  canvas.setTextColor(txtColor);
  canvas.setFont(Font.semiboldSystemFont(fontSize));
  canvas.setTextAlignedCenter();
  canvas.drawTextInRect(txt, txtRect);
}

function sinDeg(deg) {
  return Math.sin((deg * Math.PI) / 180);
}

function cosDeg(deg) {
  return Math.cos((deg * Math.PI) / 180);
}

const convertMBtoGB = function (MB) {
  return (MB / 1024).toFixed(1);
};

function setCol(degree) {
  if (degree >= 270) {
    progressCircleColor = new Color("9CE900");
  } else if (degree >= 180 && degree < 270) {
    progressCircleColor = new Color("9CE900");
  } else if (degree > 90 && degree < 180) {
    progressCircleColor = new Color("ffa500");
  } else if (degree > 0 && degree <= 90) {
    progressCircleColor = new Color("ff0000");
  } else {
    progressCircleColor = new Color("000");
  }
}

const reqData = new Request(
  `https://next.mobifone.vn/SmartTopupApi2/webresources/userInfo`
);
reqData.method = "GET";
reqData.headers = {
  token: `${token}`,
};
data = await reqData.loadJSON();
let balance = data.mainBalance;
let pkg = data.userDataPackages[0].packageName;
//   let remain = convertMBtoGB(4000);
let remain = convertMBtoGB(data.userDataPackages[0].remainingAmount);
let total = convertMBtoGB(data.userDataPackages[0].totalAmount);
let degrees = (360 * remain) / total;
await setCol(degrees);

/*****************************************/
let widget = new ListWidget();
// const refreshAfter = new Date(new Date().getTime() + 6000);
// widget.refreshAfterDate = refreshAfter;
widget.setPadding(0, 5, 1, 0);
makeCircle(RadiusOffset, bgCircleColor, progressCircleColor, degrees);

drawText(`Balance: ${(balance+100000).toLocaleString()}`, blCol, 22, 26);
drawText(`${remain}/ ${total} GB`, circleTextColor, 145, 26);
drawText(`${pkg}`, pkgCol, 190, 28);

//widget.backgroundImage = fm.readImage(path);
widget.backgroundColor = widgetBGColor;
widget.addImage(canvas.getImage());

widget.presentLarge();
Script.setWidget(widget);
Script.complete();
/*****************************************/
