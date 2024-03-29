(function($) {
  'use strict';

  
/**
 * Creates header snippet
 */
function LibrarySnippet() {
  this.maskSrcXL = "images/mask-xxl.png";
  this.gradientSrc = "images/g.png";
  this.targetObjLarge = document.getElementById("target-large");
  this.slidesImages = ["images/small.jpg", "images/indesign.jpg"];
  this.targetId = 'target-x-large-0';
  this.targetWrapperClass = 'wr-target-x-large';
  this.slideTitle = "Biblioteksøk";
  
  this.itemImage = this.generateImageBg(this.slidesImages);
  if($('body').hasClass('custom-header')) {
    this.createImageMask(this.maskSrcXL, this.itemImage, this.targetObjLarge, this.targetWrapperClass, this.gradientSrc);
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
    var elementNewHeight = $('.mask-image').height();
    $('.image-wrapper').height(elementNewHeight);
  }
}

/**
 * Creates canvas using mask png image and random image from array
 * Background image is set to 100% width and is centered verticaly
 */
LibrarySnippet.prototype.createImageMask = function(maskSrc, bgSrc, targetObj, targetWrapperClass, gradientSrc) {
  var mask = new Image(), bg = new Image(), gradient = new Image();
  var mDf = $.Deferred(), bgDf = $.Deferred(), gDf = $.Deferred();
  mask.src = maskSrc;
  bg.src = bgSrc;
  gradient.src = gradientSrc;
  mask.addEventListener("load", function() { mDf.resolve(this); });
  bg.addEventListener("load", function() { bgDf.resolve(this); });
  gradient.addEventListener("load", function() { gDf.resolve(this); });
  var canvas = document.createElement("canvas"), ctx = canvas.getContext('2d');
  var targetNew = $('<canvas/>',{'id':'target-x-large-0'}).prop({width: 1435, height: 521});
  var targetNewHtml = targetNew[0].outerHTML;
  var targerWrapper = "<div class=" + targetWrapperClass + ">" + targetNewHtml + "</div>";

  $(targerWrapper).insertAfter($('.image-bg'));
  var target = document.getElementById('target-x-large-0'), targetCtx = target.getContext('2d');

  $.when(mDf, bgDf, gDf).done(function(){
    var l = (bg.width / 2) - (mask.width / 2), t = (bg.height / 2) - (mask.height / 2);
    var imageRatio = bg.width/bg.height;
    var newImageHeight =  mask.width / imageRatio;
    var headerHeight = $('.image-wrapper').height();
    var headerWidth = $('.image-wrapper').width();
    var newImageWidth =  mask.height * imageRatio;
    var imageXPosition = (mask.width - newImageWidth);
    canvas.width = mask.width;
    canvas.height = mask.height;

    ctx.drawImage(mask, 0, 0, mask.width, mask.height);
    ctx.globalCompositeOperation = "source-in";
    ctx.drawImage(gradient, imageXPosition, 0, gradient.width, gradient.height);
    ctx.globalCompositeOperation = "source-in";
    ctx.drawImage(bg, imageXPosition, 0, newImageWidth, mask.height);

    var imageData = ctx.getImageData(0, 0, mask.width, mask.height);                                       
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