const colorInput = document.querySelector('input[type="color"]')
const getColorSchemeBtn = document.getElementById('color-btn')
const toggleThemeBtn = document.getElementById('theme-toggle')
const selectColorScheme = document.getElementById('color-scheme-dropdown')

// Store user selected color
let selectedColor = '#000000'
colorInput.addEventListener('change', function(e){
    selectedColor = e.target.value
})

// Default color and scheme 
let defaultColor = "#000000"
let defaultScheme = "monochrome"

// API endpoint for default color scheme
let defaultUrl = `https://www.thecolorapi.com/scheme?hex=${defaultColor.slice(1)}&mode=${defaultScheme}&count=5`

// Fetch and display default color scheme
fetch(defaultUrl)
    .then(response => response.json())
    .then(function(data){
        let colors = data.colors 
        
        let colorContainerHtml = document.getElementById('color-container')
        colorContainerHtml.innerHTML = ''
        let htmlString = ''
        for(let color of colors){
            htmlString += `
            <section class='color-result-container'>
                <div class='color-result' style='background-color:${color.hex.value};'>
                </div>
                <div class='color-result-hex-code'>
                    ${color.hex.value}
                </div>
            </section> 
            `
        } 
        colorContainerHtml.innerHTML = htmlString 
    })

// Generate color scheme based on user selection
getColorSchemeBtn.addEventListener('click', function(){
    let selectedColorScheme = selectColorScheme.value
    let hexColor = selectedColor.slice(1)
    let url = `https://www.thecolorapi.com/scheme?hex=${hexColor}&mode=${selectedColorScheme}&count=5`
    
    fetch(url)
        .then(response => response.json())
        .then(function(data){
            let colors = data.colors 
            
            let colorContainerHtml = document.getElementById('color-container')
            colorContainerHtml.innerHTML = ''
            let htmlString = ''
            for (let color of colors){
                htmlString += `
                <section class='color-result-container'>
                    <div class='color-result' style='background-color:${color.hex.value};'>
                    </div>
                    <div class='color-result-hex-code'>
                        ${color.hex.value}
                    </div>
                </section>
                `
            }
            colorContainerHtml.innerHTML = htmlString
        })
})

// Toggle Dark/Light theme
toggleThemeBtn.addEventListener('click', function(){
    document.body.classList.toggle('dark-theme');
})


// Copy color to clipboard when clicked
document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('color-result')) {
        const hexCode = e.target.nextElementSibling.textContent;

        let textarea = document.createElement('textarea');
        textarea.value = hexCode;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        console.log('Color copied to clipboard');
    }
});
