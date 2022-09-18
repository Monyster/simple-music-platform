import React from 'react';
import { Container } from '@mui/material';
import PersistentDrawerLeft from '../components/PersistentDrawerLeft';


const MainLayout: React.FC = ({ children }) => {
    return (
        <>
            <PersistentDrawerLeft />
            <Container style={{ margin: '90px 0' }}>
                {children}
            </Container>

        </>
    );
};

export default MainLayout;