// Import react module and components
import React from 'react';
// import components
import Tile from '../components/Tile';
import Button from '../components/Button';
// Import assets
import '../assets/styles/Home.css';
import defaultBG from '../assets/images/defaultBG.jpeg';
import goals from '../assets/images/goals.jpeg';
import calories from '../assets/images/defaultBG.jpeg';
import exercises from '../assets/images/exercises.jpeg';

export default function Home() {
    return (
        <>
            <div id='land'>
                <img id='landImg' src={defaultBG} alt="somebg"></img>
                <div id='landText'>
                    <h1>Find out if you need to go the gym</h1>
                    <Button text='Shall i go to the gym!?' link='quiz' />
                </div>

            </div>
            <div>
                <h1>Our goal</h1>
                <p class='highlight'>You!</p>
                <p>We want you to achieve your fitness goals and have a healthy lifestyle! We want to do this by informing you about achieving your goals and giving you a slight nudge to go to the gym in a fun and healthy way. We will not force you into going to the gym but will look at all the aspects of you current situation and give advice based on that. Sometimes a rest day is all that you need.</p>
            </div>
            <div id='tiles'>
                {/* first row */}
                <Tile image={goals} />
                <Tile
                    title='Your goals'
                    text='To achieve your personal goals fitness goals you could use some help. We want to provide you the basic knowledge you which you can use to achieve your goals more efficient! No matter what your goal might be we got the basics covered for you!'
                    goTo='./goals'
                />
                {/* second row */}
                <Tile
                    title='Calories'
                    text='To be able to achieve your fitness goals your daily caloric intake is key. To know the amount of calories you need on a daily basis you have to know your TDEE (Total Daily Energy Expenditure). These are the amount of calories you use on a daily basis. With this tool we give you an indication of your TDEE. With this information you can add or substract the amount of calories you need to reach your goal.'
                    goTo='./calories'

                />
                <Tile image={calories} />
                {/* third row */}
                <Tile image={exercises} />
                <Tile
                    title='Exercises'
                    text='Do you want to train a certain bodypart but dont know what to train? Use our exercise searcher to find exercises based on a muscle of your choice. 
                    Just select a muscle group and get a list of exercises!'
                    goTo='./exercises'
                />
            </div>
        </>
    );
}




