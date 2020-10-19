html2canvas(document.querySelector("#form1")).then(canvas => {
    document.body.appendChild(canvas)
});
