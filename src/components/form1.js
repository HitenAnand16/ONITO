import React from "react";
import { useForm } from "react-hook-form";
import './form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import IMG from '../images/2820287.jpg';
import $ from 'jquery';
import 'datatables.net';

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const table = $('#example').DataTable();
            await table.ajax.reload(null, false);
            table.clear().draw();
            table.rows.add([data]).draw(); // Add the new data to the table and redraw it
        } catch (error) {
            console.error('Error reloading data:', error);
        }
    };

    console.log(errors);

    return (
        <>
            <div className="main">
                <div className="img">
                    <img src={IMG} alt="" className="leftImage" />
                </div>

                <div className="container">
                    <div className="head">
                        <FontAwesomeIcon icon={faArrowRight} className="arrow" />
                        <h2>Personal Details</h2>
                    </div>

                    <div className="form-container">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <span>Name</span>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                {...register("Name", { required: true, minLength: 3, maxLength: 22 })}
                            />
                            {errors.Name && <p className="error">Name is required and must be between 3 and 22 characters</p>}

                            <span>Date Of Birth or Age</span>
                            <input
                                type="text"
                                placeholder="DD/MM/YYYY"
                            />


                            <span>Gender</span>
                            <select {...register("SEX", { required: true })}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {errors.SEX && <p className="error">Gender is required</p>}

                            <span>Mobile Number</span>
                            <input
                                type="text"
                                placeholder="999XXXXXXX"
                                {...register("Mobile", {
                                    required: true,
                                    minLength: 10,
                                    maxLength: 10,
                                    pattern: /^\d{10}$/,
                                })}
                            />
                            {errors.Mobile && <p className="error">Mobile Number is required and must be 10 digits long</p>}

                            <span>Govt Issued ID</span>
                            <div className="doc">
                                <select {...register("Govt Issued ID")}>
                                    <option value="Aadhar">Aadhar</option>
                                    <option value="PAN">PAN</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Id Number"
                                    {...register("id", { required: true, maxLength: 12, minLength: 12, pattern: /^(?!0|1)\d{12}$/ })}
                                />
                                {errors.id && <p className="error">ID Number is required and must be 12 digits long, not starting with 0 or 1</p>}
                            </div>

                            <input type="submit" />
                        </form>
                    </div>
                </div>
            </div>

            <table id="example" className="display">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date of Birth or Age</th>
                        <th>Gender</th>
                        <th>Mobile Number</th>
                        <th>Govt Issued ID</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </>
    );
};

export default Form;
