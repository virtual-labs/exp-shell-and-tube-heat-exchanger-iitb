let label8 = [];
let data2 = [];
var data1 = [];
var pol;
let btn_to_act9 = `<button id="panel1_btn" class="btn btn-primary" onclick="activity9();" style="position: absolute; bottom: 12vh; width: 85%;">Next</button>`;
function activity8() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    draw_chart_1();
    // show_right_pannel(3);
    pp.showtitle(`<p id='exp-title' style='padding: 1% 5vw;'>$$ \\ln(Ui) \\hspace{3mm} vs \\hspace{3mm} \\ln(m) $$</p>`, 3);
    MathJax.typeset();
    pp.showdescription(btn_to_act9, 3);
}
function draw_chart_1() {
    document.getElementById('hide_panel3').click();
    pp.clearleftpannel();
    pp.addcanvas('myChart');
    if (document.getElementById('panel1_btn')) {
        document.getElementById('panel1_btn').remove();
    }
    for (let i = 0; i < shell_table.ln_Ui.length; i++) {
        data2.push(parseFloat(shell_table.ln_Ui[i])); // y-axis
        label8.push(parseFloat(shell_table.ln_m[i])); // x-axis
    }
    calculate_y_datapoints_1();
    var ctx = document.getElementById('myChart');
    ctx.style.backgroundColor = 'white';
    ctx.style.marginTop = '5px';
    ctx.style.marginLeft = '10%';
    ctx.style.padding = '10px';
    ctx.style.borderRadius = '8px';
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    // let label8s = [0.004, 0.007, 0.010, 0.014, 0.020, 0.029, 0.039];
    // let data1=[82.28,96.86,104.07,108.28,112.48,117.68,125.35];//hi_expt
    // let data2=[146.90,183.50,204.11,230.09,256.89,290.83,323.49];//hi_st
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: label8,
            datasets: [
                {
                    label: 'Experiment',
                    data: data2,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0.5,
                    showLine: false,
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "green",
                    // backgroundColor: "rgba(34, 139, 34, 0.5)",
                },
                {
                    label: 'Linear Regression',
                    data: data1,
                    fill: false,
                    borderColor: 'red',
                    tension: 0.5,
                    showLine: true,
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "red",
                    // backgroundColor: "rgba(255, 0, 0, 0.5)",
                },
            ],
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'log(Ui)',
                        font: { size: 14, weight: 'bold' },
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'log(m)',
                        font: { size: 14, weight: 'bold' },
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: `log(Ui) vs log(m)`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } },
            },
        },
    });
}
function calculate_y_datapoints_1() {
    pol = regression_linear(label8, data2);
    console.log(pol);
    for (let i = 0; i < label8.length; i++) {
        data1.push(label8[i] * pol[0] + pol[1]);
    }
}
// activity8();
//# sourceMappingURL=activity8.js.map