(this["webpackJsonpmy-site"]=this["webpackJsonpmy-site"]||[]).push([[0],{17:function(e,a,t){e.exports=t(55)},22:function(e,a,t){},23:function(e,a,t){},24:function(e,a,t){},25:function(e,a,t){},55:function(e,a,t){"use strict";t.r(a);var s=t(0),n=t.n(s),o=t(11),c=t.n(o),i=t(3),l=t(4),r=t(6),m=t(5),u=(t(22),t(23),t(24),t(25),t(12)),d=t.n(u),v=(t(54),function(e){Object(r.a)(t,e);var a=Object(m.a)(t);function t(){return Object(i.a)(this,t),a.apply(this,arguments)}return Object(l.a)(t,[{key:"render",value:function(){return n.a.createElement("a",{href:this.props.url,target:"_blank",className:"socialMediaBtn"},n.a.createElement("i",{className:"fab socialMediaIcon "+this.props.icon}),n.a.createElement("div",{className:"socialMediaText"},this.props.text))}}]),t}(n.a.Component)),p=t(13),E=t(14),g=t(15),f=t(16),N=function(e){Object(f.a)(t,e);var a=Object(g.a)(t);function t(){var e;Object(p.a)(this,t);for(var s=arguments.length,n=new Array(s),o=0;o<s;o++)n[o]=arguments[o];return(e=a.call.apply(a,[this].concat(n))).state={isOpen:!1},e}return Object(E.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{id:this.props.id,className:"aboutWebSkill "+(1==this.state.isOpen?"openIconBox":"")},n.a.createElement("img",{className:"newHtmlIcon",src:this.props.iconImg}),n.a.createElement("div",{className:"newIconTitle"},this.props.iconTitle),n.a.createElement("div",{className:"newIconOpenBtn",onClick:function(){e.setState({isOpen:!e.state.isOpen})}},n.a.createElement("i",{className:"fas fa-angle-down arrowDown"})),n.a.createElement("div",{className:"iconDropdown"},this.props.children))}}]),t}(n.a.Component);function h(e){e.preventDefault()}var b=!1;try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){b=!0}}))}catch(O){}var I=!!b&&{passive:!1},w=!0;function T(){1==w&&(window.addEventListener("DOMMouseScroll",h,!1),window.addEventListener("touchmove",h,I),w=!1)}function M(){0==w&&(window.removeEventListener("DOMMouseScroll",h,!1),window.removeEventListener("touchmove",h,I),w=!0)}var k=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function S(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2e3,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"easeOutSine",s=window.scrollY,n=0,o=Math.max(.1,Math.min(Math.abs(s-e)/a,.8)),c=(Math.PI,{customEaseOut:function(e){return e/1.1},easeOutSine:function(e){return Math.sin(e*(Math.PI/2))},easeOutQuad:function(e){return e*(2-e)},easeOutQuart:function(e){return 1- --e*e*e*e},easeOutQuint:function(e){return 1+--e*e*e*e*e},easeInOutSine:function(e){return-.5*(Math.cos(Math.PI*e)-1)},easeInOutQuint:function(e){return(e/=.5)<1?.5*Math.pow(e,5):.5*(Math.pow(e-2,5)+2)}});function i(){var a=(n+=1/60)/o,l=c[t](a);a<1?0==window.isMouseDown&&(k(i),window.scrollTo(0,s+(e-s)*l)):window.scrollTo(0,e)}i()}function x(e,a,t){return Promise.race([fetch(e,a),new Promise((function(e,a){return setTimeout((function(){return a(new Error("REQUEST_TIMED_OUT"))}),t)}))])}window.isMouseDown=!1;var y=function(e){Object(r.a)(t,e);var a=Object(m.a)(t);function t(){var e;Object(i.a)(this,t);for(var s=arguments.length,o=new Array(s),c=0;c<s;c++)o[c]=arguments[c];return(e=a.call.apply(a,[this].concat(o))).carousel=n.a.createRef(),e.aboutSection=n.a.createRef(),e.portfolioSection=n.a.createRef(),e.contactSection=n.a.createRef(),e.carouselTouchStartX=0,e.isMouseDown=!1,e.state={section:"landing",isMenuOpen:!1,isHtmlMenuOpen:!1,isCssMenuOpen:!1,isJsMenuOpen:!1,openOrthoProject:!0,isScrolled:!1,isAnimating:!1,nameInputValue:"",emailInputValue:"",messageInputValue:"",isFormLoading:!1,overlayIcon:"",overlayTitle:"",overlayMessage:""},e.viewSection=function(a){e.setState({isMenuOpen:!1})},e.toggleMenu=function(a){a.stopPropagation(),0==e.state.isMenuOpen?(e.setState({isMenuOpen:!0}),T()):(e.setState({isMenuOpen:!1}),M())},e.sendEmail=function(){var a=encodeURIComponent(e.state.nameInputValue),t=encodeURIComponent(e.state.emailInputValue),s=encodeURIComponent(e.state.messageInputValue),n=!0;setTimeout((function(){1==n&&e.setState({isFormLoading:!0})}),500),x("sendEmail.php?name="+a+"&email="+t+"&msg="+s,{},5e3).then((function(a){n=!1,e.setState({isFormLoading:!1}),200!=a.status?(e.setState({overlayMessage:"Error "+a.status}),setTimeout((function(){e.setState({overlayMessage:""})}),4e3)):(e.setState({overlayIcon:"far fa-check-circle confirmIcon",overlayTitle:"Message Sent",overlayMessage:"Thank You!"}),setTimeout((function(){e.setState({overlayMessage:"",nameInputValue:"",emailInputValue:"",messageInputValue:""})}),3e3))})).catch((function(e){n=!1,this.setState({isFormLoading:!1}),console.log(e),console.log(typeof e),console.log(Object.getOwnPropertyNames(e)),console.log(e.message),0==navigator.onLine?this.setState({overlayIcon:"fas fa-wifi errorIcon",overlayTitle:"Connection Error",overlayMessage:"Check your internet connection"}):this.setState({overlayIcon:"fas fa-exclamation-triangle errorIcon",overlayTitle:"Error",overlayMessage:"Please try again"})}))},e}return Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.addEventListener("touchstart",(function(){}),!0),window.onscroll=function(a){a.currentTarget.scrollY>10&&0==e.state.isAnimating?e.setState({isScrolled:!0}):e.setState({isScrolled:!1})}}},{key:"render",value:function(){var e=this;return n.a.createElement("div",null,n.a.createElement("div",{className:"fixedBg"}),n.a.createElement("div",{id:"wrapper",onTouchStart:function(){window.isMouseDown=!0,e.setState({isAnimating:!1})},onTouchEnd:function(){window.isMouseDown=!1}},n.a.createElement("div",{id:"aboutBox",className:"about"==this.state.section&&0==this.state.isMenuOpen?"openBox":""},n.a.createElement("div",{className:"intro"},n.a.createElement("div",{className:"introLine"},"Hello! My name is"),n.a.createElement("div",{className:"myNameValue"}," Amer Albareedi")),n.a.createElement("div",{className:"effectGraphic"},n.a.createElement("img",{className:"ImgEffectL ImgEffect",src:"svgs/newEffect.svg"}),n.a.createElement("img",{className:"faceGraphic",src:"svgs/newProfile.svg"}),n.a.createElement("img",{className:"ImgEffectR ImgEffect",src:"svgs/newEffect.svg"})),n.a.createElement("div",{className:"introDescription"},n.a.createElement("div",null,"I am a Front-End Web Developer"),n.a.createElement("div",null,"helping businesses establish an"),n.a.createElement("div",null,"impactful online presence by"),n.a.createElement("div",null,"creating high-quality websites"),n.a.createElement("div",null,"optimized to best serve their users.")),n.a.createElement("div",{className:"icon-scroll "+(1==this.state.isScrolled?"hidden":"")},n.a.createElement("div",{className:"icon-arrows"},n.a.createElement("span",null))),n.a.createElement("div",{className:"responsiveWeb"},n.a.createElement("div",{className:"responWebText"},"Mobile-First Responsiveness"),n.a.createElement("img",{className:"responWebImg webMobileImg",src:"svgs/mobile.svg"}),n.a.createElement("img",{className:"responWebImg webTabletImg",src:"svgs/tablet.svg"}),n.a.createElement("img",{className:"responWebImg webLaptopImg",src:"svgs/laptop.svg"}),n.a.createElement("img",{className:"responWebImg webDesktopImg",src:"svgs/desktop.svg"}),n.a.createElement("img",{className:"responWebImg stroke strokeImg1",src:"svgs/stroke1.svg"}),n.a.createElement("img",{className:"responWebImg stroke strokeImg2",src:"svgs/stroke1.svg"}),n.a.createElement("img",{className:"responWebImg stroke strokeImg3",src:"svgs/stroke1.svg"})),n.a.createElement("div",{className:"aboutMeTitle",ref:this.aboutSection},"About Me"),n.a.createElement("div",{className:"aboutIntroText"},"Lorem ipsum, dolor sit amet adipisicing elit fugit natus modi volu ptas, conse ctetur odio nisi enim vero cumque quos. Lorem ipsum, dolor sit amet adipisicing elit fugit natus modi volu ptas, conse ctetur odio nisi enim vero cumque quos."),n.a.createElement("div",{className:"carouselContainer",onTouchStart:function(a){e.carouselTouchStartX=a.touches[0].clientX},onTouchMove:function(a){var t=e.carouselTouchStartX,s=a.touches[0].clientX;Math.abs(t-s)>30&&T()},onTouchEnd:function(e){M()}},n.a.createElement(d.a,{ref:function(a){e.carousel=a},buttonsDisabled:!0,className:"cardContainer"},n.a.createElement("div",{className:"aboutMeCard"},n.a.createElement("img",{className:"aboutEyeImg",src:"svgs/user.svg"}),n.a.createElement("div",{className:"aboutCardHeading"},"User-Focused"),n.a.createElement("div",{className:"aboutCardText"},"Understanding behavioral patterns allows for delivering the smoothest overall interaction.")),n.a.createElement("div",{className:"aboutMeCard"},n.a.createElement("img",{className:"thinkImg",src:"svgs/think1.svg"}),n.a.createElement("div",{className:"aboutCardHeading"},"Critical Thinker"),n.a.createElement("div",{className:"aboutCardText"},"Turning an idea into reality requires being well versed in solving a variety of problems.")),n.a.createElement("div",{className:"aboutMeCard"},n.a.createElement("img",{className:"thinkImg",src:"svgs/heart1.svg"}),n.a.createElement("div",{className:"aboutCardHeading"},"Passionate"),n.a.createElement("div",{className:"aboutCardText"},"My love for technology keeps me constantly curious."))),n.a.createElement("button",{className:"carouselBtn carouselBtn1",onClick:function(){e.carousel.slidePrev()}},n.a.createElement("i",{className:"fas fa-angle-left carouselIcon"})),n.a.createElement("button",{className:"carouselBtn carouselBtn2",onClick:function(){e.carousel.slideNext()}},n.a.createElement("i",{className:"fas fa-angle-right carouselIcon"}))),n.a.createElement("div",{className:"webSkills"},n.a.createElement("div",{className:"skillsTitle"},"Skills"),n.a.createElement(N,{iconImg:"svgs/html.svg",iconTitle:"HTML"},n.a.createElement("div",{className:"aboutIconTextWrapper"},n.a.createElement("div",{className:"aboutIconBullet"},"\u2022"),n.a.createElement("div",{className:"aboutIconText"},"Properly formatted structuring.")),n.a.createElement("div",{className:"aboutIconTextWrapper"},n.a.createElement("div",{className:"aboutIconBullet"},"\u2022"),n.a.createElement("div",{className:"aboutIconText"},"Accessibility and SEO friendly syntax always prioritized.")),n.a.createElement("div",{className:"aboutIconTextWrapper"},n.a.createElement("div",{className:"aboutIconBullet"},"\u2022"),n.a.createElement("div",{className:"aboutIconText"},"Cross browser compatibility."))),n.a.createElement(N,{id:"cssWebSkill",iconImg:"svgs/css.svg",iconTitle:"CSS"},n.a.createElement("div",{className:"webSkillContainer"},n.a.createElement("div",{className:"aboutIconTextWrapper"},n.a.createElement("div",{className:"aboutIconBullet"},"\u2022"),n.a.createElement("div",{className:"aboutIconText"},"Proficient understanding of The Box Model, along with Flexbox, Grid, & position.")),n.a.createElement("div",{className:"aboutIconTextWrapper"},n.a.createElement("div",{className:"aboutIconBullet"},"\u2022"),n.a.createElement("div",{className:"aboutIconText"},"Proficient understanding of The Box Model, along with Flexbox, Grid, & position."))),n.a.createElement("div",{className:"appIconsWrapper"},n.a.createElement("div",{className:"aboutWebIcon"},n.a.createElement("img",{className:"webskillIcon",src:"svgs/bootstrap.svg"}),n.a.createElement("div",null,"Bootstrap")),n.a.createElement("div",{className:"aboutWebIcon"},n.a.createElement("img",{className:"webskillIcon",src:"svgs/sass.svg"}),n.a.createElement("div",null,"SASS")))),n.a.createElement(N,{id:"jsWebSkill",iconImg:"svgs/js.svg",iconTitle:"JavaScript"},n.a.createElement("div",{className:"aboutIconTextWrapper"},n.a.createElement("div",{className:"aboutIconBullet"},"\u2022"),n.a.createElement("div",{className:"aboutIconText"},"Proficient understanding of The Box Model, along with Flexbox, Grid, & position.")),n.a.createElement("div",{className:"aboutIconTextWrapper"},n.a.createElement("div",{className:"aboutIconBullet"},"\u2022"),n.a.createElement("div",{className:"aboutIconText"},"sadfsf sfsdfs sfsa fassdfs dsfsa fsdf")),n.a.createElement("div",{className:"appIconsWrapper"},n.a.createElement("div",{className:"aboutWebIcon"},n.a.createElement("img",{className:"webskillIcon",src:"svgs/react.svg"}),n.a.createElement("div",null,"React")),n.a.createElement("div",{className:"aboutWebIcon"},n.a.createElement("img",{className:"webskillIcon",src:"svgs/jQuery.svg"}),n.a.createElement("div",null,"jQuery"))))),n.a.createElement("div",{className:"extraBox"},n.a.createElement("div",{className:"extraSkillsTitle"},"Design Tools"),n.a.createElement("div",{className:"extraIconGrid"},n.a.createElement("div",{className:"aboutWebIcon"},n.a.createElement("img",{className:"webskillIcon",src:"svgs/illustrator.svg"}),n.a.createElement("div",null,"Illustrator")),n.a.createElement("div",{className:"aboutWebIcon"},n.a.createElement("img",{className:"webskillIcon",src:"svgs/photoshop.svg"}),n.a.createElement("div",null,"Photoshop")))),n.a.createElement("div",{className:"socialMediaWrapper"},n.a.createElement("div",{className:"landingSocialMedia"},n.a.createElement(v,{url:"https://github.com/aalbareedi",icon:"fa-github",text:"Github"}),n.a.createElement(v,{url:"https://www.instagram.com/sir.real/",icon:"fa-instagram",text:"Instagram"}),n.a.createElement(v,{url:"https://www.instagram.com/sir.real/",icon:"fa-linkedin-in",text:"LinkedIn"})),n.a.createElement("div",{className:"checkSocialMedia"},"Check out my social medias"))),n.a.createElement("div",{id:"portfolioBox",ref:this.portfolioSection,className:"portfolio"==this.state.section&&0==this.state.isMenuOpen?"openBox":""},n.a.createElement("div",{className:"portfolioTitle"},"Projects"),n.a.createElement("div",{className:"project1Box "+(1==this.state.openOrthoProject?"openProjectBox":"")},n.a.createElement("a",{className:"orthoProject",target:"_blank",href:"https://www.bracesspecialist.com/"},n.a.createElement("div",{className:"orthoOverlay"},n.a.createElement("img",{className:"orthoLogo",src:"./svgs/orthoLogo.svg"}),n.a.createElement("div",{className:"project1Title"},n.a.createElement("div",{className:"orthoTopTitle"},"Orthodontic"),n.a.createElement("div",{className:"orthoBottomTitle"},"SPECIALTY CENTER"))),n.a.createElement("div",{className:"orthoViewBtn",onClick:function(a){a.preventDefault(),e.setState({openOrthoProject:!e.state.openOrthoProject})}},n.a.createElement("i",{className:"fas fa-angle-down projectArrowDown"}))),n.a.createElement("div",{className:"orthoProjectContent"},n.a.createElement("a",{className:"orthoVisitLink orthoLink",target:"_blank",href:"https://www.bracesspecialist.com/"},"Visit ",n.a.createElement("i",{className:"fas fa-share"})),n.a.createElement("a",{className:"orthoGithubLink orthoLink",target:"_blank",href:"https://github.com/aalbareedi/braces-specialist"},"<View Code/>"),n.a.createElement("div",{className:"orthoProjectText"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, expedita. Nihil rerum corrupti quisquam quos explicabo est velit non maxime distinctio? At exercitationem vero praesentium veritatis dolore, excepturi tempore quae."),n.a.createElement("div",{className:"beforeAfterImgs"},n.a.createElement("div",{className:"beforeImgBox"},n.a.createElement("div",{className:"beforeImgText"},"Before"),n.a.createElement("img",{className:"beforeSiteImg",src:"./before1.png"})),n.a.createElement("div",{className:"afterImgWrapper"},n.a.createElement("div",{className:"beforeImgBox"},n.a.createElement("div",{className:"beforeImgText"},"After"),n.a.createElement("img",{className:"beforeSiteImg",src:"./after1.png"})),n.a.createElement("div",{className:"beforeAfterArrow"},n.a.createElement("img",{className:"arrowImg",src:"./svgs/customArrow.svg"})))),n.a.createElement("div",{className:"orthoProjectText"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, expedita. Nihil rerum corrupti quisquam quos explicabo est velit non maxime distinctio? At exercitationem vero praesentium veritatis dolore, excepturi tempore quae.")))),n.a.createElement("div",{id:"contactBox",ref:this.contactSection,className:"contact"==this.state.section&&0==this.state.isMenuOpen?"openBox":""},n.a.createElement("div",{className:"formTitle"},"Let's Get To Work"),n.a.createElement("div",{className:"formText"},"Send me a message below and I will get back to you with an email ASAP"),n.a.createElement("div",{className:"formOption"},n.a.createElement("div",{className:"fullNameField"},n.a.createElement("input",{required:!0,id:"nameInput",type:"text",className:"contactFormInput",placeholder:" ",onInput:function(a){e.setState({nameInputValue:a.target.value})},value:this.state.nameInputValue}),n.a.createElement("div",{className:"inputPlaceholder"},"Full Name"),n.a.createElement("div",{className:"formIcon",id:"fullNameIcon"},n.a.createElement("i",{className:"fas fa-user"})))),n.a.createElement("div",{className:"formOption"},n.a.createElement("div",{className:"emailField"},n.a.createElement("input",{required:!0,id:"emailInput",type:"email",className:"contactFormInput",placeholder:" ",pattern:".+@.+\\..{2,}$",onInput:function(a){e.setState({emailInputValue:a.target.value})},value:this.state.emailInputValue}),n.a.createElement("div",{className:"inputPlaceholder"},"Email Address"),n.a.createElement("div",{className:"formIcon",id:"emailIcon"},n.a.createElement("i",{className:"fas fa-envelope"})))),n.a.createElement("div",{className:"messageWrapper"},n.a.createElement("div",{className:"formMessage"},n.a.createElement("textarea",{required:!0,className:"contactFormInput",id:"messageInput",placeholder:" ",onInput:function(a){e.setState({messageInputValue:a.target.value})},value:this.state.messageInputValue}),n.a.createElement("div",{className:"inputPlaceholder"},"What's on your mind?"))),n.a.createElement("div",{className:"formBtns"},n.a.createElement("button",{className:"sendBtn",onClick:function(){e.sendEmail()}},"Send")),n.a.createElement("footer",null,n.a.createElement("button",{className:"backToTopBtn",onClick:function(){S(0,1e4,"easeInOutQuint")}},n.a.createElement("i",{className:"fas fa-arrow-up backToTopIcon"}),"Back To Top"))),n.a.createElement("div",{className:"navMenu "+(1==this.state.isMenuOpen?"openNavMenu":"")},n.a.createElement("div",{id:"aboutLink",className:"navMenuOption unselectable",onClick:function(){e.setState({isMenuOpen:!1}),S(e.aboutSection.current.offsetTop-80,1e4,"easeInOutQuint"),M()}},"About"),n.a.createElement("div",{id:"portfolioLink",className:"navMenuOption unselectable",onClick:function(){e.setState({isMenuOpen:!1}),S(e.portfolioSection.current.offsetTop-50,1e4,"easeInOutQuint"),M()}},"Portfolio"),n.a.createElement("div",{id:"contactLink",className:"navMenuOption unselectable",onClick:function(){e.setState({isMenuOpen:!1}),S(e.contactSection.current.offsetTop-50,1e4,"easeInOutQuint"),M()}},"Contact")),n.a.createElement("div",{id:"loadingOverlay",className:"formOverlay "+(1==this.state.isFormLoading?"":"displayHidden")},n.a.createElement("div",{className:"sk-chase"},n.a.createElement("div",{className:"sk-chase-dot"}),n.a.createElement("div",{className:"sk-chase-dot"}),n.a.createElement("div",{className:"sk-chase-dot"}),n.a.createElement("div",{className:"sk-chase-dot"}),n.a.createElement("div",{className:"sk-chase-dot"}),n.a.createElement("div",{className:"sk-chase-dot"}))),n.a.createElement("div",{className:"formOverlay "+(""==this.state.overlayMessage?"displayHidden":"")},n.a.createElement("div",{className:"formOverlayWindow"},n.a.createElement("div",{className:"overlayIconWrapper"},n.a.createElement("i",{className:this.state.overlayIcon})),n.a.createElement("div",{className:"formOverlayMessage unselectable"},this.state.overlayTitle),n.a.createElement("div",{className:"formOverlayText",id:"connectionErrorText"},this.state.overlayMessage))),n.a.createElement("div",{className:"navToggleBtn",onClick:function(a){e.toggleMenu(a)}},n.a.createElement("button",{className:"navToggleIcon hamburger hamburger--squeeze "+(1==this.state.isMenuOpen?"is-active":""),type:"button"},n.a.createElement("span",{className:"hamburger-box"},n.a.createElement("span",{className:"hamburger-inner"}))))),n.a.createElement("div",{className:"navLogoBar "+("landing"!=this.state.section||1==this.state.isMenuOpen||1==this.state.isScrolled?"openNavLogoBar":""),onClick:function(){e.setState({isMenuOpen:!1}),e.setState({isScrolled:!1}),S(0,1e4,"easeInOutQuint"),M()}},n.a.createElement("img",{className:"navLogoImg",src:"svgs/nameLogo.svg"}),n.a.createElement("div",{className:"navMyName"},"Amer Albareedi"),n.a.createElement("div",{className:"navJobTitle"},"Front-End Web Developer")))}}]),t}(n.a.Component);c.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(y,null)),document.querySelector("#root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.8041373e.chunk.js.map