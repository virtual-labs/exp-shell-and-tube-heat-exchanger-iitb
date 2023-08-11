var drag = false;
var geo;
var scene1;
var current_msg_i = 0;
var green_circle = [];
var all_labels = [];
var dx;
var dy;
var a3_total_score = 0;
var allow_labels = false;
var show_sections = false;
// All Messages
var a3_msg = [
    'Drag the pump to the assembly area',
    'Drag the shell and tube heat exchanger to the assembly area',
    'Drag the horizontal pipe to the assembly area',
    'Drag the glass section to the assembly area',
    'Drag the vertical pipe to the assembly area',
    'Drag the heater to the assembly area',
    'Drag the temperature controller to the assembly area',
    'Drag the first inlet cold fluid temperature indicator',
    'Drag the second outlet cold fluid temperature indicator',
    'Drag the first inlet hot fluid temperature indicator',
    'Drag the second outlet hot fluid temperature indicator ',
];
var obj_names = [
    'pump',
    'heat_exchanger',
    'pipe_h',
    'glass_section',
    'pipe_v',
    'heater',
    'temp_con',
    'temp_in_cold',
    'temp_out_cold',
    'temp_in_hot',
    'temp_out_hot',
];
// All Adjustments
// addj => [{fixed coordinates adjustments, relative movable coordinate adjustments}];
var adj = [
    [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
    ],
    [
        { x: 271, y: 100 },
        { x: 100, y: -50 },
    ],
    [
        { x: 196, y: 215 },
        { x: -10, y: -210 },
    ],
    [
        { x: 218, y: 633 },
        { x: -160, y: -8 },
    ],
    [
        { x: 551, y: 620 },
        { x: 15, y: 95 },
    ],
    [
        { x: 551, y: 405 },
        { x: 15, y: 90 },
    ],
    [
        { x: 620, y: 155 },
        { x: -78, y: -5 },
    ],
    //[{x: 641, y: 260},{ x: -50, y: -20 }],
    [
        { x: 564, y: 155 },
        { x: -50, y: -20 },
    ],
    [
        { x: 301, y: 305 },
        { x: 2, y: -34 },
    ],
    [
        { x: 120, y: 517 },
        { x: 0, y: -32 },
    ],
    [
        { x: 209, y: 243 },
        { x: -45, y: -2 },
    ],
    [
        { x: 196, y: 610 },
        { x: -55, y: 0 },
    ],
];
// hint box vertical or horizontal
var hint_orientation = ['v', 'v', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'v'];
var fixed_hint;
var movable_hint;
var act3_btn = document.createElement('div');
act3_btn.innerHTML = `<button id="panel2_btn" class="btn btn-primary" onclick="a3_first()" style="position: absolute; font-size:1.1vw; left:2.5vh; bottom: 12vh;  width: 90%;">Next</button>`;
function activity3() {
    pp.clearleftpannel();
    pp.addcanvas('mycanvas');
    pp.showtitle(`<p id='exp-title'>Figure shows the experimental setup. The assembled set up will be used to carry out the experimentation to study the heat transfer coefficient, in a shell and tube heat exchanger.</p>`, 3);
    pp.showdescription(`<p class='discription_text'>Observe the assembly. Next task is to <span class="text-color-blue">Assemble it yourself.<span></p>`, 3);
    canvas = pp.canvas;
    context = canvas.getContext('2d');
    canvas.style.cursor = 'crosshair';
    rect = canvas.getBoundingClientRect();
    scene = new Scene();
    pp.addtorightpannel(act3_btn.innerHTML, 3);
    var assm = new Chemistry.Custome_image(seq0_img, new Chemistry.Point(900, 450), 709, 650, canvas);
    scene.add(assm);
    window.onload = a3_windowresize;
    window.onresize = a3_windowresize;
    a3_windowresize();
}
// function load_new_scene() {
// 	scene = new Scene();
// 	scene1 = new Scene();
// 	fixed_container1();
// 	a3_draw_all_components();
// }
function a3_first() {
    pp.clearleftpannel();
    two_section();
    pp.addcanvas('mycanvas');
    pp.showtitle(`<p id='exp-title'>Drag and assemble the components from the Component Library to the Assembly Area.</p>`, 3);
    pp.showdescription(` <p class='discription_text'>Click <span class="text-color-blue"> Start</span> to assemble</p>`, 3);
    show_sections = true;
    canvas = pp.canvas;
    context = canvas.getContext('2d');
    canvas.style.cursor = 'crosshair';
    rect = canvas.getBoundingClientRect();
    var btn = document.createElement('div');
    btn.innerHTML = `<button id="panel2_btn" class="btn btn-primary" onclick="a3_second()" style="position: absolute; font-size:1.1vw; left:2.5vh; bottom: 12vh;  width: 90%;">Start</button>`;
    pp.addtorightpannel(btn.innerHTML, 3);
    // load_new_scene();
    scene = new Scene();
    scene1 = new Scene();
    fixed_container1();
    a3_draw_all_components();
    a3_windowresize();
}
function a3_second() {
    // pp.clearrightpannel();
    // pp.addoffcanvas(3);
    pp.showtitle(`<p id='exp-title'>Drag and assemble the components from the Component Library to the Assembly Area. </p>`, 3);
    // pp.showdescription(
    // 	'<p style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 1.2vw;">Assemble the experimental setup. The assembled set up will be used to carry out the experimentation to study the heat transfer coefficient, in a shell and tube heat exchanger with, parallel configuration under the Laminar Flow.</p>',
    // 	3
    // );
    // document.getElementById('a3-btn').remove();
    canvas.addEventListener('mousemove', mousemove1);
    canvas.addEventListener('mousedown', mousedown1);
    canvas.addEventListener('mouseup', mouseup1);
    canvas.addEventListener('touchmove', touchmove1);
    allow_labels = true;
    current_msg_i = 0;
    all_labels = [];
    drag = false;
    geo = 'Drag';
    a3_display_msg();
    create_labels();
    display_labels();
    a3_windowresize();
    // document.getElementById('ts').styles.display = 'block';
}
function a3_windowresize() {
    canvas_box_scale = 1.1;
    //canvas size
    a3_canvas_size();
    //canvas mapping
    a3_canvas_mapping();
    //draw border or rectangle
    // panel.style.height = canvas.height * (1 - 0.04) + 'px';
    scene.draw();
    if (show_sections) {
        scene1.draw();
        scene.draw();
        // line to devide canvas in two sections
        draw_half_line();
        // create_labels();
    }
    // let show_score = new Chemistry.Text(`Score: ${a3_total_score}/11`, new Chemistry.Point(50, 650), canvas);
    // show_score.color = "yellow";
    // show_score.draw();
    if (allow_labels) {
        a3_display_msg();
        display_labels();
    }
}
function a3_canvas_size() {
    canvas.width = window.innerWidth * 0.91;
    canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
    lscale = canvas.width / 1920.0;
    document.getElementById('leftpannel').style.height =
        canvas.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
}
function a3_canvas_mapping() {
    context.translate(0, canvas.height);
    context.scale(1, -1);
}
function mousemove1(e) {
    if (drag && geo == 'Drag') {
        let x = Math.round((e.clientX - rect.x) / lscale);
        let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
        // m1.value=`${x},${y}`;
        console.log(x, y);
        drag_geo1(x, y);
        // display_labels();
    }
}
function mousedown1(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    drag = true;
    console.log(x, y);
}
function mouseup1(e) {
    drag = false;
}
function touchmove1(e) {
    if (geo == 'Drag') {
        let x = Math.round((e.touches[0].clientX - rect.x) / lscale);
        let y = Math.round((canvas.height - (e.touches[0].clientY - rect.y)) / lscale);
        drag_geo1(x, y);
        // display_labels();
    }
}
function a3_draw_all_components() {
    var sq = new Chemistry.Custome_image(tank, new Chemistry.Point(475, 175), 382, 287, canvas);
    sq.name = 'tank';
    sq.lock();
    scene.add(sq);
    var sq = new Chemistry.Custome_image(pump, new Chemistry.Point(1000, 700), 207, 146, canvas);
    sq.name = 'pump';
    scene.add(sq);
    var sq = new Chemistry.Custome_image(heat_exchanger, new Chemistry.Point(1030, 240), 320, 419, canvas);
    sq.name = 'heat_exchanger';
    scene.add(sq);
    var sq = new Chemistry.Custome_image(pipe_h_img, new Chemistry.Point(1340, 775), 351, 63, canvas);
    sq.name = 'pipe_h';
    scene.add(sq);
    var sq = new Chemistry.Custome_image(glass_sec, new Chemistry.Point(1480, 200), 71, 215, canvas);
    sq.name = 'glass_section';
    scene.add(sq);
    var sq = new Chemistry.Custome_image(pipe_v_img, new Chemistry.Point(1450, 570), 50, 195, canvas);
    sq.name = 'pipe_v';
    scene.add(sq);
    var sq = new Chemistry.Custome_image(heater, new Chemistry.Point(1230, 395), 204, 40, canvas);
    sq.name = 'heater';
    scene.add(sq);
    var sq = new Chemistry.Custome_image(temp_controller, new Chemistry.Point(1750, 700), 183, 179, canvas);
    sq.name = 'temp_con';
    scene.add(sq);
    var sq = new Chemistry.Custome_image(temp_indi_blue, new Chemistry.Point(1750, 520), 98, 93, canvas);
    sq.name = 'temp_in_cold';
    scene.add(sq);
    var sq = new Chemistry.Custome_image(temp_indi_blue, new Chemistry.Point(1750, 370), 98, 93, canvas);
    sq.name = 'temp_out_cold';
    scene.add(sq);
    var sq = new Chemistry.Custome_image(temp_indi_purple, new Chemistry.Point(1750, 230), 130, 62, canvas);
    sq.name = 'temp_in_hot';
    scene.add(sq);
    var sq = new Chemistry.Custome_image(temp_indi_purple, new Chemistry.Point(1750, 100), 130, 62, canvas);
    sq.name = 'temp_out_hot';
    scene.add(sq);
}
var repeat = 0;
function drag_geo1(x, y) {
    for (let i = 0; i < scene.container.length; i++) {
        if (scene.container[i].geo.isinside(new Chemistry.Point(x, y)) &&
            scene.container[i].geo.draggable) {
            scene.container[i].geo.stpt = new Chemistry.Point(x, y);
            console.log(i);
            //drawing the rectangle hint boxes
            if (i > 5) {
                movable_hint = new Chemistry.Rectangle(12, 30, new Chemistry.Point(x + adj[i + 1][1].x, y + adj[i + 1][1].y), canvas);
                fixed_hint = new Chemistry.Rectangle(12, 30, new Chemistry.Point(adj[i + 1][0].x, adj[i + 1][0].y), canvas);
                if (hint_orientation[i] == 'h') {
                    movable_hint.angle = 90;
                    fixed_hint.angle = 90;
                }
            }
            else {
                movable_hint = new Chemistry.Rectangle(12, 30, new Chemistry.Point(x + adj[i][1].x, y + adj[i][1].y), canvas);
                fixed_hint = new Chemistry.Rectangle(12, 30, new Chemistry.Point(adj[i][0].x, adj[i][0].y), canvas);
                if (hint_orientation[i] == 'h') {
                    movable_hint.angle = 90;
                    fixed_hint.angle = 90;
                }
            }
            assemble1(scene.container[i].geo);
            scene.draw();
            // line to devide canvas in two sections
            draw_half_line();
            a3_display_msg();
            display_labels();
            if (movable_hint) {
                movable_hint.draw();
                fixed_hint.draw();
            }
            // let show_score = new Chemistry.Text(`Score: ${a3_total_score}/11`, new Chemistry.Point(50, 650), canvas);
            // show_score.color = "yellow";
            // show_score.draw();
            break;
        }
        // let show_score = new Chemistry.Text(`Score: ${a3_total_score}/11`, new Chemistry.Point(50, 650), canvas);
        // show_score.color = "yellow";
        // show_score.draw();
        // line to devide canvas in two sections
        draw_half_line();
    }
}
function assemble1(obj) {
    for (let i = 0; i < scene1.container.length; i++) {
        if (scene1.container[i].geo.isinside(new Chemistry.Point(obj.stpt.x, obj.stpt.y)) &&
            scene1.container[i].geo.name == obj.name &&
            obj.name == obj_names[current_msg_i]) {
            obj.stpt = scene1.container[i].geo.stpt;
            obj.lock();
            //on lock set hints null
            fixed_hint = null;
            movable_hint = null;
            if (obj.name == obj_names[current_msg_i]) {
                a3_total_score++;
                global_score++;
                //document.getElementById("a3-score-div-box").innerText = `${global_score}`;
            }
            console.log(obj.name, obj_names[current_msg_i]);
            current_msg_i++;
            all_labels.splice(0, 1);
            //if heater remove heater and change tank image
            if (obj.name == 'heater') {
                change_tank_image1();
                adj[7][0].x = 645;
                adj[7][0].y = 262;
            }
            if (current_msg_i == 11) {
                create_activity_6_button();
            }
            show_right_pannel(3);
            break;
        }
    }
}
function fixed_container1() {
    let c1 = new Chemistry.Geometry();
    c1.stpt = new Chemistry.Point(181, 149);
    c1.name = 'pump';
    scene1.add(c1);
    let c2 = new Chemistry.Geometry();
    c2.stpt = new Chemistry.Point(216, 430);
    c2.name = 'heat_exchanger';
    scene1.add(c2);
    let c3 = new Chemistry.Geometry();
    c3.stpt = new Chemistry.Point(356, 650);
    c3.name = 'pipe_h';
    scene1.add(c3);
    let c4 = new Chemistry.Geometry();
    c4.stpt = new Chemistry.Point(521, 511);
    c4.name = 'glass_section';
    scene1.add(c4);
    let c5 = new Chemistry.Geometry();
    c5.stpt = new Chemistry.Point(521, 306);
    c5.name = 'pipe_v';
    scene1.add(c5);
    let c6 = new Chemistry.Geometry();
    c6.stpt = new Chemistry.Point(598, 153);
    c6.name = 'heater';
    scene1.add(c6);
    let c7 = new Chemistry.Geometry();
    c7.stpt = new Chemistry.Point(655, 231);
    c7.name = 'temp_con';
    scene1.add(c7);
    let c8 = new Chemistry.Geometry();
    c8.stpt = new Chemistry.Point(285, 337);
    c8.name = 'temp_in_cold';
    scene1.add(c8);
    let c9 = new Chemistry.Geometry();
    c9.stpt = new Chemistry.Point(96, 549);
    c9.name = 'temp_out_cold';
    scene1.add(c9);
    let c10 = new Chemistry.Geometry();
    c10.stpt = new Chemistry.Point(240, 240);
    c10.name = 'temp_in_hot';
    scene1.add(c10);
    let c11 = new Chemistry.Geometry();
    c11.stpt = new Chemistry.Point(240, 613);
    c11.name = 'temp_out_hot';
    scene1.add(c11);
}
function a3_display_msg() {
    if (current_msg_i >= a3_msg.length) {
        //activity4 completed
        a3_remove_event();
    }
    else {
        pp.showdescription(`<p class='discription_text' > ${a3_msg[current_msg_i]} </p>`, 3);
    }
}
function change_tank_image1() {
    for (let i = 0; i < scene.container.length; i++) {
        if (scene.container[i].geo.name == 'tank') {
            scene.container[i].geo.img = tank_heater;
            scene.container[i].geo.dx = 411;
            scene.container[i].geo.dy = 287;
            scene.container[i].geo.stpt.x += 14.5;
            break;
        }
    }
    for (let i = 0; i < scene.container.length; i++) {
        if (scene.container[i].geo.name == 'heater') {
            scene.container.splice(i, 1);
            break;
        }
    }
}
function draw_half_line() {
    context.beginPath();
    context.moveTo(canvas.width / 2.25, 0);
    context.lineTo(canvas.width / 2.25, canvas.height);
    context.lineWidth = 2;
    context.stroke();
    // let tbox1 = new Chemistry.Rectangle(
    // 	400,
    // 	50,
    // 	new Chemistry.Point(285, 847),
    // 	canvas
    // );
    // tbox1.color = '#fbd4b4';
    // let tbox2 = new Chemistry.Rectangle(
    // 	400,
    // 	50,
    // 	new Chemistry.Point(1300, 847),
    // 	canvas
    // );
    // tbox2.color = '#fbd4b4';
    // let t1 = new Chemistry.Geo_Text(
    // 	'Assembly Area',
    // 	new Chemistry.Point(380, 862),
    // 	canvas
    // );
    // t1.font = '30%';
    // let t2 = new Chemistry.Geo_Text(
    // 	'Component Library',
    // 	new Chemistry.Point(1395, 862),
    // 	canvas
    // );
    // t2.font = '30%';
    // tbox1.draw();
    // tbox2.draw();
    // t1.draw();
    // t2.draw();
}
function two_section() {
    let assm_area = `<div style="position:absolute; font-size:2vw; left:12vw; top:1.5vw; border:0.13vw solid black; width:20vw; text-align:center; background-color:#fbd4b4;">Assembly Area</div>`;
    let com_lib = `<div style="position:absolute; font-size:2vw; left:57vw; top:1.5vw; border:0.13vw solid black; width:25vw; text-align:center; background-color:#fbd4b4;">Component Library</div>`;
    pp.addtoleftpannel(assm_area);
    pp.addtoleftpannel(com_lib);
}
function a3_remove_event() {
    canvas.addEventListener('mousemove', mousemove1);
    canvas.addEventListener('mousedown', mousedown1);
    canvas.addEventListener('mouseup', mouseup1);
    canvas.addEventListener('touchmove', touchmove1);
    window.removeEventListener('load', a3_windowresize);
    window.removeEventListener('resize', a3_windowresize);
}
function create_activity_6_button() {
    console.log('created');
    pp.showtitle(`<p id='exp-title'>You've completed the task click on next to start new activity</p>`, 3);
    pp.showdescription(``, 3);
    var act3_btn = document.createElement('div');
    act3_btn.innerHTML = `<button id="panel2_btn" class="btn btn-primary" onclick="activity6()" style="position: absolute; font-size:1.1vw; left:2.5vh; bottom: 12vh;  width: 90%;">Next</button>`;
    pp.addtorightpannel(act3_btn.innerHTML, 3);
    show_right_pannel(3);
}
// activity3();
//# sourceMappingURL=activity3.js.map