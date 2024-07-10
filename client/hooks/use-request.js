import axios from "axios";
import { useState } from "react";

export default ({url, method, body, onSuccess}) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        setErrors(null);//Reset Errors State

        await axios[method](url, body)
            .then(response => {
                if (onSuccess){
                    onSuccess(response.data);
                }

                return response.data;
            })
            .catch(err => {
                setErrors(                    
                    <div className="alert alert-danger">
                        <ul className="my-0">
                            {err.response.data.errors.map(err => 
                                <li key={err.message}>{err.message}</li>
                            )}
                        </ul>
                    </div>);
            });
    };

    return {doRequest, errors};
}