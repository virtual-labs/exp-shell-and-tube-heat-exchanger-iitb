var act4_table = `   
 <div style="text-align: center; padding: 2% 0; font-size: 4vw;">
Shell & Tube Heat Exchanger
</div>

<div>
<table class="table">
      <tbody id="act4-table">
         <tr id="a4-rho">
            <td style=" font-size: 2.2vw;" scope="row">Density (&rho;)</td>
            <td id="a4-rho-unit1" style=" font-size: 2.2vw;">0.835 gm/cc</td>
            <td id="a4-rho-unit2" style=" font-size: 2.2vw;">835 kg/cu.m</td>
         </tr>
         <tr id="a4-cp">
            <td style=" font-size: 2.2vw;" scope="row">Heat Capacity (C<sub>p</sub>)</td>
            <td id="a4-cp-unit1" style=" font-size: 2.2vw;">2.71 J/gm-k</td>
            <td id="a4-cp-unit2" style=" font-size: 2.2vw;">0.64769 kcal/kg C</td>
         </tr>
         <tr id="a4-k">
            <td style=" font-size: 2.2vw;" scope="row">Thermal Conductivity (K)</td>
            <td id="a-k-unit1" style=" font-size: 2.2vw;">0.127 w/m-k</td>
            <td id="a-k-unit2" style=" font-size: 2.2vw;">0.10909 kcal/hr m C</td>
         </tr>

         <tr id="a4-mu">
            <td style=" font-size: 2.2vw;" scope="row">Viscosity (&mu;)</td>
            <td id="a4-mu-unit1" style=" font-size: 2.2vw;" >2.941 cp</td>
            <td id="a4-mu-unit2" style=" font-size: 2.2vw;">0.00294kg/m S</td>
         </tr>
      </tbody>
   </table>
</div>
`;

var ob_btn_5 = `<button id="panel1_btn" class="btn btn-primary" onclick="activity6()" style="bottom: 12.5%">Next</button>`;

function activity4() {
	pp.clearleftpannel();
	pp.clearrightpannel();

	pp.addoffcanvas(3);

	pp.showtitle(
		`
      <p id="exp-title">Shell & Tube Heat Exchanger</p>
   `,
		3
	);

	pp.showdescription(
		'<p style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: 1.3vw;">Note down these values and click on next to start simulation</p>',
		3
	);
	// show_right_pannel(3);

	pp.addtorightpannel(ob_btn_5, 3);
	pp.addtoleftpannel(act4_table);
}

// activity4();
