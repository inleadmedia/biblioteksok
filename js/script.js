(function($) {
  'use strict';

  
/**
 * Creates header snippet
 */
function LibrarySnippet() {
  this.maskSrcXL = "images/mask-xxl.png";
  this.bgSrc = "images/t.png";
  this.targetObjLarge = document.getElementById("target-large");
  this.slidesImages = ["images/indesign.jpg", "images/ulver.jpg", "images/vitenskapp.jpg", "images/sunn-mat.jpg", "images/klassisk-musikk.jpg", "images/bursdag.jpg"];
  this.targetId = 'target-x-large-0';
  this.targetWrapperClass = 'wr-target-x-large';
  this.slideTitle = "Biblioteksøk";
  
  this.itemImage = this.generateImageBg(this.slidesImages);
  if($('body').hasClass('custom-header')) {
    this.createImageMask(this.maskSrcXL, this.itemImage, this.targetObjLarge, this.targetWrapperClass);
    this.fadeInBg(this.targetId);
  }
  this.setTitle(this.slideTitle);
  this.setImageHeight();
}

/**
 * Creates title and animation
 */
LibrarySnippet.prototype.setTitle = function(text) {
  var textOverlayWrapper = "<div class='text-overlay-0'><h1></h1></div>";
  $(textOverlayWrapper).insertAfter($('.overlay-image'));

  $('.image-wrapper').find('h1').typed({
    strings: [text],
    typeSpeed: 60,
    backDelay: 500,
    loop: false,
    contentType: 'html',
    loopCount: false,
    onStringTyped: function() {
      $('.typed-cursor').css('-webkit-animation', 'none');
      $('.typed-cursor').css('-moz-animation', 'none');
    },
  });
};

LibrarySnippet.prototype.fadeInBg = function(obj) {
  $('#' + obj).delay(500).fadeIn(500);
}

/**
 * Returns random image from array
 */
LibrarySnippet.prototype.generateImageBg = function(obj) {
  var item = obj[Math.floor(Math.random()*obj.length)];
  return item;
};

/**
 * Sets height to the header
 */
LibrarySnippet.prototype.setImageHeight = function() {
  if($('body').hasClass('custom-header')) {
    var elementNewHeight = Math.round($(window).width()*0.8/2.75);
    $('.image-wrapper').height(elementNewHeight - 1);
    $('.image-wrapper #' + LibrarySnippet.targetId).height(elementNewHeight - 1);
  }
}

/**
 * Creates canvas using mask png image and random image from array
 * Background image is set to 100% width and is centered verticaly
 */
LibrarySnippet.prototype.createImageMask = function(maskSrc, bgSrc, targetObj, targetWrapperClass) {
  var mask = new Image(), bg = new Image();
  var mDf = $.Deferred(), bgDf = $.Deferred();
  mask.src = maskSrc;
  bg.src = bgSrc;
  mask.addEventListener("load", function() { mDf.resolve(this); });
  bg.addEventListener("load", function() { bgDf.resolve(this); });
  var canvas = document.createElement("canvas"), ctx = canvas.getContext('2d');
  var targetNew = $('<canvas/>',{'id':'target-x-large-0'}).prop({width: 1435, height: 521});

  var targetNewHtml = targetNew[0].outerHTML;
  var targerWrapper = "<div class=" + targetWrapperClass + ">" + targetNewHtml + "</div>";

  $(targerWrapper).insertAfter($('.image-bg'));
  var target = document.getElementById('target-x-large-0'), targetCtx = target.getContext('2d');

  $.when(mDf, bgDf).done(function(){
    var l = (bg.width / 2) - (mask.width / 2), t = (bg.height / 2) - (mask.height / 2);
    var imageRatio = bg.width/bg.height;
    var newImageHeight =  mask.width / imageRatio;
    
    canvas.width = bg.width;
    canvas.height = bg.height;
    ctx.drawImage(mask, l, t, mask.width, mask.height);
    ctx.globalCompositeOperation = "source-in";
    ctx.drawImage(bg, l, 0, mask.width, newImageHeight);
    
    var imageData = ctx.getImageData(l, t, mask.width, newImageHeight);                                       
    targetCtx.putImageData(imageData, 0, 0);  
  });
}

// On load start the header app.
window.addEventListener('load', function() {
  new LibrarySnippet();
});

// On resize changes header heigth.
window.addEventListener('resize', function() {
  LibrarySnippet.prototype.setImageHeight();
});
}(jQuery));