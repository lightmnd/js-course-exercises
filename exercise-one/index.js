window.onload = () => {

    let btn = document.getElementById('btn');

    function checkIfSelectedElement(selectObject) {
        for (let i = 0; i < selectObject.options.length; i++) {
            selectObject.addEventListener('click', () => {
                if (selectObject.options[i].selected === true) {      
                    btn.removeAttribute('disabled');
                }
            })
        }
    }

    // invoke function
    checkIfSelectedElement(document.selectForm.musicTypes);

    /**
     * 
     * @param {Object} selectObject 
     */
    function selectedOptions(selectObject) {
        let numberSelected = 0;
        let elementSelected = ''
        for (let i = 0; i < selectObject.options.length; i++) {
            if (selectObject.options[i].selected) {
                elementSelected += selectObject.options[i].textContent + ' /// '
                numberSelected++;
            }
        }
            return 'Genres: ' + elementSelected + 'Number of selected elements: ' + numberSelected;
    }
    
    
    let resContainer = document.getElementById('resultContainer')
    let newNode = document.createElement('p');
    newNode.classList.add('result')    
    btn.addEventListener('click', (ev) => { // onClick show the results
        ev.preventDefault();
        let textNode = document.createTextNode(`Results: ${selectedOptions(document.selectForm.musicTypes)}`)
        newNode.appendChild(textNode)
        newNode.appendChild(document.createElement('br'))
        resContainer.appendChild(newNode)
    });
}