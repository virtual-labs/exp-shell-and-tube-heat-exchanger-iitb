declare var MathJax;

let data_1 = [];
let data_2 = [];

let first_table_verified = false;
let second_table_verifed = false;

function activity7() {
	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addoffcanvas(3);
	pp.addoffcanvas(4);

	pp.showtitle(
		'<p style="background-color: #A8A196; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 1.2vw; width:100%; text-align:center;">Calculate data for table</p>',
		3
	);
	let label3 = document.getElementById('offcanvasRightLabel3');
	label3.style.width = '20vw';

	pp.showdescription(
		`<p style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 1.2vw;"><b> Constants</b> <br><br>
   &rho; = 0.835 gm/cc <br>
   cp = 2.71 J/gm-k <br>
   k = 0.127 w/m-k <br>
   &mu; = 2.941 cp <br>
   IDtube = 0.3 cm <br>
   ODtube = 0.5 cm <br>
   No. of tubes = 19 <br>
   Length = 20 cm <br>
   volume = 1140 cc <br>
   shellid = 5 cm <br>
   pitch tri = 0.8 cm <br>
   Baf sp = 5 cm <br>
   C = 0.5 cm <br>
   vol flow rate = 190 cc/s <br>
   t<sub>1</sub> = 32.9&deg;C <br>
   t<sub>2</sub> = 33.1&deg;C <br>
   c<sub>val</sub> = 3.048129612 <br>
   b<sub>val</sub> = 0.5710080628 <br>
   </p>`,
		3
	);

	pp.showtitle(
		'<p style="background-color: #A8A196; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 1.2vw; width:100%; text-align:center;">Formula for calculation</p>',
		4
	);
	let label4 = document.getElementById('offcanvasRightLabel4');
	label4.style.width = '20vw';

	pp.showdescription(
		`<p>
   $$ Surface Area(S) = \\frac &pi; 4 × (IDtube)^2 $$ <br>
   $$ Heat Transfer Area(HTA) = &pi; × \\frac {IDtube} {100} × \\frac {Length} {100} × No. of tubes $$ <br>
   $$ De = 4 × \\frac {(pitch tri)^2 - (&pi; × \\frac {(ODtube)^2} {4})} {&pi; × ODtube} $$ <br>
   $$ Shell surface area = shellid × C × \\frac {Baf sp} {pitch tri} $$ <br>
   $$ Shell flow velocity = \\frac {vol flow rate} {Shell suraface area} $$ <br>
   $$ t_{avg} = \\frac {t_1 + t_2} {2} $$ <br>
   $$ v = \\frac {volume} {t} $$ <br>
   $$ m = v × \\frac {3600} {1000} × &rho; $$ <br>
   $$ u = \\frac {v} {S × No. of tubes} $$ <br>
   $$ LMTD = \\frac {(T1 - t_{avg}) - (T2 - t_{avg})} {\\log(\\frac {T1 - t_{avg}}{T2 - t_{avg}})} $$ <br>
   $$ Q = m × (cp × 0.239) × (T1-T2) $$ <br>
   $$ U_i = \\frac {Q} {HTA × LMTD} $$ <br>
   $$ Re = \\frac {IDtube × u × &rho;} {&mu; × 10^{-2}} $$ <br>
   $$ Pr = \\frac {(cp × 0.239) × (&mu; × 0.001) × 3600} {k × 0.859} $$ <br>
   $$ \\frac {1} {h_o} = \\frac {1}{5000} $$ <br>
   $$ \\frac {1} {h_i} = \\frac {1} {U_i} - \\frac {1}{h_o} $$ <br>
   $$ hi_{exp} = \\frac {1}{\\frac {1}{h_i}} $$ <br>
   $$ hi_{theo} = c_{val} × Re^{0.453} × Pr^{b_{val}} $$ <br>
</p>`,
		4
	);

	let hide_btn: HTMLButtonElement = <HTMLButtonElement>(
		document.getElementsByClassName('offcanvasbtn')[1]
	);
	hide_btn.style.display = 'none';

	let formula_btn = `<button class='btn btn-primary' onclick='show_right_pannel(4);' style='width: 10%; margin: 2%;'>Show Formula</button>`;

	pp.addtoleftpannel(formula_btn);
	load_table();
	MathJax.typeset();

	show_right_pannel(3);
}

function load_table() {
	data_1[0] = [];
	data_2[0] = [];

	let heading_1 = [
		'S No.',
		't (s)',
		'T1 (&deg;C)',
		'T2 (&deg;C)',
		'v (cc/s)',
		'm (kg/hr)',
		'u, (cm/s)',
		'LMTD (C)',
		'Q (kcal/hr)',
		'Ui, (kcal/hr m2 C)',
		'log(Ui)',
		'log(m)',
		'Verify',
	];

	let heading_2 = [
		`S No.`,
		`t (s)`,
		`m<sup>0.453</sup>`,
		`1/m<sup>0.453</sup>`,
		`Re`,
		`Pr`,
		`1/Ui`,
		`1/ho`,
		`1/hi`,
		`hi_exp`,
		`hi_theo`,
		'Verify',
	];

	//load data for first table
	data_1[0].push('1');
	data_1[0].push(shell_table['t'][0]);
	data_1[0].push(shell_table['T1'][0]);
	data_1[0].push(shell_table['T2'][0]);
	data_1[0].push(
		`<input type='text' class='form-control' id='v-inp' style='width: 100%' />`
	);
	data_1[0].push(
		`<input type='text' class='form-control' id='m-inp' style='width: 100%' />`
	);
	data_1[0].push(
		`<input type='text' class='form-control' id='u-inp' style='width: 100%' />`
	);
	data_1[0].push(
		`<input type='text' class='form-control' id='lmtd-inp' style='width: 100%' />`
	);
	data_1[0].push(
		`<input type='text' class='form-control' id='q-inp' style='width: 100%' />`
	);
	data_1[0].push(
		`<input type='text' class='form-control' id='ui-inp' style='width: 100%' />`
	);
	data_1[0].push(
		`<input type='text' class='form-control' id='lnui-inp' style='width: 100%' />`
	);
	data_1[0].push(
		`<input type='text' class='form-control' id='lnm-inp' style='width: 100%' />`
	);
	data_1[0].push(
		`<input type='button' class='btn btn-primary' id='verify-1-btn' style='width: 100%' onclick='verify_table_1();' value='Verify' />`
	);

	//load data for second table
	data_2[0].push('1');
	data_2[0].push(shell_table['t'][0]);
	data_2[0].push(
		`<input type='text' class='form-control' id='m453-inp' style='width: 100%' />`
	);
	data_2[0].push(
		`<input type='text' class='form-control' id='m1-inp' style='width: 100%' />`
	);
	data_2[0].push(
		`<input type='text' class='form-control' id='re-inp' style='width: 100%' />`
	);
	data_2[0].push(
		`<input type='text' class='form-control' id='pr-inp' style='width: 100%' />`
	);
	data_2[0].push(
		`<input type='text' class='form-control' id='ui1-inp' style='width: 100%' />`
	);
	data_2[0].push(
		`<input type='text' class='form-control' id='ho1-inp' style='width: 100%' />`
	);
	data_2[0].push(
		`<input type='text' class='form-control' id='hi1-inp' style='width: 100%' />`
	);
	data_2[0].push(
		`<input type='text' class='form-control' id='hi_exp-inp' style='width: 100%' />`
	);
	data_2[0].push(
		`<input type='text' class='form-control' id='hi_theo-inp' style='width: 100%' />`
	);
	data_2[0].push(
		`<input type='button' class='btn btn-primary' id='verify-2-btn' style='width: 100%' onclick='verify_table_2();' value='Verify' />`
	);

	let table = new Double_Table(heading_1, data_1, heading_2, data_2);
	pp.addtoleftpannel(table.template);
	table.draw();
}

function load_table_data() {
	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addoffcanvas(3);

	pp.showtitle(`<p id='exp-title'>All the data are shown here</p>`, 3);

	let heading_1 = [
		'S No.',
		't (s)',
		'T1 (&deg;C)',
		'T2 (&deg;C)',
		'v (cc/s)',
		'm (kg/hr)',
		'u, (cm/s)',
		'LMTD (C)',
		'Q (kcal/hr)',
		'Ui, (kcal/hr m2 C)',
		'log(Ui)',
		'log(m)',
	];

	let heading_2 = [
		`S No.`,
		`t (s)`,
		`m<sup>0.453</sup>`,
		`1/m<sup>0.453</sup>`,
		`Re`,
		`Pr`,
		`1/Ui`,
		`1/ho`,
		`1/hi`,
		`hi_exp`,
		`hi_theo`,
	];

	for (let i = 0; i < shell_table['t'].length; i++) {
		data_1[i] = [];
		data_2[i] = [];

		//load data for first table
		data_1[i].push(i + 1);
		data_1[i].push(shell_table['t'][i].toFixed(4));
		data_1[i].push(shell_table['T1'][i].toFixed(4));
		data_1[i].push(shell_table['T2'][i].toFixed(4));
		data_1[i].push(shell_table['v'][i].toFixed(4));
		data_1[i].push(shell_table['m'][i].toFixed(4));
		data_1[i].push(shell_table['u'][i].toFixed(4));
		data_1[i].push(shell_table['lmtd'][i].toFixed(4));
		data_1[i].push(shell_table['Q'][i].toFixed(4));
		data_1[i].push(shell_table['Ui'][i].toFixed(4));
		data_1[i].push(shell_table['ln_Ui'][i].toFixed(4));
		data_1[i].push(shell_table['ln_m'][i].toFixed(4));

		//load data for second table
		data_2[i].push(i + 1);
		data_2[i].push(shell_table['t'][i].toFixed(4));
		data_2[i].push(shell_table['m453'][i].toFixed(4));
		data_2[i].push(shell_table['m1'][i].toFixed(4));
		data_2[i].push(shell_table['Re'][i].toFixed(4));
		data_2[i].push(shell_table['Pr'][i].toFixed(4));
		data_2[i].push(shell_table['Ui1'][i].toFixed(4));
		data_2[i].push(shell_table['ho1'][i].toFixed(4));
		data_2[i].push(shell_table['hi1'][i].toFixed(4));
		data_2[i].push(shell_table['hi_exp'][i].toFixed(4));
		data_2[i].push(shell_table['hi_theo'][i].toFixed(4));
	}

	let table = new Double_Table(heading_1, data_1, heading_2, data_2);
	pp.addtoleftpannel(table.template);
	table.draw();
	pp.addtorightpannel(
		`<button id="panel2_btn" class="btn btn-primary" onclick="activity8()" style="position: absolute; font-size:1.1vw; left:2.5vh; bottom: 12vh;  width: 90%;">Next</button>`,
		3
	);
	// show_right_pannel(3);
}

function verify_table_1() {
	console.log('table data');

	for (var key in shell_table) {
		console.log(key, shell_table[key]);
	}

	let val1: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('v-inp')
	);
	let val2: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('m-inp')
	);
	let val3: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('u-inp')
	);
	let val4: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('lmtd-inp')
	);
	let val5: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('q-inp')
	);
	let val6: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('ui-inp')
	);
	let val7: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('lnui-inp')
	);
	let val8: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('lnm-inp')
	);

	if (!verify_values(parseFloat(val1.value), shell_table.v[0])) {
		alert('Value for V is wrong');
		return;
	}
	if (!verify_values(parseFloat(val2.value), shell_table.m[0])) {
		alert('Value for m is wrong');
		return;
	}
	if (!verify_values(parseFloat(val3.value), shell_table.u[0])) {
		alert('Value for u is wrong');
		return;
	}
	if (!verify_values(parseFloat(val4.value), shell_table.lmtd[0])) {
		alert('Value for lmtd is wrong');
		return;
	}
	if (!verify_values(parseFloat(val5.value), shell_table.Q[0])) {
		alert('Value for Q is wrong');
		return;
	}
	if (!verify_values(parseFloat(val6.value), shell_table.Ui[0])) {
		alert('Value for Ui is wrong');
		return;
	}
	if (!verify_values(parseFloat(val7.value), shell_table.ln_Ui[0])) {
		alert('Value for log(Ui) is wrong');
		return;
	}
	if (!verify_values(parseFloat(val8.value), shell_table.ln_m[0])) {
		alert('Value for log(m) is wrong');
		return;
	}

	first_table_verified = true;

	alert('Your Calculations are correct');

	let btn: HTMLButtonElement = <HTMLButtonElement>(
		document.getElementById('verify-1-btn')
	);

	btn.disabled = true;

	val1.disabled = true;
	val2.disabled = true;
	val3.disabled = true;
	val4.disabled = true;
	val5.disabled = true;
	val6.disabled = true;
	val7.disabled = true;
	val8.disabled = true;

	if (first_table_verified && second_table_verifed) {
		load_table_data();
	}

	// var bsOffcanvas = new bootstrap.Offcanvas(
	// 	document.getElementById('offcanvasRight3')
	// );
	// bsOffcanvas.show();
}

function verify_table_2() {
	console.log('table data');

	for (var key in shell_table) {
		console.log(key, shell_table[key]);
	}

	let val1: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('m453-inp')
	);
	let val2: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('m1-inp')
	);
	let val3: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('re-inp')
	);
	let val4: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('pr-inp')
	);
	let val5: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('ui1-inp')
	);
	let val6: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('ho1-inp')
	);
	let val7: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('hi1-inp')
	);
	let val8: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('hi_exp-inp')
	);
	let val9: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('hi_theo-inp')
	);

	if (!verify_values(parseFloat(val1.value), shell_table.m453[0])) {
		alert('Value for m^0.453 is wrong');
		return;
	}
	if (!verify_values(parseFloat(val2.value), shell_table.m1[0])) {
		alert('Value for m^(-0.453) is wrong');
		return;
	}
	if (!verify_values(parseFloat(val3.value), shell_table.Re[0])) {
		alert('Value for Re is wrong');
		return;
	}
	if (!verify_values(parseFloat(val4.value), shell_table.Pr[0])) {
		alert('Value for Pr is wrong');
		return;
	}
	if (!verify_values(parseFloat(val5.value), shell_table.Ui1[0])) {
		alert('Value for Ui^(-1) is wrong');
		return;
	}
	if (!verify_values(parseFloat(val6.value), shell_table.ho1[0])) {
		alert('Value for ho^(-1) is wrong');
		return;
	}
	if (!verify_values(parseFloat(val7.value), shell_table.hi1[0])) {
		alert('Value for hi^(-1) is wrong');
		return;
	}
	if (!verify_values(parseFloat(val8.value), shell_table.hi_exp[0])) {
		alert('Value for hi_exp is wrong');
		return;
	}
	if (!verify_values(parseFloat(val9.value), shell_table.hi_theo[0])) {
		alert('Value for hi_theo is wrong');
		return;
	}

	second_table_verifed = true;

	alert('Your Calculations are correct');

	let btn: HTMLButtonElement = <HTMLButtonElement>(
		document.getElementById('verify-2-btn')
	);

	btn.disabled = true;

	val1.disabled = true;
	val2.disabled = true;
	val3.disabled = true;
	val4.disabled = true;
	val5.disabled = true;
	val6.disabled = true;
	val7.disabled = true;
	val8.disabled = true;
	val9.disabled = true;

	if (first_table_verified && second_table_verifed) {
		load_table_data();
	}

	// var bsOffcanvas = new bootstrap.Offcanvas(
	// 	document.getElementById('offcanvasRight3')
	// );
	// bsOffcanvas.show();
}

// activity7();
