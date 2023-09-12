const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
export const getDate = (publishedDate) =>{
    const newDate = new Date(publishedDate);

    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();

    let meridiem = "am";
    if(hours >= 12){
        hours -= 12;
        meridiem = "pm";
    }
    if(hours < 10) hours = "0" + hours;
    if(minutes < 10) minutes = "0" + minutes;

    let day = days[newDate.getDay()];
    let date = newDate.getDate();
    let month = months[newDate.getMonth()];
    let year = newDate.getFullYear();    

    return {hours, minutes, meridiem, day, date, month, year};
}