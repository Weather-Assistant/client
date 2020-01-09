const localhost = 'http://localhost:3000'
$(document).ready(function () {
    $.ajax({
        type: "post",
        url: localhost + '/calendarific/calender/',
        data: {
            country: 'id',
            year: String(new Date().getFullYear())
        },
        success: function (calender) {
            console.log(calender);
            $('.calendarific').append(getCalender(calender.response.holidays));
        }
    });

    function getCalender(calenders) {
        let now = String(new Date().toISOString().slice(0, -14))

        function checkDay(now) {
            let day = new Date(now).toString().slice(0, 3)
            if (day == 'Sun') {
                day = 'Sunday'
            } else if (day == 'Mon') {
                day = 'Monday'
            } else if (day == 'Tue') {
                day = 'Tuesday'
            } else if (day == 'Wed') {
                day = 'Wednesday'
            } else if (day == 'Thu') {
                day = 'Thursday'
            } else if (day == 'Sat') {
                day = 'Saturday'
            }
            return day
        }
        let date = new Date().getDate()
        let day = checkDay(now)
        let eventName = 'No Event'
        let description = ''
        let holidayType = ''
        calenders.forEach(calender => {
            if (calender.date.iso == now) {
                eventName = calender.name
                description = calender.description
                holidayType = calender.type[0]
                return
            }
        });
        return (`
            <div class="flex justify-center">
                <span class="block text-center">
                    <h1 class="rounded-t-lg bg-gray-400 text-6xl font-extrabold my-2">${date}</h1>
                    <h3 class="text-3xl font-bold my-2">${day}</h3>
                    <h2 class="text-2xl font-bold my-2">${eventName}</h2>
                    <h3 class="text-xl font-bold my-2">${description}</h3>
                    <h2 class="text-2xl font-bold my-2">${holidayType}</h2>
                </span>
            </div>
        `)
    }
});