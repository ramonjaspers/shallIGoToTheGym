// Import react module and components
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import page style
import '../assets/styles/Tdee.css';

export default function TDEE() {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [TDEE, setTdee] = useState(0);

    /**
     * Generates the TDEE
     * @param {*} formData 
     */
    const calculateTdee = (formData) => {
        let bmr = 0;
        if (formData.Gender === 'Male') {
            // Could have implemented a ternary operator but this would be less readable. Code = 4 humans 
            // Harris-Benedict formula, 95% confidence range
            bmr = (10 * formData.Weight) + (6.25 * formData.Height) - (5 * formData.Age) + 5;
        } else {
            bmr = (10 * formData.Weight) + (6.25 * formData.Height) - (5 * formData.Age) - 161;
        }
        // Activity Multiplier
        setTdee(bmr * formData.Activity);
    }

    const navigateBack = () => {
        if (TDEE === 0) {
            history.push('/');
        } else {
            setTdee(0);
            history.push('TDEE');
        }
    }

    return (
        <div id='pageWrapper'>
            <div class='container'>
                <div class='backButton' onClick={() => navigateBack()}>&#8592; </div>
                {TDEE === 0 ?
                    <>
                        <div class='containerTitle'>
                            <h4>TDEE calculator</h4>
                            <h5>Calculate your estimated calories you are burning every day!</h5>
                        </div>
                        <div class='containerContent'>
                            <p>The Key to Weight Control: A simple equation of calories in minus calories out. This
                                means to simply subtract the calories you’ve expended throughout the day from the ones
                                you took in. But there is a little more to it than just that. The biggest piece of the puzzle is
                                to understand what makes up your Total Energy Expenditure (see below).
                            </p>
                            <form onSubmit={handleSubmit(calculateTdee)}>
                                <label>Gender</label>
                                <span>Male</span>
                                <input {...register("Gender", { required: 'A gender is required' })} type="radio" value="Male" />
                                <span>Female</span>
                                <input {...register("Gender", { required: 'A gender is required' })} type="radio" value="Female" /><br />
                                {errors.Gender && <span class="errMssg">{errors.Gender.message}</span>} <br />
                                <label>Age</label>
                                <input type="number" placeholder="24" {...register("Age", {
                                    required: 'Age is required',
                                    maxLength: { value: 3, message: 'Invalid age given' }
                                })} /><br />
                                {errors.Age && <span class="errMssg">{errors.Age.message}</span>} <br />
                                <label>Weigth</label>
                                <input type="number" placeholder="73" {...register("Weight", {
                                    required: 'Weight is required',
                                    maxLength: { value: 3, message: 'Invalid weight given' }
                                })} /><br />
                                {errors.Weight && <span class="errMssg">{errors.Weight.message}</span>} <br />
                                <label>Height (CM)</label>
                                <input type="number" placeholder="183" {...register("Height", {
                                    required: 'Height is required',
                                    maxLength: { value: 3, message: 'Invalid height given' }
                                })} /><br />
                                {errors.Height && <span class="errMssg">{errors.Height.message}</span>} <br />
                                <label>Activity</label>
                                <select {...register("Activity", { required: true })}>
                                    <option value="1.2">Sedentary (office job)</option>
                                    <option value="1.375">Light Exercise (1-2 days/week)</option>
                                    <option value="1.55">Moderate Exercise (3-5 days/week)</option>
                                    <option value="1.725">Heavy Exercise (6-7 days/week)</option>
                                    <option value="1.9">Athlete (2x per day)</option>
                                </select><br />
                                {errors.Activity && <span class="errMssg">{errors.Activity.message}</span>} <br />
                                <input type="submit" />
                            </form>
                        </div>
                    </>
                    :
                    <>
                        <div class='containerContent'>
                            <h4 class='containerTitle'>Your TDEE</h4>
                            <p>TDEE is the total number of calories that your body expends in 24 hours, including all
                                activities. It can vary widely in populations and is much higher for athletes or extremely
                                active individuals. Caloric requirements may also vary among similarly active individuals
                                due to differences in inherited metabolic rates. </p>
                            <table>
                                <tr>
                                    <th><h6>Weightloss</h6></th>
                                    <th><h6>Maintaining</h6></th>
                                    <th><h6>Musclegain</h6></th>
                                </tr>
                                <tr>
                                    <td><b>TDEE - 500</b> calories a day</td>
                                    <td>{Math.floor(TDEE)} calories a day</td>
                                    <td><b>TDEE + 500</b> calories a day</td>
                                </tr>
                                <tr>
                                    <td>{Math.floor(TDEE - 500)} calories a day</td>
                                    <td></td>
                                    <td>{TDEE + 500} calories a day</td>
                                </tr>
                                <tr>
                                    <td>{Math.floor((TDEE - 500) * 7)} calories a week</td>
                                    <td>{Math.floor(TDEE * 7)} calories a week</td>
                                    <td>{Math.floor((TDEE + 500) * 7)} calories a week</td>
                                </tr>
                                <tr>
                                    <td>{Math.floor((TDEE - 500) * 30)} calories a week</td>
                                    <td>{Math.floor(TDEE * 30)} calories a week</td>
                                    <td>{Math.floor((TDEE + 500) * 30)} calories a week</td>
                                </tr>
                            </table>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}