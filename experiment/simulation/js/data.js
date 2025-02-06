var table_1 = [
    [0.79, 120, 30.5, 33.3],
    [0.82, 120, 30.5, 33.2],
    [0.96, 120, 30.5, 32.8],
    [1.06, 120, 30.5, 32.6],
];
var main_table_data = [[0.79, 120, 30.5, 33.3, 13, 154.4, 88.1, 241.99]];
var table_3 = [
    [120, 241.22],
    [200, 236.85],
    [280, 232.95],
];
//copied from l2-e1
var readings = [
    {
        temp: 81.2,
        reading: [
            [199.6, 81.2, 72.2, 28.2, 28.3],
            [102.4, 81.9, 76.2, 28.2, 28.3],
            [74.4, 81.9, 77.4, 28.2, 28.3],
            [51.94, 81.8, 78.5, 28.2, 28.3],
            [37.32, 82.2, 79.7, 28.2, 28.3],
            [25.72, 81.8, 80.0, 28.2, 28.3],
            [18.69, 81.9, 80.8, 28.2, 28.3],
            [15.37, 81.9, 80.8, 28.2, 28.3],
        ],
    },
    {
        temp: 83.2,
        reading: [
            [190.1, 83.2, 66.5, 28.2, 30],
            [100.2, 82.9, 72.1, 28.2, 30],
            [76.32, 83.3, 73.7, 28.2, 30],
            [51.23, 82.8, 75.9, 28.2, 30],
            [34.23, 83.4, 77.5, 28.2, 30],
            [23.92, 83.1, 78.7, 28.2, 30],
            [14.12, 82.9, 79.9, 28.2, 30],
            [7.18, 82.8, 80.8, 28.2, 30],
        ],
    },
];
//  var k_lit_values = [241.02, 237.02, 233.02];
var d_set = [3.9, 5.0];
var length_set = [16.5, 20];
var metal_set = [
    'Aluminum',
    'Copper',
    'Gold',
    'Silver',
    'Iron',
    'Titanium',
    'Zinc',
    'Steel',
];
var diameter;
var ht_length;
var metal;
var cs_area;
var density = 1000;
// var cp: number = 4186.8;
let rho = 0.835; //gm/cc
let cp = 2.71; //(J/gm-k)
let k = 0.127; //(w/m-k)
let mue = 2.941; //(cp)
let id_tube = 0.3; //(cm)
let od_tube = 0.5; //(cm)
let num_tubes = 19;
let length_tube = 20; //(cm)
let volume = 1140; //(cu.cm)
let surface_area = (Math.PI / 4) * Math.pow(id_tube, 2); //(sq.cm)
let heat_transfer_area = Math.PI * (id_tube / 100) * (length_tube / 100) * num_tubes; //(sq.m)
let shell_id = 5; //(cm)
let pitch_tri = 0.8; //(cm)
let baf_sp = 5; //(cm)
let C = 0.5; //(cm)
let de = (4 * (Math.pow(pitch_tri, 2) - (Math.PI * Math.pow(od_tube, 2)) / 4)) / (Math.PI * od_tube); //(cm)
let shell_surface_area = (shell_id * C * baf_sp) / pitch_tri; //(sq.cm)
let vol_flow_rate = 190; //(cc/s)
let shell_flow_velocity = vol_flow_rate / shell_surface_area; //(cm/s)
// console.log('rho', rho);
// console.log('cp', cp);
// console.log('k', k);
// console.log('mue', mue);
// console.log('id_tube', id_tube);
// console.log('od_tube', od_tube);
// console.log('num_tubes', num_tubes);
// console.log('length_tube', length_tube);
// console.log('volume', volume);
// console.log('surface_area', surface_area);
// console.log('heat_transfer_area', heat_transfer_area);
// console.log('shell_id', shell_id);
// console.log('pitch_tri', pitch_tri);
// console.log('baf_sp', baf_sp);
// console.log('c', c);
// console.log('de', de);
// console.log('shell_surface_area', shell_surface_area);
// console.log('vol_flow_rate', vol_flow_rate);
// console.log('shell_flow_velocity', shell_flow_velocity);
let shell_table = {
    t: [10.92, 11.62, 11.97, 13.15, 14.14, 15.03, 16.8, 18.53, 19.91],
    T1: [88.2, 87.6, 87.5, 87.5, 87.2, 87.7, 87.2, 87.2, 87],
    T2: [80.9, 80.2, 79.9, 79.7, 79.1, 79.3, 78.4, 78, 77.2],
    t1: 32.9,
    t2: 33.1,
    v: [],
    m: [],
    u: [],
    lmtd: [],
    Q: [],
    Ui: [],
    ln_Ui: [],
    ln_m: [],
    m453: [],
    m1: [],
    Re: [],
    Pr: [],
    Ui1: [],
    ho1: [],
    hi1: [],
    hi_exp: [],
    hi_theo: [],
};
function add_std_deviation() {
    for (let i = 0; i < shell_table.t.length; i++) {
        shell_table.t[i] = parseFloat(std_deviation(shell_table.t[i]).toFixed(4));
        shell_table.T1[i] = parseFloat(std_deviation(shell_table.T1[i]).toFixed(4));
        shell_table.T2[i] = parseFloat(std_deviation(shell_table.T2[i]).toFixed(4));
    }
}
add_std_deviation();
// shell_table['t1'] = 32.9;
// shell_table['t2'] = 33.1;
let t_avg = (shell_table['t1'] + shell_table['t2']) / 2;
// console.log('shell', shell_table);
// console.log('avg', t_avg);
for (let i = 0; i < shell_table.t.length; i++) {
    shell_table['v'][i] = volume / shell_table.t[i];
    shell_table['m'][i] = shell_table['v'][i] * (3600 / 1000) * rho;
    shell_table['u'][i] = shell_table['v'][i] / (surface_area * num_tubes);
    shell_table['lmtd'][i] =
        (shell_table.T1[i] - t_avg - (shell_table.T2[i] - t_avg)) /
            Math.log((shell_table.T1[i] - t_avg) / (shell_table.T2[i] - t_avg));
    shell_table['Q'][i] =
        shell_table['m'][i] *
            (cp * 0.239) *
            (shell_table.T1[i] - shell_table.T2[i]);
    shell_table['Ui'][i] =
        shell_table['Q'][i] / (heat_transfer_area * shell_table['lmtd'][i]);
    shell_table['ln_Ui'][i] = Math.log10(shell_table['Ui'][i]);
    shell_table['ln_m'][i] = Math.log10(shell_table['m'][i]);
    shell_table['m453'][i] = Math.pow(shell_table['m'][i], 0.453);
    shell_table['m1'][i] = 1 / shell_table['m453'][i];
    shell_table['Re'][i] =
        (id_tube * shell_table['u'][i] * rho) / (mue * Math.pow(10, -2));
    shell_table['Pr'][i] = (cp * 0.239 * (mue * 0.001) * 3600) / (k * 0.859);
    shell_table['Ui1'][i] = 1 / shell_table['Ui'][i];
    shell_table['ho1'][i] = 1 / 5000;
    shell_table['hi1'][i] = shell_table['Ui1'][i] - shell_table['ho1'][i];
    shell_table['hi_exp'][i] = 1 / shell_table['hi1'][i];
    shell_table['hi_theo'][i] =
        3.048129612 *
            Math.pow(shell_table['Re'][i], 0.453) *
            Math.pow(shell_table['Pr'][i], 0.5710080628);
}
console.log(shell_table);
// console.log();
//# sourceMappingURL=data.js.map