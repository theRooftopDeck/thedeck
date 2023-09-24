include("js/jquery.color.js");
include("js/jquery.backgroundpos.js");
include("js/jquery.easing.js");
include("js/jquery.mousewheel.js");
include("js/jquery.fancybox-1.3.4.pack.js");
include("js/uScroll.js");
include("js/googleMap.js");
include("js/superfish.js");
include("js/switcher.js");
include("js/bgStretch.js");
include("js/forms.js");
include("js/MathUtils.js");

function include(url) {
    document.write('<script src="' + url + '"></script>');
}
var MSIE = true, content;

function addAllListeners() {    
    $('.readMore').each(function (){
        var val1 = $(this).css('color'),
            val2 = $(this).css('backgroundColor');
        $(this).hover(
            function(){
               $(this).stop().animate({'color':val2,'backgroundColor':val1},400,'easeOutCubic');  
            },
            function(){
                $(this).stop().animate({'color':val1,'backgroundColor':val2},600,'easeOutCubic');  
            }
        )
    });
    $('.btnup').hover(
        function(){
            $(this).stop().animate({'backgroundPosition':'center bottom'},300,'easeOutExpo');
        },
        function(){
            $(this).stop().animate({'backgroundPosition':'center top'},400,'easeOutCubic');
        }
    );
    $('.btndown').hover(
        function(){
            $(this).stop().animate({'backgroundPosition':'center top'},300,'easeOutExpo');
        },
        function(){
            $(this).stop().animate({'backgroundPosition':'center bottom'},400,'easeOutCubic');
        }
    );  
    var val3 = rgb2hex($('.closeBtn>strong').css('backgroundColor'))
    $('.closeBtn').hover(
        function(){
            if (!MSIE) {
    	       $('>strong',this).stop().animate({'backgroundColor':'#4c92fc'},400,'easeOutCubic');
            } else {
                $('>strong',this).css({'backgroundColor':'#4c92fc'});
            }  
        },
        function(){
            if (!MSIE) {
                $('>strong',this).stop().animate({'backgroundColor':val3},600,'easeOutCubic');  
            } else {
                $('>strong',this).css({'backgroundColor':val3});  
            }
        }
    ); 
	$('.list3>li>a, .list4>li>a')
    .find('strong').css('top','200px').end()
    .hover(
        function(){
            if (!MSIE){
                $(this).children('.sitem_over').css({display:'block',opacity:'0'}).stop().animate({'opacity':1}).end() 
                .find('strong').css({'opacity':0}).stop().animate({'opacity':1,'top':'0'},850,'easeOutElastic');
            } else { 
                $(this).children('.sitem_over').stop().show().end()
                .find('strong').stop().show().css({'top':'0'});
            }
        },
        function(){
            if (!MSIE){
                $(this).children('.sitem_over').stop().animate({'opacity':0},1000,'easeOutQuad',function(){$(this).children('.sitem_over').css({display:'none'})}).end()  
                .find('strong').stop().animate({'opacity':0,'top':'200px'},1000,'easeOutQuad');  
            } else {
                $(this).children('.sitem_over').stop().hide().end()
                .find('strong').stop().hide();
            }            
        }
    );
}

function showSplash(){
    $('.closeBtn').stop(true, true).animate({'right':'2000px'},800,'easeInOutExpo',function (){$(this).css('right','-2000px')})
}

function hideSplash(){
    $('.closeBtn').stop(true, true).delay(1000).animate({'right':'0'},1000,'easeOutExpo')
}

function hideSplashQ(){
    $('.closeBtn').stop(true, true).animate({'right':'0px'},0)
}

$(document).ready(ON_READY);
$(window).load(ON_LOAD);

function ON_READY() {
    /*SUPERFISH MENU*/   
    $('.menu #menu').superfish({
	   delay: 200,
	   animation: {
	       height: 'show'
	   },
       speed: 'slow',
       autoArrows: false,
       dropShadows: false
    });
    $('.splashMenu #splashMenu').superfish({
	   delay: 800,
	   animation: {
	       height: 'show'
	   },
       speed: 'slow',
       autoArrows: false,
       dropShadows: false
    });
}

function ON_LOAD(){
    MSIE = ($.browser.msie) && ($.browser.version <= 8);
    $('.spinner').fadeOut();
    
    $('.scroll')
	.uScroll({			
		mousewheel:true,
        step: 128
	})
    
    $('.list3>li>a, .list4>li>a').attr('rel','appendix')
    .prepend('<span class="sitem_over"><strong></strong></span>')
    $('.list3>li>a, .list4>li>a').fancybox({
        'transitionIn': 'elastic',
    	'transitionOut': 'elastic',
    	'speedIn': 500,
    	'speedOut': 300,
        'centerOnScroll': true,
        'overlayColor': '#000'
    });
        
    //content switch
    content = $('#content');
    content.tabs({
        show:0,
        preFu:function(_){
            _.li.css({'display':'none'});
            _.li.find('>div>div').css({'display':'none'});
            hideSplashQ();	
        },
        actFu:function(_){            
            if(_.curr){
                if (_.n == 0){
                    showSplash()
                } else {
                    hideSplash()
                }
                
                _.curr.css('display','block')
                .find('>div>div').each(function (ind){
                    $(this)
                        .css({'left':'2000px','display':'none'})
                        .stop(true).delay(ind*200+400).show().animate({'left':'0px'},{duration:1200,easing:'easeOutExpo'});
                });
            }
    		if(_.prev){
                var len = _.prev.find('>div>div').length;
                var cnt = 0;
                var prev = _.prev;
  		        _.prev.find('>div>div').each(function (ind){
                    $(this)
                        .show()
                        .stop(true).delay((ind)*100).animate({'left':'-2000px'},{duration:800,easing:'easeInOutExpo',complete:function(){
                            if (prev){
                                cnt ++; 
                                if (cnt == len) { prev.hide();}
                                prev.find('>div>div').hide()
                            }
                        }
		              });
                });
            }           
  		}
    });
    var nav = $('.menu');
    nav.navs({
		useHash:true,
        defHash: '#!/page_home',
        hoverIn:function(li){
            $('>a>span', li).eq(0).stop().animate({'marginTop': '-39px'},600,'easeOutElastic');
        },
        hoverOut:function(li){
            if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                $('>a>span',li).eq(0).stop().animate({'marginTop':'0'},500,'easeOutCubic');
            }
        }
    })
    .navs(function(n,_){
   	    $('#content').tabs(n);
        if (_.prevHash == '#!/page_mail') { 
            $('#form1 a').each(function (ind, el){
                if ($(this).attr('data-type') == 'reset') { $(this).trigger('click') }   
            })
        }
   	});
    var nav2 = $('.splashMenu');
    nav2.navs({
		useHash:true,
        defHash: '#!/page_home',
        hoverIn:function(li){
            $('>em',li).stop().animate({'width': '260px','height':'262px',
                                    'marginTop':'20px', 'marginBottom':'20px','marginLeft':'20px', 'marginRight':'20px'
            },600,'easeOutElastic');
            if (!li.hasClass('with_ul')) {
                $('>a>strong', li).stop().animate({'marginTop': '135px'},600,'easeOutElastic');
            } else {
                $('>a>strong', li).stop().animate({'marginTop': '58px'},600,'easeOutElastic');
                $('>em>span', li).stop().animate({'height': '100%'},600,'easeOutExpo');
            }
        },
        hoverOut:function(li){
            if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                $('>em',li).stop().animate({'width': '300px','height':'300px',
                                        'marginTop':'0', 'marginBottom':'0','marginLeft':'0', 'marginRight':'0'
                },500,'easeOutCubic');
                $('>a>strong',li).stop().animate({'marginTop':'233px'},900,'easeOutElastic');
                $('>em>span', li).stop().animate({'height': '0'},600,'easeOutCubic');
            }
        }
    })
    .navs(function(n,_){
   	    $('#content').tabs(n);
        if (_.prevHash == '#!/page_mail') { 
            $('#form1 a').each(function (ind, el){
                if ($(this).attr('data-type') == 'reset') { $(this).trigger('click') }   
            })
        }
   	});
    
    setTimeout(function(){
        $('#bgStretch').bgStretch({
    	   align:'rightBottom'
        })
    },0);
    
    setTimeout(function(){
        $('body').css({'overflow':'visible'});
        $(window).trigger('resize');    
    },300);    
    addAllListeners();
}

$(window).resize(function (){
    if (content) content.stop().animate({'top':(windowH()-content.height())*.5},500,'easeOutCubic');
});