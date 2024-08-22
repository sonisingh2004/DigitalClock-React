import { useEffect, useState } from 'react'
function Clock() {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const intervalId = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(intervalId)
    }, [])
    function formatTime() {
        let hours = time.getHours()
        const minutes = time.getMinutes()
        const seconds = time.getSeconds()
        const meridiem = hours > 12 ? 'PM' : 'AM'
        hours = hours % 12 || 12

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(
            seconds
        )} ${meridiem}`
    }
    function padZero(num) {
        return (num < 10 ? '0' : '') + num
    }
    function getBackgroundStyle(time) {
        let hours = time.getHours()
        let backgroundImage = ''
        if (hours >= 6 && hours < 12) {
            backgroundImage = 'url(/images/morning.png)'
        } else if (hours >= 12 && hours < 17) {
            backgroundImage = 'url(/images/afternoon.png)'
        } else if (hours >= 17 && hours < 19) {
            backgroundImage = 'url(/images/evening.png)'
        } else {
            backgroundImage = 'url(/images/night.avif)'
        }
        return {
            backgroundImage: backgroundImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: hours >= 18 || hours < 6 ? 'white' : 'black',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '4em',
        }
    }
    return (
        <div className="clock" style={getBackgroundStyle(time)}>
            <div>
                <span>{formatTime()}</span>
            </div>
        </div>
    )
}
export default Clock
