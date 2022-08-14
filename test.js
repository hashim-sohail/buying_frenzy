let x = "Mon 10 am - 3:15 pm / Tues, Sat 5:15 pm - 1:30 am / Weds 9:15 am - 3 pm / Thurs 12 pm - 5:30 pm / Fri 6:15 am - 5 pm / Sun 10:15 am - 2:30 am";

let y = x.split(" / ");

console.log(y);
let days = ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun'];
for (let i of y) {
    console.log(i.split('-'))
}