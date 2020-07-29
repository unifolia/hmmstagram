const searchFunction = (whichInput) => {
    let getUpperCase = e => {
        return document.getElementById(e).value.toUpperCase()
    };

    let filter = (whichInput ? getUpperCase(whichInput) : "");
    let post = document.getElementsByClassName("post");

    for (let i = 0; i < post.length; i++) {
        let elementOne = post[i].getElementsByClassName("username")[0];

        let txtValueOne = (
            elementOne ? elementOne.textContent || elementOne.innerText : ""
        );

        post[i].style.display = (
            txtValueOne.toUpperCase().indexOf(filter) > -1 ?
                "" : "none"
        );
    };
};

export default searchFunction;