import React from "react";
import { Button } from '@mui/material';
import PersistentDrawerLeft from "../components/PersistentDrawerLeft";

const Index = () => {
    return (
        <>
            <PersistentDrawerLeft />

            <div className="center">
                <h1>Добро пожаловать</h1>
                <h3>Здесь собраны лучшие треки!</h3>
            </div>

            <style jsx>
                {`
                    .center {
                        margin-top: 150px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                `}
            </style>
        </>

    );
};

export default Index;