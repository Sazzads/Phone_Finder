//add input 
const input = document.getElementById('input');

//add show all 
const showAll = document.getElementById('all-show');
showAll.style.display = "none";

//add Search Button 
const search = document.getElementById('search-btn');

//add main card 
const cardParent = document.getElementById('card-main');

//add popup menu 
const popupContainer = document.getElementById('popup-menu');

//add error messege 
const errorText = document.getElementById('error-sms');
const errorImg = document.getElementById('error-image');
errorText.style.display = "none";
errorImg.style.display = "none";

// Error 
const error = (value) => {
    errorText.style.display = value;
    errorImg.style.display = value;
}
//add spinner 
const spinner = (value) => {
    if (value) {
        search.innerHTML = `<div class="spinner-border me-1"style="height:23px;width:23px" role="status">
     <span class="visually-hidden">
     Phone Loading...
     </span>
     </div><span class="fw-bolder">
     please wait..
     </span>`
    }
}
//add search button 
search.addEventListener('click', () => {
    showAll.style.display = "none";
    //add input in Case Sensitive
    const inputText = input.value.toLowerCase();
    input.value = '';
    spinner(true);

    popupContainer.textContent = '';
    if (inputText === '' || isNaN(inputText) === false) {
        error('block');
        cardParent.textContent = '';

        //add to remove spinner loading
        search.innerText = 'Search'
    }
    else {
        error('none')
        // add api url
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => loadData(data));
    }
})
// show all mobile data .
const loadData = (value) => {
    if (value.data.length > 20) {
        showAll.style.display = "block";
        showAll.style.margin = '0 auto'
    }
    showAll.addEventListener('click', () => {
        cardParent.textContent = '';
        showData(value.data);
        error('none')
    })
    showData(value.data.slice(0, 20));
}
// show data  display
const showData = (data) => {
    // clear main-card 
    cardParent.textContent = '';

    if (data.length === 0) {
        // remove the spinner loading
        search.innerText = 'Search'
        error('block');
        return;
    }
    // single data
    data.forEach(x => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col">
        <div class="card bg-light mx-auto h-100 shadow py-3">
          <img src="${x.image}" class="mx-auto card-img-top w-50" alt="">

          <div class="card-body">
            <h6 class="card-title fw-bold"> Name: <span class="text-success">${x.phone_name}</span></h6>
            <p class="card-text fw-bold">Brand: <span class ="text-success">${x.brand}</span></p>
            <button class="btn btn-info text-white"onclick="showDetailsData('${x.slug}')">Show Details</button>
          </div>
        </div>
      </div>
        `;
        cardParent.appendChild(div);
    })
    // remove spinner loading
    search.innerText = 'Search'
}
// load Details data
const showDetailsData = (details) => {
    // set new url 
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}
// show details
const showDetails = (detailsData) => {
    window.scrollTo(0, 100);
    popupContainer.innerHTML = `
    <div class="justify-content-center align-items-center d-flex w-100 h-100 position-relative" >
             <div class="card mb-3 w-50 shadow">
             <span id="closeing"> <i class="fa-solid fa-square-xmark"></i> </span>
             <div class=" row g-0 d-flex flex-column align-items-center">
               <div class="col-md-12 col-lg-6 col-12  p-3">
                 <img src="${detailsData.image}" class="w-75  rounded-start" alt="">
               </div>
               <div class="col-md-12 col-lg-12 col-12 p-4">
                 <div class="card-body">
                   <h4 class="card-title text-info fw-bold"> Name: ${detailsData.name}</h4>
                   <hr>
                   <h5 class="card-title"><b>Release Date: ${detailsData.releaseDate ? detailsData.releaseDate : "</b><span class='text-danger'>Date is Not Found</span>"}</h5>
                   <hr>

                   <p class="card-text mb-0"></p>

                   <p class="fw-bold text-capitalize text-dark mb-0"><b>Main Features: </b></p>
                   <p  class="mb-0 text-muted">1.Storages: <small>${detailsData.mainFeatures.storage}</small> </p>
                   <p  class="mb-0 text-muted">2.ChipSet: <small>${detailsData.mainFeatures.chipSet} </small> </p>
                   <p class="mb-0 text-muted">2.DisplaySize: <small> ${detailsData.mainFeatures.displaySize}</small> </p>
                   <hr>
                   <p class=" fw-bold mb-0"><b>Sensors: </b></p>
                    <small class="mb-0 text-muted"> ${detailsData.mainFeatures.sensors} </small>
                    <hr>
                    <p class="fw-bold mb-0"><b>Others Information: </b></p>
                    <div class="text-muted">
                    <small class="mb-0">1.WLAN:  ${detailsData.others ? detailsData.others.WLAN : "unavailable"} </small><br>
                    
                    <small class="mb-0">2.Bluetooth:  ${detailsData.others ? detailsData.others.Bluetooth : "unavailable"} </small><br>
                    
                    <small class="mb-0">3.GPS:  ${detailsData.others ? detailsData.others.GPS : "unavailable"} </small><br>
                    
                    <small class="mb-0">4.USB: ${detailsData.others ? detailsData.others.USB : "unavailable"} </small><br>
                    <small class="mb-0">5.NFC: ${detailsData.others ? detailsData.others.NFC : "unavailable"} </small><br>
                    <small class="mb-0">6.Radio: ${detailsData.others ? detailsData.others.Radio : "unavailable"} </small>
                    </div>
                    <hr>
                 </div>
               </div>
             </div>
           </div>
      </div>
    `;
    popupContainer.style.display = 'block';
    // closeing
    document.getElementById('closeing').addEventListener('click', () => {
        popupContainer.style.display = 'none';
    });
}