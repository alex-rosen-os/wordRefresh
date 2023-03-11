const template = document.createElement("template");
template.innerHTML = `
<style>
label{
    color:orange;    
    padding:40px ;
    display:block;
    margin:50px 20px;
}
</style>

<label>
<slot></slot>
</label>
 
`

class userCard extends HTMLElement {
    constructor () { 
        super();
        const shadow = this.attachShadow({mode:"open"})
        shadow.append(template.content.cloneNode(true))
    }
}

customElements.define("user-card", userCard);