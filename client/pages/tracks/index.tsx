import React from "react";
import { Grid, Card, Button } from '@mui/material';
import MainLayout from "../../layouts/MainLayout";

const Index = () => {
    return (
        <MainLayout>
            <Grid container>
                <Card>
                    <Grid container>








                        <h1>Список треков</h1>
                        <Button>Загрузить</Button>
                    </Grid>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;