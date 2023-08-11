var selected_temp = 81.2;
function verify_values(value, truevalue) {
    if (truevalue == 0 && value == truevalue) {
        return true;
    }
    let calculated_value = Math.abs(((truevalue - value) / truevalue) * 100);
    if (calculated_value <= 4) {
        return true;
    }
    else {
        return false;
    }
}
function random(min, max) {
    let num = (max - min) * Math.random() + min;
    return num;
}
function std_deviation(num) {
    let std = num / 100.0;
    let dev = num - random(-std, std);
    return dev;
}
function regression_linear(x, y) {
    let sumx = 0;
    let sumy = 0;
    let sumxy = 0;
    let sumxx = 0;
    let n = x.length;
    for (let i = 0; i < n; i++) {
        sumx += x[i];
        sumy += y[i];
        sumxy += x[i] * y[i];
        sumxx += x[i] * x[i];
    }
    let pol = [];
    pol[0] = (sumx * sumy - n * sumxy) / (Math.pow(sumx, 2) - n * sumxx);
    pol[1] = (sumy - pol[0] * sumx) / n;
    return pol;
}
// data for activity 2
var all_labels = [];
function create_labels() {
    all_labels = [];
    let text = new Chemistry.Text('Pump', new Chemistry.Point(980, 600), canvas);
    text.color = 'black';
    text.font = '22vw Arial';
    all_labels.push(text);
    let text2 = new Chemistry.Text('Shell and Tube Heat exchanger', new Chemistry.Point(1040, 60), canvas);
    text2.color = 'black';
    text2.font = '22vw Arial';
    all_labels.push(text2);
    let text1 = new Chemistry.Text('Horizontal Pipe', new Chemistry.Point(1270, 750), canvas);
    text1.color = 'black';
    text1.font = '22vw Arial';
    all_labels.push(text1);
    let text3 = new Chemistry.Text('Glass Section', new Chemistry.Point(1300, 170), canvas);
    text3.color = 'black';
    text3.font = '22vw Arial';
    all_labels.push(text3);
    let text5 = new Chemistry.Text('Vertical Pipe', new Chemistry.Point(1300, 550), canvas);
    text5.color = 'black';
    text5.font = '22vw Arial';
    all_labels.push(text5);
    let text4 = new Chemistry.Text('Heater', new Chemistry.Point(1200, 350), canvas);
    text4.color = 'black';
    text4.font = '22vw Arial';
    all_labels.push(text4);
    let text6 = new Chemistry.Text('Temperature Controller', new Chemistry.Point(1550, 640), canvas);
    text6.color = 'black';
    text6.font = '22vw Arial';
    all_labels.push(text6);
    let text9 = new Chemistry.Text('Temp_in_cold', new Chemistry.Point(1680, 450), canvas);
    text9.color = 'black';
    text9.font = '22vw Arial';
    all_labels.push(text9);
    let text10 = new Chemistry.Text('Temp_out_cold', new Chemistry.Point(1680, 300), canvas);
    text10.color = 'black';
    text10.font = '22vw Arial';
    all_labels.push(text10);
    let text7 = new Chemistry.Text('Temp_in_hot', new Chemistry.Point(1680, 170), canvas);
    text7.color = 'black';
    text7.font = '22vw Arial';
    all_labels.push(text7);
    let text8 = new Chemistry.Text('Temp_out_hot', new Chemistry.Point(1680, 40), canvas);
    text8.color = 'black';
    text8.font = '22vw Arial';
    all_labels.push(text8);
}
// to display all labels in activity 2
function display_labels() {
    for (let i = 0; i < all_labels.length; i++) {
        all_labels[i].draw();
    }
}
function show_right_pannel(id) {
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById(`offcanvasRight${id}`));
    bsOffcanvas.show();
}
//copied from l2-e1
var selected_data_index = 0;
//# sourceMappingURL=common.js.map