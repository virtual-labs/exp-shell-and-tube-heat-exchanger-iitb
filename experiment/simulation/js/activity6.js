var seq;
var seq_container = [];
var pupm_con;
var all_valves = [];
var show_table_0 = false;
var t0 = true;
var Ti;
var To;
var temp_diff_1 = 0;
var temp_diff_2 = 0;
var control_panel_text;
var show_once = true;
let ob_data = [];
let ob_table_verified = false;
var temp_con = [];
let a6_slider = `<input type="range" style="position:absolute; left:15vw; top:38vw; width:8vw;" disabled min="0" max="7" id="level-slider" value="0">`;
// var ti: number;
// var to: number;
// function new_task_6(text: string) {
// 	// document.getElementById("a6-question-div-box").innerText = text;
// 	pp.showtitle(text, 3);
// }
let all_canvas = `
<canvas id="mycanvas">

</canvas>`;
function activity6() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    // pp.addcanvas('mycanvas');
    // canvas = pp.canvas;
    pp.addtoleftpannel(all_canvas);
    pp.addtoleftpannel(a6_slider);
    canvas = document.getElementById('mycanvas');
    pp.showtitle(`<p id='exp-title'> Perform task to simulate the experiment </p>`, 3);
    canvas.style.cursor = 'crosshair';
    context = canvas.getContext('2d');
    rect = canvas.getBoundingClientRect();
    green_circle = [];
    // To = 28.2 - 43 / 181.0;
    // Ti = 28.2 - 53 / 181.0;
    seq = 0;
    seq_container = [];
    control_panel_text = new Chemistry.Text('Control Panel', new Chemistry.Point(850, 790), canvas);
    control_panel_text.font = '23vw Arial';
    let v1 = new Chemistry.Custome_image(blue_valve, new Chemistry.Point(400, 410), 66, 19, canvas);
    v1.stang = -90;
    let v2 = new Chemistry.Custome_image(blue_valve, new Chemistry.Point(605, 520), 66, 19, canvas);
    //push two valves with custome image class red image also change orientation
    all_valves = [v1, v2];
    pupm_con = new Chemistry.Pump_controller(canvas);
    //table_0_draw();
    canvas.addEventListener('click', a6_mouseclick); //inlet cold fluid vlave
    scene = new Scene();
    //add_a6_panel(canvas, `${rect.x + canvas.width - 300}px`, `${rect.y}px`);
    window.onload = a6_windowresize;
    window.onresize = a6_windowresize;
    a6_windowresize();
    var first_geo = new Chemistry.Custome_image(seq0_img, new Chemistry.Point(470, 440), 709, 650, canvas);
    first_geo.name = 'first';
    seq_container.push(first_geo);
    // first_geo.draw();
    scene.add(first_geo);
    scene.add(pupm_con);
    draw_seq_all();
    show_right_pannel(3);
    // draw_pump_con();
}
function draw_pump_con() {
    pupm_con.draw();
}
function a6_windowresize() {
    canvas_box_scale = 1.1;
    //canvas size
    a6_canvas_size();
    //canvas mapping
    a6_canvas_mapping();
    //draw border or rectangle
    scene.draw();
    draw_seq_all();
    // draw_pump_con();
    if (show_table_0) {
        let table = document.getElementById('table_0');
        table.style.right = `${rect.x + 100 * lscale}px`;
        table.style.top = `${rect.y + canvas.height - 550 * lscale}px`;
        table.style.height = `${(canvas.height * 2.8) / 4}px`;
        table.style.fontSize = '0.85vw';
    }
    // panel.style.height = canvas.height * (1 - 0.04) + 'px';
    // panel.style.width = '28%';
}
function a6_canvas_size() {
    canvas.width = window.innerWidth * 0.91;
    canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
    lscale = canvas.width / 1920.0;
    document.getElementById('leftpannel').style.height =
        canvas.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
}
function a6_canvas_mapping() {
    context.translate(0, canvas.height);
    context.scale(1, -1);
}
function draw_seq_all() {
    scene.draw();
    control_panel_text.draw();
    // draw_pump_con();
    all_valves[0].draw();
    all_valves[1].draw();
    if (seq == 0) {
        console.log('open cold water inlet valve ');
        pp.showdescription(`<p class='discription_text'>open cold water inlet valve</p>`, 3);
        // show_right_pannel();
    }
    for (let i = 0; i < seq_container.length; i++) {
        seq_container[i].draw();
    }
    if (seq == 1 && seq_container[1].l < seq_container[1].l_last) {
        window.requestAnimationFrame(draw_seq_all);
        all_valves[0].img = purple_valve;
        all_valves[0].stang = -45;
        all_valves[0].stpt.x = 420;
        all_valves[0].stpt.y = 410;
    }
    else if (seq == 1) {
        if ((seq_container[1].name = 'second')) {
            seq_container.splice(1, 1);
            seq_container[0].img = seq1_img;
            seq = 2;
            draw_seq_all();
            canvas.addEventListener('click', a6_mouseclick_seq_2);
            console.log('Open glass section outlet valve');
            // let a6_text = new Chemistry.Text("Open glass section outlet valve", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();
            //document.getElementById("a6-question-div-box").innerText = "Open glass section outlet valve";
            pp.showdescription(`<p class='discription_text'>Open glass section outlet valve</p>`, 3);
            show_right_pannel(3);
        }
    }
    else if (seq == 4 && seq_container[1].l < seq_container[1].l_last) {
        window.requestAnimationFrame(draw_seq_all);
    }
    else if (seq == 4) {
        if ((seq_container[1].name = 'third')) {
            seq_container.splice(1, 1);
            seq_container[0].img = seq2_img;
            seq = 5;
            console.log('pump and test section animation completed');
            // let a6_text = new Chemistry.Text("pump and test section animation completed", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();
            //start h pipe animation
            var second_geo = new Chemistry.anim_image_x_dir(seq3_img, new Chemistry.Point(470, 440), 709, 650, canvas);
            seq_container.push(second_geo);
            second_geo.name = 'fourth';
            second_geo.l = 650;
            second_geo.l_last = 650;
            second_geo.width = 585;
            second_geo.width_last = 250;
            draw_seq_all();
            // second_geo.draw();
        }
    }
    else if (seq == 5 &&
        seq_container[1].width > seq_container[1].width_last) {
        window.requestAnimationFrame(draw_seq_all);
    }
    else if (seq == 5) {
        if ((seq_container[1].name = 'fourth')) {
            seq_container.splice(1, 1);
            seq_container[0].img = seq3_img;
            seq = 6;
            console.log('H pipe animation completed');
            // let a6_text = new Chemistry.Text("H pipe animation completed", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();
            //start glass and v pipe animation
            var second_geo1 = new Chemistry.anim_image_y_dir_down(seq4_img, new Chemistry.Point(470, 440), 709, 650, canvas);
            seq_container.push(second_geo1);
            second_geo1.name = 'fourth';
            second_geo1.startx = 400;
            second_geo1.l = 80;
            second_geo1.l_last = 500;
            second_geo1.width = 0;
            draw_seq_all();
            // second_geo.draw();
        }
    }
    else if (seq == 6 && seq_container[1].l < seq_container[1].l_last) {
        window.requestAnimationFrame(draw_seq_all);
    }
    else if (seq == 6) {
        if ((seq_container[1].name = 'fourth')) {
            seq_container.splice(1, 1);
            seq_container[0].img = seq4_img;
            seq = 7;
            console.log('glass and v pipe animation completed');
            //start next animation
            canvas.addEventListener('click', a6_mouseclick_seq_7);
            console.log('Turn on the heater');
            draw_seq_all();
            // let a6_text = new Chemistry.Text("Turn on the heater", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();
            //document.getElementById("a6-question-div-box").innerText = "Turn on the Heater";
            pp.showdescription(`<p class='discription_text'>Click on the 'h' button on control pannel to turn on the Heater</p>`, 3);
            // second_geo.draw();
            show_right_pannel(3);
        }
    }
    else if (seq == 13 &&
        seq_container[seq_container.length - 1].l <
            seq_container[seq_container.length - 1].l_last) {
        //drawing timer text for first reading 199.60;
        seq_container[3].text = getreadingtime().toString();
        seq_container[2].draw();
        window.requestAnimationFrame(draw_seq_all);
    }
    else if (seq == 13) {
        seq_container[2].draw();
        console.log('glass fill animation completed');
        canvas.addEventListener('click', a6_mouseclick_seq_14);
        seq = 14;
        seq_container.splice(seq_container.length - 1, 1);
        seq_container[0].img = seq10_img;
        pp.showdescription(`<p class='discription_text'>Open outlet glass valve</p>`, 3);
        show_right_pannel(3);
        draw_seq_all();
        // let a6_text = new Chemistry.Text("Observation Table", new Chemistry.Point(1125, 600), canvas);
        // a6_text.color = "yellow";
        // a6_text.font = "24px";
        // a6_text.draw();
        // document.getElementById("a6-question-div-box").innerText = "See Table for 8 different flow rates";
        // show_right_pannel(3);
    }
    else if (seq == 15 &&
        seq_container[seq_container.length - 1].l <
            seq_container[seq_container.length - 1].l_last) {
        seq_container[2].draw();
        window.requestAnimationFrame(draw_seq_all);
    }
    else if (seq == 15) {
        if ((seq_container[1].name = 'fifth')) {
            // seq_container.splice(1, 1);
            seq_container[0].img = seq4_img;
            seq = 16;
            //start next animation
            draw_seq_all();
            seq_container[2].draw();
            pp.showdescription(`<p class='discription_text'>Note down all the readings, you'll require it to fill the table in the next activity</p>`, 3);
            show_right_pannel(3);
            show_table_0 = true;
            if (t0) {
                t0 = false;
            }
            if (!document.getElementById('table-btn')) {
                pp.addtorightpannel(`<button style="position: absolute; font-size:1.1vw; left:2.5vh; bottom: 12vh;  width: 90%;" id="table-btn" class="btn btn-primary" onclick="load_observation_table();">Next</button>`, 3);
            }
        }
    }
    //add all valve draw
}
var readingtime = 0;
function getreadingtime() {
    //if 81 then 199.60 if 83 190.10
    if (get_temp_con_value() == shell_table.T1[0]) {
        console.log(shell_table.t);
        readingtime += shell_table.t[0] / 99; //199.60 first data set timer reading 99 time the loop execute
        return readingtime.toFixed(4);
    }
    else {
        readingtime += 190.1 / 99; //199.60 first data set timer reading 99 time the loop execute
        return readingtime;
    }
}
function a6_mouseclick(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    a6_check_isinside_cold_in(x, y);
    //all_valves[0].img="green color" change stpt angle
}
function a6_mouseclick_seq_2(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (y >= 494 && y <= 545) {
        if (x >= 598 && x <= 681) {
            seq = 3;
            let slider = (document.getElementById('level-slider'));
            slider.value = '1';
            canvas.removeEventListener('click', a6_mouseclick_seq_2);
            console.log('Open hot fluid pump outlet valve');
            //document.getElementById("a6-question-div-box").innerText = "Open hot fluid pump valve";
            pp.showdescription(`<p class='discription_text'>Click on 'p' button on control panel to turn on the pump</p>`, 3);
            //canvas.addEventListener("click",a6_mouseclick_seq_3);
            //add rotation of glass section valve open green color
            //all_valves[1].img="green color" change stpt angle
            all_valves[1].img = purple_valve;
            all_valves[1].stang = 45;
            all_valves[1].stpt.y = 510;
            draw_seq_all();
            // let a6_text = new Chemistry.Text("Open hot fluid pump outlet valve", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();
            a6_mouseclick_seq_3();
            show_right_pannel(3);
        }
    }
    // a6_check_isinside_cold_in(x,y);
}
function a6_mouseclick_seq_3() {
    seq = 4;
    canvas.removeEventListener('click', a6_mouseclick_seq_3);
    console.log('Click pump power on');
    canvas.addEventListener('click', a6_mouseclick_seq_35);
    // a6_add_slider();
}
function a6_mouseclick_seq_35(e) {
    pp.showdescription(`<p class='discription_text'>Please wait for the animation to complete</p>`, 3);
    show_right_pannel(3);
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (y >= 692 && y <= 765) {
        if (x >= 871 && x <= 943) {
            console.log('here');
            seq = 4;
            canvas.removeEventListener('click', a6_mouseclick_seq_35);
            console.log('Pump animation');
            pupm_con.color = 'green';
            var second_geo = new Chemistry.anim_image(seq2_img, new Chemistry.Point(470, 440), 709, 650, canvas);
            seq_container.push(second_geo);
            second_geo.name = 'third';
            second_geo.l = 1;
            second_geo.l_last = 600;
            second_geo.width = 380;
            // let slider: HTMLInputElement = <HTMLInputElement>(
            // 	document.getElementById('a6_slider')
            // );
            // slider.value = '1';
            draw_seq_all();
        }
    }
    // a6_check_isinside_cold_in(x,y);
}
function a6_mouseclick_seq_7(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (y >= 688 && y <= 769) {
        if (x >= 943 && x <= 1020) {
            seq = 8;
            canvas.removeEventListener('click', a6_mouseclick_seq_7);
            canvas.addEventListener('click', a6_mouseclick_seq_8);
            // canvas.addEventListener('click', a6_mouseclick_seq_9);
            canvas.addEventListener('click', a6_mouseclick_timer_start);
            console.log('Heater on');
            pupm_con.color1 = 'green';
            //start timer
            console.log('click on up arrow to select desire temperature and click start on timer');
            //timer image
            var second_geo = new Chemistry.anim_image(seq5_img, new Chemistry.Point(1000, 325), 290, 210, canvas);
            seq_container.push(second_geo);
            second_geo.name = 'timer';
            second_geo.l = 210;
            second_geo.l_last = 210;
            second_geo.width = 0;
            draw_seq_all();
            index_temp_con = -1;
            // let a6_text = new Chemistry.Text("click on up arrow to select desire temperature and click start on timer", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();
            // document.getElementById("a6-question-div-box").innerText = "Click Buttons on Temp Controller to select a Temperature";
            pp.showdescription(`<p class='discription_text'>Click on up and down arrow on temp controller to select the temperature</p>`, 3);
            show_right_pannel(3);
        }
    }
    // a6_check_isinside_cold_in(x,y);
}
function a6_mouseclick_seq_8(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (y >= 408 && y <= 440) {
        if (x >= 700 && x <= 780) {
            // new_task_6('');
            //get temp text
            seq = 9;
            console.log('temp up controller event');
            // let a6_text = new Chemistry.Text("temp up controller event", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();
            // canvas.removeEventListener("click",a6_mouseclick_seq_7);
            if (seq_container.length > 2) {
                seq_container.splice(2, seq_container.length);
            }
            if (index_temp_con < temp_con.length - 1) {
                index_temp_con++;
                console.log(index_temp_con);
            }
            let temp_con_value = get_temp_con_value();
            var second_geo = new Chemistry.Geo_Text(temp_con_value.toString(), new Chemistry.Point(670, 390), canvas);
            selected_temp = temp_con_value;
            set_global_temp_ind(temp_con_value);
            console.log('the selected temp value is: ' + temp_con_value);
            second_geo.textalingment = 'center';
            seq_container.push(second_geo);
            second_geo.name = 'temp_con';
            draw_seq_all();
            pp.showdescription(`<p class='discription_text'>Click on start button to Start the timer</p>`, 3);
            if (show_once) {
                show_right_pannel(3);
                show_once = false;
            }
        }
    }
    // a6_check_isinside_cold_in(x,y);
}
function a6_mouseclick_seq_9(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (y >= 335 && y <= 380) {
        if (x >= 700 && x <= 780) {
            // new_task_6('');
            //get temp text
            seq = 9;
            console.log('temp down controller event');
            // let a6_text = new Chemistry.Text("temp down controller event", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();
            // canvas.removeEventListener("click",a6_mouseclick_seq_7);
            if (seq_container.length > 2) {
                seq_container.splice(2, seq_container.length);
            }
            if (index_temp_con > 0) {
                // index_temp_con--;
            }
            let temp_con_value = get_temp_con_value();
            var second_geo = new Chemistry.Geo_Text(temp_con_value.toString(), new Chemistry.Point(670, 390), canvas);
            selected_temp = temp_con_value;
            set_global_temp_ind(temp_con_value);
            // for (let i = 0; i < readings.length; i++) {
            // 	if (
            // 		Math.round(temp_con_value) == Math.round(readings[i].temp)
            // 	) {
            // 		selected_data_index = i;
            // 	}
            // }
            console.log('the selected temp value is: ' + temp_con_value);
            second_geo.textalingment = 'center';
            seq_container.push(second_geo);
            second_geo.name = 'temp_con';
            draw_seq_all();
        }
        pp.showdescription(`<p class='discription_text'>Click on start button to Start the timer</p>`, 3);
    }
    // a6_check_isinside_cold_in(x,y);
}
var timer_anim = true;
function a6_mouseclick_timer_start(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (y >= 240 && y <= 290) {
        if (x >= 900 && x <= 970) {
            //get temp text
            if (index_temp_con >= 0) {
                seq = 10;
                console.log('timer start');
                pp.showdescription(`<p class='discription_text'>Start Timer</p>`, 3);
                console.log('stop the time after steady state temp i.e. after 900 sec');
                pp.showdescription(`<p class='discription_text'>stop the time after steady state temp i.e. after 900 sec</p>`, 3);
                show_right_pannel(3);
                // let a6_text = new Chemistry.Text("stop the time after steady state temp i.e. after 900 sec", new Chemistry.Point(1125, 600), canvas);
                // a6_text.color = "yellow";
                // a6_text.font = "24px";
                // a6_text.draw();
                //  document.getElementById("a6-question-div-box").innerText = "stop the time after steady state temp i.e. after 900 sec";
                // pp.showtitle(
                // 	'stop the time after steady state temp i.e. after 900 sec',
                // 	3
                // );
                canvas.removeEventListener('click', a6_mouseclick_seq_8);
                canvas.removeEventListener('click', a6_mouseclick_seq_9);
                canvas.removeEventListener('click', a6_mouseclick_timer_start);
                seq_container[1].img = seq6_img;
                let settime = 0;
                //timer text
                var second_geo = new Chemistry.Geo_Text(settime.toString(), new Chemistry.Point(984, 332), canvas);
                seq_container.push(second_geo);
                second_geo.font = '24px Arial';
                second_geo.textalingment = 'center';
                second_geo.name = 'timer text';
                //Ti text
                var Ti_text = get_Ti_text();
                var Ti_value = new Chemistry.Geo_Text(Ti_text.toString(), new Chemistry.Point(310, 324), canvas);
                seq_container.push(Ti_value);
                Ti_value.textalingment = 'center';
                //To text
                var To_text = get_To_text();
                var To_value = new Chemistry.Geo_Text(To_text.toString(), new Chemistry.Point(310, 696), canvas);
                seq_container.push(To_value);
                To_value.textalingment = 'center';
                //ti text
                var ti_text = get_ti_text();
                var ti_value = new Chemistry.Geo_Text(ti_text.toString(), new Chemistry.Point(335, 432), canvas);
                seq_container.push(ti_value);
                ti_value.textalingment = 'center';
                //ti text
                var to_text = get_to_text();
                var to_value = new Chemistry.Geo_Text(to_text.toString(), new Chemistry.Point(165, 640), canvas);
                seq_container.push(to_value);
                to_value.textalingment = 'center';
                // var ii=1;
                anim_timer();
                function anim_timer() {
                    second_geo.text = settime.toString();
                    Ti_value.text = get_Ti_text().toString();
                    To_value.text = get_To_text().toString();
                    draw_seq_all();
                    settime += 5;
                    // console.log(ii);
                    if (settime <= 900) {
                        // ii++;
                        window.requestAnimationFrame(anim_timer);
                    }
                    else {
                        console.log('click stop timer');
                        timer_anim = true;
                        seq_container[1].img = seq7_img;
                        // let a6_text = new Chemistry.Text("click stop timer", new Chemistry.Point(1125, 600), canvas);
                        // a6_text.color = "yellow";
                        // a6_text.font = "24px";
                        // a6_text.draw();
                        //  document.getElementById("a6-question-div-box").innerText = "stop the timer";
                        pp.showdescription(`<p class='discription_text'>stop the timer</p>`, 3);
                        canvas.addEventListener('click', a6_mouseclick_timer_stop);
                        show_right_pannel(3);
                        anim_timer_900_more();
                    }
                }
                function anim_timer_900_more() {
                    second_geo.text = settime.toString();
                    settime++;
                    draw_seq_all();
                    if (timer_anim) {
                        window.requestAnimationFrame(anim_timer_900_more);
                    }
                    else {
                        console.log('timer has stoped');
                        seq_container[1].img = seq8_img;
                        draw_seq_all();
                        console.log('Click to reset the timer');
                        // let a6_text = new Chemistry.Text("Click to reset the timer", new Chemistry.Point(1125, 600), canvas);
                        // a6_text.color = "yellow";
                        // a6_text.font = "24px";
                        // a6_text.draw();
                        //   document.getElementById("a6-question-div-box").innerText = "Click to reset the timer";
                        pp.showdescription(`<p class='discription_text'>Click to reset the timer</p>`, 3);
                        show_right_pannel(3);
                        canvas.addEventListener('click', a6_mouseclick_timer_reset);
                        //add event listern to reset
                    }
                }
            }
        }
    }
}
function a6_mouseclick_timer_stop(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (y >= 240 && y <= 290) {
        if (x >= 1080 && x <= 1160) {
            //get temp text
            seq = 11;
            timer_anim = false;
            console.log('timer stopping');
            canvas.removeEventListener('click', a6_mouseclick_timer_stop);
        }
    }
}
function a6_mouseclick_timer_reset(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (y >= 240 && y <= 290) {
        if (x >= 970 && x <= 1015) {
            //get temp text
            seq = 12;
            timer_anim = false;
            console.log('timer reset');
            seq_container[3].text = '0';
            canvas.removeEventListener('click', a6_mouseclick_timer_reset);
            seq_container[1].img = seq5_img;
            draw_seq_all();
            canvas.addEventListener('click', a6_mouseclick_seq_12);
            console.log('close outlet glass valve');
            // let a6_text = new Chemistry.Text("close outlet glass valve and start timer", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();
            //   document.getElementById("a6-question-div-box").innerText = "Close outlet gas valve and start timer";
            pp.showdescription(`<p class='discription_text'>Close outlet glass valve</p>`, 3);
            show_right_pannel(3);
        }
    }
}
function a6_mouseclick_seq_12(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (y >= 477 && y <= 550) {
        if (x >= 593 && x <= 660) {
            seq = 13;
            canvas.removeEventListener('click', a6_mouseclick_seq_12);
            console.log('Glass valve closed');
            //add rotation of glass section valve closed
            seq_container[0].img = seq9_img;
            let glass = new Chemistry.anim_image(seq10_img, new Chemistry.Point(470, 440), 709, 650, canvas);
            glass.l = 475;
            glass.l_last = 575;
            glass.width = 200;
            glass.startx = 400;
            seq_container.push(glass);
            readingtime = 0;
            //glass outlet valve to red img change stpt and angle
            //all_valves[0].img="red color"
            all_valves[1].img = blue_valve;
            all_valves[1].stang = 0;
            all_valves[1].stpt.y = 520;
            draw_seq_all();
            //animate glass section fill
        }
    }
}
function a6_mouseclick_seq_14(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (y >= 477 && y <= 550) {
        if (x >= 593 && x <= 660) {
            seq = 15;
            canvas.removeEventListener('click', a6_mouseclick_seq_14);
            var second_geo1 = new Chemistry.anim_image_y_dir_down(seq4_img, new Chemistry.Point(470, 440), 709, 650, canvas);
            all_valves[1].img = purple_valve;
            all_valves[1].stang = 45;
            all_valves[1].stpt.y = 510;
            all_valves[1].draw();
            seq_container.push(second_geo1);
            second_geo1.name = 'fifth';
            second_geo1.startx = 400;
            second_geo1.l = 80;
            second_geo1.l_last = 500;
            second_geo1.width = 1;
            draw_seq_all();
        }
    }
}
//console.log("the selected temp value is: " + readings[selected_ind].reading[0][1]);
function get_Ti_text() {
    // if 81 then 81.2 if 83 then 83.2
    Ti += temp_diff_1 / 181.0; //81.2-28.2=53 181 is the no of times loop execute check data set
    return Ti.toFixed(2);
    // return shell_table.T1[selected_ind];
}
function get_To_text() {
    //if 81 then 71.2 if 83 then 66.5
    To += temp_diff_2 / 181.0; //71.2-28.2=43 181 is the no of times loop execute check data set
    return To.toFixed(2);
    // To = shell_table.T2[selected_ind]; //71.2-28.2=43 181 is the no of times loop execute check data set
    // console.log('To', To);
    // return To;
    // return 'T2';
}
function get_ti_text() {
    // var ti = (To = readings[selected_ind].reading[0][3]);
    // return ti.toFixed(2);
    var ti = shell_table['t1'];
    return ti;
}
function get_to_text() {
    //if 81 to 28.3 if 83 to 30
    // var to = readings[selected_ind].reading[0][4];
    // return to.toFixed(2);
    var to = shell_table['t2'];
    return to;
}
var index_temp_con = -1;
temp_con[0] = shell_table.T1[0]; //from data set
function get_temp_con_value() {
    console.log(temp_con[index_temp_con]);
    let temp = temp_con[index_temp_con];
    return temp;
}
function a6_check_isinside_cold_in(x, y) {
    console.log(x, y);
    if (x <= 489 && x >= 400) {
        if (y >= 371 && y <= 455) {
            console.log('condition satisfied');
            //cold inlet valve click check
            var second_geo = new Chemistry.anim_image(seq1_img, new Chemistry.Point(470, 440), 709, 650, canvas);
            seq_container.push(second_geo);
            second_geo.name = 'second';
            second_geo.l = 290;
            second_geo.l_last = 525;
            second_geo.width = 380;
            seq = 1;
            draw_seq_all();
            //add rotation of cold inlet valve open
            canvas.removeEventListener('click', a6_mouseclick);
        }
    }
}
var selected_ind = -1;
// function act7_btn() {
// 	let btn: HTMLButtonElement = <HTMLButtonElement>(
// 		document.createElement('button')
// 	);
// 	//document.getElementById("result-101").innerText = "Click Next";
// 	btn.innerText = 'Next';
// 	btn.setAttribute('class', 'btn btn-info');
// 	btn.style.fontSize = '1.1vw';
// 	btn.setAttribute('id', 'a6-last-button');
// 	btn.onclick = function () {
// 		activity7();
// 	};
// 	document.getElementById('ts').style.display = 'none';
// 	document.getElementById('panel-bottom').appendChild(btn);
// }
// function fill_table(index: number) {
// 	pp.clearleftpannel();
// 	pp.clearrightpannel();
// 	pp.addoffcanvas(3);
// 	pp.showtitle(
// 		'<p style="background-color: #A8A196; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 1.2vw; width:100%; text-align:center;">Fill the table and verify data</p>',
// 		3
// 	);
// 	let label3 = document.getElementById('offcanvasRightLabel3');
// 	label3.style.width = '20vw';
// }
function set_global_temp_ind(temp_value) {
    for (let i = 0; i < shell_table.T1.length; i++) {
        if (shell_table.T1[i] == temp_value) {
            selected_ind = i;
            temp_diff_1 = shell_table.T1[selected_ind] - shell_table.t1;
            temp_diff_2 = shell_table.T2[selected_ind] - shell_table.t1;
            Ti = shell_table.t1 - temp_diff_1 / 181.0;
            To = shell_table.t1 - temp_diff_2 / 181.0;
        }
    }
    console.log('index set to ' + selected_ind);
}
function load_observation_table() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle(`<p id='exp-title' > Observation Table </p>`, 3);
    pp.showdescription(`<p class='discription_text'>Fill the observation table and verify the data</p>`, 3);
    show_right_pannel(3);
    let ob_table = `<div style="height: 40%" class='table-responsive'>
   <table class="table">

      <thead class="table-dark">
         <tr id="header-1">
            <th>S no.</th>
            <th>t (sec)</th>
            <th>T1</th>
            <th>T2</th>
            <th>t1</th>
            <th>t2</th>
            <th>Verify</th>
         </tr>
      </thead>

      <tbody id="table-body-1">
         <tr>
            <td>1</td>
            <td>${shell_table.t[0]}</td>
            <td>
               <input type='text' class='form-control' id='T1-inp' style='width: 100%' />
            </td>
            <td>
               <input type='text' class='form-control' id='T2-inp' style='width: 100%' />
            </td>
            <td>
               <input type='text' class='form-control' id='t1-inp' style='width: 100%' />
            </td>
            <td>
               <input type='text' class='form-control' id='t2-inp' style='width: 100%' />
            </td>
            <td>
               <input type='button' class='btn btn-primary' id='verify-ob-btn' style='width: 100%'
                  onclick='verify_ob_table();' value='Verify' />
            </td>
         </tr>
      </tbody>
   </table>
   </div>`;
    pp.addtoleftpannel(ob_table);
}
function load_observation_table_data() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    let ob_table = `<div class='table-responsive'>
   <table class="table">
      <thead class="table-dark">
         <tr id="header-1">
            <th>S no.</th>
            <th>t (sec)</th>
            <th>T1</th>
            <th>T2</th>
            <th>t1</th>
            <th>t2</th>
         </tr>
      </thead>
      <tbody id="table-body-1">
         ${generateRows()}
      </tbody>
   </table>
</div>`;
    pp.addtoleftpannel(ob_table);
    pp.showtitle(`<p id='exp-title'>Observation table data</p>`, 3);
    pp.addtorightpannel(`<button id="panel2_btn" class="btn btn-primary" onclick="activity7()" style="position: absolute; font-size:1.1vw; left:2.5vh; bottom: 12vh;  width: 90%;">Next</button>`, 3);
    show_right_pannel(3);
}
function generateRows() {
    let rowsHtml = '';
    console.log(shell_table.T1.length);
    for (let i = 0; i < shell_table.T1.length; i++) {
        rowsHtml += `
   <tr>
      <td>${i + 1}</td>
      <td>${shell_table.t[i]}</td>
      <td>${shell_table.T1[i]}</td>
      <td>${shell_table.T2[i]}</td>
      <td>${shell_table.t1}</td>
      <td>${shell_table.t2}</td>
   </tr>`;
    }
    return rowsHtml;
}
function verify_ob_table() {
    console.log('observation table');
    console.log(shell_table.T1[0]);
    console.log(shell_table.T2[0]);
    console.log(shell_table.t1);
    console.log(shell_table.t2);
    let val1 = (document.getElementById('T1-inp'));
    let val2 = (document.getElementById('T2-inp'));
    let val3 = (document.getElementById('t1-inp'));
    let val4 = (document.getElementById('t2-inp'));
    if (!verify_values(parseFloat(val1.value), shell_table.T1[0])) {
        alert('Value for T1 is wrong');
        return;
    }
    if (!verify_values(parseFloat(val2.value), shell_table.T2[0])) {
        alert('Value for T2 is wrong');
        return;
    }
    if (!verify_values(parseFloat(val3.value), shell_table.t1)) {
        alert('Value for t1 is wrong');
        return;
    }
    if (!verify_values(parseFloat(val4.value), shell_table.t2)) {
        alert('Value for t2 is wrong');
        return;
    }
    ob_table_verified = true;
    alert('All values are correct');
    let btn = (document.getElementById('verify-ob-btn'));
    btn.disabled = true;
    val1.disabled = true;
    val2.disabled = true;
    val3.disabled = true;
    val4.disabled = true;
    if (ob_table_verified) {
        load_observation_table_data();
    }
}
// activity6();
//# sourceMappingURL=activity6.js.map