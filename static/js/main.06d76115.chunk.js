(this["webpackJsonpmy-site"]=this["webpackJsonpmy-site"]||[]).push([[0],[,,,,,,,function(e,a,t){e.exports=t(16)},,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var s=t(0),n=t.n(s),c=t(6),l=t.n(c),r=t(1),i=t(2),o=t(3),m=t(4),d=(t(12),t(13),t(14),t(15),n.a.Component,function(e){Object(m.a)(t,e);var a=Object(o.a)(t);function t(){var e;Object(r.a)(this,t);for(var s=arguments.length,n=new Array(s),c=0;c<s;c++)n[c]=arguments[c];return(e=a.call.apply(a,[this].concat(n))).state={isOpen:!1},e}return Object(i.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{id:this.props.id,className:"aboutWebSkill "+(1==this.state.isOpen?"openIconBox":"")},n.a.createElement("img",{className:"newHtmlIcon",src:this.props.iconImg}),n.a.createElement("div",{className:"newIconTitle"},this.props.iconTitle),n.a.createElement("div",{className:"newIconOpenBtn",onClick:function(){e.setState({isOpen:!e.state.isOpen})}},n.a.createElement("i",{className:"fas fa-angle-down arrowDown"})),n.a.createElement("div",{className:"iconDropdown"},this.props.children))}}]),t}(n.a.Component));document.addEventListener("touchstart",(function(){}),!0);var u=function(e){Object(m.a)(t,e);var a=Object(o.a)(t);function t(){var e;Object(r.a)(this,t);for(var s=arguments.length,n=new Array(s),c=0;c<s;c++)n[c]=arguments[c];return(e=a.call.apply(a,[this].concat(n))).state={page:"landing",isMenuOpen:!1,isHtmlMenuOpen:!1,isCssMenuOpen:!1,isJsMenuOpen:!1,openOrthoProject:!0},e.viewPage=function(a){e.setState({page:a}),e.setState({isMenuOpen:!1})},e.toggleMenu=function(a){a.stopPropagation(),0==e.state.isMenuOpen?e.setState({isMenuOpen:!0}):e.setState({isMenuOpen:!1})},e}return Object(i.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{id:"wrapper"},n.a.createElement("div",{className:"navLogoBar "+("landing"!=this.state.page||1==this.state.isMenuOpen?"openNavLogoBar":"")+" "+("landing"!=this.state.page&&0==this.state.isMenuOpen?"fadeBgColor":""),onClick:function(){e.viewPage("landing")}},n.a.createElement("img",{className:"navLogoImg",src:"nameLogo.svg"}),n.a.createElement("div",{className:"navMyName"},"Amer Albareedi"),n.a.createElement("div",{className:"navJobTitle"},"Front-End Web Developer")),n.a.createElement("div",{id:"aboutBox",className:"about"==this.state.page&&0==this.state.isMenuOpen?"openBox":""},n.a.createElement("div",{className:"effectGraphic"},n.a.createElement("img",{className:"ImgEffectL ImgEffect",src:"newEffect.svg"}),n.a.createElement("img",{className:"ImgEffectR ImgEffect",src:"newEffect.svg"})),n.a.createElement("img",{className:"faceGraphic",src:"newProfile.svg"}),n.a.createElement("div",{className:"intro"},n.a.createElement("div",{className:"introLine"},"Hello! My name is"),n.a.createElement("div",{className:"myNameValue"}," Amer Albareedi"),n.a.createElement("div",{className:"introDescription"},n.a.createElement("div",null,"I am a Front-End Web Developer"),n.a.createElement("div",null,"helping businesses establish an"),n.a.createElement("div",null,"impactful online presence by"),n.a.createElement("div",null,"creating high-quality websites"),n.a.createElement("div",null,"optimized to best serve their users."))),n.a.createElement("div",null,n.a.createElement("div",{className:"aboutMeCard"},n.a.createElement("img",{className:"aboutEyeImg",src:"eyeDesign.svg"}),n.a.createElement("div",{className:"aboutCardHeading"},"Eye for Design")),n.a.createElement("div",{className:"aboutMeCard"},n.a.createElement("img",{className:"aboutCardImg",src:"brainIcon2.svg"}),n.a.createElement("img",{className:"aboutToolsImg",src:"toolsIcon.svg"}),n.a.createElement("div",{className:"aboutCardHeading"},"State of Mind")),n.a.createElement("div",{className:"aboutMeCard"},n.a.createElement("div",{className:"aboutCardImg"}),n.a.createElement("div",{className:"aboutCardHeading"},"Solution Seeker"))),n.a.createElement("div",{className:"aboutIntroText"},"Lorem ipsum, dolor sit amet adipisicing elit fugit natus modi voluptas, consectetur odio nisi enim vero cumque quos."),n.a.createElement("div",{className:"responsiveWeb"},n.a.createElement("img",{className:"responWebImg webMobileImg",src:"mobile.svg"}),n.a.createElement("img",{className:"responWebImg webTabletImg",src:"tablet.svg"}),n.a.createElement("img",{className:"responWebImg webLaptopImg",src:"laptop.svg"}),n.a.createElement("img",{className:"responWebImg webDesktopImg",src:"desktop.svg"}),n.a.createElement("img",{className:"responWebImg stroke strokeImg1",src:"stroke1.svg"}),n.a.createElement("img",{className:"responWebImg stroke strokeImg2",src:"stroke1.svg"}),n.a.createElement("img",{className:"responWebImg stroke strokeImg3",src:"stroke1.svg"})),n.a.createElement("div",{className:"webSkills"},n.a.createElement(d,{iconImg:"html.svg",iconTitle:"HTML"},n.a.createElement("div",{className:"aboutIconTextWrapper"},n.a.createElement("div",{className:"aboutIconBullet"},"\u2022"),n.a.createElement("div",{className:"aboutIconText"},"Properly formatted structuring.")),n.a.createElement("div",{className:"aboutIconTextWrapper"},n.a.createElement("div",{className:"aboutIconBullet"},"\u2022"),n.a.createElement("div",{className:"aboutIconText"},"Accessibility and SEO friendly syntax always prioritized."))),n.a.createElement(d,{id:"cssWebSkill",iconImg:"css.svg",iconTitle:"CSS"},n.a.createElement("div",{className:"webSkillContainer"},n.a.createElement("div",{className:"aboutIconTextWrapper"},n.a.createElement("div",{className:"aboutIconBullet"},"\u2022"),n.a.createElement("div",{className:"aboutIconText"},"Proficient understanding of The Box Model, along with Flexbox, Grid, & position.")),n.a.createElement("div",{className:"aboutIconTextWrapper"},n.a.createElement("div",{className:"aboutIconBullet"},"\u2022"),n.a.createElement("div",{className:"aboutIconText"},"Proficient understanding of The Box Model, along with Flexbox, Grid, & position."))),n.a.createElement("div",{className:"appIconsWrapper"},n.a.createElement("div",{className:"aboutWebIcon"},n.a.createElement("img",{className:"webskillIcon",src:"bootstrap.svg"}),n.a.createElement("div",null,"Bootstrap")),n.a.createElement("div",{className:"aboutWebIcon"},n.a.createElement("img",{className:"webskillIcon",src:"sass.svg"}),n.a.createElement("div",null,"SASS")))),n.a.createElement(d,{id:"jsWebSkill",iconImg:"js.svg",iconTitle:"JavaScript"},n.a.createElement("div",{className:"aboutIconTextWrapper"},n.a.createElement("div",{className:"aboutIconBullet"},"\u2022"),n.a.createElement("div",{className:"aboutIconText"},"Proficient understanding of The Box Model, along with Flexbox, Grid, & position.")),n.a.createElement("div",{className:"aboutIconTextWrapper"},n.a.createElement("div",{className:"aboutIconBullet"},"\u2022"),n.a.createElement("div",{className:"aboutIconText"},"sadfsf sfsdfs sfsa fassdfs dsfsa fsdf")),n.a.createElement("div",{className:"appIconsWrapper"},n.a.createElement("div",{className:"aboutWebIcon"},n.a.createElement("img",{className:"webskillIcon",src:"jquery.svg"}),n.a.createElement("div",null,"jQuery")),n.a.createElement("div",{className:"aboutWebIcon"},n.a.createElement("img",{className:"webskillIcon",src:"react.svg"}),n.a.createElement("div",null,"React"))))),n.a.createElement("div",{className:"extraBox"})),n.a.createElement("div",{id:"portfolioBox",className:"portfolio"==this.state.page&&0==this.state.isMenuOpen?"openBox":""},n.a.createElement("div",{className:"portfolioTitle"},"Projects"),n.a.createElement("div",{className:"project1Box "+(1==this.state.openOrthoProject?"openProjectBox":"")},n.a.createElement("a",{className:"orthoProject",target:"_blank",href:"https://www.bracesspecialist.com/"},n.a.createElement("div",{className:"orthoOverlay"},n.a.createElement("img",{className:"orthoLogo",src:"./orthoLogo.svg"}),n.a.createElement("div",{className:"project1Title"},n.a.createElement("div",{className:"orthoTopTitle"},"Orthodontic"),n.a.createElement("div",{className:"orthoBottomTitle"},"SPECIALTY CENTER"))),n.a.createElement("div",{className:"orthoViewBtn",onClick:function(a){a.preventDefault(),e.setState({openOrthoProject:!e.state.openOrthoProject})}},n.a.createElement("i",{className:"fas fa-angle-down projectArrowDown"}))),n.a.createElement("div",{className:"orthoProjectContent"},n.a.createElement("a",{className:"orthoVisitLink orthoLink",target:"_blank",href:"https://www.bracesspecialist.com/"},"Visit \u2192"),n.a.createElement("a",{className:"orthoGithubLink orthoLink",target:"_blank",href:"https://github.com/aalbareedi/braces-specialist"},"<View Code/>"),n.a.createElement("div",{className:"orthoProjectText"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, expedita. Nihil rerum corrupti quisquam quos explicabo est velit non maxime distinctio? At exercitationem vero praesentium veritatis dolore, excepturi tempore quae."),n.a.createElement("div",{className:"beforeAfterImgs"},n.a.createElement("div",{className:"beforeImgBox"},n.a.createElement("div",{className:"beforeImgText"},"Before"),n.a.createElement("img",{className:"beforeSiteImg",src:"./before1.png"})),n.a.createElement("div",{className:"afterImgWrapper"},n.a.createElement("div",{className:"beforeImgBox"},n.a.createElement("div",{className:"beforeImgText"},"After"),n.a.createElement("img",{className:"beforeSiteImg",src:"./after1.png"})),n.a.createElement("div",{className:"beforeAfterArrow"},n.a.createElement("img",{className:"arrowImg",src:"./customArrow.svg"})))),n.a.createElement("div",{className:"orthoProjectText"},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, expedita. Nihil rerum corrupti quisquam quos explicabo est velit non maxime distinctio? At exercitationem vero praesentium veritatis dolore, excepturi tempore quae.")))),n.a.createElement("div",{id:"contactBox",className:"contact"==this.state.page&&0==this.state.isMenuOpen?"openBox":""},n.a.createElement("div",{className:"formTitle"},"Let's Get In Touch"),n.a.createElement("div",{className:"formOption"},n.a.createElement("label",{htmlFor:"nameInput",className:"contactFormText unselectable"},"Name",n.a.createElement("span",{className:"formAsterik"},"*")),n.a.createElement("div",{className:"fullNameField"},n.a.createElement("input",{required:!0,id:"nameInput",type:"text",className:"contactFormInput",placeholder:"Firstname Lastname"}),n.a.createElement("div",{className:"formIcon",id:"fullNameIcon"},n.a.createElement("i",{className:"fas fa-user"})))),n.a.createElement("div",{className:"formOption"},n.a.createElement("label",{htmlFor:"emailInput",className:"contactFormText unselectable"},"Email Address",n.a.createElement("span",{className:"formAsterik"},"*")),n.a.createElement("div",{className:"emailField"},n.a.createElement("input",{required:!0,id:"emailInput",type:"email",className:"contactFormInput",placeholder:"email@address.com",pattern:".+@.+\\..{2,}$"}),n.a.createElement("div",{className:"formIcon",id:"emailIcon"},n.a.createElement("i",{className:"fas fa-envelope"})))),n.a.createElement("div",{className:"formMessage"},n.a.createElement("label",{htmlFor:"messageInput",className:"contactFormText unselectable"},"Message",n.a.createElement("span",{className:"formAsterik"},"*")),n.a.createElement("textarea",{required:!0,className:"contactFormInput",id:"messageInput",placeholder:"What's on your mind?"}))),n.a.createElement("div",{className:"navMenu "+(1==this.state.isMenuOpen?"openNavMenu":"")},n.a.createElement("div",{id:"aboutLink",className:"navMenuOption unselectable",onClick:function(){e.viewPage("about")}},"About"),n.a.createElement("div",{id:"portfolioLink",className:"navMenuOption unselectable",onClick:function(){e.viewPage("portfolio")}},"Portfolio"),n.a.createElement("div",{id:"contactLink",className:"navMenuOption unselectable",onClick:function(){e.viewPage("contact")}},"Contact")),n.a.createElement("div",{className:"navToggleBtn",onClick:this.toggleMenu},n.a.createElement("button",{className:"navToggleIcon hamburger hamburger--squeeze "+(1==this.state.isMenuOpen?"is-active":""),type:"button"},n.a.createElement("span",{className:"hamburger-box"},n.a.createElement("span",{className:"hamburger-inner"})))))}}]),t}(n.a.Component);l.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(u,null)),document.querySelector("#root"))}],[[7,1,2]]]);
//# sourceMappingURL=main.06d76115.chunk.js.map