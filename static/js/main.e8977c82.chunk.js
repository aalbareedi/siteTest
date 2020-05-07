(this["webpackJsonpmy-site"]=this["webpackJsonpmy-site"]||[]).push([[0],{12:function(e,a,t){},13:function(e,a,t){},14:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),l=t(6),i=t.n(l),c=(t(12),t(1)),r=t(2),o=t(3),m=t(4),u=function(e){Object(m.a)(t,e);var a=Object(o.a)(t);function t(){return Object(c.a)(this,t),a.apply(this,arguments)}return Object(r.a)(t,[{key:"render",value:function(){return s.a.createElement("a",{href:this.props.url,target:"_blank",className:"socialMediaBtn"},s.a.createElement("i",{className:"fab "+this.props.icon}))}}]),t}(s.a.Component),p=(t(13),function(e){Object(m.a)(t,e);var a=Object(o.a)(t);function t(){var e;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(e=a.call.apply(a,[this].concat(s))).state={page:"",isMenuOpen:!1},e.viewPage=function(a){e.setState({page:a}),e.setState({isMenuOpen:!1})},e.toggleMenu=function(){0==e.state.isMenuOpen?e.setState({isMenuOpen:!0}):e.setState({isMenuOpen:!1})},e}return Object(r.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{id:"wrapper"},s.a.createElement("div",{className:"landing "+(""==this.state.page&&0==this.state.isMenuOpen?"openBox":"")},s.a.createElement("img",{className:"landingLogoImg logoAnimation",src:"nameLogo.svg"}),s.a.createElement("div",{className:"introBox typeWriter"},s.a.createElement("div",null,"Hi! My name is ",s.a.createElement("span",{className:"myNameValue"},"Amer Albareedi")),s.a.createElement("div",null,"and I am a"," ",s.a.createElement("span",{className:"jobTitleValue"}," Front-End Developer"),"."),s.a.createElement("div",null,"I help businesses establish an"),s.a.createElement("div",null,"impactful online presence by"),s.a.createElement("div",null,"designing high-quality websites"),s.a.createElement("div",{className:"wordSpace"},"tailored to best serve their users.")),s.a.createElement("div",{className:"landingSocialMedia fadeIn"},s.a.createElement(u,{url:"",icon:"fa-linkedin-in"}),s.a.createElement(u,{url:"https://github.com/aalbareedi",icon:"fa-github"}),s.a.createElement(u,{url:"https://www.instagram.com/sir.real/",icon:"fa-instagram"}),s.a.createElement("div",{id:"hireMeBtn",className:"socialMediaBtn unselectable",onClick:function(){e.viewPage("portfolio")}},"View Work"))),s.a.createElement("div",{className:"navLogoBar "+(""!=this.state.page||1==this.state.isMenuOpen?"openNavLogoBar":""),onClick:function(){e.viewPage("")}},s.a.createElement("img",{className:"navLogoImg",src:"nameLogo.svg"}),s.a.createElement("div",{className:"navMyName"},"Amer Albareedi"),s.a.createElement("div",{className:"navJobTitle"},"Front-End Developer")),s.a.createElement("div",{className:"navToggleBtn fadeIn",onClick:this.toggleMenu},s.a.createElement("button",{className:"navToggleIcon hamburger hamburger--squeeze "+(1==this.state.isMenuOpen?"is-active":""),type:"button"},s.a.createElement("span",{className:"hamburger-box"},s.a.createElement("span",{className:"hamburger-inner"})))),s.a.createElement("div",{id:"aboutBox",className:"about"==this.state.page&&0==this.state.isMenuOpen?"openBox":""},"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sapiente libero quaerat consequatur similique facilis, sunt quasi porro ullam quod alias recusandae. Labore pariatur consequatur, voluptatum possimus perferendis quos culpa!"),s.a.createElement("div",{id:"portfolioBox",className:"portfolio"==this.state.page&&0==this.state.isMenuOpen?"openBox":""},"Foundation of Fundamentals"),s.a.createElement("div",{id:"contactBox",className:"contact"==this.state.page&&0==this.state.isMenuOpen?"openBox":""},s.a.createElement("div",{className:"formTitle"},"Let's Get In Touch"),s.a.createElement("div",{className:"formOption"},s.a.createElement("label",{htmlFor:"nameInput",className:"contactFormText unselectable"},"Full Name",s.a.createElement("span",{className:"formAsterik"},"*")),s.a.createElement("div",{className:"fullNameField"},s.a.createElement("input",{required:!0,id:"nameInput",type:"text",className:"contactFormInput",placeholder:"Firstname Lastname"}),s.a.createElement("div",{className:"formIcon",id:"fullNameIcon"},s.a.createElement("i",{className:"fas fa-user"})))),s.a.createElement("div",{className:"formOption"},s.a.createElement("label",{htmlFor:"emailInput",className:"contactFormText unselectable"},"Email Address",s.a.createElement("span",{className:"formAsterik"},"*")),s.a.createElement("div",{className:"emailField"},s.a.createElement("input",{required:!0,id:"emailInput",type:"email",className:"contactFormInput",placeholder:"email@address.com",pattern:".+@.+\\..{2,}$"}),s.a.createElement("div",{className:"formIcon",id:"emailIcon"},s.a.createElement("i",{className:"fas fa-envelope"})))),s.a.createElement("div",{className:"formMessage"},s.a.createElement("label",{for:"messageInput",className:"contactFormText unselectable"},"Message",s.a.createElement("span",{className:"formAsterik"},"*")),s.a.createElement("textarea",{required:!0,className:"contactFormInput",id:"messageInput",placeholder:"What's on your mind?"}))),s.a.createElement("div",{className:"navMenu "+(1==this.state.isMenuOpen?"openNavMenu":"")},s.a.createElement("div",{id:"aboutLink",className:"navMenuOption unselectable",onClick:function(){e.viewPage("about")}},"About"),s.a.createElement("div",{id:"portfolioLink",className:"navMenuOption unselectable",onClick:function(){e.viewPage("portfolio")}},"Portfolio"),s.a.createElement("div",{id:"contactLink",className:"navMenuOption unselectable",onClick:function(){e.viewPage("contact")}},"Contact")))}}]),t}(s.a.Component));i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(p,null)),document.querySelector("#bodyContainer"))},7:function(e,a,t){e.exports=t(14)}},[[7,1,2]]]);
//# sourceMappingURL=main.e8977c82.chunk.js.map