
export const formatISOToCustom = (isoString:string)=>{
    const date = new Date(isoString);

    const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const hours =String(date.getUTCHours()).padStart(2,'0');
    const minutes =String(date.getUTCMinutes()).padStart(2,'0');
    const seconds =String(date.getUTCSeconds()).padStart(2,'0');

    const day =date.getUTCDate()
    const month =months[date.getUTCMonth()];   // Purpose: This line extracts the month index (0-11) using getUTCMonth() and uses it to look up the corresponding month name from the months array.

    const year =date.getUTCFullYear()
    return `${month} ${day}, ${year} at ${hours}:${minutes}:${seconds}`;
}


// ISO Date String
//     |
//     v
// JavaScript Date Object
//     |
//     +--> Extract Components
//     |       |
//     |       +--> Month (Array Lookup)
//     |       +--> Day
//     |       +--> Year
//     |       +--> Hours (UTC)
//     |       +--> Minutes (UTC)
//     |       +--> Seconds (UTC)
//     |
//     v
// Formatted String