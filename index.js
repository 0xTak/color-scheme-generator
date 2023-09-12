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
                    <div class='color-result' style='background-color:${color.hex.value};' tabindex="0" role="button" aria-label="Color box">
                        <span class="copy-text">Copied!</span>
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
                        <div class='color-result' style='background-color:${color.hex.value};' tabindex="0" role="button" aria-label="Color box">
                            <span class="copy-text">Copied!</span>
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
document.body.addEventListener('click', async function(e) {
    if (e.target.classList.contains('color-result')) {
        const hexCode = e.target.nextElementSibling.textContent.trim();

        if (!document.body.classList.contains('dark-theme')) {
            // Extracting the RGB values from the HEX code
            const r = parseInt(hexCode.slice(1, 3), 16);
            const g = parseInt(hexCode.slice(3, 5), 16);
            const b = parseInt(hexCode.slice(5, 7), 16);
                    
            // Setting the background color of the body to the RGBA value
            document.body.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
        }

        // Show "Copied!" text:
        const copiedText = e.target.querySelector('.copy-text');
        copiedText.style.visibility = "visible";

        // Hide after 2 second:
        setTimeout(() => {
            copiedText.style.visibility = "hidden";
        }, 2000);     

        try {
            await navigator.clipboard.writeText(hexCode);
            console.log('Color copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    } else {
        // Reset the background color when clicking elsewhere
        document.body.style.backgroundColor = '';
    }
});


