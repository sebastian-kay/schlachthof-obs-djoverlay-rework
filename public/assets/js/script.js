	
	let djnow;
	let djnext;
	let djbefore;
	let djdata;
	let styleArray;
	let data_db;
	let settings_db;
	let djs_db;
	let obc1 = new BroadcastChannel('obc1');

	MyObject = {
		abc: function() {
			fetch('/load_data_db')
				.then((response) => response.json())
				.then((data) => {
					data_db = data;
					console.log('data_db 1: ' + JSON.stringify(data_db));
				});
		}
	}

	function load_data_db(){
		fetch('/load_data_db')
			.then((response) => response.json())
			.then((data) => {
				data_db = data;
				//settings_db = data_db.settings;
				//djs_db = data_db.djs;
				//dj_name = djs_db[settings_db.djnow].djname;
				//dj_style = djs_db[settings_db.djnow].style;
				//let dj_style_array = new Array(djs_db[settings_db.djnow].style);
				//console.log('data_db: ' + JSON.stringify(data_db));
				//console.log('settings_db: ' + JSON.stringify(settings_db));
				//console.log('dj_name: ' + dj_name);
				//console.log('dj_style_length: ' + dj_style.length);
				//console.log('dj_style: ' + dj_style);
				//console.log('dj_style_array: ' + dj_style_array);

				//for(let i in dj_style) {
				//	console.log('dj_style_'+ i +': ' + dj_style[i]);
				//}
			});
	}

	/*
	function readdjdaga(switchanimation, saveonly){
		const switchAnimation = switchanimation;
		const saveOnly = saveonly;
		
		fetch('/djdata')
			.then((response) => response.json())
			.then((data) => {
				data_db = JSON.stringify(data);
				console.log('djdata: ' + data_db);
					console.log(data_db);
				settings_db = data_db[0].info;
					console.log("settings_db: " + settings_db);

				djs_db = data_db.djs;
					console.log(djs_db);

				djdata = data;
				djnow = data.data[0].info.djnow;
				djnext = data.data[0].info.djnext;
				djbefore = data.data[1].djs[djnow].djname;

				nextdj_ani_duration = Number(data.data[0].info.switch_dj_anim_duration);
				if (typeof(inputDJ_name) != 'undefined' && inputDJ_name != null){
					nextDJ_switch_duration.value = Number(nextdj_ani_duration) / 1000;
				
					inputDJ_name.value = data.data[1].djs[djnow].djname;
					inputDJ_info.value = data.data[1].djs[djnow].info;
					inputDJ_style.value = data.data[1].djs[djnow].style.replace(/\,/g,", ");
				
					if(saveOnly === false){
						selectDJ.innerHTML = "";
						for(let i in data.data[1].djs) {
							const selected = data.data[1].djs[i].id == djnow ? "selected" : "";
							const isguestdj = data.data[1].djs[i].id == 0 ? "Gast: " : "";
							selectDJ.innerHTML += '<option value="'+data.data[1].djs[i].id+'" '+selected+'>'+isguestdj+data.data[1].djs[i].djname+'</option>';
						}
					}
				}
				
				// djnext textContent
				if (typeof(djnext_name) != 'undefined' && djnext_name != null)
					{
					djnext_name.textContent = data.data[1].djs[djnow].djname;
					djnext_info.textContent = data.data[1].djs[djnow].info;
					if(data.data[1].djs[djnow].djimage){
						djnext_image.style.backgroundImage = 'url("assets/img/dj_images/' + data.data[1].djs[djnow].djimage + '")';
					} else {
						djnext_image.style.backgroundImage = 'url("assets/img/dj_images/none.svg")';
					}
					styleArray = data.data[1].djs[djnow].style.split(",");
					djnext_style.innerHTML = "";
					for(let i in styleArray) {
					  djnext_style.innerHTML += '<span class="badge bg-sh-brown mb-2"><i class="fa-solid fa-hashtag mr-0"></i><span class="text-uppercase">'+styleArray[i]+'</span></span>';
					}
				}
				
				if (switchAnimation){
					console.log("switch animation" + switchanimation);
					if (typeof(topbox) != 'undefined' && topbox != null)
					{
						topbox.classList.remove("hide");
						//animateCSS('#topbox', 'bounceIn');
						topbox.classList.add('animate__animated', 'animate__bounceIn');
						topbox_loading_bar.style.animationDuration = nextdj_ani_duration + "ms";
						topbox_loading_bar.classList.add('animation');
						
						setTimeout( () => {
							djnext_name.classList.remove("hide");
							djnext_style.classList.remove("hide");
							djnext_image_wrapper.classList.remove("hide");
							animateCSS('#djnext_name', 'bounceIn');
							animateCSS('#djnext_style', 'bounceIn');
							animateCSS('#djnext_image_wrapper', 'bounceIn');
						}, 500 );
						
						setTimeout( () => {
							topbox.classList.remove('animate__animated', 'animate__bounceIn');
						}, 1000 );
						
						setTimeout( () => {
							topbox.classList.add('animate__animated', 'animate__bounceOut');
							topbox_loading_bar.classList.remove('animation');
						}, nextdj_ani_duration );
					}
					if (typeof(djbox) != 'undefined' && djbox != null)
					{
						setTimeout( () => {
							djbox.classList.add('hide');
						}, 2500 );

						const timeout4 = setTimeout( () => {
							djbox.classList.remove('hide');
							djbox.classList.add('animate__animated', 'animate__bounceInDown');
						}, nextdj_ani_duration + 1000 );

						const timeout5 = setTimeout( () => {
							djbox.classList.remove('animate__animated', 'animate__bounceInDown');
						}, nextdj_ani_duration + 4000 );
					}
					
				}
				
				// djnow textContent
				if (typeof(djbox) != 'undefined' && djbox != null)
					{
						setTimeout( () => {
							djnow_name.textContent = data.data[1].djs[djnow].djname;
							djnow_info.textContent = data.data[1].djs[djnow].info;
							if(data.data[1].djs[djnow].djimage){
								djnow_image.style.backgroundImage = 'url("assets/img/dj_images/' + data.data[1].djs[djnow].djimage + '")';
							} else {
								djnow_image.style.backgroundImage = 'url("assets/img/dj_images/none.svg")';
							}
							styleArray = data.data[1].djs[djnow].style.split(",");
							//console.log("Styles: "+styleArray.length);
							djnow_style.innerHTML = "";
							for(let i in styleArray) {
							djnow_style.innerHTML += '<span class="badge bg-sh-brown mb-2"><i class="fa-solid fa-hashtag mx-1"></i><span class="text-uppercase mr-1">'+styleArray[i]+'</span></span>';
							}
							if (switchAnimation){
								if (typeof(topbox) != 'undefined' && topbox != null)
								{
									topbox.classList.remove("hide");
									topbox.classList.remove('animate__animated', 'animate__bounceOut');
								}
							}
						}, 3000);
					}
			});
	};
	*/

	function testput(saveonly){
		
		if (typeof(inputDJ_name) != 'undefined' && inputDJ_name != null){
			djdata.data[1].djs[selectDJ.value].djname = inputDJ_name.value;
			djdata.data[1].djs[selectDJ.value].info = inputDJ_info.value;
			djdata.data[1].djs[selectDJ.value].style = inputDJ_style.value.replace(/\, /g,",");
			djdata.data[0].info.switch_dj_anim_duration = Number(nextDJ_switch_duration.value) * 1000;
		}
		
		if(saveonly === false){
			djdata.data[0].info.djnow = selectDJ.value;
		}
		djdata.data[0].info.djnext = 0;
		console.log(djdata);
		console.log(djdata.data[0].info.djnow);
		
		fetch('/djdata_put', {
			method: 'POST', // or 'PUT'
			headers: {
			'Content-Type': 'application/json',
		},
			body: JSON.stringify(djdata),
			//body: djdata,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				//readdjdaga();
			});
		
	}
	
	obc1.onmessage = (messageEvent) => {
    // If our broadcast message is 'update_title' then get the new title from localStorage
    if (messageEvent.data === 'chage_dj') {
		readdjdaga(true);
    } else if (messageEvent.data === 'save_dj') {
		readdjdaga(false);
	}
  }
  //load_data_db();
  //readdjdaga(false, false);
  console.log("scripts.js loaded !");
	
	
	