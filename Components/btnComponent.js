//creating a template
const template = document.createElement("template");
template.innerHTML = `
 <style> 
   label {
    color:#444;
    border: 1px solid #444;
    padding:6px 10px;
    display:block;
    border-radius:10px;
    margin:10px;
   }
 </style>

  
   <label>
     <slot>juytui</slot>
  </label>
  
 `;

//native js custom class
class btnComp extends HTMLElement {
  // native js constructor
  constructor() {
    // super keyword is used to access properties on a class/object literal
    super();
    /* in order to encapsalte the component we create a shadowDom
    specify mode to "open" so you can make modifactions to shadowDom using "shadowRoot"  */
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
  }
}

// register the custom element created above with the dom
customElements.define("btn-comp", btnComp);
