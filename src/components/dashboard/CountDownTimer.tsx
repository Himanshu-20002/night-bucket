import { View, Text } from 'react-native'
import React, { useEffect, useState, FC } from 'react'
import { mmkvStorage } from '@state/storage';

const CountDownTimer: FC =() => {
    const initialTime = 3600; // 1 hour in seconds
    const [time, setTime] = useState(initialTime); // Initialize state with the initial time

    // Store the time in mmkvStorage whenever it changes
    useEffect(() => {
        mmkvStorage.setItem('timeLeft', time.toString());
    }, []); // Update storage whenever time changes

    useEffect(() => {
        const loadTimer = async () => {
            const storedTime = mmkvStorage.getItem('timeLeft');
            if (storedTime) {
                setTime(parseInt(storedTime));
            }
        };
        loadTimer();

        // Set up the countdown timer
        const timer = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timer); // Stop the timer when it reaches 0
                    return 0;
                }
                return prevTime - 1; // Decrement the time
            });
        }, 1000); // Update every second

        return () => clearInterval(timer); // Clean up the interval on unmount
    }, []);

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <View>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#fff' }}>
                {formatTime(time)} left
            </Text>
        </View>
    );
}

export default CountDownTimer