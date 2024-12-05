


function moveHands()
{
    const secondHand = document.querySelector('.second-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const hourHand = document.querySelector('.hour-hand');
    
    // get the date
    const date = new Date();

    // set the second hand of clock
    const second = date.getSeconds();
    const secondAngle = (second / 60) * 360 + 90;
    secondHand.style.transform = `rotate(${secondAngle}deg)`;

    // set the minute hand of clock
    const minute = date.getMinutes();
    const minuteAngle = (minute/ 60) * 360 + 90; 
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;

    // set the minute hand of clock
    const hour = date.getHours();
    const hourAngle = (hour/12) * 360 + 90;
    hourHand.style.transform = `rotate(${hourAngle}deg)`;

    
    console.log(`${hour}:${minute}:${second}`);
    

    console.log(secondAngle);
    console.log(secondHand);
}


setInterval(moveHands , 1000,[]);