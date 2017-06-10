function castom() {
  console.log("s start");
  
  /*ShowcaseFilter*/
  const firstShowcaseItems = document.querySelectorAll("#showcase-1 .card");
  const secondShowcaseItems = document.querySelectorAll("#showcase-2 .card");

  firstShowcaseItems.forEach(function(item, i, arr) {
    if(item.dataset.status == "1" || item.dataset.status == "all") {
       item.classList.add("card--visible");
     }
  });

  secondShowcaseItems.forEach(function(item, i, arr) {
     if (item.dataset.status == "2" || item.dataset.status == "all") {
       item.classList.add("card--visible");
     }
  });
  /*endShowcaseFilter*/

  /*Sort*/

  const controlsPrice = document.querySelectorAll(".js-sort-price .js-option");
  const controlsType = document.querySelectorAll(".js-sort-type .js-option");
  const items = document.querySelectorAll("#showcase-1 .card--visible");

  var sortParamPrice = "less";
  var sortParamType = "1";

  function sort(price, type) {
    items.forEach(function(item, i, arr) {
      item.classList.remove("card--visible"); 
      if (item.dataset.priceGroup == price && item.dataset.type == type) {
         item.classList.add("card--visible");
      }
    });
  }

  controlsPrice.forEach(function(item, i, arr) {
    item.addEventListener("click", function(e) {
      e.preventDefault();
      sortParamPrice = item.dataset.priceGroup;
      
      sort(sortParamPrice, sortParamType);
    });
  });  

  controlsType.forEach(function(item, i, arr) {
    item.addEventListener("click", function(e) {
      e.preventDefault();
      sortParamType = item.dataset.type;
      
      sort(sortParamPrice, sortParamType);
    });
  });

  sort(sortParamPrice, sortParamType);

  /*EndSort*/

  /*Modals*/
  function toggleModal(window, creator, killer) {
    creator.forEach(function(item, i, arr) {
    	item.addEventListener("click", function(e) {
  	    e.preventDefault();
  	    window.classList.add("modal--visible");
  	  });
    });
    
    killer.addEventListener("click", function(e) {
      e.preventDefault();
      window.classList.remove("modal--visible");
    });
  }

  /* initScrollToId */

  $(".page-header__nav-item").mPageScroll2id();

  /* initScrollToId */

  /*MfpModals*/

  $('.js-open-advice').magnificPopup({
    type:'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  $('.js-open-order').magnificPopup({
    type:'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  /*EndMfpModals*/

  /*Options*/
  // function initSwitch(options) {
  //   const curWrap = document.querySelector(".options__current");
  //   const otherWrap = document.querySelector(".options__variants");

  //   var curOption = document.querySelector(".options__current input");
  //   var otherOptions = document.querySelectorAll(".options__variants input");

  //   otherOptions.forEach((item, i, arr) => {
  //     item.addEventListener("click", (e) => {
  //       e.preventDefault();
        
  //       curOption.classList.remove("options__current-variant");
  //       otherWrap.insertBefore(curOption, otherWrap.firstChild);

  //       item.classList.add("options__current-variant");
  //       curWrap.insertBefore(item, curWrap.firstChild);

  //       initSwitch(options);
  //     });
  //   });
  // }

  function addOptions(selector) {
    var optionsCurrent = document.querySelector(selector + " " + ".options__current");
    var optionsVariants = document.querySelector(selector + " " + ".options__variants");
    var optionsVariant = document.querySelectorAll(selector + " " + ".options__variant");
    var optionsCurrentVariant = document.querySelector(selector + " " + ".options__current-variant");

    optionsCurrent.addEventListener("click", (e) => {
      e.preventDefault();
      optionsVariants.classList.toggle("options__variants--visible");
    });

    // initSwitch(selector);
  }

  addOptions(".js-sort-type-wrap");
  addOptions(".js-sort-price-wrap");
  /*EndOptions*/

  /*Feedback*/
  const feedbackSlider = new Siema({
    selector: '.feedback__items',
    duration: 250,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: false,
    threshold: 20,
    loop: false,
    onInit: () => {},
    onChange: () => {},
  });

  const feedbackSliderPrev = document.querySelector(".feedback__slider .slider__control--left");
  const feedbackSliderNext = document.querySelector(".feedback__slider .slider__control--right");
  const feedbackItems = document.querySelectorAll(".feedback__item");
  console.log("Items: " + feedbackItems.length);

  feedbackSliderPrev.addEventListener("click", () => feedbackSlider.prev());
  feedbackSliderNext.addEventListener("click", () => feedbackSlider.next());

  Siema.prototype.addPagination = function() {
    const pagination = document.querySelector(".feedback__slider .slider__pagination");

    for (let i = 0; i < feedbackItems.length; i++) {
      const paginationItem = document.createElement("li");
      paginationItem.classList.add("slider__pagination-item");
      pagination.appendChild(paginationItem);
    }

    for (let i = 0; i < feedbackItems.length; i++) {
      const paginationsItems = document.querySelectorAll(".feedback__slider .slider__pagination-item");
      paginationsItems[0].classList.add("slider__pagination-item--current");
      paginationsItems[i].addEventListener("click", () => {
        paginationsItems.forEach(function(item, i, arr) {
          item.classList.remove("slider__pagination-item--current");
        });
        paginationsItems[i].classList.add("slider__pagination-item--current");
        this.goTo(i);
      });
    }
  };

  feedbackSlider.addPagination();

  const feedbackPaginationItems = document.querySelectorAll(".feedback__slider .slider__pagination-item");
  console.log("pagiItems: " + feedbackPaginationItems.length);

  feedbackSliderNext.addEventListener("click", () => {
    for (let i = 0; i < feedbackPaginationItems.length; i++) {
      if (i != (feedbackPaginationItems.length - 1) && feedbackPaginationItems[i].classList.contains("slider__pagination-item--current")) {
        var next = (i + 1);
        feedbackPaginationItems[i].classList.remove("slider__pagination-item--current");
        feedbackPaginationItems[next].classList.add("slider__pagination-item--current");
        break;
      };
    };
  });

  feedbackSliderPrev.addEventListener("click", () => {
    for (let i = 0; i < feedbackPaginationItems.length; i++) {
      if (i != 0 && feedbackPaginationItems[i].classList.contains("slider__pagination-item--current")) {
        var prev = (i - 1);
        feedbackPaginationItems[i].classList.remove("slider__pagination-item--current");
        feedbackPaginationItems[prev].classList.add("slider__pagination-item--current");
        break;
      };
    };
  });

  /*EndFeedback*/

  console.log("s end");
}