const e=()=>{const e=document.querySelector("#table-row-type-demo"),t=(e=>{const t=e,n=[];for(;e;)e--,n.push({name:String(t-e),date:e});return n})(50);t.splice(3,0,{_$rowType$:1}),e.items=t,e.renderItem=(e,t)=>{if(1===e._$rowType$){const e=document.createElement("sp-table-cell");return e.textContent="Use this row type for non-selectable content.",[e]}const n=document.createElement("sp-table-cell"),o=document.createElement("sp-table-cell"),l=document.createElement("sp-table-cell");return n.textContent=`Row Item Alpha ${e.name}`,o.textContent=`Row Item Alpha ${t}`,l.textContent="Last Thing",[n,o,l]}};customElements.whenDefined("sp-table").then((()=>{e()}));
//# sourceMappingURL=90a0b959.js.map