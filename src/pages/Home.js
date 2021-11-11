// Import react module and components
import React from 'react';
// import components
import Tile from '../components/Tile';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

// Import assets
import '../assets/styles/Home.css';
import defaultBG from '../assets/images/defaultBG.jpeg';
import goals from '../assets/images/goals.jpeg';
import calories from '../assets/images/calories.jpeg';
import exercises from '../assets/images/exercises.jpeg';

export default function Home() {

    return (
        <>
            <div id='land'>
                <img id='land-image' src={defaultBG} alt="somebg"></img>
                <div id='land-text'>
                    <h1>Find out if you need to go the gym</h1>
                    <Button text='Shall i go to the gym!?' link='quiz' />
                </div>
            </div>
            <div id='main-text'>
                <h1>Our goal</h1>
                <p className='highlight'>You!</p>
                <p>We want you to achieve your fitness goals and have a healthy lifestyle! We want to do this by informing you about achieving your goals and giving you a slight nudge to go to the gym in a fun and healthy way. We will not force you into going to the gym but will look at all the aspects of you current situation and give advice based on that. Sometimes a rest day is all that you need.</p>
            </div>
            <div id='tiles'>
                {/* first row */}
                <Tile image={goals} />
                <Tile
                    title='Your goals'
                    text='To achieve your personal goals fitness goals you could use some help. We want to provide you the basic knowledge you which you can use to achieve your goals more efficient! No matter what your goal might be we got the basics covered for you!'
                    goTo='goals'
                    buttonText='Get advice'
                />
                {/* second row */}
                <Tile
                    title='Calories'
                    text='To be able to achieve your fitness goals your daily caloric intake is key. To know the amount of calories you need on a daily basis you have to know your TDEE (Total Daily Energy Expenditure). These are the amount of calories you use on a daily basis. With this tool we give you an indication of your TDEE. With this information you can add or substract the amount of calories you need to reach your goal.'
                    goTo='tdee'
                    buttonText='Caclulate TDEE'
                />
                <Tile image={calories} />
                {/* third row */}
                <Tile image={exercises} />
                <Tile
                    title='Exercises'
                    text='Do you want to train a certain bodypart but dont know what to train? Use our exercise searcher to find exercises based on a muscle of your choice. 
                    Just select a muscle group and get a list of exercises!'
                    goTo='exercises'
                    buttonText='Search exercises'
                />
            </div>
            <div id='sub-text'>
                <div className='text-column'>
                    <h3>Tools</h3>
                    <Link to='/Quiz'>Shall i go to the gym?!</Link><br /><br />
                    <Link to='/Goals'>Goal advice</Link><br /><br />
                    <Link to='/tdee'>TDEE calculator</Link><br /><br />
                    <Link to='/exercises'>Exercise searcher</Link><br /><br />
                </div>
                <div className='text-column'>
                    <h3>About us</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </div>
        </>
    );
}
