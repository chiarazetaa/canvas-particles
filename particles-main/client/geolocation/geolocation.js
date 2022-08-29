// go back
function back() {
    location.href = '../index.html';
}

/**
 * GEOLOCATION
 * 
 */

 function submit () {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async function(position){
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;

            let data = {lat, lon};
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            let response = await fetch('/api', options);
            let json = await response.json();
            console.log(json);
        });
    } else {
        console.log('geolocation not available');
    }
}

/**
 * TEST
 * 
 */
 var text = document.getElementById('text')

 text.addEventListener("mouseout", function() {
   text.textContent = "///"
 })
 
 text.addEventListener("mouseover", function() {
   text.textContent = "|||"
 })