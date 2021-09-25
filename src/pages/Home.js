// Import react module and components
import React from 'react';
import Tile from '../components/Tile';

// Import assets
import '../assets/styles/home.css';
import defaultBG from '../assets/images/defaultBG.jpeg';
import goals from '../assets/images/goals.jpeg';
import calories from '../assets/images/defaultBG.jpeg';
import exercises from '../assets/images/exercises.jpeg';

function App() {
    return (
        <>
            <h1>Find out if you need to go the gym</h1>
            <img src={defaultBG} alt="somebg"></img>
            <tiles>
                {/* first row */}
                <Tile image={goals} />
                <Tile title='The brand' paragraphs={['Lfaskfbasjdfbajskhdfbasjkhdfakjs dfhgakjsdfghajksdfgajksdgfakjsdfhgaskjdfhgaskjdfgaskdjfgaskdjfhgaskjdfhgaksdjfghkasdfahjgsdgfhsahkgjdfhgjakfgjhkafghahfsdaghfjs dghjsdghsghdfsgasghjgashjgfsakghfasdhgfdsghjdaghjkorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ut repellendus ab optio voluptas modi', 'ASDVsadvsdVADv sdvs advas dva dvs va vs dv sdvsdvasdv avfav afvaf a']} />
                {/* second row */}
                <Tile title='BLA' paragraphs={['Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ut repellendus ab optio voluptas modi', 'ASDVsadvsdVADv sdvs advas dva dvs va vs dv sdvsdvasdv avfav afvaf a']} />
                <Tile image={calories} />
                {/* third row */}
                <Tile image={exercises} />

                <Tile title='BRA' paragraphs={['Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ut repellendus ab optio voluptas modi', 'ASDVsadvsdVADv sdvs advas dva dvs va vs dv sdvsdvasdv avfav afvaf a']} />
            </tiles>
        </>
    );
}

export default App;



