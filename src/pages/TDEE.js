// Imports
// React module and components
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// styles
import '../assets/styles/Tdee.css';
// images
import weightlossBG from '../assets/images/weightlossBG.jpeg';

/**
 * @returns {HMTL} html node
 */
export default function TDEE() {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [TDEE, setTdee] = useState(0);
    const [BMR, setBmr] = useState(0);

    /**
     * Generates the TDEE
     * @param {object} formData html field values aliased by name
     */
    const calculateTdee = (formData) => {
        // Harris-Benedict formula, w/95% confidence range
        const bmr = (10 * formData.Weight) + (6.25 * formData.Height) - (5 * formData.Age) + (formData.Gender === 'Male' ? +5 : -161);
        setBmr(bmr);
        // set TDEE with the activity Multiplier
        setTdee(bmr * formData.Activity);
    };

    /**
     * Navigate back to previous page, if TDEE is set return to main tdee view
     */
    const navigateBack = () => {
        if (TDEE === 0) {
            history.push('/');
        } else {
            setTdee(0);
            history.push('TDEE');
        }
    };

    return (
        // Overwrite the default background
        <div className='content' style={{ backgroundImage: `url(${weightlossBG})` }}>
            <div className='container'>
                <div className='back-button' onClick={() => navigateBack()}>&#8592; </div>
                {TDEE === 0 ?
                    <>
                        <div className='container-title'>
                            <h4>TDEE calculator</h4>
                            <h5>Calculate your estimated calories you are burning every day!</h5>
                        </div>
                        <div className='container-content'>
                            <p>The Key to Weight Control: A simple equation of calories in minus calories out. This
                                means to simply subtract the calories you’ve expended throughout the day from the ones
                                you took in. But there is a little more to it than just that. The biggest piece of the puzzle is
                                to understand what makes up your Total Energy Expenditure (see below).
                            </p>
                            <form onSubmit={handleSubmit(calculateTdee)}>
                                <div id='gender-choice'>
                                    <label><b>Gender:</b> </label>
                                    <span>Male</span>
                                    <input {...register("Gender", { required: 'A gender is required' })} type="radio" value="Male" />
                                    <span>Female</span>
                                    <input {...register("Gender", { required: 'A gender is required' })} type="radio" value="Female" />
                                </div><br />
                                {errors.Gender && <span className="error-message">{errors.Gender.message}</span>} <br />
                                <label><b>Age:</b></label>
                                <input type="number" placeholder="24" {...register("Age", {
                                    required: 'Age is required',
                                    maxLength: { value: 3, message: 'Invalid age given' }
                                })} /><br />
                                {errors.Age && <span className="error-message">{errors.Age.message}</span>} <br />
                                <label><b>Weigth:</b></label>
                                <input type="number" placeholder="73" {...register("Weight", {
                                    required: 'Weight is required',
                                    maxLength: { value: 3, message: 'Invalid weight given' }
                                })} /><br />
                                {errors.Weight && <span className="error-message">{errors.Weight.message}</span>} <br />
                                <label><b>Height (CM):</b></label>
                                <input type="number" placeholder="183" {...register("Height", {
                                    required: 'Height is required',
                                    maxLength: { value: 3, message: 'Invalid height given' }
                                })} /><br />
                                {errors.Height && <span className="error-message">{errors.Height.message}</span>} <br />
                                <label><b>Activity</b></label>
                                <select {...register("Activity", { required: true })}>
                                    <option value="1.2">Sedentary (office job)</option>
                                    <option value="1.375">Light Exercise (1-2 days/week)</option>
                                    <option value="1.55">Moderate Exercise (3-5 days/week)</option>
                                    <option value="1.725">Heavy Exercise (6-7 days/week)</option>
                                    <option value="1.9">Athlete (2x per day)</option>
                                </select><br />
                                {errors.Activity && <span className="error-message">{errors.Activity.message}</span>} <br />
                                <input className='default-button' type="submit" />
                            </form>
                        </div>
                    </>
                    :
                    <>
                        <div className='container-content'>
                            <h4 className='container-title'>Your result</h4>
                            <h5>BMR: {Math.floor(BMR)} </h5>
                            <h5>TDEE: {Math.floor(TDEE)} </h5>
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