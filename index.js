const CDN_URL = "https://ee-deploy-website.s3.amazonaws.com/ee_suv/";

// car model colors data
const colors = [
  {
    name: "Red Crystal",
    id: "RedCrystalMetallic",
  },
  {
    name: "Blue Crystal",
    id: "CrystalBlue",
  },
  {
    name: "Gray Metallic",
    id: "GrayMetallic",
  },
  {
    name: "Snowflex White",
    id: "Snowflexwhite",
  },
  {
    name: "Silver Metallic",
    id: "SilverMetallic",
  },
  {
    name: "Jet Black",
    id: "JetBlack",
  },
];

// options for hotspot click
var options = {
  onEventClicked: ({message}) => {
    handleHotSpotClick(message);
  },
  onEventComplete: (message) => {},
};



// ---------  append one3d function script into html -----------
var script = document.createElement("script");
script.src = CDN_URL + "one3d/assets/SUV/one3d_functions.js";
script.type = "text/javascript";
script.onload = function () {
  initializeONE3D();
};
document.head.appendChild(script);




// -------- custom loading ---------

const loadingScreen = document.querySelector(".loading");
function getLoaderProgress(progress) {
  loadingScreen.innerHTML = `<span>${progress}%</span><progress value=${progress} max='100'>${progress}</progress> `;
}




// ----- init ONE3D Model -----------
function initializeONE3D() {
  ONE3D.init("one3d", CDN_URL + "one3d/", "SUV", "SUV", {
    showDefaultLoader: false,
    color: "RedCrystalMetallic",
  })
    .then((res) => {
      loadingScreen.style.display = "none";
      ONE3D.registerClickAction(options);
    })
    .catch((err) => {
      console.log(err);
    });
}



// --------  model color change ---------


// append dynamic option into select tag
const select = document.querySelector("#colors-options");
colors.forEach(({ name, id }) => {
  const option = document.createElement("option");
  option.value = id;
  option.innerText = name;
  select.append(option);
});


// change model color function on select color
select.addEventListener("change", (e) => {
  changeModelColor(e.target.value);
});

function changeModelColor(color) {
  ONE3D.changeColor(color)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}



// ------------- handle interior/exterior show/hide btn  ---------------------------
const interiorBtn = document.querySelector("#interior-btn");
const exteriorBtns = document.querySelector("#exterior-btns");
const frontSeatBtn = document.querySelector("#frontSeat");
frontSeatBtn.style.display = 'none';
const backSeatBtn = document.querySelector("#backSeat");


// --* handle Interior View *--
function handleInteriorView() {
  

  ONE3D.interiorView()
    .then((res) => {
      changeBtnView( { showButton : exteriorBtns , hideButton : interiorBtn } );
    })
    .catch((err) => {
      console.log(err);
    });
}

// --* handle Exterior View *--
function handleExteriorView() {
  
  ONE3D.exteriorView()
    .then((res) => {
      changeBtnView( { showButton : interiorBtn , hideButton : exteriorBtns } );
    })
    .catch((err) => {
      console.log(err);
    });
}

// --* FrontSeat View *--
function handleFrontSeatView(){
  
  ONE3D.frontseatView()
    .then((success) => {
      changeBtnView( { showButton : backSeatBtn , hideButton : frontSeatBtn } );
    })
    .catch((error) => {
      console.log(error);
    });
}

// --* BackSeat View *--
function handleBackSeatView(){
  

  ONE3D.backseatView()
    .then((success) => {
      changeBtnView( { showButton : frontSeatBtn , hideButton : backSeatBtn } );
    })
    .catch((error) => {
      console.log(error);
    });

}


// ------- Common function for visible btns on click --------
function changeBtnView( { showButton , hideButton } ) {
  showButton.style.display = "inline-block" ;
  hideButton.style.display = "none";
}



// ------- handle hotSpotClick ---------------
function handleHotSpotClick(message){
  switch(message){
    case 'Interior View Start':
      changeBtnView( { showButton : exteriorBtns , hideButton : interiorBtn } );
      break
    case 'Exterior View Start':
      changeBtnView( { showButton : interiorBtn , hideButton : exteriorBtns } );
      break;
    case 'Interior Front Seat View Start' :
      changeBtnView( { showButton : backSeatBtn , hideButton : frontSeatBtn } );
      break;
    case 'Interior Back Seat View Start':
      changeBtnView( { showButton : frontSeatBtn , hideButton : backSeatBtn } );
      break;
   }

}

// ------------ window resize -----------------
window.addEventListener("resize", function () {
  ONE3D.resizeWindow();
});
